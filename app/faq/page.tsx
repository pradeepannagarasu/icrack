"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";

const faqCategories = [
  {
    category: "Repair Process",
    questions: [
      {
        question: "How long does a repair usually take?",
        answer: "Most repairs are completed within 30-60 minutes. Screen replacements and battery changes are typically done while you wait. More complex repairs may take 1-2 hours, and we'll keep you informed throughout the process.",
      },
      {
        question: "Do I need to book an appointment?",
        answer: "While walk-ins are welcome, we recommend booking online to ensure we have the parts ready and can serve you faster. You can book an appointment through our website or by calling your nearest store.",
      },
      {
        question: "What should I bring with me?",
        answer: "Just bring your device and any accessories you'd like us to check. If you have a passcode, please unlock your device before the repair. We also recommend backing up your data before any repair.",
      },
      {
        question: "Can I track my repair status?",
        answer: "Yes! Once you book a repair, you'll receive a confirmation email with a tracking link. You can also call your store directly for updates on your repair status.",
      },
    ],
  },
  {
    category: "Warranty & Quality",
    questions: [
      {
        question: "What warranty do you offer?",
        answer: "We offer a 12-month warranty on most repairs, and a 24-month warranty on battery replacements. All warranties cover defects in parts and workmanship. Please keep your receipt for warranty claims.",
      },
      {
        question: "What if my device isn't fixed?",
        answer: "We stand behind our work with a 'No Fix, No Fee' guarantee. If we can't fix your device, you won't be charged. If a repair fails within the warranty period, we'll fix it again at no cost.",
      },
      {
        question: "Do you use genuine parts?",
        answer: "We use high-quality, compatible parts that meet or exceed original manufacturer specifications. For Apple devices, we can use genuine parts when available. All parts come with our warranty guarantee.",
      },
      {
        question: "Will my warranty be voided?",
        answer: "Our repairs are performed by certified technicians and won't void your device warranty. However, if your device is still under manufacturer warranty, we recommend checking with them first.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    questions: [
      {
        question: "How much does a repair cost?",
        answer: "Repair costs vary by device and repair type. Screen repairs typically start from £79, battery replacements from £35, and other repairs vary. You can get an instant quote on our website by selecting your device and repair type.",
      },
      {
        question: "Do you offer payment plans?",
        answer: "Yes! We offer Klarna, allowing you to split your payment into 3 interest-free installments. This option is available for repairs over £35. Ask in-store or select it during online booking.",
      },
      {
        question: "Do you price match?",
        answer: "Yes, we offer a price promise. If you find a genuine like-for-like quote from a reputable repair service, we'll match it. Just show us the quote when you visit.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit and debit cards, cash, and contactless payments. We also accept Apple Pay and Google Pay. Klarna is available for eligible repairs.",
      },
    ],
  },
  {
    category: "Accessories & Services",
    questions: [
      {
        question: "Do you sell accessories?",
        answer: "Yes! We stock a wide range of accessories including charging cables, wireless chargers, power banks, audio accessories, and more. Visit our accessories page or any of our stores to see our full range.",
      },
      {
        question: "Do you offer mail-in repairs?",
        answer: "Yes, we offer a convenient mail-in service. Simply book online, send us your device, and we'll repair and return it to you. This service is perfect if you can't visit a store.",
      },
      {
        question: "Do you repair tablets and laptops?",
        answer: "Absolutely! We repair all types of devices including tablets, laptops, and other electronics. Visit our repairs page to see all the devices and brands we support.",
      },
      {
        question: "Do you offer business services?",
        answer: "Yes, we have dedicated business services including bulk repairs, corporate device management, on-site support, and SLA guarantees. Visit our business page or contact our business team for more information.",
      },
    ],
  },
  {
    category: "General",
    questions: [
      {
        question: "Where are your stores located?",
        answer: "We have 50+ locations across the UK, including major cities like London, Manchester, Birmingham, and more. Use our store locator on the website to find your nearest iCrack store.",
      },
      {
        question: "What are your opening hours?",
        answer: "Most stores are open Monday to Friday 9am-6pm, Saturday 10am-4pm, and closed on Sundays. Some locations may have different hours, so please check with your local store.",
      },
      {
        question: "Can I get a quote before visiting?",
        answer: "Yes! You can get an instant online quote by selecting your device and repair type on our website. This gives you an accurate price before you visit, with no hidden fees.",
      },
      {
        question: "What if I'm not happy with my repair?",
        answer: "Customer satisfaction is our priority. If you're not happy with your repair, please contact us within 30 days and we'll work to resolve the issue. We offer a full refund or re-repair guarantee.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
    setOpenQuestion(null);
  };

  const toggleQuestion = (questionId: string) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <div className="pt-20 lg:pt-[176px]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-10 h-10 text-primary-600" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 mb-8">
              Find answers to common questions about our repair services, warranty, pricing, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqCategories.map((category, categoryIndex) => (
              <ScrollReveal key={category.category} delay={categoryIndex * 0.1}>
                <div className="border border-neutral-200 rounded-2xl overflow-hidden">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.category)}
                    className="w-full px-6 py-4 bg-neutral-50 hover:bg-neutral-100 transition-colors flex items-center justify-between"
                  >
                    <h2 className="text-xl font-display font-semibold text-neutral-900">
                      {category.category}
                    </h2>
                    <ChevronDown
                      className={`w-5 h-5 text-neutral-600 transition-transform ${
                        openCategory === category.category ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Questions */}
                  <AnimatePresence>
                    {openCategory === category.category && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="divide-y divide-neutral-200">
                          {category.questions.map((faq, questionIndex) => {
                            const questionId = `${category.category}-${questionIndex}`;
                            return (
                              <div key={questionId} className="px-6">
                                <button
                                  onClick={() => toggleQuestion(questionId)}
                                  className="w-full py-4 text-left flex items-start justify-between group"
                                >
                                  <span className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors pr-4">
                                    {faq.question}
                                  </span>
                                  <ChevronDown
                                    className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform ${
                                      openQuestion === questionId ? "rotate-180" : ""
                                    }`}
                                  />
                                </button>
                                <AnimatePresence>
                                  {openQuestion === questionId && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <p className="pb-4 text-neutral-700 leading-relaxed">
                                        {faq.answer}
                                      </p>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Can't find what you're looking for? Get in touch with our friendly team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all hover:shadow-xl"
              >
                <span>Contact Us</span>
              </a>
              <a
                href="tel:02081275250"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white border-2 border-primary-600 text-primary-600 rounded-xl font-semibold text-lg hover:bg-primary-50 transition-all"
              >
                <span>Call Us: 02081275250</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

