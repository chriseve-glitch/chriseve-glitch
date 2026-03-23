"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  Clock,
  Star,
  Phone,
  ChevronLeft,
  Footprints,
  MessageCircle,
  Shield,
  Zap,
  Users,
  Leaf,
  Route,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ActiveTripProps {
  onBack: () => void;
}

// Route stops for the journey visualization
const routeStops = [
  { id: "start", name: "Your Location", type: "user", time: "Now", status: "current" },
  { id: "pickup", name: "HSR Layout Pickup", type: "virtual-stop", time: "3 min walk", status: "next" },
  { id: "stop1", name: "Silk Board Junction", type: "stop", time: "8:45 AM", riders: 2, status: "upcoming" },
  { id: "stop2", name: "Marathahalli Bridge", type: "stop", time: "9:05 AM", riders: 1, status: "upcoming" },
  { id: "stop3", name: "Kundalahalli Gate", type: "stop", time: "9:15 AM", riders: 0, dropoff: 3, status: "upcoming" },
  { id: "end", name: "Manyata Tech Park", type: "destination", time: "9:30 AM", status: "upcoming" },
];

export function ActiveTrip({ onBack }: ActiveTripProps) {
  const [walkingTime, setWalkingTime] = useState(180);
  const [shuttleEta, setShuttleEta] = useState(240);
  const [shuttlePosition, setShuttlePosition] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setWalkingTime((prev) => (prev > 0 ? prev - 1 : 0));
      setShuttleEta((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate shuttle movement
  useEffect(() => {
    const moveTimer = setInterval(() => {
      setShuttlePosition((prev) => {
        const newPos = prev + 0.5;
        return newPos > 85 ? 15 : newPos;
      });
    }, 200);
    return () => clearInterval(moveTimer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Map Area */}
      <div className="relative h-[45vh] overflow-hidden bg-secondary/20">
        {/* Animated grid background */}
        <div className="absolute inset-0">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="mapGrid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-border/50"
                />
              </pattern>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="50%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--primary)" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#mapGrid)" />
          </svg>
        </div>

        {/* Route Path Visualization */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <svg className="h-full w-full max-w-md" viewBox="0 0 400 280" fill="none">
            {/* Main route path - curved line */}
            <motion.path
              d="M 40 220 C 80 200 100 180 140 160 S 200 120 260 100 S 340 60 380 50"
              stroke="url(#routeGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            
            {/* Dashed walking path */}
            <motion.path
              d="M 40 220 Q 60 210 90 195"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeDasharray="6 4"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {/* Intermediate stops on route */}
            {[
              { cx: 140, cy: 160, label: "Silk Board" },
              { cx: 260, cy: 100, label: "Marathahalli" },
              { cx: 340, cy: 65, label: "Kundalahalli" },
            ].map((stop, i) => (
              <motion.g
                key={stop.label}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 + i * 0.2 }}
              >
                <circle
                  cx={stop.cx}
                  cy={stop.cy}
                  r="8"
                  fill="var(--card)"
                  stroke="var(--primary)"
                  strokeWidth="2"
                />
                <circle cx={stop.cx} cy={stop.cy} r="3" fill="var(--primary)" />
              </motion.g>
            ))}
          </svg>

          {/* User Location */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-[25%] left-[8%]"
          >
            <div className="relative flex flex-col items-center">
              <motion.div
                animate={{ scale: [1, 1.8, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute h-8 w-8 rounded-full bg-accent/30"
              />
              <div className="relative h-6 w-6 rounded-full border-3 border-background bg-accent shadow-lg shadow-accent/50" />
              <span className="mt-2 whitespace-nowrap rounded-full bg-card px-2.5 py-1 text-xs font-bold text-foreground shadow-lg">
                You
              </span>
            </div>
          </motion.div>

          {/* Virtual Pickup Stop */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-[35%] left-[20%]"
          >
            <div className="relative flex flex-col items-center">
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute h-14 w-14 rounded-full bg-primary/20"
              />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary shadow-xl shadow-primary/50">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="mt-2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-lg">
                Pickup Point
              </span>
            </div>
          </motion.div>

          {/* Moving Shuttle */}
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute right-[15%] top-[20%]"
            style={{ left: `${shuttlePosition}%` }}
          >
            <div className="relative flex flex-col items-center">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="absolute -inset-2 rounded-xl bg-foreground/20"
              />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground shadow-2xl">
                <Navigation className="h-6 w-6 -rotate-45 text-background" />
              </div>
              <motion.span
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mt-2 whitespace-nowrap rounded-full bg-foreground px-3 py-1 text-xs font-bold text-background shadow-lg"
              >
                {Math.floor(shuttleEta / 60)} min away
              </motion.span>
            </div>
          </motion.div>

          {/* Destination */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute right-[5%] top-[12%]"
          >
            <div className="relative flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent shadow-lg shadow-accent/40">
                <MapPin className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="mt-2 whitespace-nowrap rounded-full bg-card px-2 py-0.5 text-xs font-semibold text-foreground shadow-lg">
                Manyata
              </span>
            </div>
          </motion.div>
        </div>

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-card shadow-xl"
        >
          <ChevronLeft className="h-6 w-6 text-foreground" />
        </motion.button>

        {/* Safety indicator */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-accent/90 px-3 py-1.5 shadow-lg"
        >
          <Shield className="h-4 w-4 text-accent-foreground" />
          <span className="text-xs font-semibold text-accent-foreground">Trip Protected</span>
        </motion.div>

        {/* Live passengers badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-card px-3 py-1.5 shadow-lg"
        >
          <Users className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">8 riders onboard</span>
        </motion.div>

        {/* CO2 saved badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-card px-3 py-1.5 shadow-lg"
        >
          <Leaf className="h-4 w-4 text-accent" />
          <span className="text-xs font-semibold text-foreground">1.2kg CO₂ saved</span>
        </motion.div>
      </div>

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="relative -mt-6 rounded-t-3xl bg-background px-4 pb-8 pt-6"
        style={{ boxShadow: "0 -10px 40px rgba(0,0,0,0.3)" }}
      >
        {/* Handle */}
        <div className="absolute left-1/2 top-3 h-1.5 w-12 -translate-x-1/2 rounded-full bg-muted" />

        {/* Walking Instructions */}
        <Card className="mb-4 border-2 border-primary bg-card shadow-xl shadow-primary/10">
          <CardContent className="p-4">
            <div className="mb-4 flex items-center gap-4">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30"
              >
                <Footprints className="h-7 w-7 text-primary-foreground" />
              </motion.div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Walk to pickup</p>
                <p className="text-lg font-bold text-foreground">HSR Layout BDA Complex</p>
              </div>
              <div className="flex flex-col items-end">
                <motion.div
                  animate={{ scale: walkingTime < 120 ? [1, 1.1, 1] : 1 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className={`rounded-full px-3 py-1.5 text-lg font-bold tabular-nums ${
                    walkingTime < 120
                      ? "bg-destructive/20 text-destructive"
                      : "bg-accent text-accent-foreground"
                  }`}
                >
                  {formatTime(walkingTime)}
                </motion.div>
                <span className="text-xs text-muted-foreground">remaining</span>
              </div>
            </div>
            <Button className="w-full bg-primary py-6 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">
              <Navigation className="mr-2 h-5 w-5" />
              Start Walking Directions
            </Button>
          </CardContent>
        </Card>

        {/* Route Timeline */}
        <Card className="mb-4 border border-border bg-card">
          <CardContent className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <Route className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Route Timeline</h3>
            </div>
            <div className="space-y-0">
              {routeStops.map((stop, index) => (
                <motion.div
                  key={stop.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  className="relative flex items-start gap-3 pb-4"
                >
                  {/* Connector line */}
                  {index < routeStops.length - 1 && (
                    <div
                      className={`absolute left-[11px] top-6 h-full w-0.5 ${
                        stop.status === "current" ? "bg-accent" : "bg-border"
                      }`}
                    />
                  )}
                  
                  {/* Stop indicator */}
                  <div
                    className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      stop.status === "current"
                        ? "bg-accent"
                        : stop.type === "destination"
                        ? "bg-primary"
                        : stop.type === "virtual-stop"
                        ? "border-2 border-primary bg-card"
                        : "border-2 border-border bg-card"
                    }`}
                  >
                    {stop.status === "current" && (
                      <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="absolute h-full w-full rounded-full bg-accent/30"
                      />
                    )}
                    <div
                      className={`h-2 w-2 rounded-full ${
                        stop.status === "current"
                          ? "bg-accent-foreground"
                          : stop.type === "destination"
                          ? "bg-primary-foreground"
                          : "bg-muted-foreground"
                      }`}
                    />
                  </div>
                  
                  {/* Stop info */}
                  <div className="flex-1">
                    <p
                      className={`font-semibold ${
                        stop.status === "current" ? "text-accent" : "text-foreground"
                      }`}
                    >
                      {stop.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{stop.time}</span>
                      {stop.riders !== undefined && stop.riders > 0 && (
                        <span className="rounded bg-primary/20 px-1.5 py-0.5 text-xs text-primary">
                          +{stop.riders} pickup
                        </span>
                      )}
                      {stop.dropoff && (
                        <span className="rounded bg-accent/20 px-1.5 py-0.5 text-xs text-accent">
                          -{stop.dropoff} dropoff
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Driver Info */}
        <Card className="border border-border bg-card">
          <CardContent className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-14 w-14 border-2 border-primary">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="bg-secondary text-lg font-bold text-foreground">
                      RK
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
                  <p className="text-lg font-bold text-foreground">Rajesh Kumar</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-semibold text-foreground">4.9</span>
                    </div>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">1,247 trips</span>
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

            <div className="flex items-center justify-between rounded-2xl bg-secondary p-4">
              <div>
                <p className="text-sm text-muted-foreground">Vehicle</p>
                <p className="font-bold text-foreground">Force Traveller</p>
                <p className="font-mono text-sm text-muted-foreground">KA-01-AB-1234</p>
              </div>
              <div className="text-right">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="flex items-center gap-2 text-primary"
                >
                  <Clock className="h-5 w-5" />
                  <span className="text-2xl font-bold tabular-nums">
                    {Math.floor(shuttleEta / 60)} min
                  </span>
                </motion.div>
                <p className="text-sm text-muted-foreground">arriving at pickup</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
