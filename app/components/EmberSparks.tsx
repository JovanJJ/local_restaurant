"use client";

import { motion } from "framer-motion";

const emberSparks = [
    { left: "7%", size: 5, delay: 0.2, duration: 15, drift: 18 },
    { left: "13%", size: 3, delay: 2.4, duration: 18, drift: -14 },
    { left: "21%", size: 6, delay: 4.1, duration: 16, drift: 20 },
    { left: "29%", size: 4, delay: 1.3, duration: 19, drift: -18 },
    { left: "36%", size: 7, delay: 5.2, duration: 17, drift: 15 },
    { left: "44%", size: 3, delay: 3.7, duration: 20, drift: -12 },
    { left: "52%", size: 5, delay: 0.9, duration: 16, drift: 22 },
    { left: "59%", size: 4, delay: 6.3, duration: 21, drift: -20 },
    { left: "66%", size: 6, delay: 2.9, duration: 18, drift: 16 },
    { left: "73%", size: 3, delay: 4.8, duration: 15, drift: -16 },
    { left: "81%", size: 5, delay: 1.8, duration: 19, drift: 19 },
    { left: "88%", size: 4, delay: 5.8, duration: 17, drift: -13 },
    { left: "94%", size: 6, delay: 3.1, duration: 20, drift: 14 },
    { left: "18%", size: 4, delay: 7.2, duration: 22, drift: 11 },
    { left: "39%", size: 5, delay: 8.4, duration: 18, drift: -17 },
    { left: "62%", size: 3, delay: 6.9, duration: 16, drift: 12 },
];

export default function EmberSparks() {
    return (
        <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
            {emberSparks.map((spark, index) => (
                <motion.span
                    key={`${spark.left}-${index}`}
                    className="absolute bottom-[-8%] rounded-full bg-[#8C5A32] blur-[1.5px] shadow-[0_0_22px_rgba(140,90,50,0.72)]"
                    style={{
                        left: spark.left,
                        width: spark.size,
                        height: spark.size,
                    }}
                    initial={{ y: 0, x: 0, opacity: 0, scale: 0.7 }}
                    animate={{
                        y: ["0vh", "-36vh", "-78vh"],
                        x: [0, spark.drift, spark.drift * -0.35],
                        opacity: [0, 0.78, 0.34, 0],
                        scale: [0.7, 1.25, 0.88],
                    }}
                    transition={{
                        duration: spark.duration,
                        delay: spark.delay,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 0.8,
                    }}
                />
            ))}
        </div>
    );
}
