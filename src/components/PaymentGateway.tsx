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
            <div className="p-6 pb-0 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">End-to-End Encrypted</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400"
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
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-1 bg-travel-blue rounded-full" />
                        <h3 className="text-sm font-bold text-travel-text uppercase tracking-widest">Select Payment Method</h3>
                      </div>
                      
                      <div className="grid gap-3">
                        {[
                          { id: 'card', icon: CreditCardIcon, label: 'Credit / Debit Card', desc: 'Secure encryption enabled' },
                          { id: 'upi', icon: Smartphone, label: 'UPI Payment', desc: 'Instant transfer via any UPI app' },
                          { id: 'wallet', icon: Wallet, label: 'Digital Wallets', desc: 'Pay via PayPal, Apple Pay, or Google Pay' },
                        ].map((item) => (
                          <motion.button
                            key={item.id}
                            whileHover={{ scale: 1.01, x: 5 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => {
                              setMethod(item.id as any);
                              setStep('details');
                            }}
                            className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group text-left"
                          >
                            <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:bg-travel-blue group-hover:text-white transition-all">
                              <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-travel-text">{item.label}</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{item.desc}</p>
                            </div>
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
                          <div className="p-4 rounded-2xl gradient-blue text-white shadow-lg space-y-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                            <div className="flex justify-between items-start">
                              <CreditCardIcon className="w-8 h-8 opacity-80" />
                              <div className="text-right">
                                <p className="text-[8px] font-bold uppercase tracking-widest opacity-60">Travel Priority</p>
                                <p className="text-[10px] font-bold">PLATINUM</p>
                              </div>
                            </div>
                            <p className="text-lg font-bold tracking-[0.2em]">••••  ••••  ••••  4242</p>
                            <div className="flex justify-between items-end">
                              <div>
                                <p className="text-[8px] font-bold uppercase tracking-widest opacity-60 mb-1">Card Holder</p>
                                <p className="text-xs font-bold uppercase">John Doe</p>
                              </div>
                              <div className="text-right">
                                <p className="text-[8px] font-bold uppercase tracking-widest opacity-60 mb-1">Expires</p>
                                <p className="text-xs font-bold font-mono">12/26</p>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Card Number</label>
                              <input type="text" placeholder="XXXX XXXX XXXX 4242" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-bold focus:ring-4 focus:ring-travel-blue/5 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Expiry</label>
                                <input type="text" placeholder="MM/YY" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-bold" />
                            </div>
                            <div>
                                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">CVV</label>
                                <input type="password" placeholder="***" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-bold" />
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
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-center gap-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-30 grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-30 grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-30 grayscale" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentGateway;
