import { useApp } from "../contexts/AppContext.jsx";

export default function ChatAdmin() {
  const { switchView } = useApp();

  return (
    <div className="w-full">
      <button onClick={() => switchView("contactView")} className="btn-secondary mb-6 pl-3 group">
        ← Back to Home
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-1 bg-theme-brand rounded-full" />
          <span className="text-xs font-semibold text-theme-brand uppercase tracking-widest">Chat</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-theme-primary">Chat with Admin</h2>
        <p className="text-theme-muted mt-2">Get instant assistance from the admin support team.</p>
      </div>

      <div className="card">
        <p className="text-theme-muted">Admin chat support will be available here.</p>
      </div>
    </div>
  );
}