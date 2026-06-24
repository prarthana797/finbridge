import { useState } from 'react';
import { useApp } from '../contexts/AppContext.jsx';

export default function ServiceReview() {
  const { switchView } = useApp();

  const [activeTab, setActiveTab] = useState('Accepted');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editForm, setEditForm] = useState(null);

  const [applications, setApplications] = useState([
    { id: 1, name: 'Ravi Kumar', initials: 'RK', type: 'Personal Loan', date: '12/05/2026', status: 'Accepted', tag: 'blue', isRead: false },
    { id: 2, name: 'Anjali Sharma', initials: 'AS', type: 'Personal Loan', date: '11/05/2026', status: 'Accepted', tag: 'green', isRead: true },
    { id: 3, name: 'Mohit Verma', initials: 'MV', type: 'Personal Loan', date: '08/05/2026', status: 'Pending', tag: 'gray', isRead: true },
    { id: 4, name: 'Neha Kapoor', initials: 'NK', type: 'Business Loan', date: '09/05/2026', status: 'Rejected', tag: 'red', isRead: true },
    { id: 5, name: 'Priya Singh', initials: 'PS', type: 'Home Loan', date: '06/05/2026', status: 'Pending', tag: 'orange', isRead: false },
    { id: 6, name: 'Arjun Raj', initials: 'AR', type: 'Education Loan', date: '04/05/2026', status: 'Accepted', tag: 'blue', isRead: true },
  ]);

  const avatarColors = {
    blue: 'bg-blue-100 text-blue-700 ring-blue-50',
    green: 'bg-emerald-100 text-emerald-700 ring-emerald-50',
    orange: 'bg-orange-100 text-orange-700 ring-orange-50',
    red: 'bg-red-100 text-red-700 ring-red-50',
    gray: 'bg-slate-100 text-slate-600 ring-slate-50',
  };

  const tagColors = {
    blue: 'bg-blue-500',
    green: 'bg-emerald-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    gray: 'bg-slate-400',
  };

  const filterTags = ['green', 'red', 'orange', 'blue', 'gray'];

  const statusStyles = {
    Accepted: {
      text: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      glow: 'shadow-emerald-100',
    },
    Rejected: {
      text: 'text-red-700',
      bg: 'bg-red-50',
      border: 'border-red-100',
      glow: 'shadow-red-100',
    },
    Pending: {
      text: 'text-orange-700',
      bg: 'bg-orange-50',
      border: 'border-orange-100',
      glow: 'shadow-orange-100',
    },
  };

  const statusCards = ['Accepted', 'Rejected', 'Pending'].map((status) => ({
    label: status,
    value: applications.filter((app) => app.status === status).length,
    ...statusStyles[status],
  }));

  const filteredApplications = applications
    .filter((app) => {
      const matchesTab = app.status === activeTab;
      const matchesSearch =
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === 'all' || app.tag === selectedTag;
      return matchesTab && matchesSearch && matchesTag;
    })
    .sort((a, b) =>
      sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  function handleClearFilters() {
    setSearchTerm('');
    setSelectedTag('all');
    setActiveTab('Accepted');
  }

  function handleSort() {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }

  function handleOpenEdit(app) {
    setEditForm({ ...app });
    setApplications((prev) =>
      prev.map((item) =>
        item.id === app.id ? { ...item, isRead: true } : item
      )
    );
  }

  function handleSaveEdit() {
    setApplications((prev) =>
      prev.map((app) => (app.id === editForm.id ? { ...editForm } : app))
    );
    setActiveTab(editForm.status);
    setEditForm(null);
  }

  return (
    <div className="min-h-screen w-full bg-[#F6F8FC] px-6 pt-0 pb-8">
      <div className="mx-auto max-w-[1450px]">
        <div className="mb-3">
  <button
    onClick={() => switchView('adminDashboardView')}
    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
  >
    ← Dashboard
  </button>
</div>
       

        <section className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-xl">
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 px-8 py-8 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-blue-100">
              Admin Review
            </p>

            <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <h1 className="text-5xl font-extrabold tracking-tight">
                  Applications
                </h1>
                <p className="mt-3 max-w-2xl text-base font-medium text-blue-100">
                  Review, filter, and manage customer loan requests from one connected admin workspace.
                </p>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/15 px-5 py-4 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-100">
                  Total Requests
                </p>
                <p className="mt-1 text-3xl font-extrabold text-white">
                  {applications.length}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {statusCards.map((card) => (
                <button
                  key={card.label}
                  onClick={() => setActiveTab(card.label)}
                  className={`rounded-[1.7rem] border bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    activeTab === card.label
                      ? 'border-blue-300 ring-2 ring-blue-100'
                      : card.border
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-500">
                        {card.label}
                      </p>
                      <h2 className={`mt-2 text-4xl font-extrabold ${card.text}`}>
                        {card.value}
                      </h2>
                      <p className={`mt-1 text-xs font-bold ${card.text}`}>
                        +1 this week
                      </p>
                    </div>

                    <div className={`h-14 w-14 rounded-2xl border ${card.bg} ${card.border}`} />
                  </div>
                </button>
              ))}
            </div>

            <div className="rounded-[1.7rem] border border-slate-100 bg-slate-50/80 p-4">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
                <input
                  type="text"
                  placeholder="Search by name or loan type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-14 flex-1 rounded-2xl border border-slate-200 bg-white px-5 text-base font-medium text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setSelectedTag('all')}
                    className={`rounded-full px-4 py-2 text-xs font-extrabold transition ${
                      selectedTag === 'all'
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                        : 'bg-white text-slate-500 border border-slate-200'
                    }`}
                  >
                    All
                  </button>

                  <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    {filterTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`h-4 w-4 rounded-full transition hover:scale-125 ${tagColors[tag]} ${
                          selectedTag === tag
                            ? 'scale-125 ring-4 ring-blue-100'
                            : 'opacity-80'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleSort}
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                  </button>

                  <button
                    onClick={handleClearFilters}
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <section className="max-h-[520px] space-y-4 overflow-y-auto pr-2">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => handleOpenEdit(app)}
                    className={`group w-full rounded-[1.75rem] border p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl ${
                      app.isRead
                        ? 'border-slate-200 bg-white'
                        : 'border-blue-200 bg-blue-50'
                    }`}
                  >
                    <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-5">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-full text-xl font-extrabold ring-8 ${avatarColors[app.tag]}`}
                      >
                        {app.initials}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg font-extrabold text-slate-950">
                            {app.name}
                          </h2>

                          {!app.isRead && (
                            <span className="rounded-full border border-blue-200 bg-white px-2.5 py-1 text-[10px] font-extrabold text-blue-600">
                              NEW
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {app.type}
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-400">
                          Applied on {app.date}
                        </p>
                      </div>

                      <span className="hidden rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-extrabold text-blue-700 md:inline-flex">
                        {app.type}
                      </span>

                      <span className="text-3xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500">
                        ›
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                  <p className="text-sm font-bold text-slate-500">
                    No applications found.
                  </p>
                </div>
              )}
            </section>
          </div>
        </section>

        {editForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-[2rem] border border-white/70 bg-white p-7 shadow-2xl">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
                    Application Editor
                  </p>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                    Edit Application
                  </h2>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Update submitted customer details.
                  </p>
                </div>

                <button
                  onClick={() => setEditForm(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-xl font-bold text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-slate-700">
                    Applicant Name
                  </label>
                  <input
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-bold text-slate-700">
                    Loan Type
                  </label>
                  <input
                    value={editForm.type}
                    onChange={(e) =>
                      setEditForm({ ...editForm, type: e.target.value })
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-bold text-slate-700">
                    Application Date
                  </label>
                  <input
                    value={editForm.date}
                    onChange={(e) =>
                      setEditForm({ ...editForm, date: e.target.value })
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-bold text-slate-700">
                    Status
                  </label>
                  <select
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm({ ...editForm, status: e.target.value })
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none"
                  >
                    <option>Accepted</option>
                    <option>Rejected</option>
                    <option>Pending</option>
                  </select>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold text-slate-700">
                    Tag Color
                  </label>

                  <div className="flex gap-4">
                    {['blue', 'green', 'orange', 'red', 'gray'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setEditForm({ ...editForm, tag })}
                        className={`h-9 w-9 rounded-full ${tagColors[tag]} transition ${
                          editForm.tag === tag
                            ? 'scale-110 ring-4 ring-blue-100'
                            : 'opacity-90'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setEditForm({ ...editForm, isRead: false })}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Mark as Unread
                </button>

                <button
                  onClick={handleSaveEdit}
                  className="w-full rounded-2xl bg-slate-950 py-3 text-sm font-bold text-white shadow-lg shadow-slate-200 transition hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}