import { motion } from "framer-motion";
import { Users, FileCheck, Clock, Star, TrendingUp, Globe } from "lucide-react";
import { useEffect, useState } from "react";

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
    <section className="py-12 sm:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Trusted by Thousands Worldwide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join millions of users who trust PDF HUB 24 for their document needs
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
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
