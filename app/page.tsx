"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav } from "@/components/orbit/bottom-nav";
import { ModeToggle } from "@/components/orbit/mode-toggle";
import { RiderHome } from "@/components/orbit/rider-home";
import { ActiveTrip } from "@/components/orbit/active-trip";
import { DriverDashboard } from "@/components/orbit/driver-dashboard";
import { DigitalTicket } from "@/components/orbit/digital-ticket";
import { WalletView } from "@/components/orbit/wallet-view";
import { ProfileView } from "@/components/orbit/profile-view";
import { PremiumView } from "@/components/orbit/premium-view";

type ViewState = "home" | "active-trip" | "trips" | "wallet" | "profile" | "premium";

export default function OrbitApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [isDriverMode, setIsDriverMode] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>("home");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "home") {
      setCurrentView("home");
    } else if (tab === "trips") {
      setCurrentView("trips");
    } else if (tab === "wallet") {
      setCurrentView("wallet");
    } else if (tab === "profile") {
      setCurrentView("profile");
    }
  };

  const handleSelectCluster = () => {
    setCurrentView("active-trip");
  };

  const handleBackFromTrip = () => {
    setCurrentView("home");
    setActiveTab("home");
  };

  const handleOpenPremium = () => {
    setCurrentView("premium");
  };

  const handleBackFromPremium = () => {
    setCurrentView("wallet");
    setActiveTab("wallet");
  };

  // Show active trip view without bottom nav
  if (currentView === "active-trip") {
    return (
      <div className="mx-auto min-h-screen max-w-[450px] bg-background">
        <ActiveTrip onBack={handleBackFromTrip} />
      </div>
    );
  }

  // Show premium view
  if (currentView === "premium") {
    return (
      <div className="mx-auto min-h-screen max-w-[450px] bg-background">
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-3 p-4">
            <button
              onClick={handleBackFromPremium}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-foreground"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className="text-lg font-bold text-foreground">Orbit Premium</span>
          </div>
        </header>
        <main className="px-4 pb-8 pt-4">
          <PremiumView onBack={handleBackFromPremium} />
        </main>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-[450px] bg-background">
      {/* Header with Mode Toggle */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
              </svg>
            </div>
            <span className="text-xl font-bold text-foreground">Orbit</span>
          </div>

          {/* Mode Toggle */}
          <ModeToggle
            isDriverMode={isDriverMode}
            onToggle={() => setIsDriverMode(!isDriverMode)}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-24 pt-4">
        <AnimatePresence mode="wait">
          {activeTab === "home" && !isDriverMode && (
            <motion.div
              key="rider-home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <RiderHome onSelectCluster={handleSelectCluster} />
            </motion.div>
          )}

          {activeTab === "home" && isDriverMode && (
            <motion.div
              key="driver-dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <DriverDashboard />
            </motion.div>
          )}

          {activeTab === "trips" && (
            <motion.div
              key="trips"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <DigitalTicket />
            </motion.div>
          )}

          {activeTab === "wallet" && (
            <motion.div
              key="wallet"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <WalletView onOpenPremium={handleOpenPremium} />
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ProfileView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
