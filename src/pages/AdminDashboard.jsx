import { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  Landmark,
  CreditCard,
  Shield,
  TrendingUp,
  Building2
} from "lucide-react";

const STATUS_COLORS = {
  SUBMITTED: { bg: '#DBEAFE', text: '#1D4ED8' },
  AGENT_REVIEW: { bg: '#F3E8FF', text: '#7C3AED' },
  DOCUMENTS_PENDING: { bg: '#FEF3C7', text: '#B45309' },
  DOCUMENTS_VERIFIED: { bg: '#D1FAE5', text: '#047857' },
  ADMIN_REVIEW: { bg: '#E0E7FF', text: '#4338CA' },
  BANK_SELECTION: { bg: '#CFFAFE', text: '#0E7490' },
  SENT_TO_BANK: { bg: '#E0F2FE', text: '#0369A1' },
  UNDER_BANK_REVIEW: { bg: '#FED7AA', text: '#C2410C' },
  APPROVED: { bg: '#D1FAE5', text: '#059669' },
  REJECTED: { bg: '#FEE2E2', text: '#DC2626' },
  COMPLETED: { bg: '#F3F4F6', text: '#6B7280' },
};

const BANKS = [
  { id: 'sbi', name: 'State Bank of India' },
  { id: 'hdfc', name: 'HDFC Bank' },
  { id: 'icici', name: 'ICICI Bank' },
  { id: 'axis', name: 'Axis Bank' },
  { id: 'kotak', name: 'Kotak Mahindra Bank' },
];

