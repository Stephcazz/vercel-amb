import React from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  value: string;
  label: string;
}

export function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  // Parse the numeric part and suffix
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 15,
  });

  React.useEffect(() => {
    if (inView) {
      spring.set(numericValue);
    }
  }, [inView, spring, numericValue]);

  const display = useTransform(spring, (current) => {
    return suffix.includes('+') ? `${Math.round(current)}${suffix}` : `${current.toFixed(0)}${suffix}`;
  });

  return (
    <div ref={ref} className="text-center p-4">
      <motion.div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        {display}
      </motion.div>
      <div className="text-xs sm:text-sm text-gray-600 whitespace-normal">
        {label}
      </div>
    </div>
  );
}
