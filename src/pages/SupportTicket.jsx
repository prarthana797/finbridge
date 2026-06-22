import { useApp } from '../contexts/AppContext.jsx';

export default function SupportTicket() {
  const { switchView } = useApp();

  return (
    <div className="w-full max-w-md mx-auto px-5 pt-6 pb-32">
      <button
        onClick={() => switchView("contactView")}
        className="btn-secondary mb-6"
      >
        ← Back
      </button>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-1 bg-theme-brand rounded-full" />
          <span className="text-xs font-semibold text-theme-brand uppercase tracking-widest">
            Support
          </span>
        </div>

        <h2 className="text-2xl font-bold text-theme-primary">
          Raise a Support Ticket
        </h2>

        <p className="text-theme-muted text-sm mt-2 leading-relaxed">
          Describe your issue and our team will get back to you.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
        <input
          type="text"
          placeholder="Subject"
          className="input-field"
        />

        <textarea
          placeholder="Describe your issue..."
          rows="5"
          className="input-field resize-none"
        />

        <button
          className="btn-primary w-full"
          onClick={() => switchView('successView')}
        >
          Submit Ticket
        </button>
      </div>
    </div>
  );
}