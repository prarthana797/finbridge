import jsPDF from 'jspdf';
import { STATUS_FLOW_MAP } from '../contexts/AppContext.jsx';

export default function ApplicationPDF({ application }) {
  if (!application) return null;

  function formatValue(value) {
    if (value === true) return 'Yes';
    if (value === false) return 'No';
    if (value === null || value === undefined || value === '') return '-';
    return String(value);
  }

  function downloadPDF() {
    const doc = new jsPDF();

    const referenceId = `FT${String(application.id).slice(-8)}`;
    const statusLabel =
      STATUS_FLOW_MAP[application.status]?.label || application.status || 'Submitted';

    let y = 20;

    doc.setFontSize(18);
    doc.text('FinTech Application Report', 14, y);

    y += 10;
    doc.setFontSize(11);
    doc.text(`Reference ID: ${referenceId}`, 14, y);

    y += 7;
    doc.text(`Application ID: ${application.id}`, 14, y);

    y += 7;
    doc.text(`Date: ${new Date(application.date).toLocaleString()}`, 14, y);

    y += 7;
    doc.text(`Category: ${application.category}`, 14, y);

    y += 7;
    doc.text(`Scheme: ${application.scheme}`, 14, y);

    y += 7;
    doc.text(`Status: ${statusLabel}`, 14, y);

    y += 12;
    doc.setFontSize(14);
    doc.text('Submitted Details', 14, y);

    y += 8;
    doc.setFontSize(10);

    Object.entries(application.data || {}).forEach(([key, value]) => {
      const label = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (char) => char.toUpperCase());

      const text = `${label}: ${formatValue(value)}`;
      const lines = doc.splitTextToSize(text, 180);

      if (y > 275) {
        doc.addPage();
        y = 20;
      }

      doc.text(lines, 14, y);
      y += lines.length * 6;
    });

    doc.save(`${referenceId}-application.pdf`);
  }

  return (
    <button
      type="button"
      onClick={downloadPDF}
      className="btn-secondary !py-1.5 !px-3 text-xs"
    >
      Download PDF
    </button>
  );
}