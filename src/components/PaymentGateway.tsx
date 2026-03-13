import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Lock,
  Wallet,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  CreditCard as CreditCardIcon,
  ArrowLeft
} from 'lucide-react';

interface PaymentGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSuccess: () => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ isOpen, onClose, amount, onSuccess }) => {
  const [step, setStep] = useState<'methods' | 'details' | 'processing' | 'success'>('methods');
  const [method, setMethod] = useState<'card' | 'upi' | 'wallet' | null>(null);

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 pb-2 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100/50 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">End-to-End Encrypted</span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 hover:text-red-500 rounded-full transition-all text-gray-400 border border-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                <div key={step}>
                  {step === 'methods' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <div className="mb-6">
                        <h3 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2.5">
                          <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-travel-blue to-purple-600 shadow-sm block"></span>
                          Select Payment Method
                        </h3>
                        <p className="text-[10px] font-bold text-gray-400 mt-1 ml-4 uppercase tracking-widest">Choose how you'd like to pay securely</p>
                      </div>

                      <div className="grid gap-3.5 mt-2">
                        {[
                          { id: 'card', icon: CreditCardIcon, label: 'Credit / Debit Card', desc: 'Secure encryption enabled', color: 'text-travel-blue', bg: 'bg-blue-50', hover: 'group-hover:bg-travel-blue', border: 'border-blue-100/50 hover:border-travel-blue/30' },
                          { id: 'upi', icon: Smartphone, label: 'UPI Payment', desc: 'Instant transfer via any UPI app', color: 'text-emerald-500', bg: 'bg-emerald-50', hover: 'group-hover:bg-emerald-500', border: 'border-emerald-100/50 hover:border-emerald-500/30' },
                          { id: 'wallet', icon: Wallet, label: 'Digital Wallets', desc: 'Pay via PayPal, Apple Pay, or Google Pay', color: 'text-purple-500', bg: 'bg-purple-50', hover: 'group-hover:bg-purple-500', border: 'border-purple-100/50 hover:border-purple-500/30' },
                        ].map((item) => (
                          <motion.button
                            key={item.id}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setMethod(item.id as any);
                              setStep('details');
                            }}
                            className={`flex items-center gap-4 p-4 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all duration-300 group text-left relative overflow-hidden ${item.border}`}
                          >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${item.bg} ${item.color} ${item.hover} group-hover:text-white group-hover:shadow-lg relative z-10`}>
                              <item.icon className="w-6 h-6" />
                            </div>
                            <div className="relative z-10">
                              <p className="text-sm font-black text-gray-800 mb-0.5 group-hover:text-gray-900 transition-colors tracking-tight">{item.label}</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.desc}</p>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 'details' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <button
                        onClick={() => setStep('methods')}
                        className="text-[10px] font-bold text-travel-blue uppercase tracking-widest mb-4 flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        <ArrowLeft className="w-3 h-3" /> Back
                      </button>

                      {method === 'card' && (
                        <div className="space-y-4">
                          <div className="p-5 rounded-2xl bg-gradient-to-br from-travel-blue via-blue-600 to-purple-600 text-white shadow-[0_10px_25px_-5px_rgba(59,130,246,0.5)] space-y-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl -ml-10 -mb-10" />
                            <div className="flex justify-between items-start relative z-10">
                              <CreditCardIcon className="w-8 h-8 opacity-90" />
                              <div className="text-right">
                                <p className="text-[9px] font-bold uppercase tracking-widest opacity-70 mb-0.5">Travel Priority</p>
                                <p className="text-xs font-black tracking-widest">PLATINUM</p>
                              </div>
                            </div>
                            <p className="text-xl font-black tracking-[0.25em] relative z-10">•••• •••• •••• 4242</p>
                            <div className="flex justify-between items-end relative z-10">
                              <div>
                                <p className="text-[9px] font-bold uppercase tracking-widest opacity-70 mb-1">Card Holder</p>
                                <p className="text-sm font-black uppercase tracking-wider">John Doe</p>
                              </div>
                              <div className="text-right">
                                <p className="text-[9px] font-bold uppercase tracking-widest opacity-70 mb-1">Expires</p>
                                <p className="text-sm font-bold font-mono tracking-widest">12/26</p>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="col-span-2">
                              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Card Number</label>
                              <div className="relative">
                                <CreditCardIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" placeholder="XXXX XXXX XXXX 4242" className="w-full bg-white border-2 border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm font-bold text-gray-800 focus:border-travel-blue focus:ring-4 focus:ring-travel-blue/10 outline-none transition-all placeholder:text-gray-300 shadow-sm" />
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Expiry Date</label>
                              <input type="text" placeholder="MM/YY" className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-800 focus:border-travel-blue focus:ring-4 focus:ring-travel-blue/10 outline-none transition-all placeholder:text-gray-300 shadow-sm text-center" />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Security Code</label>
                              <input type="password" placeholder="CVV" className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-800 focus:border-travel-blue focus:ring-4 focus:ring-travel-blue/10 outline-none transition-all placeholder:text-gray-300 shadow-sm text-center tracking-[0.2em]" />
                            </div>
                          </div>
                        </div>
                      )}

                      {method !== 'card' && (
                        <div className="p-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                            <Wallet className="w-6 h-6 text-travel-blue" />
                          </div>
                          <p className="text-xs font-bold text-travel-text mb-1 uppercase tracking-tight">Redirecting to Payment Gateway</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Secure connection established</p>
                        </div>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlePay}
                        className="w-full h-12 gradient-blue text-white rounded-xl font-bold text-xs shadow-glow-blue flex items-center justify-center gap-2"
                      >
                        Pay ${amount.toLocaleString()}
                      </motion.button>
                    </motion.div>
                  )}

                  {step === 'processing' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="py-12 flex flex-col items-center justify-center text-center"
                    >
                      <div className="relative w-20 h-20 mb-6">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 border-4 border-gray-100 border-t-travel-blue rounded-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="w-6 h-6 text-gray-300" />
                        </div>
                      </div>
                      <h3 className="text-sm font-bold text-travel-text uppercase tracking-widest mb-2">Analyzing Transaction</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">AI Verification in progress...</p>
                    </motion.div>
                  )}

                  {step === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="py-8 flex flex-col items-center justify-center text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, stiffness: 200 }}
                        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-glow-success"
                      >
                        <CheckCircle2 className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-lg font-bold text-travel-text mb-2">Transaction Successful!</h3>
                      <p className="text-xs text-gray-500 font-medium mb-8 leading-relaxed max-w-[240px]">
                        Your booking has been secured. Check your email for confirmation and details.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          onSuccess();
                          onClose();
                        }}
                        className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-colors"
                      >
                        Done
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </AnimatePresence>
            </div>

            {/* Footer */}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentGateway;
