"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function StatCounter({ value, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const numericTarget = parseFloat(value);
    if (isNaN(numericTarget)) return;

    let startTime = null;
    const duration = 1600; // 1.6 seconds smooth count

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out cubic for smooth finish
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = easeProgress * numericTarget;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(numericTarget);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value]);

  const formattedNumber = decimals > 0 ? displayValue.toFixed(decimals) : Math.floor(displayValue);

  return (
    <span ref={ref}>
      {isInView ? formattedNumber : 0}
      {suffix}
    </span>
  );
}
