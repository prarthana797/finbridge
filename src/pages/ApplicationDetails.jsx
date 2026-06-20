import { useApp } from '../contexts/AppContext.jsx';

export default function ApplicationDetails() {
  const { switchView, selectedApplication } = useApp();

  const app = selectedApplication;

  if (!app) {
    return (
      <div className="min-h-screen w-full bg-white p-6">
        <button onClick={() => switchView('serviceReviewView')}>
          ← Back
        </button>
        <p className="mt-6 text-gray-600">No application selected.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-white px-4 pt-5 pb-28">
      <button
        onClick={() => switchView('serviceReviewView')}
        className="mb-5 text-sm font-medium text-gray-600"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-gray-900">
        {app.type}
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        Review submitted customer information.
      </p>

      <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          {app.name}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Application ID: {app.id}
        </p>
      </div>
    </div>
  );
}