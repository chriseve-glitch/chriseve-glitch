"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  User,
  Shield,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Passenger {
  id: string;
  name: string;
  avatar?: string;
  seats: number;
  pickupLocation: string;
  verified: boolean;
}

interface DriverOtpVerifyProps {
  onBack: () => void;
  onVerifyComplete: (passengerId: string) => void;
}

const mockPassengers: Passenger[] = [
  {
    id: "1",
    name: "Priya Sharma",
    seats: 1,
    pickupLocation: "HSR Layout 27th Main",
    verified: true,
  },
  {
    id: "2",
    name: "Amit Kumar",
    seats: 2,
    pickupLocation: "HSR Layout 27th Main",
    verified: false,
  },
  {
    id: "3",
    name: "Sneha Reddy",
    seats: 1,
    pickupLocation: "Koramangala 4th Block",
    verified: false,
  },
];

export function DriverOtpVerify({ onBack, onVerifyComplete }: DriverOtpVerifyProps) {
  const [selectedPassenger, setSelectedPassenger] = useState<Passenger | null>(null);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<"success" | "error" | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Mock correct OTP for demo
  const correctOtp = "4829";

  useEffect(() => {
    if (selectedPassenger && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [selectedPassenger]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits entered
    if (newOtp.every((digit) => digit !== "") && newOtp.join("").length === 4) {
      verifyOtp(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = async (enteredOtp: string) => {
    setVerifying(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    if (enteredOtp === correctOtp) {
      setVerifyResult("success");
      setTimeout(() => {
        if (selectedPassenger) {
          onVerifyComplete(selectedPassenger.id);
        }
        resetVerification();
      }, 1500);
    } else {
      setVerifyResult("error");
      setTimeout(() => {
        setVerifyResult(null);
        setOtp(["", "", "", ""]);
        inputRefs.current[0]?.focus();
      }, 1500);
    }
    setVerifying(false);
  };

  const resetVerification = () => {
    setSelectedPassenger(null);
    setOtp(["", "", "", ""]);
    setVerifyResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={selectedPassenger ? resetVerification : onBack}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <div>
            <h1 className="font-semibold text-foreground">
              {selectedPassenger ? "Verify OTP" : "Passenger Check-in"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {selectedPassenger
                ? `Verifying ${selectedPassenger.name}`
                : "Tap to verify boarding"}
            </p>
          </div>
        </div>
      </header>

      <div className="p-4">
        <AnimatePresence mode="wait">
          {!selectedPassenger ? (
            <motion.div
              key="passenger-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {/* Instructions */}
              <Card className="mb-4 border border-primary/30 bg-primary/10">
                <CardContent className="flex items-start gap-3 p-4">
                  <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Verify each passenger
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Ask passengers for their 4-digit OTP before they board.
                      This ensures safety for everyone.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Passenger List */}
              <h2 className="mb-3 font-semibold text-foreground">
                Waiting to Board
              </h2>
              {mockPassengers.map((passenger, index) => (
                <motion.div
                  key={passenger.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`cursor-pointer border transition-all ${
                      passenger.verified
                        ? "border-accent/50 bg-accent/10"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                    onClick={() => !passenger.verified && setSelectedPassenger(passenger)}
                  >
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-secondary">
                          <AvatarImage src={passenger.avatar} />
                          <AvatarFallback className="bg-secondary text-foreground">
                            {passenger.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {passenger.verified && (
                          <div className="absolute -bottom-1 -right-1 rounded-full bg-accent p-0.5">
                            <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold text-foreground">
                          {passenger.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {passenger.pickupLocation}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="rounded bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground">
                            {passenger.seats}{" "}
                            {passenger.seats === 1 ? "seat" : "seats"}
                          </span>
                          {passenger.verified && (
                            <span className="rounded bg-accent/20 px-1.5 py-0.5 text-xs font-medium text-accent">
                              Verified
                            </span>
                          )}
                        </div>
                      </div>

                      {!passenger.verified && (
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Verify
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="otp-input"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center pt-8"
            >
              {/* Passenger Info */}
              <Avatar className="mb-4 h-20 w-20 border-4 border-primary">
                <AvatarImage src={selectedPassenger.avatar} />
                <AvatarFallback className="bg-secondary text-2xl font-bold text-foreground">
                  {selectedPassenger.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <h2 className="mb-1 text-xl font-bold text-foreground">
                {selectedPassenger.name}
              </h2>
              <p className="mb-8 text-muted-foreground">
                {selectedPassenger.seats}{" "}
                {selectedPassenger.seats === 1 ? "seat" : "seats"} reserved
              </p>

              {/* OTP Input */}
              <div className="mb-8">
                <p className="mb-4 text-center text-sm text-muted-foreground">
                  Enter the 4-digit OTP from passenger
                </p>

                <div className="flex gap-3">
                  {otp.map((digit, index) => (
                    <motion.div
                      key={index}
                      animate={
                        verifyResult === "error"
                          ? { x: [-5, 5, -5, 5, 0] }
                          : {}
                      }
                      transition={{ duration: 0.3 }}
                    >
                      <input
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        type="number"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        disabled={verifying || verifyResult === "success"}
                        className={`h-16 w-14 rounded-xl border-2 bg-card text-center text-2xl font-bold text-foreground outline-none transition-all ${
                          verifyResult === "success"
                            ? "border-accent bg-accent/10"
                            : verifyResult === "error"
                            ? "border-destructive bg-destructive/10"
                            : "border-border focus:border-primary"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <AnimatePresence>
                {verifying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Verifying...</span>
                  </motion.div>
                )}

                {verifyResult === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                      <CheckCircle2 className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <p className="font-semibold text-accent">OTP Verified!</p>
                  </motion.div>
                )}

                {verifyResult === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/20">
                      <XCircle className="h-8 w-8 text-destructive" />
                    </div>
                    <p className="font-semibold text-destructive">
                      Invalid OTP. Try again.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Cancel Button */}
              {!verifying && !verifyResult && (
                <Button
                  variant="ghost"
                  onClick={resetVerification}
                  className="mt-8 text-muted-foreground"
                >
                  Cancel
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
