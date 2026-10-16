"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Send,
  Copy,
  Check,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function Contact() {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // State for copy feedback
  const [copied, setCopied] = useState<string | null>(null);

  const contactInfo = [
    {
      id: "email",
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "satyamsingh83840@gmail.com",
      display: "satyamsingh...gmail.com",
    },
    {
      id: "phone",
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "(+91) 8384034689",
      display: "+91 8384034689",
    },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus("idle");

    const formPayload = new FormData();
    // REPLACE WITH YOUR ACTUAL ACCESS KEY FROM WEB3FORMS
    formPayload.append("access_key", "629f2234-cbf0-4997-b565-38b0dc0f843e");
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });
      const result = await response.json();

      if (result.success) {
        setSubmissionStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.error("Error:", result);
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-12 mb-4 md:py-24 px-4 overflow-hidden selection:bg-indigo-500/30"
    >
      {/* Noise Texture */}
      <div className="absolute inset-0   -z-10"></div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs md:text-sm mb-6">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            <span>Available for freelance</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight">
            Lets Work{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Together
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
            Have a project in mind? I am always open to discussing new projects,
            creative ideas or opportunities to be part of your visions.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-4 md:gap-6 order-2 lg:order-1"
          >
            <div className="space-y-2 mb-2 md:mb-4 text-center lg:text-left">
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                Contact Details
              </h3>
            </div>

            {contactInfo.map((item) => (
              <div
                key={item.id}
                className="group relative flex items-start sm:items-center gap-4 p-5 rounded-2xl md:rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-indigo-500/30 hover:bg-zinc-900/80 transition-all duration-300"
              >
                {/* Icon Wrapper */}
                <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 text-indigo-400 group-hover:text-white group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300 border border-white/5">
                  {item.icon}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-400 mb-0.5 uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="text-sm md:text-base font-medium text-white break-all sm:break-normal">
                    {item.value}
                  </p>
                </div>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopy(item.value, item.id)}
                  className="flex-shrink-0 p-2 text-gray-500 hover:text-white transition-colors"
                  aria-label="Copy"
                >
                  {copied === item.id ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            ))}
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative order-1 lg:order-2 w-full"
          >
            {/* REMOVED: Form Glow div was here */}

            {/* Form Container */}
            <div className="relative p-6 md:p-10 rounded-3xl md:rounded-[2rem] bg-zinc-950/80 border border-white/10 backdrop-blur-xl shadow-2xl">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 md:gap-6"
              >
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-300 ml-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all duration-300 placeholder:text-gray-600 text-sm md:text-base"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-300 ml-1"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all duration-300 placeholder:text-gray-600 text-sm md:text-base"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-300 ml-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all duration-300 placeholder:text-gray-600 resize-none text-sm md:text-base"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex items-center justify-center gap-2 md:gap-3 w-full bg-white text-black font-bold py-3 md:py-4 rounded-xl overflow-hidden transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />

                  <span className="relative flex items-center gap-2 text-sm md:text-base">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>

                {/* Status Messages */}
                {submissionStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 md:p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs md:text-sm font-medium text-center flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" /> Message sent successfully!
                  </motion.div>
                )}
                {submissionStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 md:p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs md:text-sm font-medium text-center"
                  >
                    ❌ Something went wrong.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
