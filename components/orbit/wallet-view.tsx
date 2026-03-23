"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Gift,
  Sparkles,
  ChevronRight,
  Zap,
  Banknote,
  QrCode,
  Check,
  Crown,
  Star,
  Settings,
  Building2,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// UPI apps commonly used in India
const upiApps = [
  { id: "gpay", name: "Google Pay", color: "#4285F4", initial: "G" },
  { id: "phonepe", name: "PhonePe", color: "#5F259F", initial: "P" },
  { id: "paytm", name: "Paytm", color: "#00BAF2", initial: "₱" },
  { id: "bhim", name: "BHIM UPI", color: "#00A651", initial: "B" },
];

const paymentMethods = [
  { id: "upi", label: "UPI", icon: QrCode, description: "Pay via any UPI app" },
  { id: "wallet", label: "Orbit Wallet", icon: Wallet, description: "Use wallet balance" },
  { id: "cash", label: "Cash", icon: Banknote, description: "Pay driver directly" },
  { id: "card", label: "Card", icon: CreditCard, description: "Debit/Credit card" },
];

const transactions = [
  {
    id: "1",
    type: "credit",
    title: "Cashback Bonus",
    amount: 50,
    date: "Today, 2:30 PM",
    icon: Sparkles,
    method: "wallet",
  },
  {
    id: "2",
    type: "debit",
    title: "Trip to Manyata Tech Park",
    amount: 89,
    date: "Today, 8:30 AM",
    method: "upi",
    upiApp: "gpay",
  },
  {
    id: "3",
    type: "credit",
    title: "Referral Reward",
    amount: 200,
    date: "Yesterday",
    icon: Gift,
    method: "wallet",
  },
  {
    id: "4",
    type: "debit",
    title: "Trip to HSR Layout",
    amount: 99,
    date: "Mar 21, 6:15 PM",
    method: "cash",
  },
  {
    id: "5",
    type: "debit",
    title: "Trip to Electronic City",
    amount: 119,
    date: "Mar 20, 9:00 AM",
    method: "phonepe",
  },
];

interface WalletViewProps {
  onOpenPremium?: () => void;
}

// Linked UPI IDs
const linkedUpiIds = [
  { id: "1", upiId: "rahul@oksbi", bank: "SBI", isDefault: true, appId: "gpay" },
  { id: "2", upiId: "rahul@ybl", bank: "Yes Bank", isDefault: false, appId: "phonepe" },
];

