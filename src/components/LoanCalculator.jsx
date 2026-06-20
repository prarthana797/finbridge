import { useState } from 'react';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');

  const principal = Number(loanAmount) || 0;
  const annualRate = Number(interestRate) || 0;
  const years = Number(tenure) || 0;

  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;

  const emi =
    principal && monthlyRate && months
      ? Math.round(
          (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1)
        )
      : 0;

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  return (
    <div className="card !border-t-2 !border-t-[#2563EB]">
      <h3 className="text-lg font-semibold text-theme-primary mb-4">
        Loan EMI Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Input label="Loan Amount (₹)" value={loanAmount} onChange={setLoanAmount} />
        <Input label="Interest Rate (%)" value={interestRate} onChange={setInterestRate} />
        <Input label="Tenure (Years)" value={tenure} onChange={setTenure} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        <Result title="Monthly EMI" value={emi} />
        <Result title="Total Interest" value={totalInterest} />
        <Result title="Total Payment" value={totalPayment} />
      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className="input-field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Result({ title, value }) {
  return (
    <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
      <p className="text-sm text-theme-muted">{title}</p>
      <p className="text-xl font-bold text-theme-brand">
        ₹{Number(value || 0).toLocaleString()}
      </p>
    </div>
  );
}