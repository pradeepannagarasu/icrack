"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Users, Clock, Shield, CheckCircle2, Mail, Phone } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";

const services = [
  {
    icon: Building2,
    title: "Corporate Device Management",
    description: "Comprehensive device fleet management and maintenance services for businesses of all sizes.",
  },
  {
    icon: Users,
    title: "Bulk Repair Services",
    description: "Volume discounts and priority service for multiple device repairs.",
  },
  {
    icon: Clock,
    title: "On-Site Support",
    description: "Our technicians can visit your office for convenient on-site repairs.",
  },
  {
    icon: Shield,
    title: "SLA Guarantees",
    description: "Service level agreements tailored to your business needs and priorities.",
  },
];

const benefits = [
  "Cost savings with volume discounts",
  "Fast turnaround times",
  "Reliable service with SLA guarantees",
  "Dedicated account management",
  "On-site support available",
  "Comprehensive reporting and tracking",
];

export default function BusinessPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send email to Phonesnmacs40@gmail.com
    const emailBody = `Business Inquiry\n\nName: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:Phonesnmacs40@gmail.com?subject=Business Inquiry from ${formData.company}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    
    console.log("Business inquiry:", formData);
    alert("Thank you for your inquiry! We'll contact you soon.");
    setFormData({ name: "", company: "", email: "", phone: "", message: "" });
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Business Solutions
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 mb-8">
              We support businesses of all sizes with corporate device repair and management services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Our Business Services
            </h2>
            <p className="text-lg text-neutral-600">
              Tailored solutions for your corporate needs
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <ScrollReveal key={service.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8"
                  >
                    <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-neutral-700">
                      {service.description}
                    </p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Why Partner With Us?
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={benefit} delay={index * 0.05}>
                <div className="flex items-start space-x-3 bg-white rounded-xl p-6">
                  <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-700 font-medium">{benefit}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-3xl p-8 md:p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Success Story
              </h2>
              <p className="text-lg text-white/90 mb-4">
                "A retail store chain saved 30% on device maintenance costs by partnering with iCrack for their corporate device fleet management. Our fast turnaround times and reliable service helped them minimize downtime and maximize productivity."
              </p>
              <p className="text-white/80 font-semibold">
                — Corporate Client, Retail Chain
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Request a Business Quote
            </h2>
            <p className="text-lg text-neutral-600">
              Get in touch with our business team to discuss your needs
            </p>
          </ScrollReveal>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-600 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-600 transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-600 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-600 transition-colors"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-semibold text-neutral-900 mb-2">
                Tell Us About Your Needs *
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-600 transition-colors resize-none"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Submit Inquiry</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Phone</h3>
                <p className="text-neutral-600">0800 123 4567</p>
                <p className="text-sm text-neutral-500">Mon-Fri 9am-6pm</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
                <p className="text-neutral-600">business@icrack.com</p>
                <p className="text-sm text-neutral-500">We'll respond within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

