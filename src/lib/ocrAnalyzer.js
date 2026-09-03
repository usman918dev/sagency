/**
 * Automatic Metric & Text Analyzer for Amazon PPC Performance Screenshots
 * Analyzes image buffer or image URL using Tesseract OCR to extract visible Amazon PPC metrics.
 */

export function extractMetricsFromText(text) {
  if (!text || typeof text !== 'string') return [];

  const metricsMap = new Map();
  const cleanText = text.replace(/\r\n/g, '\n').replace(/\s+/g, ' ');

  // 1. Sales / Revenue / Ordered Product Sales ($100,471.43, $180,000, $180K, etc.)
  const salesMatch = cleanText.match(/(?:ordered\s+product\s+sales|total\s+sales|product\s+sales|ad\s+sales|sales|revenue)[:\s]*(\$\s*[\d,]+(?:\.\d+)?\s*(?:k|m)?)/i) ||
                     cleanText.match(/(\$\s*[\d,]{3,}(?:\.\d{2})?\s*(?:k|m)?)/i);
  if (salesMatch && salesMatch[1]) {
    const val = salesMatch[1].trim();
    if (val && !val.includes('$0.00')) {
      metricsMap.set('Sales', { label: 'Sales', value: val });
    }
  }

  // 2. ACOS / TACOS (29.62%, 26%, 14.5%, etc.)
  const acosMatch = cleanText.match(/(?:acos|tacos|ad\s+cost\s+of\s+sales)[:\s]*([\d.]+\s*%)/i) ||
                    cleanText.match(/([\d.]+\s*%\s*acos)/i);
  if (acosMatch && acosMatch[1]) {
    metricsMap.set('ACOS', { label: 'ACOS', value: acosMatch[1].trim() });
  }

  // 3. Orders / Total Order Items
  const ordersMatch = cleanText.match(/(?:total\s+order\s+items|total\s+orders|orders)[:\s]*([\d,]+)/i);
  if (ordersMatch && ordersMatch[1]) {
    metricsMap.set('Orders', { label: 'Orders', value: ordersMatch[1].trim() });
  }

  // 4. Units Sold / Units Ordered
  const unitsMatch = cleanText.match(/(?:units\s+ordered|units\s+sold|units)[:\s]*([\d,]+)/i);
  if (unitsMatch && unitsMatch[1]) {
    metricsMap.set('Units Sold', { label: 'Units Sold', value: unitsMatch[1].trim() });
  }

  // 5. Avg Sales per Order / AOV ($123.73)
  const avgSalesMatch = cleanText.match(/(?:avg\.?\s*sales\/?order\s*item|avg\s*order\s*value|aov)[:\s]*(\$\s*[\d,]+(?:\.\d+)?)/i);
  if (avgSalesMatch && avgSalesMatch[1]) {
    metricsMap.set('Avg Order Value', { label: 'Avg Order Value', value: avgSalesMatch[1].trim() });
  }

  // 6. ROAS (Return on Ad Spend, e.g. 3.8x, 4.2x)
  const roasMatch = cleanText.match(/(?:roas|return\s+on\s+ad\s+spend)[:\s]*([\d.]+\s*x?)/i);
  if (roasMatch && roasMatch[1]) {
    metricsMap.set('ROAS', { label: 'ROAS', value: roasMatch[1].trim() });
  }

  // 7. CTR (Click-Through Rate, e.g. 0.45%, 1.2%)
  const ctrMatch = cleanText.match(/(?:ctr|click\s*through\s*rate)[:\s]*([\d.]+\s*%)/i);
  if (ctrMatch && ctrMatch[1]) {
    metricsMap.set('CTR', { label: 'CTR', value: ctrMatch[1].trim() });
  }

  // 8. Conversion Rate (e.g. 12.5%)
  const convMatch = cleanText.match(/(?:conversion\s*rate|cvr)[:\s]*([\d.]+\s*%)/i);
  if (convMatch && convMatch[1]) {
    metricsMap.set('Conversion Rate', { label: 'Conversion Rate', value: convMatch[1].trim() });
  }

  return Array.from(metricsMap.values());
}

/**
 * Perform Tesseract OCR on a Node Buffer
 */
export async function analyzeBufferForMetrics(buffer) {
  if (!buffer || !Buffer.isBuffer(buffer)) return { metrics: [] };

  try {
    let sharp;
    try {
      sharp = require('sharp');
    } catch (e) {}

    let Tesseract;
    try {
      Tesseract = require('tesseract.js');
    } catch (e) {}

    if (!Tesseract || !Tesseract.recognize) {
      console.log('[AMAZON PPC OCR] Tesseract library not loaded.');
      return { metrics: [] };
    }

    let processedBuffer = buffer;

    if (sharp) {
      try {
        processedBuffer = await sharp(buffer)
          .grayscale()
          .normalize()
          .sharpen()
          .toBuffer();
      } catch (sharpErr) {
        console.error('[AMAZON PPC OCR] Sharp preprocessing notice:', sharpErr.message);
      }
    }

    console.log('[AMAZON PPC OCR] Running Tesseract OCR on image buffer...');
    const result = await Tesseract.recognize(processedBuffer, 'eng', {
      logger: () => {}
    });

    const recognizedText = result?.data?.text || '';
    console.log('[AMAZON PPC OCR] OCR text output length:', recognizedText.length);

    const extracted = extractMetricsFromText(recognizedText);
    console.log('[AMAZON PPC OCR] Extracted metrics:', extracted);

    return {
      rawText: recognizedText,
      metrics: extracted
    };
  } catch (err) {
    console.error('[AMAZON PPC OCR] Buffer analysis error:', err.message);
    return { metrics: [] };
  }
}

/**
 * Perform Tesseract OCR on an image URL by fetching its buffer
 */
export async function analyzeImageForMetrics(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.startsWith('http')) {
    return { metrics: [] };
  }

  try {
    console.log('[AMAZON PPC OCR] Fetching image buffer from URL:', imageUrl);
    const res = await fetch(imageUrl);
    if (!res.ok) {
      console.error('[AMAZON PPC OCR] Failed to fetch image URL:', res.status);
      return { metrics: [] };
    }
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return await analyzeBufferForMetrics(buffer);
  } catch (err) {
    console.error('[AMAZON PPC OCR] Image URL analysis error:', err.message);
    return { metrics: [] };
  }
}