export default function AdminDashboard() {
  const {
    applications, switchView, getUnreadNotifications, markNotificationsRead, showToast,
    assignAgent, updateStatus, selectBank, sendToBank, updateBankDecision,
    requestDocument, verifyDocuments, addRemark
  } = useApp();
  const { users, addAgent, toggleUserStatus, removeUser, getUsersByRole, currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState('overview');
  const [newAgent, setNewAgent] = useState({ name: '', email: '', phone: '' });
  const [showAddAgent, setShowAddAgent] = useState(false);

  const clients = getUsersByRole('client');
  const agents = getUsersByRole('agent');
  const allAgents = users.filter(u => u.role === 'agent');
  const performanceAgents = allAgents.filter(a => a.name !== 'Agent Kumar' && a.name !== 'Priya Sharma');
  const pendingReview = applications.filter(a => a.status === 'ADMIN_REVIEW');
  const docsVerified = applications.filter(a => a.status === 'DOCUMENTS_VERIFIED');
  const sentToBank = applications.filter(a => a.status === 'SENT_TO_BANK');
  const bankReview = applications.filter(a => a.status === 'UNDER_BANK_REVIEW');
  const approved = applications.filter(a => a.status === 'APPROVED');
  const rejected = applications.filter(a => a.status === 'REJECTED');
  const unreadNotifs = getUnreadNotifications('admin');

  function handleCreateAgent(e) {
    e.preventDefault();
    if (!newAgent.name || !newAgent.email) return;
    addAgent(newAgent);
    setNewAgent({ name: '', email: '', phone: '' });
    setShowAddAgent(false);
    showToast('Agent created successfully');
  }

  function handleMarkRead() {
    if (unreadNotifs.length > 0) markNotificationsRead('admin');
  }

  const stats = [
    { label: 'Total Clients', value: clients.filter(c => applications.some(a => a.clientId === c.id)).length, color: '#3B82F6', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { label: 'Total Agents', value: agents.length, color: '#8B5CF6', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { label: 'Total Applications', value: applications.length, color: '#F59E0B', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { label: 'Pending Reviews', value: pendingReview.length, color: '#EF4444', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  function renderOverview() {
  const services = [
  {
    title: "Savings Services",
    icon: Landmark,
    description: "Manage savings related applications and customer requests."
  },
  {
    title: "Credit Services",
    icon: CreditCard,
    description: "Manage credit related applications and customer requests."
  },
  {
    title: "Insurance Services",
    icon: Shield,
    description: "Manage insurance related applications and customer requests."
  },
  {
    title: "Pension Services",
    icon: TrendingUp,
    description: "Manage pension related applications and customer requests."
  },
  {
    title: "Social Security Services",
    icon: Building2,
    description: "Manage social security related applications and customer requests."
  }
];

  return (
    <>
      <div>
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            Service Management
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            Financial Services
          </h2>

          <div className="w-20 h-1 bg-blue-600 rounded-full mt-3"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
                onClick={() => switchView("serviceReviewView")}
                className="group bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="mb-4">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center animate-float">
                      <Icon className="w-7 h-7 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800">
                      {service.title}
                    </h3>

                    <div className="inline-flex items-center px-3 py-1 mt-3 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                      0 Applications
                    </div>

                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <span className="text-blue-600 font-semibold">
                    Manage Requests →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function renderApprovals() {
    const reviewApps = applications.filter(a => ['ADMIN_REVIEW', 'BANK_SELECTION', 'SENT_TO_BANK', 'UNDER_BANK_REVIEW'].includes(a.status));
    return (
      <>
        <div className="flex items-center justify-between mb-6">
          <h3 className="section-title !mb-0">Approval Center</h3>
          <button onClick={() => setActiveTab('overview')} className="btn-secondary !py-1.5 !px-3 text-xs">Back</button>
        </div>
        {reviewApps.length === 0 ? (
          <div className="text-center py-12 card">
            <p className="text-theme-muted">No applications pending review.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviewApps.map(app => {
              const sc = STATUS_COLORS[app.status] || STATUS_COLORS.SUBMITTED;
              return (
                <div key={app.id} className="card !p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: sc.bg, color: sc.text }}>{app.status.replace(/_/g, ' ')}</span>
                        <span className="text-xs text-theme-muted">{app.category}</span>
                      </div>
                      <p className="font-bold text-theme-primary">{app.scheme}</p>
                      <p className="text-sm text-theme-secondary">{app.data?.customerName} | {app.data?.customerPhone}</p>
                      <p className="text-xs text-theme-muted">Agent ID: {app.agentId || 'Unassigned'} | Submitted: {new Date(app.date).toLocaleDateString()}</p>
                      {app.bankPartner && <p className="text-xs text-theme-muted">Bank: {app.bankPartner}</p>}
                    </div>
                    <div className="flex gap-2 flex-wrap justify-end">
                      {app.status === 'ADMIN_REVIEW' && (
                        <>
                          <select className="input-field !py-1.5 text-xs" onChange={(e) => { if (e.target.value) selectBank(app.id, e.target.value); }}>
                            <option value="">Select Bank</option>
                            {BANKS.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                          </select>
                        </>
                      )}
                      {app.status === 'BANK_SELECTION' && (
                        <button onClick={() => sendToBank(app.id)} className="btn-primary !py-1.5 !px-3 !w-auto text-xs">Send to Bank</button>
                      )}
                      {(app.status === 'SENT_TO_BANK' || app.status === 'UNDER_BANK_REVIEW') && (
                        <>
                          <button onClick={() => updateBankDecision(app.id, 'approved')} className="btn-primary !py-1.5 !px-3 !w-auto text-xs !bg-[#10B981]">Approve</button>
                          <button onClick={() => updateBankDecision(app.id, 'rejected')} className="btn-primary !py-1.5 !px-3 !w-auto text-xs !bg-[#EF4444]">Reject</button>
                        </>
                      )}
                    </div>
                  </div>
                  {app.remarks?.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-theme-light">
                      <p className="text-xs font-semibold text-theme-muted mb-1">Remarks:</p>
                      {app.remarks.map((r, i) => (
                        <p key={i} className="text-xs text-theme-secondary">{r.text}</p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }

  function renderAgentManagement() {
    return (
      <>
        <div className="flex items-center justify-between mb-6">
          <h3 className="section-title !mb-0">Agent Management</h3>
          <button onClick={() => setShowAddAgent(true)} className="btn-primary !w-auto !px-4 !py-2 text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Add Agent
            </span>
          </button>
          <button onClick={() => setActiveTab('overview')} className="btn-secondary !py-1.5 !px-3 text-xs">Back</button>
        </div>

        {showAddAgent && (
          <div className="card mb-6 !border-t-2 !border-t-[#8B5CF6]">
            <h4 className="font-bold text-theme-primary mb-4">Create New Agent</h4>
            <form onSubmit={handleCreateAgent} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="label">Full Name</label>
                <input type="text" required value={newAgent.name} onChange={(e) => setNewAgent(prev => ({ ...prev, name: e.target.value }))} className="input-field" placeholder="Agent name" />
              </div>
              <div>
                <label className="label">Email</label>
                <input type="email" required value={newAgent.email} onChange={(e) => setNewAgent(prev => ({ ...prev, email: e.target.value }))} className="input-field" placeholder="agent@nexafin.com" />
              </div>
              <div>
                <label className="label">Phone</label>
                <input type="tel" value={newAgent.phone} onChange={(e) => setNewAgent(prev => ({ ...prev, phone: e.target.value }))} className="input-field" placeholder="Phone number" />
              </div>
              <div className="md:col-span-3 flex gap-3">
                <button type="submit" className="btn-primary !w-auto !px-6">Create Agent</button>
                <button type="button" onClick={() => setShowAddAgent(false)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-theme-light">
                  <th className="text-left py-3 px-3 text-theme-muted font-semibold">Name</th>
                  <th className="text-left py-3 px-3 text-theme-muted font-semibold">Email</th>
                  <th className="text-left py-3 px-3 text-theme-muted font-semibold">Phone</th>
                  <th className="text-center py-3 px-3 text-theme-muted font-semibold">Status</th>
                  <th className="text-center py-3 px-3 text-theme-muted font-semibold">Applications</th>
                  <th className="text-center py-3 px-3 text-theme-muted font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allAgents.filter(a => a.name !== 'Agent Kumar' && a.name !== 'Priya Sharma').map(agent => {
                  const agentApps = applications.filter(a => a.agentId === agent.id);
                  return (
                    <tr key={agent.id} className="border-b border-theme-light hover:bg-theme-bg">
                      <td className="py-3 px-3 font-medium text-theme-primary">{agent.name}</td>
                      <td className="py-3 px-3 text-theme-secondary">{agent.email}</td>
                      <td className="py-3 px-3 text-theme-secondary">{agent.phone || '-'}</td>
                      <td className="text-center py-3 px-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${agent.isActive ? 'bg-[#D1FAE5] text-[#059669]' : 'bg-[#FEE2E2] text-[#DC2626]'}`}>
                          {agent.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="text-center py-3 px-3 text-theme-secondary">{agentApps.length}</td>
                      <td className="text-center py-3 px-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => toggleUserStatus(agent.id)}
                            className={`text-xs font-semibold px-3 py-1.5 rounded border transition-colors ${agent.isActive ? 'border-[#FCA5A5] text-[#EF4444] hover:bg-[#FEF2F2]' : 'border-[#6EE7B7] text-[#059669] hover:bg-[#ECFDF5]'}`}
                          >
                            {agent.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => { if (window.confirm(`Remove agent "${agent.name}"? This cannot be undone.`)) { removeUser(agent.id); showToast(`Agent "${agent.name}" removed`); } }}
                            className="text-xs font-semibold px-3 py-1.5 rounded border border-[#FCA5A5] text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {allAgents.filter(a => a.name !== 'Agent Kumar' && a.name !== 'Priya Sharma').length === 0 && (
                  <tr><td colSpan="6" className="text-center py-8 text-theme-muted">No agents found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  useEffect(() => {
    if (window._gtInit) return;
    window._gtInit = true;

    window.googleTranslateElementInit = () => {
      try {
        if (window.google && google.translate && google.translate.TranslateElement) {
          const el = document.getElementById('google_translate_element');
          if (!el || el.querySelector('.goog-te-combo')) return;
          new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,ta,te,ml,hi',
            autoDisplay: false,
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          }, 'google_translate_element');
        }
      } catch (e) {}
    };

    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = () => {};
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <div className="flex items-center justify-end mb-4">
        <div id="google_translate_element" />
      </div>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-blue-600 min-h-[140px] p-6 md:p-7 shadow-xl border border-blue-800/20 mb-10 animate-fade-in animate-gradient">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_40%)]" />

  <div className="relative z-10">
    <div className="flex items-start justify-between">
      <div>
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
          Admin Dashboard
        </span>

        <h1 className="text-4xl font-bold text-white">
          Good Morning,
        </h1>

        <h2 className="text-3xl font-semibold text-blue-100 mt-1">
          {currentUser?.name || "Administrator"}
        </h2>

        <p className="mt-2 text-blue-200 text-sm">
          Admin Dashboard Overview
        </p>

        <p className="mt-4 text-blue-100 max-w-2xl leading-relaxed">
          Manage applications, review customer requests, monitor services,
          and oversee financial operations from a centralized platform.
        </p>
      </div>

      <div className="hidden lg:flex flex-col items-end">
        <div className="text-right">
          <p className="text-blue-200 text-xs uppercase tracking-wider">
            System Status
          </p>

          <div className="flex items-center justify-end gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-white font-medium">
              Operational
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'approvals' && renderApprovals()}
      {activeTab === 'agents' && renderAgentManagement()}
    </div>
  );
}