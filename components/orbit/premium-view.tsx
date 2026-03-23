"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Crown,
  Check,
  Zap,
  Clock,
  Shield,
  Star,
  Users,
  Leaf,
  Gift,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: 99,
    period: "month",
    savings: null,
    popular: false,
  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: 249,
    period: "3 months",
    savings: "Save ₹48",
    popular: true,
  },
  {
    id: "yearly",
    name: "Yearly",
    price: 799,
    period: "year",
    savings: "Save ₹389",
    popular: false,
  },
];

const premiumFeatures = [
  {
    icon: Zap,
    title: "Priority Booking",
    description: "Jump the queue during peak hours and high-demand routes",
  },
  {
    icon: Shield,
    title: "No Surge Pricing",
    description: "Locked prices even during rain, traffic, or rush hour",
  },
  {
    icon: Clock,
    title: "Extended Hold Time",
    description: "Shuttles wait 2 extra minutes at your pickup point",
  },
  {
    icon: Star,
    title: "Premium Support",
    description: "24/7 priority customer support via chat & call",
  },
  {
    icon: Users,
    title: "Guest Passes",
    description: "Share 3 free rides monthly with friends & family",
  },
  {
    icon: Leaf,
    title: "Carbon Offset",
    description: "We plant a tree for every 10 trips you take",
  },
];

const exclusivePerks = [
  { label: "5% extra cashback on all rides", icon: Gift },
  { label: "Early access to new routes", icon: ChevronRight },
  { label: "Exclusive seat selection", icon: Users },
  { label: "Free ride cancellation", icon: Shield },
];

interface PremiumViewProps {
  onBack?: () => void;
}

export function PremiumView({ onBack }: PremiumViewProps) {
  const [selectedPlan, setSelectedPlan] = useState("quarterly");

  return (
    <div className="space-y-6 pb-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-accent/80 p-6"
      >
        {/* Animated circles */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ repeat: Infinity, duration: 5, delay: 1 }}
          className="absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-white"
        />

        <div className="relative">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm"
          >
            <Crown className="h-8 w-8 text-white" />
          </motion.div>

          <h1 className="mb-2 text-3xl font-bold text-white">Orbit Premium</h1>
          <p className="mb-4 text-white/80">
            Unlock the ultimate commuting experience with exclusive benefits
          </p>

          <div className="flex flex-wrap gap-2">
            {["No Surge", "Priority", "5% Cashback"].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Plan Selection */}
      <div>
        <h2 className="mb-4 text-lg font-bold text-foreground">Choose Your Plan</h2>
        <div className="grid gap-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer border-2 transition-all ${
                  selectedPlan === plan.id
                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                    : "border-border bg-card hover:border-primary/30"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <CardContent className="relative flex items-center justify-between p-4">
                  {plan.popular && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 left-4 rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground"
                    >
                      MOST POPULAR
                    </motion.div>
                  )}

                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={selectedPlan === plan.id ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                        selectedPlan === plan.id
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}
                    >
                      {selectedPlan === plan.id && (
                        <Check className="h-4 w-4 text-primary-foreground" />
                      )}
                    </motion.div>
                    <div>
                      <p className="font-semibold text-foreground">{plan.name}</p>
                      {plan.savings && (
                        <p className="text-sm font-medium text-accent">{plan.savings}</p>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">₹{plan.price}</p>
                    <p className="text-sm text-muted-foreground">/{plan.period}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Premium Features */}
      <div>
        <h2 className="mb-4 text-lg font-bold text-foreground">Premium Benefits</h2>
        <div className="grid gap-3">
          {premiumFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.08 }}
            >
              <Card className="border border-border bg-card">
                <CardContent className="flex items-start gap-4 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Exclusive Perks */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border border-accent/30 bg-accent/10">
          <CardContent className="p-4">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <h3 className="font-semibold text-foreground">Exclusive Perks</h3>
            </div>
            <div className="space-y-3">
              {exclusivePerks.map((perk, i) => (
                <motion.div
                  key={perk.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent">
                    <Check className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <span className="text-sm text-foreground">{perk.label}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-3"
      >
        <Button className="w-full bg-primary py-7 text-lg font-bold text-primary-foreground shadow-xl shadow-primary/30 hover:bg-primary/90">
          <Crown className="mr-2 h-5 w-5" />
          Start Premium - ₹{plans.find((p) => p.id === selectedPlan)?.price}/
          {plans.find((p) => p.id === selectedPlan)?.period}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Cancel anytime. 7-day free trial for first-time subscribers.
        </p>
      </motion.div>

      {/* Comparison Link */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex w-full items-center justify-center gap-2 text-sm text-primary hover:underline"
      >
        Compare Free vs Premium
        <ArrowRight className="h-4 w-4" />
      </motion.button>
    </div>
  );
}
