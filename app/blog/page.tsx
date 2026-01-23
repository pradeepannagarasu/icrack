"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { fadeInUp } from "@/lib/animations";
import BackLink from "@/components/ui/BackLink";

const blogPosts = [
  {
    id: 1,
    title: "How to Extend Your Phone's Battery Life",
    excerpt: "Simple tips and tricks to keep your phone battery healthy and lasting longer.",
    author: "iCrack Team",
    date: "2024-01-20",
    image: "/images/mobile.png",
    category: "Tips & Tricks",
  },
  {
    id: 2,
    title: "When Should You Replace Your Phone Screen?",
    excerpt: "Learn the signs that indicate it's time to replace your cracked or damaged screen.",
    author: "iCrack Team",
    date: "2024-01-15",
    image: "/images/mobile.png",
    category: "Repair Guide",
  },
  {
    id: 3,
    title: "Understanding Phone Repair Warranties",
    excerpt: "Everything you need to know about repair warranties and what's covered.",
    author: "iCrack Team",
    date: "2024-01-10",
    image: "/images/mobile.png",
    category: "Information",
  },
];

export default function BlogPage() {
  return (
    <div className="pt-20 lg:pt-[176px]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-8 sm:py-12 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackLink href="/" label="Go back" />
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto mt-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-4 sm:mb-6">
              Blog
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-700 mb-4 sm:mb-6 px-2">
              Expert tips, guides, and insights about phone repairs and device care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-neutral-200"
                >
                  <div className="relative h-48 sm:h-56 bg-neutral-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-neutral-600 mb-3 sm:mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(post.date).toLocaleDateString("en-GB", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-neutral-400">•</span>
                      <span>{post.category}</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-display font-bold text-neutral-900 mb-2 sm:mb-3">
                      {post.title}
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-700 mb-4 sm:mb-6">{post.excerpt}</p>
                    <Link
                      href="#"
                      className="inline-flex items-center space-x-2 text-primary-600 font-semibold text-sm sm:text-base hover:text-primary-700 transition-colors group"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

