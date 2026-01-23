"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: "02081275250",
    subtitle: "Mon-Fri 9am-6pm, Sat 10am-4pm",
  },
  {
    icon: Mail,
    title: "Email",
    content: "Phonesnmacs40@gmail.com",
    subtitle: "We'll respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Address",
    content: "40a Notting Hill Gate, London W11 3HX",
    subtitle: "Visit us at our flagship store",
  },
  {
    icon: Clock,
    title: "Opening Hours",
    content: "Mon-Fri: 9am-6pm",
    subtitle: "Sat: 10am-4pm, Sun: Closed",
  },
];

const locations = [
  {
    name: "ICRACK Notting Hill Gate",
    address: "40a Notting Hill Gate, London W11 3HX",
    phone: "02081275250",
    hours: "Mon-Fri: 9am-6pm, Sat: 10am-4pm",
  },
];

export default function ContactPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const product = searchParams.get("product");
  const productId = searchParams.get("id");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (type === "order" && product === "refurbished") {
      setFormData(prev => ({
        ...prev,
        subject: `Order Inquiry: Refurbished Phone ${productId || ""}`,
        message: `I would like to place an order for the refurbished phone (ID: ${productId || "N/A"}). Please contact me to proceed with payment and delivery arrangements.`
      }));
    } else if (type === "visit-store") {
      setFormData(prev => ({
        ...prev,
        subject: "Visit Store Inquiry"
      }));
    } else if (type === "mail-order") {
      setFormData(prev => ({
        ...prev,
        subject: "Mail Order Inquiry"
      }));
    }
  }, [type, product, productId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send email to Phonesnmacs40@gmail.com
    const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:Phonesnmacs40@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3000);
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
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 mb-8">
              Have a question or need help? We're here to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <ScrollReveal key={info.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 text-center"
                  >
                    <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-neutral-900 mb-2">
                      {info.title}
                    </h3>
                    <p className="text-neutral-700 font-medium mb-1">
                      {info.content}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {info.subtitle}
                    </p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-6">
                  Send Us a Message
                </h2>
                <p className="text-neutral-600 mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  {submitted ? (
                    <div className="text-center py-8">
                      <CheckCircle2 className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-2">
                        Thank You!
                      </h3>
                      <p className="text-neutral-600">
                        We've received your message and will get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6">
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
                      <div className="mb-6">
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
                      <div className="mb-6">
                        <label htmlFor="phone" className="block text-sm font-semibold text-neutral-900 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-600 transition-colors"
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="subject" className="block text-sm font-semibold text-neutral-900 mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-600 transition-colors"
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-semibold text-neutral-900 mb-2">
                          Message *
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
                        className="w-full px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all hover:shadow-xl flex items-center justify-center space-x-2"
                      >
                        <span>Send Message</span>
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </>
                  )}
                </motion.form>
              </div>
            </ScrollReveal>

            {/* Map & Locations */}
            <ScrollReveal delay={0.2}>
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-6">
                  Find Us
                </h2>
                <p className="text-neutral-600 mb-8">
                  Visit us at one of our convenient locations across the UK.
                </p>
                
                {/* Map - ICRACK Notting Hill Gate, 40a Notting Hill Gate, London W11 3HX */}
                <div className="rounded-2xl overflow-hidden shadow-lg mb-8 border border-neutral-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9932.870915310017!2d-0.2055!3d51.5096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760ff25f0c5bb9%3A0x0000000000000000!2s40A%20Notting%20Hill%20Gate%2C%20London%20W11%203HX!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                    title="iCrack Store Location - Notting Hill Gate"
                  />
                  <p className="text-xs text-neutral-500 mt-2 text-center">
                    📍 ICRACK Notting Hill Gate, 40a Notting Hill Gate, London W11 3HX
                  </p>
                </div>
                
                {/* Location Info */}
                <div className="bg-primary-50 rounded-xl p-6 mb-8 border border-primary-200">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-2">ICRACK Notting Hill Gate</h3>
                      <p className="text-neutral-700 mb-1">40a Notting Hill Gate</p>
                      <p className="text-sm text-neutral-600">London W11 3HX</p>
                    </div>
                  </div>
                </div>

                {/* Store Locations */}
                <div className="space-y-4">
                  {locations.map((location, index) => (
                    <motion.div
                      key={location.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl p-6 border border-neutral-200"
                    >
                      <h3 className="font-semibold text-neutral-900 mb-2">
                        {location.name}
                      </h3>
                      <p className="text-sm text-neutral-600 mb-1">
                        {location.address}
                      </p>
                      <p className="text-sm text-neutral-600 mb-1">
                        {location.phone}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {location.hours}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}

