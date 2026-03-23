"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Users,
  Clock,
  Zap,
  ChevronRight,
  Bell,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

interface ShuttleCluster {
  id: string;
  from: string;
  to: string;
  seatsFilled: number;
  totalSeats: number;
  timeLeft: number;
  price: number;
  originalPrice: number;
  departureTime: string;
  isHot: boolean;
}

const mockClusters: ShuttleCluster[] = [
  {
    id: "1",
    from: "HSR Layout",
    to: "Manyata Tech Park",
    seatsFilled: 8,
    totalSeats: 10,
    timeLeft: 180,
    price: 79,
    originalPrice: 129,
    departureTime: "8:30 AM",
    isHot: true,
  },
  {
    id: "2",
    from: "Koramangala",
    to: "Whitefield",
    seatsFilled: 9,
    totalSeats: 12,
    timeLeft: 300,
    price: 99,
    originalPrice: 149,
    departureTime: "9:00 AM",
    isHot: true,
  },
  {
    id: "3",
    from: "Indiranagar",
    to: "Electronic City",
    seatsFilled: 4,
    totalSeats: 8,
    timeLeft: 480,
    price: 119,
    originalPrice: 149,
    departureTime: "8:45 AM",
    isHot: false,
  },
  {
    id: "4",
    from: "JP Nagar",
    to: "Outer Ring Road",
    seatsFilled: 2,
    totalSeats: 10,
    timeLeft: 720,
    price: 89,
    originalPrice: 109,
    departureTime: "9:15 AM",
    isHot: false,
  },
];

interface RiderHomeProps {
  onSelectCluster: (cluster: ShuttleCluster) => void;
}

function CountdownTimer({ seconds }: { seconds: number }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const isUrgent = mins < 5;

  return (
    <motion.div
      animate={isUrgent ? { scale: [1, 1.05, 1] } : {}}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-semibold ${
        isUrgent
          ? "bg-destructive/20 text-destructive"
          : "bg-primary/20 text-primary"
      }`}
    >
      <Clock className="h-3.5 w-3.5" />
      <span className="tabular-nums">
        {mins}:{secs.toString().padStart(2, "0")}
      </span>
    </motion.div>
  );
}

export function RiderHome({ onSelectCluster }: RiderHomeProps) {
  const [checkInTomorrow, setCheckInTomorrow] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const fillPercent = (cluster: ShuttleCluster) =>
    (cluster.seatsFilled / cluster.totalSeats) * 100;

  return (
    <div className="space-y-6 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{greeting}</p>
          <h1 className="text-2xl font-bold text-foreground">
            Ready to commute?
          </h1>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="relative rounded-full bg-secondary p-2.5 transition-colors hover:bg-secondary/80"
        >
          <Bell className="h-5 w-5 text-foreground" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-primary shadow-lg shadow-primary/50"
          />
        </motion.button>
      </div>

      {/* Search Bar */}
      <motion.div
        animate={{ scale: searchFocus ? 1.02 : 1 }}
        transition={{ type: "spring", bounce: 0.3 }}
      >
        <Card className="border-2 border-border bg-card shadow-lg shadow-primary/5 transition-all hover:border-primary/30">
          <CardContent className="p-0">
            <button
              className="flex w-full items-center gap-3 p-4"
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
            >
              <motion.div
                whileHover={{ rotate: 15 }}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30"
              >
                <Search className="h-5 w-5 text-primary-foreground" />
              </motion.div>
              <div className="flex-1 text-left">
                <p className="text-sm text-muted-foreground">
                  Where are you heading?
                </p>
                <p className="font-semibold text-foreground">Home to Office</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Check-In Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border border-accent/40 bg-accent/10 shadow-lg shadow-accent/10">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={checkInTomorrow ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent shadow-lg shadow-accent/30"
              >
                <Zap className="h-5 w-5 text-accent-foreground" />
              </motion.div>
              <div>
                <p className="font-semibold text-foreground">
                  Check-in for Tomorrow
                </p>
                <p className="text-sm text-muted-foreground">
                  Lock better prices early
                </p>
              </div>
            </div>
            <Switch
              checked={checkInTomorrow}
              onCheckedChange={setCheckInTomorrow}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Live Stats Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="h-2 w-2 rounded-full bg-accent"
          />
          <span className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">247</span> riders
            nearby
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="h-4 w-4 text-accent" />
          <span className="text-muted-foreground">
            <span className="font-semibold text-accent">12%</span> cheaper than
            usual
          </span>
        </div>
      </motion.div>

      {/* Shuttles Forming Now */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-foreground">
              Shuttles Forming
            </h2>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="rounded-full bg-destructive/20 px-2 py-0.5 text-xs font-semibold text-destructive"
            >
              LIVE
            </motion.span>
          </div>
          <button className="text-sm font-medium text-primary hover:underline">
            View all
          </button>
        </div>

        <AnimatePresence>
          <div className="space-y-3">
            {mockClusters.map((cluster, index) => (
              <motion.div
                key={cluster.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Card
                  className={`cursor-pointer border bg-card transition-all hover:shadow-xl ${
                    cluster.isHot
                      ? "border-primary/50 shadow-lg shadow-primary/10"
                      : "border-border hover:border-primary/30"
                  }`}
                  onClick={() => onSelectCluster(cluster)}
                >
                  <CardContent className="p-4">
                    {/* Hot Badge */}
                    {cluster.isHot && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-2.5 py-1 text-xs font-semibold text-primary"
                      >
                        <Sparkles className="h-3 w-3" />
                        FILLING FAST
                      </motion.div>
                    )}

                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                            cluster.isHot
                              ? "bg-primary shadow-lg shadow-primary/30"
                              : "bg-primary/20"
                          }`}
                        >
                          <MapPin
                            className={`h-5 w-5 ${
                              cluster.isHot
                                ? "text-primary-foreground"
                                : "text-primary"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {cluster.from}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            to {cluster.to}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-bold text-primary">
                            ₹{cluster.price}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{cluster.originalPrice}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {cluster.departureTime}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative mb-3">
                      <Progress
                        value={fillPercent(cluster)}
                        className="h-2.5"
                      />
                      {fillPercent(cluster) >= 80 && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-primary/20"
                          animate={{ opacity: [0, 0.5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>
                          <span className="font-semibold text-foreground">
                            {cluster.seatsFilled}
                          </span>
                          /{cluster.totalSeats} seats
                        </span>
                      </div>
                      <CountdownTimer seconds={cluster.timeLeft} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
