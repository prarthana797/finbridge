import { useState } from 'react';

export default function EligibilityChecker() {
  const [data, setData] = useState({
    income: '',
    emi: '',
    creditScore: '',
  });

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const income = Number(data.income);
  const emi = Number(data.emi);
  const creditScore = Number(data.creditScore);

  const emiRatio = income > 0 ? (emi / income) * 100 : 0;

  let score = 0;

  if (income >= 50000) score += 35;
  else if (income >= 30000) score += 25;
  else if (income >= 15000) score += 15;

  if (creditScore >= 750) score += 40;
  else if (creditScore >= 700) score += 30;
  else if (creditScore >= 650) score += 20;
  else if (creditScore >= 600) score += 10;

  if (emiRatio <= 20) score += 25;
  else if (emiRatio <= 35) score += 15;
  else if (emiRatio <= 50) score += 5;

  const eligibilityScore = Math.min(score, 100);
  const approvalProbability = Math.min(score + 5, 100);

  const riskLevel =
    eligibilityScore >= 75 ? 'Low Risk' :
    eligibilityScore >= 50 ? 'Medium Risk' :
    'High Risk';

  return (
    <div className="card !border-t-2 !border-t-[#2563EB]">
      <h3 className="text-lg font-semibold text-theme-primary mb-4">
        AI Eligibility Checker
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="label">Monthly Income (₹)</label>
          <input
            type="text"
            inputMode="numeric"
            name="income"
            className="input-field"
            value={data.income}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="label">Existing EMI (₹)</label>
          <input
            type="text"
            inputMode="numeric"
            name="emi"
            className="input-field"
            value={data.emi}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="label">Credit Score</label>
          <input
            type="text"
            inputMode="numeric"
            name="creditScore"
            className="input-field"
            value={data.creditScore}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        <Result title="Eligibility Score" value={`${eligibilityScore}%`} />
        <Result title="Approval Probability" value={`${approvalProbability}%`} />
        <Result title="Risk Level" value={riskLevel} />
      </div>
    </div>
  );
}

function Result({ title, value }) {
  return (
    <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
      <p className="text-sm text-theme-muted">{title}</p>
      <p className="text-xl font-bold text-theme-brand">{value}</p>
    </div>
  );
}