export function WalletView({ onOpenPremium }: WalletViewProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("upi");
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [showUpiSettings, setShowUpiSettings] = useState(false);
  const [defaultUpiId, setDefaultUpiId] = useState("1");

  const getPaymentIcon = (method: string, upiApp?: string) => {
    if (method === "cash") return Banknote;
    if (method === "upi" || upiApp) return QrCode;
    if (method === "card") return CreditCard;
    return Wallet;
  };

  return (
    <div className="space-y-6 pb-4">
      {/* Balance Card */}
      <motion.div
        initial={{ y: -30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", bounce: 0.3 }}
      >
        <Card className="overflow-hidden border-0 bg-primary shadow-2xl shadow-primary/30">
          <CardContent className="relative p-6">
            {/* Animated background circles */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary-foreground"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{ repeat: Infinity, duration: 5, delay: 0.5 }}
              className="absolute -right-4 top-16 h-24 w-24 rounded-full bg-primary-foreground"
            />

            <div className="relative">
              <div className="mb-5 flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-foreground/20"
                >
                  <Wallet className="h-6 w-6 text-primary-foreground" />
                </motion.div>
                <span className="text-lg font-semibold text-primary-foreground/80">
                  Orbit Wallet
                </span>
              </div>

              <p className="mb-1 text-sm text-primary-foreground/60">
                Available Balance
              </p>
              <motion.p
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="mb-8 text-5xl font-bold text-primary-foreground"
              >
                ₹1,247
              </motion.p>

              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowAddMoney(!showAddMoney)}
                  className="flex-1 bg-primary-foreground py-6 text-base font-semibold text-primary shadow-lg hover:bg-primary-foreground/90"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add Money
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-primary-foreground/30 bg-transparent py-6 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <ArrowUpRight className="mr-2 h-5 w-5" />
                  Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add Money via UPI Section */}
      <AnimatePresence>
        {showAddMoney && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="border border-border bg-card shadow-lg">
              <CardContent className="p-4">
                <h3 className="mb-4 font-semibold text-foreground">Add Money via UPI</h3>
                <div className="mb-4 grid grid-cols-4 gap-3">
                  {upiApps.map((app) => (
                    <motion.button
                      key={app.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center gap-2 rounded-xl bg-secondary p-3 transition-colors hover:bg-secondary/80"
                    >
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-white"
                        style={{ backgroundColor: app.color }}
                      >
                        {app.initial}
                      </div>
                      <span className="text-xs text-muted-foreground">{app.name.split(" ")[0]}</span>
                    </motion.button>
                  ))}
                </div>
                <div className="flex gap-2">
                  {[100, 200, 500, 1000].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      className="flex-1 border-border text-foreground hover:border-primary hover:bg-primary/10"
                    >
                      ₹{amount}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UPI Settings */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">UPI Settings</h3>
          <button
            onClick={() => setShowUpiSettings(!showUpiSettings)}
            className="flex items-center gap-1 text-sm font-medium text-primary"
          >
            <Settings className="h-4 w-4" />
            Manage
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showUpiSettings ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <AnimatePresence>
          {showUpiSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <Card className="border border-border bg-card shadow-lg">
                <CardContent className="p-4">
                  <div className="mb-4 space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">Linked UPI IDs</p>
                    {linkedUpiIds.map((upi) => {
                      const app = upiApps.find((a) => a.id === upi.appId);
                      return (
                        <motion.div
                          key={upi.id}
                          className={`flex items-center gap-3 rounded-xl border p-3 ${
                            defaultUpiId === upi.id
                              ? "border-primary bg-primary/10"
                              : "border-border bg-secondary/30"
                          }`}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setDefaultUpiId(upi.id)}
                        >
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-full text-base font-bold text-white"
                            style={{ backgroundColor: app?.color || "#666" }}
                          >
                            {app?.initial || "U"}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-foreground">{upi.upiId}</p>
                              {defaultUpiId === upi.id && (
                                <span className="rounded bg-primary px-1.5 py-0.5 text-xs font-medium text-primary-foreground">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Building2 className="h-3 w-3" />
                              {upi.bank}
                            </div>
                          </div>
                          <button className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-dashed border-primary/50 text-primary hover:bg-primary/10"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Link New UPI ID
                  </Button>

                  <div className="mt-4 rounded-lg bg-secondary/50 p-3">
                    <p className="text-xs text-muted-foreground">
                      Your UPI IDs are securely linked via NPCI. Orbit does not store your bank details.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick UPI Apps Row */}
        {!showUpiSettings && (
          <div className="mb-4 flex items-center gap-3 rounded-xl border border-border bg-card p-3">
            <QrCode className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {linkedUpiIds.find((u) => u.id === defaultUpiId)?.upiId}
              </p>
              <p className="text-xs text-muted-foreground">Default UPI</p>
            </div>
            <div className="flex -space-x-2">
              {upiApps.slice(0, 3).map((app) => (
                <div
                  key={app.id}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card text-xs font-bold text-white"
                  style={{ backgroundColor: app.color }}
                >
                  {app.initial}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Default Payment Method */}
      <div>
        <h3 className="mb-3 font-semibold text-foreground">Default Payment Method</h3>
        <div className="grid grid-cols-2 gap-3">
          {paymentMethods.map((method, i) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Card
                className={`cursor-pointer border transition-all ${
                  selectedPaymentMethod === method.id
                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                    : "border-border bg-card hover:border-primary/30"
                }`}
                onClick={() => setSelectedPaymentMethod(method.id)}
              >
                <CardContent className="relative flex items-center gap-3 p-4">
                  {selectedPaymentMethod === method.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                    >
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </motion.div>
                  )}
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      selectedPaymentMethod === method.id
                        ? "bg-primary shadow-lg shadow-primary/30"
                        : "bg-secondary"
                    }`}
                  >
                    <method.icon
                      className={`h-5 w-5 ${
                        selectedPaymentMethod === method.id
                          ? "text-primary-foreground"
                          : "text-foreground"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{method.label}</p>
                    <p className="text-xs text-muted-foreground">{method.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Orbit Premium Promo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={onOpenPremium}
      >
        <Card className="cursor-pointer overflow-hidden border-2 border-primary/50 bg-gradient-to-br from-primary/20 via-card to-accent/10 shadow-xl transition-all hover:border-primary">
          <CardContent className="relative p-5">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/40"
              >
                <Crown className="h-7 w-7 text-primary-foreground" />
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-foreground">Orbit Premium</p>
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground"
                  >
                    PRO
                  </motion.span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Priority booking, extra discounts & more
                </p>
              </div>
              <ChevronRight className="h-6 w-6 text-primary" />
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-background/50 px-3 py-2">
              <span className="text-sm text-muted-foreground">Starting at</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-primary">₹99</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Transactions */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Recent Transactions</h2>
          <button className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            See all
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <Card className="border border-border bg-card shadow-lg">
          <CardContent className="divide-y divide-border p-0">
            {transactions.map((tx, index) => {
              const PaymentIcon = getPaymentIcon(tx.method || "wallet", tx.upiApp);
              return (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  className="flex items-center justify-between p-4 transition-colors hover:bg-secondary/30"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        tx.type === "credit" ? "bg-accent/20" : "bg-secondary"
                      }`}
                    >
                      {tx.icon ? (
                        <tx.icon
                          className={`h-5 w-5 ${
                            tx.type === "credit" ? "text-accent" : "text-muted-foreground"
                          }`}
                        />
                      ) : (
                        <PaymentIcon
                          className={`h-5 w-5 ${
                            tx.type === "credit" ? "text-accent" : "text-muted-foreground"
                          }`}
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{tx.title}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">{tx.date}</p>
                        {tx.method && (
                          <span className="rounded bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground">
                            {tx.method === "upi" && tx.upiApp
                              ? upiApps.find((a) => a.id === tx.upiApp)?.name || "UPI"
                              : tx.method === "cash"
                              ? "Cash"
                              : tx.method === "wallet"
                              ? "Wallet"
                              : "UPI"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.08 }}
                    className={`text-lg font-bold ${
                      tx.type === "credit" ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {tx.type === "credit" ? "+" : "-"}₹{tx.amount}
                  </motion.span>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Savings Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border border-accent/30 bg-accent/10 shadow-lg">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
              <Zap className="h-6 w-6 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">You saved ₹847 this month</p>
              <p className="text-sm text-muted-foreground">Compared to solo cab rides</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
