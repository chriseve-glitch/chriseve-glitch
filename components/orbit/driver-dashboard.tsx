"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Power,
  IndianRupee,
  Users,
  Fuel,
  MapPin,
  Navigation,
  ChevronRight,
  Plus,
  Clock,
  TrendingUp,
  Leaf,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface VirtualStop {
  id: string;
  location: string;
  passengers: number;
  time: string;
  status: "upcoming" | "current" | "completed";
}

const mockStops: VirtualStop[] = [
  {
    id: "1",
    location: "HSR Layout 27th Main",
    passengers: 3,
    time: "8:30 AM",
    status: "completed",
  },
  {
    id: "2",
    location: "Koramangala 4th Block",
    passengers: 2,
    time: "8:42 AM",
    status: "current",
  },
  {
    id: "3",
    location: "Domlur Junction",
    passengers: 4,
    time: "8:55 AM",
    status: "upcoming",
  },
  {
    id: "4",
    location: "Manyata Tech Park Gate 2",
    passengers: 0,
    time: "9:15 AM",
    status: "upcoming",
  },
];

export function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [earnings, setEarnings] = useState(2450);

  useEffect(() => {
    if (isOnline) {
      const timer = setInterval(() => {
        setEarnings((prev) => prev + Math.floor(Math.random() * 50));
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isOnline]);

  return (
    <div className="space-y-6 pb-4">
      {/* Online Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card
          className={`border-2 transition-all duration-300 ${
            isOnline
              ? "border-accent bg-accent/10 shadow-xl shadow-accent/20"
              : "border-border bg-card"
          }`}
        >
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <motion.div
                animate={
                  isOnline
                    ? {
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(52, 211, 153, 0)",
                          "0 0 20px 10px rgba(52, 211, 153, 0.3)",
                          "0 0 0 0 rgba(52, 211, 153, 0)",
                        ],
                      }
                    : {}
                }
                transition={{ repeat: isOnline ? Infinity : 0, duration: 2 }}
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                  isOnline ? "bg-accent" : "bg-secondary"
                }`}
              >
                <Power
                  className={`h-8 w-8 ${
                    isOnline ? "text-accent-foreground" : "text-muted-foreground"
                  }`}
                />
              </motion.div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {isOnline ? "You're Online" : "Go Online"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isOnline ? "Accepting trip requests" : "Start earning now"}
                </p>
              </div>
            </div>
            <Switch
              checked={isOnline}
              onCheckedChange={setIsOnline}
              className="scale-150"
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Earnings Glance */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border border-border bg-card shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                <IndianRupee className="h-6 w-6 text-primary" />
              </div>
              <motion.p
                key={earnings}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold text-foreground"
              >
                ₹{earnings.toLocaleString()}
              </motion.p>
              <div className="flex items-center justify-center gap-1 text-xs text-accent">
                <TrendingUp className="h-3 w-3" />
                <span>+18%</span>
              </div>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="border border-border bg-card shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <p className="text-2xl font-bold text-foreground">28</p>
              <p className="text-xs text-muted-foreground">Seats Filled</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border border-border bg-card shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                <Fuel className="h-6 w-6 text-accent" />
              </div>
              <p className="text-2xl font-bold text-foreground">12.4</p>
              <p className="text-xs text-muted-foreground">km/l avg</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ESG Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Card className="border border-accent/30 bg-accent/10">
          <CardContent className="flex items-center gap-4 p-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent shadow-lg shadow-accent/30"
            >
              <Leaf className="h-6 w-6 text-accent-foreground" />
            </motion.div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">
                Eco Champion Status
              </p>
              <p className="text-sm text-muted-foreground">
                You've saved 48 kg CO₂ this week
              </p>
            </div>
            <div className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
              Top 5%
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Current Manifest */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Today's Route</h2>
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="rounded-full bg-primary/20 px-3 py-1 text-sm font-semibold text-primary"
          >
            9 passengers
          </motion.span>
        </div>

        <Card className="border border-border bg-card shadow-lg">
          <CardContent className="p-4">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute bottom-4 left-[22px] top-4 w-0.5 bg-border" />

              <AnimatePresence>
                {mockStops.map((stop, index) => (
                  <motion.div
                    key={stop.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`relative flex items-start gap-4 ${
                      index !== mockStops.length - 1 ? "pb-6" : ""
                    }`}
                  >
                    {/* Timeline dot */}
                    <motion.div
                      animate={
                        stop.status === "current"
                          ? { scale: [1, 1.2, 1] }
                          : {}
                      }
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-xl shadow-lg ${
                        stop.status === "completed"
                          ? "bg-accent shadow-accent/30"
                          : stop.status === "current"
                          ? "bg-primary shadow-primary/30"
                          : "bg-secondary"
                      }`}
                    >
                      {stop.status === "completed" ? (
                        <CheckCircle2 className="h-5 w-5 text-accent-foreground" />
                      ) : stop.status === "current" ? (
                        <MapPin className="h-5 w-5 text-primary-foreground" />
                      ) : (
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      )}
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p
                            className={`font-semibold ${
                              stop.status === "completed"
                                ? "text-muted-foreground"
                                : "text-foreground"
                            }`}
                          >
                            {stop.location}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{stop.time}</span>
                            {stop.passengers > 0 && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {stop.passengers}{" "}
                                  {stop.status === "completed"
                                    ? "picked up"
                                    : "waiting"}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        {stop.status === "current" && (
                          <Button
                            size="sm"
                            className="bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90"
                          >
                            <Navigation className="mr-1 h-4 w-4" />
                            Navigate
                          </Button>
                        )}
                        {stop.status === "upcoming" && (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Register New Vehicle CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.01 }}
      >
        <Card className="cursor-pointer border-2 border-dashed border-primary/50 bg-primary/5 transition-colors hover:border-primary hover:bg-primary/10">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
              <Plus className="h-7 w-7 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-foreground">
                Add Another Vehicle
              </p>
              <p className="text-sm text-muted-foreground">
                Expand your fleet and earn more
              </p>
            </div>
            <ChevronRight className="h-6 w-6 text-primary" />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
