'use client';

import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Github, Linkedin, Loader2, Mail, Send } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function ContactSectionCompact() {
  const t = useTranslations('contact');
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      const response = await fetch("https://formspree.io/f/mykjoqjw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus('success');
        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        // Reset form
        setFormData({ name: '', email: '', message: '' });
        
        // Reset status after 3s
        setTimeout(() => {
          setFormStatus('idle');
          setShowForm(false);
        }, 3000);
      } else {
        console.error("Formspree error:", await response.json());
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Title */}
      <div className="text-center">
        <p className="text-primary font-mono text-xs mb-2">{t('subtitle')}</p>
        <h3 className="text-xl font-bold text-foreground">{t('title')}</h3>
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-3">
        <motion.a
          href="https://github.com/EmperorOfCoding"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 text-muted-foreground hover:text-primary transition-all border border-white/10 rounded-xl hover:border-primary/30 hover:bg-white/5"
          aria-label="GitHub Profile"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github className="w-5 h-5" />
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/victor-martins-9095092b5/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 text-muted-foreground hover:text-primary transition-all border border-white/10 rounded-xl hover:border-primary/30 hover:bg-white/5"
          aria-label="LinkedIn Profile"
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Linkedin className="w-5 h-5" />
        </motion.a>
        <motion.a
          href="mailto:victorameno@hotmail.com"
          className="p-3 text-muted-foreground hover:text-primary transition-all border border-white/10 rounded-xl hover:border-primary/30 hover:bg-white/5"
          aria-label="Email"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mail className="w-5 h-5" />
        </motion.a>
      </div>

      {/* Email CTA or Form */}
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.button
            key="cta"
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-primary/10 text-primary border border-primary/30 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all font-medium text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {t('button')}
          </motion.button>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome"
              required
              disabled={formStatus === 'loading' || formStatus === 'success'}
              className="w-full px-4 py-2 bg-secondary/20 border border-primary/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              disabled={formStatus === 'loading' || formStatus === 'success'}
              className="w-full px-4 py-2 bg-secondary/20 border border-primary/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Mensagem"
              required
              rows={3}
              disabled={formStatus === 'loading' || formStatus === 'success'}
              className="w-full px-4 py-2 bg-secondary/20 border border-primary/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none disabled:opacity-50"
            />
            
            {/* Status Messages */}
            <AnimatePresence mode="wait">
              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 text-green-500 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mensagem enviada com sucesso!</span>
                </motion.div>
              )}
              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 text-red-500 text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Erro ao enviar. Tente novamente.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-2">
              <motion.button
                type="submit"
                disabled={formStatus === 'loading' || formStatus === 'success'}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: formStatus === 'idle' ? 1.02 : 1 }}
                whileTap={{ scale: formStatus === 'idle' ? 0.98 : 1 }}
              >
                {formStatus === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                ) : formStatus === 'success' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Enviado!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar
                  </>
                )}
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setShowForm(false)}
                disabled={formStatus === 'loading'}
                className="px-4 py-2 bg-secondary/20 text-muted-foreground rounded-lg font-medium text-sm hover:bg-secondary/30 transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancelar
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
