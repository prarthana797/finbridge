import { useMemo, useState } from 'react';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [tenure, setTenure] = useState(5);

  const result = useMemo(() => {
    const principal = Number(loanAmount) || 0;
    const rate = Number(interestRate) || 0;
    const years = Number(tenure) || 0;

    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

    let emi = 0;

    if (principal > 0 && monthlyRate > 0 && months > 0) {
      emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const monthlyEmi = Math.round(emi);
    const totalAmount = monthlyEmi * months;
    const totalInterest = Math.max(totalAmount - principal, 0);

    return {
      principal,
      monthlyEmi,
      totalInterest,
      totalAmount,
    };
  }, [loanAmount, interestRate, tenure]);

  const interestPercent =
    result.totalAmount > 0
      ? Math.round((result.totalInterest / result.totalAmount) * 100)
      : 0;

  function formatCurrency(value) {
    return `₹${Number(value || 0).toLocaleString('en-IN')}`;
  }

  return (
    <div className="card !border-t-2 !border-t-[#2563EB]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
          🧮
        </div>
        <div>
          <h3 className="text-xl font-bold text-theme-primary">
            EMI Calculator
          </h3>
          <p className="text-sm text-theme-muted">
            Calculate monthly EMI, interest and total payment.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side Inputs */}
        <div className="space-y-7">
          <SliderField
            label="Loan Amount"
            value={loanAmount}
            min={50000}
            max={10000000}
            step={50000}
            suffix=""
            displayValue={formatCurrency(loanAmount)}
            onChange={setLoanAmount}
          />

          <SliderField
            label="Rate of Interest (p.a)"
            value={interestRate}
            min={1}
            max={20}
            step={0.1}
            suffix="%"
            displayValue={`${interestRate}%`}
            onChange={setInterestRate}
          />

          <SliderField
            label="Loan Tenure"
            value={tenure}
            min={1}
            max={30}
            step={1}
            suffix="Yr"
            displayValue={`${tenure} Yr`}
            onChange={setTenure}
          />

          <div className="rounded-2xl bg-theme-bg border border-theme-light p-4 space-y-3">
            <SummaryRow label="Monthly EMI" value={formatCurrency(result.monthlyEmi)} />
            <SummaryRow label="Principal Amount" value={formatCurrency(result.principal)} />
            <SummaryRow label="Total Interest" value={formatCurrency(result.totalInterest)} />
            <SummaryRow label="Total Amount" value={formatCurrency(result.totalAmount)} />
          </div>
        </div>

        {/* Right Side Chart */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white border border-theme-light p-6">
          <div className="flex items-center gap-5 mb-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-4 h-2 rounded-full bg-[#E8ECFF]" />
              <span className="text-theme-muted">Principal amount</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-4 h-2 rounded-full bg-[#2563EB]" />
              <span className="text-theme-muted">Interest amount</span>
            </div>
          </div>

          <div
            className="relative w-48 h-48 rounded-full"
            style={{
              background: `conic-gradient(#2563EB 0% ${interestPercent}%, #E8ECFF ${interestPercent}% 100%)`,
            }}
          >
            <div className="absolute inset-8 rounded-full bg-white flex flex-col items-center justify-center text-center">
              <p className="text-xs text-theme-muted">Monthly EMI</p>
              <p className="text-2xl font-bold text-theme-primary">
                {formatCurrency(result.monthlyEmi)}
              </p>
            </div>
          </div>

          <div className="mt-6 w-full grid grid-cols-2 gap-3">
            <MiniCard title="Interest" value={formatCurrency(result.totalInterest)} />
            <MiniCard title="Total Pay" value={formatCurrency(result.totalAmount)} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  displayValue,
  onChange,
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-3">
        <label className="text-sm font-semibold text-theme-secondary">
          {label}
        </label>

        <input
          type="text"
          value={displayValue}
          readOnly
          className="w-28 rounded-lg bg-blue-50 px-3 py-2 text-right text-sm font-bold text-[#2563EB] outline-none"
        />
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#2563EB]"
      />

      <div className="flex justify-between text-[11px] text-theme-muted mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-theme-muted">{label}</span>
      <span className="text-sm font-bold text-theme-primary">{value}</span>
    </div>
  );
}

function MiniCard({ title, value }) {
  return (
    <div className="rounded-xl bg-blue-50 border border-blue-100 p-3 text-center">
      <p className="text-xs text-theme-muted">{title}</p>
      <p className="text-sm font-bold text-[#2563EB]">{value}</p>
    </div>
  );
}