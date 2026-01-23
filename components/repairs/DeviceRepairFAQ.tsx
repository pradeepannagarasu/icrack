"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface DeviceRepairFAQProps {
  deviceName: string;
}

export default function DeviceRepairFAQ({ deviceName }: DeviceRepairFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: `How much does it cost to replace a ${deviceName} screen?`,
      answer: `In the UK, Apple charges a premium for ${deviceName} screen replacements (without AppleCare+). If you decide to replace your ${deviceName} screen at a trusted hi-tech repair shop, like iCrack, you can save significantly with competitive pricing. Contact us for a quote or book an appointment to see our current pricing.`,
    },
    {
      question: `Can I repair a ${deviceName} screen myself?`,
      answer: `If it's more than just a scratch and your ${deviceName} screen is cracked, you can try repairing it yourself with a DIY repair kit. However, you should keep in mind that ${deviceName} replacements are difficult. If you want to get a high-quality repair, book an appointment at one of our iCrack stores and our accredited technicians will fit your shiny new screen for you.`,
    },
    {
      question: `How long does a ${deviceName} repair take?`,
      answer: `Most ${deviceName} repairs can be completed in 30-60 minutes. Screen replacements typically take around 30 minutes, while battery replacements also take about 30 minutes. More complex repairs like water damage may take 2-4 hours. We'll give you an accurate time estimate when you book your appointment.`,
    },
    {
      question: `Do you offer warranty on ${deviceName} repairs?`,
    answer: `Yes! Most ${deviceName} repairs come with a 12-month warranty, and battery replacements include a 24-month warranty. This means if anything goes wrong with the repair within the warranty period, we'll fix it free of charge.`,
    },
    {
      question: `What if you can't fix my ${deviceName}?`,
      answer: `We have a "No Fix, No Fee" guarantee. If we're unable to repair your ${deviceName}, you won't be charged for the diagnostic or attempted repair. We'll be transparent about what can and cannot be fixed.`,
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-all"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left group"
          >
            <span className="font-semibold text-neutral-900 pr-4 group-hover:text-primary-600 transition-colors text-base md:text-lg">
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-colors flex-shrink-0" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 pt-0">
                  <p className="text-neutral-600 leading-relaxed text-sm md:text-base">{faq.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

