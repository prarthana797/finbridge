import { useApp } from '../contexts/AppContext.jsx';

export default function Contact() {
  const { contactAdmin, switchView } = useApp();

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-1 bg-theme-brand rounded-full" />
          <span className="text-xs font-semibold text-theme-brand uppercase tracking-widest">
            Support
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-theme-primary">
          Support Center
        </h2>

        <p className="text-theme-muted mt-2">
          Get assistance, raise tickets, or connect with support.
        </p>
      </div>

      <div className="space-y-4">
        <div
  className="clickable-item"
  onClick={() => switchView('assignedAgentView')}
>
          <h3 className="font-semibold text-theme-primary">
            Contact Your Assigned Agent
          </h3>
          <p className="text-theme-muted text-sm mt-1">
            Connect directly with the agent handling your applications.
          </p>
        </div>

        <div
          className="clickable-item"
          onClick={() => switchView('supportTicketView')}
        >
          <h3 className="font-semibold text-theme-primary">
            Raise a Support Ticket
          </h3>
          <p className="text-theme-muted text-sm mt-1">
            Submit issues, complaints, or technical problems.
          </p>
        </div>

       <div
  className="clickable-item"
onClick={() => {
  window.open(
    "https://wa.me/918015338169?text=Hello%20Admin,%20I%20need%20assistance.",
    "_blank"
  );
}}
>
          <h3 className="font-semibold text-theme-primary">
            Chat with Admin
          </h3>
         <p className="text-theme-muted text-sm mt-1">
  Connect instantly with the admin via WhatsApp.
</p>
        </div>

       <div
  className="clickable-item"
  onClick={() => switchView("callSupportView")}
>
  <h3 className="font-semibold text-theme-primary">
    Call Support
  </h3>
  <p className="text-theme-muted text-sm mt-1">
    Speak with our customer support executives.
  </p>
</div>

<div
  className="clickable-item"
  onClick={() => switchView("emailSupportView")}
>
  <h3 className="font-semibold text-theme-primary">
    Email Support
  </h3>
  <p className="text-theme-muted text-sm mt-1">
    Send detailed queries and receive assistance by email.
  </p>
</div>
      </div>
    </div>
  );
}