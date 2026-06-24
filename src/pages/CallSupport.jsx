import { useApp } from "../contexts/AppContext.jsx";

export default function CallSupport() {
  const { switchView } = useApp();

  return (
    <div className="w-full">
      <button onClick={() => switchView("contactView")} className="btn-secondary mb-6 pl-3 group">
        ← Back to Home
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-1 bg-theme-brand rounded-full" />
          <span className="text-xs font-semibold text-theme-brand uppercase tracking-widest">Call</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-theme-primary">Call Support</h2>
        <p className="text-theme-muted mt-2">Speak with our customer support executives.</p>
      </div>

      <div className="card">
        <p className="text-theme-muted mb-4">Support Number: +91 98765 43210</p>
        <a href="tel:+919876543210" className="btn-primary inline-block !w-auto px-6">
          Call Now
        </a>
      </div>
    </div>
  );
}