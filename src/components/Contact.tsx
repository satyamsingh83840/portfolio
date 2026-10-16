"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Send,
  Copy,
  Check,
  Loader2,
  Sparkles,
  ArrowUpRight,
  ArrowUpRight as ExternalLink,
} from "lucide-react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type SubmissionStatus = "idle" | "success" | "error";

const contactInfo = [
  {
    id: "email",
    icon: Mail,
    label: "Email address",
    value: "satyamsingh83840@gmail.com",
    href: "mailto:satyamsingh83840@gmail.com",
  },
  {
    id: "phone",
    icon: Phone,
    label: "Phone number",
    value: "+91 8384034689",
    href: "tel:+918384034689",
  },
];

const inputClass =
  "w-full min-w-0 border border-white/[0.10] bg-[#09090B] px-3.5 text-sm text-zinc-100 outline-none transition duration-200 placeholder:text-zinc-600 hover:border-white/[0.18] focus:border-[#B8D878]/60 focus:bg-[#0D0F0B] focus:ring-1 focus:ring-[#B8D878]/10";

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");
  const [copied, setCopied] = useState<string | null>(null);

  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeout.current) {
        clearTimeout(copyTimeout.current);
      }
    };
  }, []);

  const handleCopy = async (value: string, id: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);

      if (copyTimeout.current) {
        clearTimeout(copyTimeout.current);
      }

      copyTimeout.current = setTimeout(() => {
        setCopied(null);
        copyTimeout.current = null;
      }, 1800);
    } catch (error) {
      console.error("Unable to copy contact detail:", error);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (submissionStatus !== "idle") {
      setSubmissionStatus("idle");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionStatus("idle");

    const payload = new FormData();
    payload.append("access_key", "629f2234-cbf0-4997-b565-38b0dc0f843e");
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmissionStatus("success");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        console.error("Web3Forms submission failed:", result);
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative isolate mb-4 overflow-hidden bg-[#09090B] px-4 py-16 text-zinc-100 selection:bg-[#B8D878]/30 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #71717a 1px, transparent 1px), linear-gradient(to bottom, #71717a 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "linear-gradient(to bottom, black, transparent 90%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-20 -z-10 h-72 w-72 rounded-full bg-[#B8D878]/[0.055] blur-[110px]"
      />

      <div className="mx-auto w-full max-w-6xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="mb-9 flex flex-col justify-between gap-6 border-b border-white/[0.09] pb-8 sm:mb-11 sm:pb-10 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#B8D878]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-400">
                Get in touch / 04
              </span>
            </div>

            <h2 className="text-[clamp(2.8rem,7vw,5.5rem)] font-semibold leading-[0.91] tracking-[-0.075em] text-zinc-100">
              Have an idea?
              <br />
              <span className="font-serif font-normal italic text-[#B8D878]">
                Let&apos;s build it.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-zinc-400 sm:text-[15px]">
              Have a project, an interesting problem, or an opportunity in mind?
              Tell me about it. Let&apos;s make something worthwhile.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 border border-white/[0.10] bg-[#101012] px-3.5 py-3">
            <span className="flex h-9 w-9 items-center justify-center border border-[#B8D878]/20 bg-[#B8D878]/[0.07] text-[#B8D878]">
              <Sparkles className="h-4 w-4" />
            </span>

            <div>
              <p className="text-xs font-medium text-zinc-200">
                Open to opportunities
              </p>
              <p className="mt-1 text-[10px] text-zinc-500">
                Freelance · Collaboration · Full-time
              </p>
            </div>

            <span className="ml-1 h-2 w-2 rounded-full bg-[#B8D878] shadow-[0_0_10px_rgba(184,216,120,0.45)]" />
          </div>
        </motion.div>

        {/* Main layout */}
        <div className="grid items-start gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:gap-7">
          {/* Contact information */}
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="min-w-0"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-tight text-zinc-100">
                Contact details
              </h3>
              <span className="font-mono text-[10px] text-zinc-600">
                01 — 02
              </span>
            </div>

            <div className="space-y-2">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const isCopied = copied === item.id;

                return (
                  <div
                    key={item.id}
                    className="group flex min-w-0 items-center gap-3 border border-white/[0.09] bg-[#101012] p-3 transition-colors duration-200 hover:border-[#B8D878]/30 hover:bg-[#121310]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/[0.08] bg-[#09090B] text-zinc-400 transition-colors group-hover:border-[#B8D878]/25 group-hover:text-[#B8D878]">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.17em] text-zinc-500">
                        {item.label}
                      </p>
                      <a
                        href={item.href}
                        className="block truncate text-xs font-medium text-zinc-200 transition-colors hover:text-[#B8D878] sm:text-sm"
                        title={item.value}
                      >
                        {item.value}
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(item.value, item.id)}
                      aria-label={`Copy ${item.label}`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center border border-transparent text-zinc-500 transition hover:border-white/10 hover:bg-white/[0.04] hover:text-[#B8D878] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8D878]"
                    >
                      {isCopied ? (
                        <Check className="h-4 w-4 text-[#B8D878]" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 border border-dashed border-white/[0.12] p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#B8D878]">
                  A good place to start
                </span>
                <ArrowUpRight className="h-4 w-4 text-zinc-500" />
              </div>

              <p className="max-w-xs text-sm leading-6 text-zinc-300">
                A little context goes a long way. Share the problem, your idea,
                or what you&apos;d like to create.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Web development", "AI projects", "Collaborations"].map(
                  (topic) => (
                    <span
                      key={topic}
                      className="border border-white/[0.09] bg-white/[0.025] px-2.5 py-1.5 text-[10px] text-zinc-400"
                    >
                      {topic}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[10px] text-zinc-500">
              <span className="h-1.5 w-1.5 bg-[#B8D878]" />
              Prefer email? Use the address above.
            </div>
          </motion.aside>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="min-w-0"
          >
            <div className="overflow-hidden border border-white/[0.11] bg-[#101012]">
              {/* Form header */}
              <div className="flex items-center justify-between gap-3 border-b border-white/[0.09] px-4 py-4 sm:px-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-[#B8D878]" />
                    <p className="text-sm font-semibold text-zinc-100">
                      Send a message
                    </p>
                  </div>
                  <p className="mt-1.5 pl-3.5 text-[11px] text-zinc-500">
                    I&apos;d love to hear what you have in mind.
                  </p>
                </div>

                <span className="hidden border border-white/[0.09] px-2.5 py-1.5 font-mono text-[9px] tracking-wider text-zinc-500 sm:block">
                  NEW MESSAGE
                </span>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 p-4 sm:gap-5 sm:p-5 lg:p-6"
              >
                {/* Name and email */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex min-w-0 flex-col gap-2">
                    <label
                      htmlFor="contact-name"
                      className="text-[11px] font-medium text-zinc-300"
                    >
                      Your name <span className="text-[#B8D878]">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      className={`${inputClass} h-11`}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="flex min-w-0 flex-col gap-2">
                    <label
                      htmlFor="contact-email"
                      className="text-[11px] font-medium text-zinc-300"
                    >
                      Email address <span className="text-[#B8D878]">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      className={`${inputClass} h-11`}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor="contact-message"
                      className="text-[11px] font-medium text-zinc-300"
                    >
                      Your message <span className="text-[#B8D878]">*</span>
                    </label>
                    <span className="font-mono text-[9px] text-zinc-600">
                      LET&apos;S TALK
                    </span>
                  </div>

                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                    className={`${inputClass} min-h-36 resize-y py-3 leading-6`}
                    placeholder="Tell me about your idea, project, or opportunity..."
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex min-h-12 w-full items-center justify-between gap-3 border border-[#B8D878] bg-[#B8D878] px-4 py-3 text-sm font-semibold text-[#151710] transition duration-200 hover:bg-[#c9e694] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8D878] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101012] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:px-5"
                >
                  <span className="flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending your message...
                      </>
                    ) : (
                      <>
                        Send message
                        <span className="text-xs font-normal opacity-70">
                          / Let&apos;s connect
                        </span>
                      </>
                    )}
                  </span>

                  {!isSubmitting && (
                    <span className="flex h-7 w-7 items-center justify-center border border-black/10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <Send className="h-3.5 w-3.5" />
                    </span>
                  )}
                </button>

                {/* Submission feedback */}
                {submissionStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="status"
                    className="flex items-center gap-2 border border-[#B8D878]/25 bg-[#B8D878]/[0.06] p-3 text-xs text-[#B8D878]"
                  >
                    <Check className="h-4 w-4 shrink-0" />
                    Your message has been sent successfully.
                  </motion.div>
                )}

                {submissionStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    className="border border-red-500/20 bg-red-500/[0.05] p-3 text-xs leading-5 text-red-400"
                  >
                    Something went wrong while sending your message. Please try
                    again or contact me directly by email.
                  </motion.div>
                )}

                <p className="text-center text-[10px] leading-5 text-zinc-600">
                  Your details are used only to respond to your message.
                </p>
              </form>

              {/* Bottom accent */}
              <div className="h-px w-full bg-white/[0.06]">
                <div className="h-full w-1/3 bg-[#B8D878]" />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 text-[9px] uppercase tracking-[0.16em] text-zinc-600">
              <span>Thoughtful work starts here.</span>
              <span className="inline-flex items-center gap-1.5">
                Available to connect
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </motion.div>
        </div>

        {/* Footer line */}
        <div className="mt-10 flex items-center justify-between gap-3 border-t border-white/[0.09] pt-4 text-[9px] uppercase tracking-[0.16em] text-zinc-600 sm:mt-12">
          <span>Designed with intent.</span>
          <span>Built to connect.</span>
        </div>
      </div>
    </section>
  );
}
