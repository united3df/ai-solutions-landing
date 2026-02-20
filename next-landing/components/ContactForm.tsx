"use client";

import React, { useState } from "react";
import { X, Mail, CheckCircle2, Loader2 } from "lucide-react";
import { submitEmailToGoogleSheets } from "@/lib/services/googleSheetsService";

interface ContactFormSlideProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactFormSlide({ open, onOpenChange }: ContactFormSlideProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = email && emailRegex.test(email);

  const handleSubmit = async () => {
    if (!isValidEmail) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid email address',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await submitEmailToGoogleSheets(email);

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message,
        });
        setEmail('');

        setTimeout(() => {
          onOpenChange(false);
          setTimeout(() => {
            setSubmitStatus({ type: null, message: '' });
          }, 300);
        }, 3000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message,
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (submitStatus.type === 'error') {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isSubmitting && isValidEmail) {
      handleSubmit();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => onOpenChange(false)}
      />

      {/* Slide panel */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50
          transition-transform duration-500 ease-out ${open ? 'translate-y-0' : 'translate-y-full'
          }`}
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <div className="p-6 sm:p-8 bo" >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Contact us
                </h3>
                <p className="text-sm text-gray-600">Leave your email</p>
              </div>
            </div>

            <button
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="w-9 h-9 flex items-center justify-center rounded-full
                         cursor-pointer hover:bg-gray-100 active:scale-95
                         transition-all disabled:opacity-50"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-5">
            {/* Email input */}
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                disabled={isSubmitting}
                className="
                  w-full max-w-md
                  px-5 py-3.5
                  text-base text-gray-900
                  placeholder:text-gray-400
                  border border-gray-300
                  rounded-2xl
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  transition-all
                  disabled:bg-gray-100 disabled:cursor-not-allowed
                "
              />
            </div>

            {/* Status */}
            {submitStatus.type && (
              <div
                className={`
                  flex items-center gap-3 p-4 rounded-2xl animate-slideIn
                  ${submitStatus.type === 'success'
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                  }
                `}
              >
                {submitStatus.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <Mail className="w-5 h-5 text-red-600" />
                )}
                <span
                  className={`text-sm font-medium ${submitStatus.type === 'success'
                    ? 'text-green-800'
                    : 'text-red-800'
                    }`}
                >
                  {submitStatus.message}
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
                className="
                  flex-1 px-6 py-3
                  border border-gray-300
                  rounded-2xl
                  font-medium text-gray-700
                  cursor-pointer
                  hover:bg-gray-50 active:scale-[0.98]
                  transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !isValidEmail}
                className={`
                  flex-1 px-6 py-3
                  rounded-2xl
                  font-medium text-white
                  ${isValidEmail ? 'cursor-pointer' : 'cursor-not-allowed'}
                  bg-gradient-to-r from-blue-600 to-purple-600
                  hover:shadow-lg hover:scale-[1.03]
                  active:scale-[0.98]
                  transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2
                `}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.25s ease-out;
        }
      `}</style>
    </>
  );
}

export function ContactForm({ open, onOpenChange }: ContactFormSlideProps) {
  return <ContactFormSlide open={open} onOpenChange={onOpenChange} />;
}
