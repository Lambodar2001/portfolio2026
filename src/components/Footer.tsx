export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-slate-950 border-t border-cyan-400/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="font-bold text-white mb-2">Lambodar Vijay Waghmare</h3>
            <p className="text-gray-400 text-sm">Full-Stack Developer & Enterprise Architect</p>
          </div>
          <div className="flex gap-8">
            {['LinkedIn', 'GitHub', 'Email', 'Twitter'].map(link => (
              <a key={link} href="#" className="text-gray-400 hover:text-cyan-400 transition text-sm">
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          © 2026 Lambodar Vijay Waghmare. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
