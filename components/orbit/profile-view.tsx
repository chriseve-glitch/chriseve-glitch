"use client";

import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Star,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Leaf,
  Award,
  Crown,
  Zap,
  Settings,
  Share2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const menuItems = [
  { icon: MapPin, label: "Saved Locations", badge: "3" },
  { icon: Bell, label: "Notifications", badge: "5" },
  { icon: Shield, label: "Safety & Privacy" },
  { icon: Settings, label: "Preferences" },
  { icon: Share2, label: "Invite Friends", highlight: true },
  { icon: HelpCircle, label: "Help & Support" },
  { icon: LogOut, label: "Sign Out", danger: true },
];

const achievements = [
  { icon: "🌱", label: "Eco Warrior", description: "500kg CO₂ saved" },
  { icon: "⭐", label: "5-Star Rider", description: "Perfect rating" },
  { icon: "🎯", label: "Punctual", description: "Always on time" },
  { icon: "🤝", label: "Team Player", description: "50+ shared rides" },
  { icon: "🔥", label: "Streak Master", description: "30 day streak" },
];

export function ProfileView() {
  return (
    <div className="space-y-6 pb-4">
      {/* Profile Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Card className="overflow-hidden border border-border bg-card shadow-xl">
          <div className="relative h-20 bg-primary">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary-foreground/10"
            />
          </div>
          <CardContent className="relative px-6 pb-6">
            <div className="-mt-10 flex items-end gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="relative"
              >
                <Avatar className="h-20 w-20 border-4 border-background shadow-xl">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-primary text-2xl font-bold text-primary-foreground">
                    AS
                  </AvatarFallback>
                </Avatar>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary shadow-lg"
                >
                  <Crown className="h-4 w-4 text-primary-foreground" />
                </motion.div>
              </motion.div>
              <div className="mb-2 flex-1">
                <h2 className="text-xl font-bold text-foreground">
                  Aditya Sharma
                </h2>
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mb-2 rounded-full bg-secondary p-2.5 shadow-lg"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </motion.button>
            </div>

            {/* Rating and Trips */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-bold text-foreground">4.9</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5">
                <span className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">124</span> trips
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5">
                <Leaf className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent">Gold</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="border border-accent/40 bg-accent/10 shadow-xl shadow-accent/10">
            <CardContent className="p-5">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent shadow-lg shadow-accent/30"
              >
                <Leaf className="h-6 w-6 text-accent-foreground" />
              </motion.div>
              <p className="text-3xl font-bold text-foreground">847 kg</p>
              <p className="text-sm text-muted-foreground">CO₂ saved total</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="border border-primary/40 bg-primary/10 shadow-xl shadow-primary/10">
            <CardContent className="p-5">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30"
              >
                <Award className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <p className="text-3xl font-bold text-foreground">Gold</p>
              <p className="text-sm text-muted-foreground">Member tier</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tier Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border border-border bg-card shadow-lg">
          <CardContent className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">
                  Platinum Progress
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                26 trips to go
              </span>
            </div>
            <Progress value={68} className="h-3" />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Gold (124 trips)</span>
              <span>Platinum (150 trips)</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements */}
      <Card className="border border-border bg-card shadow-lg">
        <CardContent className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">Achievements</h3>
            <span className="rounded-full bg-primary/20 px-2.5 py-1 text-xs font-semibold text-primary">
              5/12
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {achievements.map((badge, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.08, type: "spring" }}
                whileHover={{ y: -5 }}
                className="flex min-w-[90px] flex-col items-center gap-2"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-3xl shadow-lg">
                  {badge.icon}
                </div>
                <span className="whitespace-nowrap text-xs font-semibold text-foreground">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <Card className="border border-border bg-card shadow-lg">
        <CardContent className="divide-y divide-border p-0">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + index * 0.04 }}
              whileHover={{ opacity: 0.9 }}
              className={`flex w-full items-center justify-between p-4 transition-colors ${
                item.highlight ? "bg-primary/5" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-sm ${
                    item.danger
                      ? "bg-destructive/10"
                      : item.highlight
                      ? "bg-primary/20"
                      : "bg-secondary"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 ${
                      item.danger
                        ? "text-destructive"
                        : item.highlight
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium ${
                    item.danger
                      ? "text-destructive"
                      : item.highlight
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {item.badge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold text-primary-foreground"
                  >
                    {item.badge}
                  </motion.span>
                )}
                {item.highlight && (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
                    ₹200
                  </span>
                )}
                <ChevronRight
                  className={`h-5 w-5 ${
                    item.danger ? "text-destructive" : "text-muted-foreground"
                  }`}
                />
              </div>
            </motion.button>
          ))}
        </CardContent>
      </Card>

      {/* Version */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-sm text-muted-foreground"
      >
        Orbit v2.4.1
      </motion.p>
    </div>
  );
}
