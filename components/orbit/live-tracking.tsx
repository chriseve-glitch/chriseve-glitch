"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navigation,
  Phone,
  MessageCircle,
  Share2,
  Shield,
  Clock,
  MapPin,
  ChevronUp,
  ChevronDown,
  Star,
  Zap,
  AlertCircle,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LiveTrackingProps {
  otp: string;
  driverName: string;
  vehicleNumber: string;
  driverRating: number;
  eta: number; // in seconds
}

// Simulated route coordinates for the shuttle
const routePoints = [
  { x: 12, y: 85 },
  { x: 18, y: 75 },
  { x: 25, y: 65 },
  { x: 35, y: 55 },
  { x: 48, y: 45 },
  { x: 62, y: 38 },
  { x: 75, y: 30 },
  { x: 85, y: 22 },
  { x: 92, y: 15 },
];

export function LiveTracking({
  otp,
  driverName,
  vehicleNumber,
  driverRating,
  eta: initialEta,
}: LiveTrackingProps) {
  const [eta, setEta] = useState(initialEta);
  const [shuttleIndex, setShuttleIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(true);
  const [copied, setCopied] = useState(false);

  // Countdown ETA
  useEffect(() => {
    const timer = setInterval(() => {
      setEta((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Move shuttle along route
  useEffect(() => {
    const moveTimer = setInterval(() => {
      setShuttleIndex((prev) => (prev < routePoints.length - 1 ? prev + 1 : prev));
    }, 3000);
    return () => clearInterval(moveTimer);
  }, []);

  const formatEta = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return { mins, secs };
  };

  const { mins, secs } = formatEta(eta);
  const currentPosition = routePoints[shuttleIndex];

  const handleCopyOtp = () => {
    navigator.clipboard.writeText(otp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Track my Orbit ride",
        text: `I'm on my way! Track my ride: OTP ${otp}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="relative h-full min-h-screen bg-background">
      {/* Map Area */}
      <div className="relative h-[55vh] overflow-hidden bg-secondary/10">
        {/* Grid Background */}
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="trackingGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-border/40"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#trackingGrid)" />
        </svg>

        {/* Animated Route Path */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Route line */}
          <motion.path
            d={`M ${routePoints.map((p) => `${p.x} ${p.y}`).join(" L ")}`}
            stroke="url(#routeGradient)"
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="50%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--primary)" />
            </linearGradient>
          </defs>

          {/* Stop markers */}
          {routePoints.slice(1, -1).map((point, i) => (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="1.2"
              fill="var(--card)"
              stroke={i < shuttleIndex ? "var(--accent)" : "var(--border)"}
              strokeWidth="0.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.2 }}
            />
          ))}
        </svg>

        {/* Rider Location (You) */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute bottom-[10%] left-[8%]"
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute h-8 w-8 rounded-full bg-accent/30"
            />
            <div className="relative h-5 w-5 rounded-full border-3 border-background bg-accent shadow-lg" />
            <span className="mt-1.5 rounded-full bg-card px-2 py-0.5 text-xs font-bold text-foreground shadow-lg">
              You
            </span>
          </div>
        </motion.div>

        {/* Pickup Point */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-[25%] left-[16%]"
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute h-10 w-10 rounded-full bg-primary/20"
            />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-lg">
              <MapPin className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="mt-1.5 whitespace-nowrap rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground shadow-lg">
              Pickup
            </span>
          </div>
        </motion.div>

        {/* Moving Shuttle */}
        <motion.div
          animate={{
            left: `${currentPosition.x}%`,
            bottom: `${100 - currentPosition.y}%`,
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute"
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute -inset-2 rounded-xl bg-foreground/20"
            />
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground shadow-xl">
              <Navigation className="h-5 w-5 -rotate-45 text-background" />
            </div>
          </div>
        </motion.div>

        {/* Destination */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute right-[5%] top-[10%]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent shadow-lg">
            <MapPin className="h-4 w-4 text-accent-foreground" />
          </div>
        </motion.div>

        {/* ETA Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute left-1/2 top-4 flex -translate-x-1/2 items-center gap-2 rounded-full bg-card px-4 py-2 shadow-xl"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="h-2 w-2 rounded-full bg-accent"
          />
          <span className="text-sm font-semibold text-foreground">
            Shuttle arriving in{" "}
            <span className="text-primary">
              {mins}:{secs.toString().padStart(2, "0")}
            </span>
          </span>
        </motion.div>

        {/* Trip Protection */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-accent/90 px-3 py-1.5 shadow-lg"
        >
          <Shield className="h-4 w-4 text-accent-foreground" />
          <span className="text-xs font-semibold text-accent-foreground">Protected</span>
        </motion.div>

        {/* Share Location Button */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={handleShare}
          className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 shadow-lg"
        >
          <Share2 className="h-4 w-4 text-foreground" />
          <span className="text-xs font-semibold text-foreground">Share</span>
        </motion.button>
      </div>

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="relative -mt-6 min-h-[50vh] rounded-t-3xl bg-background"
        style={{ boxShadow: "0 -10px 40px rgba(0,0,0,0.3)" }}
      >
        {/* Handle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex w-full items-center justify-center py-3"
        >
          <div className="h-1.5 w-12 rounded-full bg-muted" />
        </button>

        <div className="px-4 pb-8">
          {/* OTP Card - Always Visible */}
          <Card className="mb-4 border-2 border-primary bg-card shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Boarding OTP
                    </p>
                    <p className="text-2xl font-bold tracking-widest text-primary">
                      {otp}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCopyOtp}
                  className="flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1.5 text-sm font-medium text-primary"
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <div className="mt-3 flex items-start gap-2 rounded-lg bg-accent/10 p-2">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p className="text-xs text-muted-foreground">
                  Share this OTP with the driver when boarding to verify your identity
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Toggle Details */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mb-4 flex w-full items-center justify-center gap-1 text-sm text-muted-foreground"
          >
            {showDetails ? (
              <>
                <span>Hide details</span>
                <ChevronDown className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Show details</span>
                <ChevronUp className="h-4 w-4" />
              </>
            )}
          </button>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {/* Driver Info */}
                <Card className="mb-4 border border-border bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-14 w-14 border-2 border-primary">
                            <AvatarImage src="/placeholder-avatar.jpg" />
                            <AvatarFallback className="bg-secondary text-lg font-bold">
                              {driverName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent shadow-lg"
                          >
                            <Zap className="h-3 w-3 text-accent-foreground" />
                          </motion.div>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-foreground">
                            {driverName}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              <span className="font-semibold text-foreground">
                                {driverRating}
                              </span>
                            </div>
                            <span className="text-muted-foreground">•</span>
                            <span className="font-mono text-sm text-muted-foreground">
                              {vehicleNumber}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary"
                        >
                          <MessageCircle className="h-5 w-5 text-foreground" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-accent"
                        >
                          <Phone className="h-5 w-5 text-accent-foreground" />
                        </motion.button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline Mini */}
                <Card className="border border-border bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        <div className="h-8 w-0.5 bg-border" />
                        <div className="h-3 w-3 rounded-full border-2 border-accent bg-card" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <p className="font-semibold text-foreground">
                            HSR Layout BDA Complex
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Pickup Point • 3 min walk
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            Manyata Tech Park
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Destination • ~45 min
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Emergency Button */}
          <Button
            variant="outline"
            className="mt-4 w-full border-destructive/50 text-destructive hover:bg-destructive/10"
          >
            <AlertCircle className="mr-2 h-4 w-4" />
            Emergency SOS
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
