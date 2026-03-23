"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  QrCode,
  Star,
  Leaf,
  MapPin,
  Clock,
  Users,
  Sparkles,
  TreeDeciduous,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function DigitalTicket() {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="space-y-6 pb-4">
      {/* QR Ticket Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, rotateX: -10 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        transition={{ type: "spring", bounce: 0.3 }}
        style={{ perspective: 1000 }}
      >
        <Card className="overflow-hidden border-0 bg-card shadow-2xl">
          {/* Header */}
          <div className="relative bg-primary px-5 py-4">
            <motion.div
              className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-foreground/10"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-foreground/70">
                  Boarding Pass
                </p>
                <p className="text-2xl font-bold text-primary-foreground">
                  #ORB-2847
                </p>
              </div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/20"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Perforated edge */}
          <div className="relative h-4 bg-primary">
            <div className="absolute inset-x-0 -bottom-2 flex justify-around">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-4 rounded-full bg-background"
                />
              ))}
            </div>
          </div>

          <CardContent className="p-6 pt-8">
            {/* QR Code */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowQR(!showQR)}
              className="mb-6 w-full"
            >
              <div className="relative mx-auto w-fit rounded-2xl bg-foreground p-5 shadow-xl">
                <motion.div
                  animate={showQR ? { opacity: 0 } : { opacity: 1 }}
                  className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-foreground/90 backdrop-blur-sm"
                >
                  <div className="flex flex-col items-center gap-2 text-background">
                    <QrCode className="h-8 w-8" />
                    <span className="text-sm font-medium">Tap to reveal</span>
                  </div>
                </motion.div>
                {/* QR code pattern */}
                <div className="grid h-40 w-40 grid-cols-10 gap-0.5">
                  {Array.from({ length: 100 }).map((_, i) => {
                    const row = Math.floor(i / 10);
                    const col = i % 10;
                    const isCorner =
                      (row < 3 && col < 3) ||
                      (row < 3 && col >= 7) ||
                      (row >= 7 && col < 3);
                    const isRandom = Math.random() > 0.5;
                    return (
                      <div
                        key={i}
                        className={`h-4 w-4 rounded-[2px] ${
                          isCorner || isRandom
                            ? "bg-background"
                            : "bg-transparent"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.button>

            {/* Ride Details */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-secondary/50 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Route</span>
                </div>
                <span className="font-semibold text-foreground">
                  HSR to Manyata Tech Park
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-secondary/50 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Departure
                  </span>
                </div>
                <span className="font-semibold text-foreground">8:30 AM</span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-secondary/50 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Seat</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary px-3 py-0.5 text-sm font-bold text-primary-foreground">
                    #7
                  </span>
                  <span className="text-sm text-muted-foreground">Window</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-secondary/50 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Driver</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">Rajesh K.</span>
                  <div className="flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="text-xs font-semibold text-primary">
                      4.9
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="rounded-2xl bg-secondary p-4 text-center">
              <p className="mb-1 text-sm text-muted-foreground">Vehicle</p>
              <p className="text-xl font-bold text-foreground">KA-01-AB-1234</p>
              <p className="text-sm text-muted-foreground">
                Force Traveller (White)
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ESG Impact Card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="overflow-hidden border border-accent/40 bg-accent/10 shadow-xl shadow-accent/10">
          <CardContent className="p-6">
            <div className="mb-5 flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent shadow-lg shadow-accent/30"
              >
                <Leaf className="h-7 w-7 text-accent-foreground" />
              </motion.div>
              <div>
                <p className="text-xl font-bold text-foreground">
                  Your Orbit Impact
                </p>
                <p className="text-sm text-muted-foreground">
                  Every ride makes a difference
                </p>
              </div>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl bg-background/60 p-4 text-center shadow-lg"
              >
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="text-3xl font-bold text-accent"
                >
                  2.4 kg
                </motion.p>
                <p className="text-sm text-muted-foreground">CO2 saved today</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl bg-background/60 p-4 text-center shadow-lg"
              >
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="text-3xl font-bold text-accent"
                >
                  142 kg
                </motion.p>
                <p className="text-sm text-muted-foreground">Total this month</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-3 rounded-xl bg-accent/20 p-3"
            >
              <TreeDeciduous className="h-5 w-5 text-accent" />
              <span className="font-medium text-accent">
                Equivalent to planting 6 trees this month
              </span>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Trip History Preview */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border border-border bg-card shadow-lg">
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Recent Trips</h3>
              <button className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                View all
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                {
                  date: "Today",
                  route: "HSR to Manyata",
                  amount: 89,
                  saved: "2.4kg",
                },
                {
                  date: "Yesterday",
                  route: "Manyata to HSR",
                  amount: 89,
                  saved: "2.4kg",
                },
                {
                  date: "Mar 21",
                  route: "HSR to Manyata",
                  amount: 99,
                  saved: "2.1kg",
                },
              ].map((trip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center justify-between rounded-xl bg-secondary/50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {trip.route}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {trip.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">₹{trip.amount}</p>
                    <p className="flex items-center gap-1 text-xs text-accent">
                      <Leaf className="h-3 w-3" />
                      {trip.saved}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
