import { useApp } from '../contexts/AppContext.jsx';

export default function Contact() {
  const { switchView } = useApp();

  return (
    <div className="w-full max-w-md mx-auto px-5 pt-6 pb-32">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-1 bg-theme-brand rounded-full" />
          <span className="text-xs font-semibold text-theme-brand uppercase tracking-widest">
            Support
          </span>
        </div>

        <h2 className="text-2xl font-bold text-theme-primary">
          Support Center
        </h2>

        <p className="text-theme-muted text-sm mt-2 leading-relaxed">
          Get assistance, raise tickets, or connect with support.
        </p>
      </div>

      <div className="space-y-4">
        <div
          className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
          onClick={() => switchView('assignedAgentView')}
        >
          <h3 className="text-base font-semibold text-theme-primary">
            Contact Your Assigned Agent
          </h3>
          <p className="text-theme-muted text-sm mt-2 leading-relaxed">
            Connect directly with the agent handling your applications.
          </p>
        </div>

        <div
          className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
          onClick={() => switchView('supportTicketView')}
        >
          <h3 className="text-base font-semibold text-theme-primary">
            Raise a Support Ticket
          </h3>
          <p className="text-theme-muted text-sm mt-2 leading-relaxed">
            Submit issues, complaints, or technical problems.
          </p>
        </div>

        <div
          className="bg-white rounded-2xl border border-blue-200 p-5 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
          onClick={() => {
            window.open(
              'https://wa.me/918015338169?text=Hello%20Admin,%20I%20need%20assistance.',
              '_blank'
            );
          }}
        >
          <h3 className="text-base font-semibold text-theme-primary">
            Chat with Admin
          </h3>
          <p className="text-theme-muted text-sm mt-2 leading-relaxed">
            Connect instantly with the admin via WhatsApp.
          </p>
        </div>

        <div
          className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
          onClick={() => switchView('callSupportView')}
        >
          <h3 className="text-base font-semibold text-theme-primary">
            Call Support
          </h3>
          <p className="text-theme-muted text-sm mt-2 leading-relaxed">
            Speak with our customer support executives.
          </p>
        </div>

        <div
          className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
          onClick={() => switchView('emailSupportView')}
        >
          <h3 className="text-base font-semibold text-theme-primary">
            Email Support
          </h3>
          <p className="text-theme-muted text-sm mt-2 leading-relaxed">
            Send detailed queries and receive assistance by email.
          </p>
        </div>
      </div>
    </div>
  );
}