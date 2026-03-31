import { useEffect } from "react";
import { useMotionValue, useTransform, animate } from "framer-motion";
import { motion } from "framer-motion";

export default function Counter({ value, duration = 2 }) {
  const count = useMotionValue(0);
  
  // Xử lý để lấy phần số từ chuỗi (VD: "1000+" lấy ra 1000)
  const numericValue = parseFloat(value.toString().replace(/,/g, ""));
  const suffix = value.toString().replace(/[0-9.]/g, "");

  const rounded = useTransform(count, (latest) => {
    return Math.round(latest).toLocaleString() + suffix;
  });

  useEffect(() => {
    const controls = animate(count, numericValue, { 
      duration: duration,
      ease: "easeOut" 
    });
    return controls.stop;
  }, [numericValue]);

  return <motion.span>{rounded}</motion.span>;
}