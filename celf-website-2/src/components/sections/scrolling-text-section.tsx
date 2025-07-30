"use client";

import React from "react";
import { motion } from "framer-motion";
import { TextScroll } from "@/src/components/ui/text-scroll";

export function ScrollingTextSection() {
  return (
    <section className="py-20 bg-[#0A0A0A] overflow-hidden border-y border-[#9EFF00]/10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative"
      >
        <TextScroll
          text="CELF • BLOCKCHAIN EDUCATION • SCHOLARSHIP PROGRAM • TOKEN MINING • DECENTRALIZED FUNDING • EDUCATIONAL INNOVATION • STUDENT EMPOWERMENT • "
          default_velocity={0.5}
          className="text-[#9EFF00]/40 text-4xl lg:text-6xl xl:text-7xl font-bold tracking-wider"
        />
      </motion.div>
    </section>
  );
}
