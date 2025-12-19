import { motion } from "framer-motion";
import { Users, FileCheck, Clock, Star, TrendingUp, Globe, Quote, Shield, Lock, Zap, GraduationCap, Briefcase, Home, Palette, BookOpen, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const trustedByItems = [
  { name: "Freelancers", Icon: User },
  { name: "Students", Icon: GraduationCap },
  { name: "Teachers", Icon: BookOpen },
  { name: "Small Business", Icon: Briefcase },
  { name: "Remote Workers", Icon: Home },
  { name: "Designers", Icon: Palette }
];

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

function StatItem({ icon, value, label, delay }: StatItemProps) {
  const [displayValue, setDisplayValue] = useState("0");
  
  useEffect(() => {
    const numValue = parseInt(value.replace(/[^0-9]/g, ""));
    const suffix = value.replace(/[0-9]/g, "");
    let current = 0;
    const increment = numValue / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numValue) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current) + suffix);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="text-center"
    >
      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
        {displayValue}
      </div>
      <div className="text-sm text-muted-foreground">
        {label}
      </div>
    </motion.div>
  );
}

const testimonials = [
  {
    quote: "PDF HUB 24 has transformed how I handle student assignments. I can merge multiple PDFs and compress large files in seconds. The best part? It's completely free!",
    name: "Sarah M.",
    role: "High School Teacher",
    rating: 5
  },
  {
    quote: "As a freelance designer, I constantly need to convert files between formats. This tool saves me hours every week. The quality of conversions is impressive.",
    name: "David L.",
    role: "Graphic Designer",
    rating: 5
  },
  {
    quote: "Our HR department uses PDF HUB 24 daily for processing employee documents. It's reliable, fast, and the security features give us peace of mind.",
    name: "Jennifer K.",
    role: "HR Manager",
    rating: 5
  },
  {
    quote: "I was skeptical about free tools, but PDF HUB 24 exceeded my expectations. The PDF to Word conversion keeps all my formatting intact.",
    name: "Michael R.",
    role: "Real Estate Agent",
    rating: 5
  }
];

export default function SocialProofSection() {
  const stats = [
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      value: "50K+",
      label: "Happy Users"
    },
    {
      icon: <FileCheck className="w-6 h-6 text-green-500" />,
      value: "1M+",
      label: "PDFs Processed"
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      value: "3s",
      label: "Avg. Processing Time"
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      value: "4.9",
      label: "User Rating"
    },
    {
      icon: <Globe className="w-6 h-6 text-cyan-500" />,
      value: "150+",
      label: "Countries"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
      value: "99%",
      label: "Success Rate"
    }
  ];

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
          className="text-center mb-10"
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 mb-16">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
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
          <h3 className="text-xl sm:text-2xl font-bold mb-3">
            What Our Users Say
          </h3>
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
              <Card className="h-full p-5 sm:p-6">
                <Quote className="w-8 h-8 text-primary/20 mb-3" />
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              Live: 127 users processing PDFs right now
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
