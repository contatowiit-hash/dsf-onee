import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export default function CountUp({ value, className = "", suffix = "" }) {
  const spring = useSpring(0, { stiffness: 75, damping: 18 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span className={className}>{display}</motion.span>;
}
