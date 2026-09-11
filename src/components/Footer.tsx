import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 py-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8"
        >
          {/* Left - Branding */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-indigo to-neon-purple flex items-center justify-center font-display font-bold text-sm text-white">
              L
            </div>
            <span className="font-display font-semibold text-white">
              Lambodar Vijay Waghmare
            </span>
          </div>

          {/* Center - Links */}
          <div className="flex items-center gap-8">
            {[
              { label: 'GitHub', href: '#' },
              { label: 'LinkedIn', href: '#' },
              { label: 'Twitter', href: '#' },
              { label: 'Email', href: 'mailto:hello@lambodar.dev' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-400 hover:text-white text-sm transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right - Status */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-full glass text-sm text-neon-blue">
            <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
            Available for Projects
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom - Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500"
        >
          <div>
            © {currentYear} Lambodar Vijay Waghmare. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>

        {/* Floating background element */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-[150px] -z-10" />
      </div>
    </footer>
  )
}
