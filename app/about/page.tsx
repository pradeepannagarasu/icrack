"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart, Award, Users, Shield, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description: "Your satisfaction is our top priority. We go above and beyond to ensure you're happy with our service.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "We use only the highest quality parts and employ certified technicians for every repair.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our skilled technicians have years of experience and are continuously trained on the latest devices.",
  },
  {
    icon: Shield,
    title: "Trust & Reliability",
    description: "We stand behind our work with comprehensive warranties and transparent pricing.",
  },
];

const stats = [
  { number: "500K+", label: "Devices Repaired" },
  { number: "50+", label: "Store Locations" },
  { number: "98%", label: "Customer Satisfaction" },
  { number: "15+", label: "Years Experience" },
];

export default function AboutPage() {
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              About iCrack
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 mb-8">
              We're on a mission to make device repair fast, affordable, and accessible for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  Founded in 2009, iCrack started with a simple vision: to provide fast, reliable, and affordable device repair services. What began as a small repair shop has grown into one of the UK's leading device repair companies.
                </p>
                <p>
                  We've repaired over 500,000 devices and continue to expand our services to meet the growing needs of our customers. Our commitment to quality, customer service, and innovation has made us a trusted name in device repair.
                </p>
                <p>
                  Today, we operate from 50+ locations across the UK, offering everything from screen repairs to complex motherboard fixes. We're proud to be the go-to choice for device repairs, trusted by individuals and businesses alike.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl p-12 text-center">
                <div className="grid grid-cols-2 gap-8">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <div className="text-4xl md:text-5xl font-display font-bold text-primary-600 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-neutral-700 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-neutral-600">
              What drives us every day
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <ScrollReveal key={value.title} delay={index * 0.1}>
                  <div className="bg-white rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-neutral-600">
                      {value.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              How We Work
            </h2>
            <p className="text-lg text-neutral-600">
              Our process ensures quality and customer satisfaction
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Book Your Repair",
                description: "Choose your device and repair type online or visit one of our stores.",
              },
              {
                step: "2",
                title: "Expert Service",
                description: "Our certified technicians diagnose and repair your device using quality parts.",
              },
              {
                step: "3",
                title: "Quality Guaranteed",
                description: "Every repair comes with a warranty and our commitment to excellence.",
              },
            ].map((item, index) => (
              <ScrollReveal key={item.step} delay={index * 0.1}>
                <div className="relative">
                  <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-6">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-neutral-700">
                      {item.description}
                    </p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-primary-300" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Awards & Recognition
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Best Repair Service 2023",
              "Customer Choice Award",
              "Trusted Service Provider",
              "Innovation in Repair",
            ].map((award, index) => (
              <ScrollReveal key={award} delay={index * 0.1}>
                <div className="bg-white rounded-xl p-6 text-center">
                  <Award className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <p className="text-neutral-700 font-medium text-sm">{award}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Experience the iCrack Difference
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join thousands of satisfied customers who trust iCrack for their device repairs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/select-device"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold text-lg hover:bg-neutral-100 transition-all hover:shadow-xl"
              >
                <span>Book a Repair</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

