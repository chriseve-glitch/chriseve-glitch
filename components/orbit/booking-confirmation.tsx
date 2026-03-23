"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Copy,
  Shield,
  Clock,
  MapPin,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface BookingConfirmationProps {
  onContinue: () => void;
  otp: string;
  bookingDetails: {
    from: string;
    to: string;
    departureTime: string;
    price: number;
    seats: number;
  };
}

export function BookingConfirmation({
  onContinue,
  otp,
  bookingDetails,
}: BookingConfirmationProps) {
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSuccess(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(otp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background px-4 py-8">
      {/* Success Animation */}
      <div className="mb-8 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="relative mb-6"
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: 3, duration: 0.5 }}
            className="absolute inset-0 rounded-full bg-accent/30"
          />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-accent shadow-2xl shadow-accent/50">
            <CheckCircle2 className="h-12 w-12 text-accent-foreground" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-2 text-2xl font-bold text-foreground"
        >
          Booking Confirmed!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center text-muted-foreground"
        >
          Your seat has been reserved. Share OTP with driver when boarding.
        </motion.p>
      </div>

      {/* OTP Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="mb-6 overflow-hidden border-2 border-primary bg-card shadow-2xl shadow-primary/20">
          <CardContent className="p-0">
            {/* OTP Section */}
            <div className="bg-primary/10 p-6 text-center">
              <div className="mb-2 flex items-center justify-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  Boarding OTP
                </span>
              </div>

              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="mb-4 flex items-center justify-center gap-3"
              >
                {otp.split("").map((digit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex h-16 w-14 items-center justify-center rounded-xl border-2 border-primary bg-card text-3xl font-bold text-primary shadow-lg"
                  >
                    {digit}
                  </motion.div>
                ))}
              </motion.div>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/30"
              >
                <Copy className="h-4 w-4" />
                {copied ? "Copied!" : "Copy OTP"}
              </button>
            </div>

            {/* Trip Details */}
            <div className="p-6">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Route</p>
                  <p className="font-semibold text-foreground">
                    {bookingDetails.from} → {bookingDetails.to}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-secondary p-3 text-center">
                  <Clock className="mx-auto mb-1 h-5 w-5 text-muted-foreground" />
                  <p className="text-sm font-semibold text-foreground">
                    {bookingDetails.departureTime}
                  </p>
                  <p className="text-xs text-muted-foreground">Departure</p>
                </div>
                <div className="rounded-xl bg-secondary p-3 text-center">
                  <Users className="mx-auto mb-1 h-5 w-5 text-muted-foreground" />
                  <p className="text-sm font-semibold text-foreground">
                    {bookingDetails.seats}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {bookingDetails.seats === 1 ? "Seat" : "Seats"}
                  </p>
                </div>
                <div className="rounded-xl bg-primary/10 p-3 text-center">
                  <Sparkles className="mx-auto mb-1 h-5 w-5 text-primary" />
                  <p className="text-sm font-semibold text-primary">
                    ₹{bookingDetails.price}
                  </p>
                  <p className="text-xs text-muted-foreground">Paid</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Important Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-6 rounded-xl border border-accent/30 bg-accent/10 p-4"
      >
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <div>
            <p className="font-semibold text-foreground">
              Keep your OTP safe
            </p>
            <p className="text-sm text-muted-foreground">
              The driver will ask for this 4-digit OTP when you board. It
              verifies your identity and starts your trip protection.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-auto"
      >
        <Button
          onClick={onContinue}
          className="w-full bg-primary py-6 text-lg font-bold text-primary-foreground shadow-xl shadow-primary/30 hover:bg-primary/90"
        >
          Track Your Ride
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
}
