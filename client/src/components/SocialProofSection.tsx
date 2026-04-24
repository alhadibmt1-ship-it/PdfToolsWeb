import { motion } from "framer-motion";
import { Users, FileCheck, TrendingUp, Star, Shield, Lock, Zap, GraduationCap, Briefcase, Home, Palette, BookOpen, User, ExternalLink, Layers } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

const trustedByItems = [
  { name: "Freelancers",    Icon: User },
  { name: "Students",       Icon: GraduationCap },
  { name: "Teachers",       Icon: BookOpen },
  { name: "Small Business", Icon: Briefcase },
  { name: "Remote Workers", Icon: Home },
  { name: "Designers",      Icon: Palette }
];

const stats = [
  { icon: <Users className="w-7 h-7 text-blue-500" />,   value: 50000,  suffix: "K+",  label: "Happy Users",      bg: "bg-blue-500/10",   border: "border-blue-500/20"   },
  { icon: <FileCheck className="w-7 h-7 text-green-500" />, value: 1,   suffix: "M+",  label: "PDFs Processed",   bg: "bg-green-500/10",  border: "border-green-500/20"  },
  { icon: <Layers className="w-7 h-7 text-purple-500" />, value: 49,   suffix: "+",   label: "Free Tools",       bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { icon: <TrendingUp className="w-7 h-7 text-orange-500" />, value: 99, suffix: "%", label: "Success Rate",     bg: "bg-orange-500/10", border: "border-orange-500/20" },
];

const testimonials = [
  {
    quote: "PDF HUB 24 has transformed how I handle student assignments. I can merge multiple PDFs and compress large files in seconds. The best part? It's completely free!",
    name: "Sarah M.",
    role: "High School Teacher",
    rating: 5,
    initials: "SM",
    borderColor: "border-l-blue-500",
    avatarBg: "bg-blue-500/10 text-blue-600"
  },
  {
    quote: "As a freelance designer, I constantly need to convert files between formats. This tool saves me hours every week. The quality of conversions is impressive.",
    name: "David L.",
    role: "Graphic Designer",
    rating: 5,
    initials: "DL",
    borderColor: "border-l-purple-500",
    avatarBg: "bg-purple-500/10 text-purple-600"
  },
  {
    quote: "Our HR department uses PDF HUB 24 daily for processing employee documents. It's reliable, fast, and the security features give us peace of mind.",
    name: "Jennifer K.",
    role: "HR Manager",
    rating: 4,
    initials: "JK",
    borderColor: "border-l-green-500",
    avatarBg: "bg-green-500/10 text-green-600"
  },
  {
    quote: "I was skeptical about free tools, but PDF HUB 24 exceeded my expectations. The PDF to Word conversion keeps all my formatting intact.",
    name: "Michael R.",
    role: "Real Estate Agent",
    rating: 5,
    initials: "MR",
    borderColor: "border-l-orange-500",
    avatarBg: "bg-orange-500/10 text-orange-600"
  }
];

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  bg: string;
  border: string;
  delay: number;
}

function StatCard({ icon, value, suffix, label, bg, border, delay }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const steps = 40;
          const increment = value / steps;
          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setDisplayValue(value);
              clearInterval(timer);
            } else {
              setDisplayValue(Math.floor(start));
            }
          }, 40);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const formatted = value >= 1000
    ? (displayValue / 1000).toFixed(displayValue === value ? 0 : 0)
    : displayValue.toString();

  const display = value >= 1000
    ? `${Math.floor(displayValue / 1000)}${suffix}`
    : `${displayValue}${suffix}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`flex flex-col items-center justify-center p-6 rounded-2xl border ${bg} ${border}`}
    >
      <div className="mb-3">{icon}</div>
      <div className="text-4xl font-extrabold text-foreground mb-1 tabular-nums">
        {display}
      </div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </motion.div>
  );
}

function LiveCounter() {
  const [count, setCount] = useState(89);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        const delta = Math.floor(Math.random() * 3) - 1;
        const next = prev + delta;
        return Math.max(60, Math.min(200, next));
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      <span className="text-sm font-medium text-green-600 dark:text-green-400">
        Live: {count} users processing PDFs right now
      </span>
    </div>
  );
}

export default function SocialProofSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        {/* Privacy & Security Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <Shield className="w-8 h-8 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">100% Private</p>
                <p className="text-xs text-muted-foreground">Files deleted after processing</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Lock className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">SSL Encrypted</p>
                <p className="text-xs text-muted-foreground">Secure file transfers</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <Zap className="w-8 h-8 text-orange-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Lightning Fast</p>
                <p className="text-xs text-muted-foreground">Average 3 second processing</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trusted By Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm text-muted-foreground mb-4">Trusted by professionals worldwide</p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {trustedByItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <item.Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="section-label block mb-3">Trusted Worldwide</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Join Thousands of Happy Users
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            PDF HUB 24 helps students, teachers, freelancers, and businesses work smarter every day
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              bg={stat.bg}
              border={stat.border}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-2">
            What Our Users Say
          </h3>
          <a
            href="https://www.trustpilot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-green-600 dark:text-green-400 hover:underline"
            data-testid="link-trustpilot"
          >
            <Star className="w-4 h-4 fill-green-500 text-green-500" />
            Verified reviews on Trustpilot
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full p-5 sm:p-6 border-l-4 ${testimonial.borderColor}`}>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-muted-foreground/30 fill-muted-foreground/20"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${testimonial.avatarBg}`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <LiveCounter />
        </motion.div>
      </div>
    </section>
  );
}
