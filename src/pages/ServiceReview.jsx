
import { useState } from 'react';
import { useApp } from '../contexts/AppContext.jsx';

export default function ServiceReview() {
  const { switchView, setSelectedApplication } = useApp();

  const [activeTab, setActiveTab] = useState('Accepted');
  const [searchTerm, setSearchTerm] = useState('');

  const applications = [
    {
      id: 1,
      name: 'Ravi Kumar',
      initials: 'RK',
      type: 'Personal Loan',
      date: '12/05/2026',
      status: 'Accepted',
      tag: 'blue',
      isRead: false,
    },
    {
      id: 2,
      name: 'Anjali Sharma',
      initials: 'AS',
      type: 'Personal Loan',
      date: '11/05/2026',
      status: 'Accepted',
      tag: 'green',
      isRead: true,
    },
    {
      id: 3,
      name: 'Prakash Singh',
      initials: 'PS',
      type: 'Home Loan',
      date: '10/05/2026',
      status: 'Pending',
      tag: 'orange',
      isRead: true,
    },
    {
      id: 4,
      name: 'Neha Kapoor',
      initials: 'NK',
      type: 'Business Loan',
      date: '09/05/2026',
      status: 'Rejected',
      tag: 'red',
      isRead: true,
    },
    {
      id: 5,
      name: 'Mohit Verma',
      initials: 'MV',
      type: 'Personal Loan',
      date: '08/05/2026',
      status: 'Accepted',
      tag: 'gray',
      isRead: true,
    },
  ];

  const avatarColors = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700',
    red: 'bg-red-100 text-red-700',
    gray: 'bg-gray-100 text-gray-600',
  };

  const filteredApplications = applications.filter((app) => {
    const matchesTab = app.status === activeTab;

    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.type.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-white px-4 pt-5 pb-28">
      <button
        onClick={() => switchView('adminDashboardView')}
        className="mb-5 text-sm font-medium text-gray-600"
      >
        ← Back
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Applications
        </h1>

        <p className="mt-2 text-sm leading-5 text-gray-500">
          Review customer requests and update their status.
        </p>
      </div>

      <div className="mb-5 grid grid-cols-3 gap-3">
        {['Accepted', 'Rejected', 'Pending'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-2xl border py-3 text-sm font-semibold transition-all ${
              activeTab === tab
                ? tab === 'Accepted'
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : tab === 'Rejected'
                  ? 'border-red-200 bg-red-50 text-red-700'
                  : 'border-orange-200 bg-orange-50 text-orange-700'
                : 'border-gray-200 bg-white text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <aside className="w-12 h-fit rounded-3xl border border-gray-100 bg-white py-5 shadow-sm flex flex-col items-center gap-6 flex-shrink-0">
          <span className="h-4 w-4 rounded-full bg-blue-500"></span>
          <span className="h-4 w-4 rounded-full bg-green-500"></span>
          <span className="h-4 w-4 rounded-full bg-orange-500"></span>
          <span className="h-4 w-4 rounded-full bg-red-500"></span>
          <span className="h-4 w-4 rounded-full bg-gray-400"></span>
        </aside>

        <main className="min-w-0 flex-1">
          <input
            type="text"
            placeholder="Search by name or loan type"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
          />

          <section className="space-y-3">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    setSelectedApplication(app);
                    switchView('applicationDetailsView');
                  }}
                  className={`w-full rounded-3xl border px-4 py-4 text-left shadow-sm transition-all ${
                    app.isRead
                      ? 'border-gray-100 bg-white'
                      : 'border-blue-200 border-l-4 bg-blue-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold ${avatarColors[app.tag]}`}
                    >
                      {app.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="truncate text-base font-bold text-gray-900">
                          {app.name}
                        </h2>

                        {!app.isRead && (
                          <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600">
                            NEW
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-sm font-medium text-gray-700">
                        {app.type}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Applied on {app.date}
                      </p>
                    </div>

                    <span className="text-2xl text-gray-500">›</span>
                  </div>
                </button>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-6 text-center">
                <p className="text-sm font-medium text-gray-500">
                  No applications found.
                </p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}