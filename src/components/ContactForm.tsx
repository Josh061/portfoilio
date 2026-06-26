import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    
    // Quick validation
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!name.trim() || !emailValid || !subject.trim() || !message.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields with valid information.',
      });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });
    
    // Simulate sending message
    setTimeout(() => {
      setLoading(false);
      setStatus({
        type: 'success',
        message: `Thanks ${name}! Your message was sent successfully. I will get back to you shortly.`,
      });
      
      // Confetti splash for wow-factor feedback
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#22C55E', '#0EA5E9', '#A855F7']
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setTimeout(() => {
        setStatus({ type: null, message: '' });
      }, 7000);
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl glass-card dark:glass-card bg-white/70 dark:bg-slate-900/40 flex flex-col gap-5 border border-slate-200/50 dark:border-slate-800/40 shadow-xl relative overflow-hidden" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-slate-600 dark:text-slate-350">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            disabled={loading}
            className="w-full px-4 py-3 bg-white/50 dark:bg-slate-950/40 border border-slate-250 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-green dark:focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 dark:focus:ring-brand-green/10 transition-all duration-200"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-slate-600 dark:text-slate-350">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            disabled={loading}
            className="w-full px-4 py-3 bg-white/50 dark:bg-slate-950/40 border border-slate-250 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-green dark:focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 dark:focus:ring-brand-green/10 transition-all duration-200"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="text-sm font-medium text-slate-600 dark:text-slate-350">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Project inquiry"
          disabled={loading}
          className="w-full px-4 py-3 bg-white/50 dark:bg-slate-950/40 border border-slate-250 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-green dark:focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 dark:focus:ring-brand-green/10 transition-all duration-200"
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-slate-600 dark:text-slate-350">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          disabled={loading}
          className="w-full px-4 py-3 bg-white/50 dark:bg-slate-950/40 border border-slate-250 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-green dark:focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 dark:focus:ring-brand-green/10 transition-all duration-200 resize-none"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 font-display font-semibold rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-sky-600 hover:from-emerald-400 hover:via-emerald-500 hover:to-sky-500 dark:from-emerald-500 dark:via-emerald-600 dark:to-sky-600 dark:hover:from-emerald-400 dark:hover:via-emerald-500 dark:hover:to-sky-500 text-slate-950 dark:text-slate-950 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed transition-all duration-300"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      {status.type && (
        <div 
          className={`flex items-start gap-2.5 p-4 rounded-xl border text-sm animate-[fadeIn_0.3s_ease] ${
            status.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
              : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
          }`}
          role="alert"
        >
          {status.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          )}
          <span>{status.message}</span>
        </div>
      )}
    </form>
  );
}
