"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Why should I use iCrack rather than a local mobile phone repair shop?",
    answer: "You might think that you can repair your phone for cheaper at a local shop, however, at iCrack, we want to ensure everyone has the chance to experience an express high-quality repair. If you find your repair cheaper elsewhere, don't worry, drop in-store or chat with us online and we'll do our very best to match it. All iCrack screen repairs come with a lifetime guarantee, so you don't need to worry about further issues. In addition, we use the highest quality parts, so you don't have to worry about ending up with a poor quality digitiser, an unresponsive touchscreen or missing pixels. At iCrack we have the most popular device parts in stock across the UK, while at a local shop you might need to wait for parts to be delivered, meaning that you're stuck with a cracked screen for longer.",
  },
  {
    question: "Can you fix my iPhone?",
    answer: "We recommend that you try the following steps first: Firstly, assess the damage. Is it scratched or cracked? If it's just a scratch those are pretty easy to fix yourself. In the event of a scratch, simply wipe some toothpaste over the mark, gently rubbing it into the screen in a circular motion and making sure you do not remove any surface coating. If this doesn't work, try the same thing with either baking soda or vegetable oil. If the screen is cracked then you can try and replace it yourself with a DIY phone kit. Alternatively, bring it to your nearest iCrack store and we'll fix it for you, fast.",
  },
  {
    question: "How much would it cost to repair my phone screen?",
    answer: "It completely depends on what phone you have as well as who you go with. Whilst prices with independent stores tend to be friendlier on the wallet, the quality of the repair and parts are often low, whereas a reputable high street name, such as iCrack, use only the highest quality parts and repairs are carried out by qualified professionals.",
  },
  {
    question: "Is there a quick iPhone fix service near me?",
    answer: "iCrack have stores across the UK, you can find your nearest branch by using our store finder. If we don't yet have a store near you then you can also send your phone to us via our mail in service, you can choose this option when you make your repair booking with us online, so that we can repair your phone and send it back to you with ease.",
  },
  {
    question: "Why won't my phone turn on?",
    answer: "The reasons your phone may not turn on are plentiful and depend on which phone you have. However, here is a general list of potential solutions for you to try: Check if your phone is out of charge: it may have run out of battery, if holding the On button results in a flashing battery logo then this is the case, so plug it in and it will automatically come back on. The phone may be on but the screen isn't working: The easiest way to check this is to hold the power button to shut it off and then turn it back on. If this doesn't fix it move on to the next solution. If your phone was dropped or got wet: Your phone may have water damage. If it does, leave it to dry for at least 48 hours, ideally longer. Regardless of if this fixes the issue, it is best to bring it into your nearest iCrack store for one of our experts to investigate as, in the long term, your phone's inner circuitry will erode and the device will break. If none of these solutions have helped, bring it to us at your nearest iCrack store for us to inspect.",
  },
];

export default function RepairsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
                  <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

