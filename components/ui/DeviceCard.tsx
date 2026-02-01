"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface DeviceCardProps {
  id: string;
  name: string;
  imageSrc: string;
  href: string;
  index?: number;
  delay?: number;
}

export default function DeviceCard({
  id,
  name,
  imageSrc,
  href,
  index = 0,
  delay = 0.05,
}: DeviceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * delay, duration: 0.3 }}
    >
      <Link href={href} className="block">
        <motion.div
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="relative bg-white rounded-2xl p-6 lg:p-8 border border-neutral-200 hover:border-primary-300 hover:shadow-xl transition-all text-center group h-full flex flex-col items-center"
        >
          {/* Light blue geometric star/cross shape behind device */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rotate-45 rounded-xl opacity-60"
              style={{ backgroundColor: "#bae6fd" }}
            />
          </div>

          {/* Device image */}
          <div className="relative z-10 h-36 lg:h-40 w-full flex items-center justify-center mb-4 flex-shrink-0">
            <Image
              src={imageSrc}
              alt={name}
              width={180}
              height={180}
              className="object-contain w-full h-full p-4 group-hover:scale-105 transition-transform duration-300"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
              unoptimized
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/mobile.png";
              }}
            />
          </div>

          {/* Device name in pink */}
          <h3 className="relative z-10 font-semibold text-primary-600 text-base lg:text-lg group-hover:text-primary-700 transition-colors mt-auto">
            {name}
          </h3>
        </motion.div>
      </Link>
    </motion.div>
  );
}

