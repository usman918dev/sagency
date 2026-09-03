const { Client } = require('pg');

const connectionString = 'postgres://postgres.ftqwyzqaqiufnaendoko:8uP118mG7yVpgszj@aws-0-us-east-1.pooler.supabase.com:6543/postgres';
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();

  const sampleCaseStudy = {
    id: `ppc_sample_ecohome`,
    title: 'Truck Accessories Brand: Amazon PPC Scales Sales from $0 to $180K',
    slug: 'truck-accessories-amazon-ppc-growth',
    short_description: 'Amazon PPC campaign restructuring, keyword optimization and campaign scaling that significantly improved sales and reduced ACOS for a truck accessories brand.',
    summary: 'Amazon PPC campaign restructuring, keyword optimization and campaign scaling that significantly improved sales and reduced ACOS for a truck accessories brand.',
    main_result_image_url: '/assets/portfolio-amazon-v4.jpg',
    cover_image_url: '/assets/portfolio-amazon-v4.jpg',
    background_content: '<p>A truck accessories manufacturer approached <strong>Derixio</strong> to launch and scale their Amazon advertising presence. The brand needed a data-driven campaign architecture to establish keyword rank, lower initial ACOS, and scale monthly sales velocity.</p>',
    challenge_content: '<p>Key campaign challenges identified during initial launch setup:</p><ul><li><strong>Zero Initial Keyword Authority:</strong> Brand new listings requiring aggressive yet cost-effective indexing.</li><li><strong>High Category Competition:</strong> Automotive and truck accessories sub-categories featured heavy competitor PPC bidding.</li><li><strong>Budget Allocation:</strong> Need for tight negative target protection to prevent wasted ad spend.</li></ul>',
    strategy_content: '<p>Derixio designed a targeted multi-stage PPC roadmap:</p><ol><li><strong>Keyword Discovery:</strong> Harvested high-intent long-tail keywords with low competitor saturation.</li><li><strong>Exact Match Focus:</strong> Focused initial budget on single-keyword exact match campaigns for controlled bidding.</li><li><strong>Negative Filtering:</strong> Applied broad phrase negative lists to block irrelevant automotive search queries.</li></ol>',
    execution_content: '<p>We launched <strong>over 150 targeted campaigns</strong>, structuring bids around converting search terms. Sponsored Brand Video creative was introduced to highlight product durability and fitment.</p>',
    optimization_content: '<p>Weekly bid adjustments were automated based on ACOS targets. Target keywords achieving consistent conversions were scaled with higher top-of-search placement multipliers.</p>',
    results_content: '<p>Strategic campaign scaling generated <strong>$180K in monthly sales</strong> within 120 days of execution, while maintaining an optimized ACOS target.</p>',
    outcome_content: '<p>The brand established dominant rank across top automotive search terms and scaled monthly revenue from $0 to $180K/month.</p>',
    metrics: JSON.stringify([]),
    result_blocks: JSON.stringify([
      {
        id: 'rb1',
        title: 'Monthly Revenue Growth & Sales Scaling',
        description: '<p>Targeted PPC campaign architecture scaled monthly Amazon sales from <strong>$0 to $180K/month</strong>.</p>',
        imageUrl: '/assets/portfolio-amazon-v4.jpg',
        imagePosition: 'left',
        sortOrder: 0
      },
      {
        id: 'rb2',
        title: 'ACoS Reduction & Campaign Targeting',
        description: '<p>Negative keyword protection eliminated non-converting spend, optimizing campaign ACOS across all product lines.</p>',
        imageUrl: '/assets/real-amazon-ppc-final.jpg',
        imagePosition: 'right',
        sortOrder: 1
      }
    ]),
    published: true,
    featured: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const upsertQuery = `
    INSERT INTO public.amazon_ppc_case_studies (
      id, title, slug, short_description, summary, main_result_image_url, cover_image_url,
      background_content, challenge_content, strategy_content, execution_content,
      optimization_content, results_content, outcome_content, metrics, result_blocks,
      published, featured, sort_order, created_at, updated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
    ) ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      slug = EXCLUDED.slug,
      short_description = EXCLUDED.short_description,
      summary = EXCLUDED.summary,
      main_result_image_url = EXCLUDED.main_result_image_url,
      cover_image_url = EXCLUDED.cover_image_url,
      background_content = EXCLUDED.background_content,
      challenge_content = EXCLUDED.challenge_content,
      strategy_content = EXCLUDED.strategy_content,
      execution_content = EXCLUDED.execution_content,
      optimization_content = EXCLUDED.optimization_content,
      results_content = EXCLUDED.results_content,
      outcome_content = EXCLUDED.outcome_content,
      metrics = EXCLUDED.metrics,
      result_blocks = EXCLUDED.result_blocks,
      published = EXCLUDED.published,
      featured = EXCLUDED.featured,
      sort_order = EXCLUDED.sort_order,
      updated_at = EXCLUDED.updated_at;
  `;

  await client.query(upsertQuery, [
    sampleCaseStudy.id,
    sampleCaseStudy.title,
    sampleCaseStudy.slug,
    sampleCaseStudy.short_description,
    sampleCaseStudy.summary,
    sampleCaseStudy.main_result_image_url,
    sampleCaseStudy.cover_image_url,
    sampleCaseStudy.background_content,
    sampleCaseStudy.challenge_content,
    sampleCaseStudy.strategy_content,
    sampleCaseStudy.execution_content,
    sampleCaseStudy.optimization_content,
    sampleCaseStudy.results_content,
    sampleCaseStudy.outcome_content,
    sampleCaseStudy.metrics,
    sampleCaseStudy.result_blocks,
    sampleCaseStudy.published,
    sampleCaseStudy.featured,
    sampleCaseStudy.sort_order,
    sampleCaseStudy.created_at,
    sampleCaseStudy.updated_at
  ]);

  console.log('✅ Sample Amazon PPC Case Study updated with exact user format in Supabase DB!');
  await client.end();
}

main().catch(err => {
  console.error('Seed Error:', err);
  process.exit(1);
});
