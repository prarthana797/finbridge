import { useState } from 'react';

export default function EligibilityChecker() {
<<<<<<< HEAD
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
=======
  const [income, setIncome] = useState('');
  const [emi, setEmi] = useState('');
  const [creditScore, setCreditScore] = useState('');

  const monthlyIncome = Number(income) || 0;
  const existingEmi = Number(emi) || 0;
  const score = Number(creditScore) || 0;

  const hasInput = monthlyIncome > 0 || existingEmi > 0 || score > 0;

  const emiRatio = monthlyIncome > 0 ? (existingEmi / monthlyIncome) * 100 : 0;

  let eligibilityScore = 0;

  if (monthlyIncome >= 25000) eligibilityScore += 30;
  else if (monthlyIncome >= 15000) eligibilityScore += 20;
  else if (monthlyIncome > 0) eligibilityScore += 10;

  if (score >= 750) eligibilityScore += 40;
  else if (score >= 650) eligibilityScore += 25;
  else if (score >= 550) eligibilityScore += 10;

  if (emiRatio <= 30 && monthlyIncome > 0) eligibilityScore += 30;
  else if (emiRatio <= 50 && monthlyIncome > 0) eligibilityScore += 15;

  eligibilityScore = Math.min(eligibilityScore, 100);

  const approvalProbability =
    eligibilityScore >= 80
      ? 'High'
      : eligibilityScore >= 50
        ? 'Medium'
        : 'Low';

  const riskLevel =
    eligibilityScore >= 80
      ? 'Low Risk'
      : eligibilityScore >= 50
        ? 'Medium Risk'
        : 'High Risk';
>>>>>>> origin/feature/admin-review

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
<<<<<<< HEAD
            name="income"
            className="input-field"
            value={data.income}
            onChange={handleChange}
=======
            className="input-field"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
>>>>>>> origin/feature/admin-review
          />
        </div>

        <div>
          <label className="label">Existing EMI (₹)</label>
          <input
            type="text"
            inputMode="numeric"
<<<<<<< HEAD
            name="emi"
            className="input-field"
            value={data.emi}
            onChange={handleChange}
=======
            className="input-field"
            value={emi}
            onChange={(e) => setEmi(e.target.value)}
>>>>>>> origin/feature/admin-review
          />
        </div>

        <div>
          <label className="label">Credit Score</label>
          <input
            type="text"
            inputMode="numeric"
<<<<<<< HEAD
            name="creditScore"
            className="input-field"
            value={data.creditScore}
            onChange={handleChange}
=======
            className="input-field"
            value={creditScore}
            onChange={(e) => setCreditScore(e.target.value)}
>>>>>>> origin/feature/admin-review
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
<<<<<<< HEAD
        <Result title="Eligibility Score" value={`${eligibilityScore}%`} />
        <Result title="Approval Probability" value={`${approvalProbability}%`} />
        <Result title="Risk Level" value={riskLevel} />
=======
        <Result title="Eligibility Score" value={hasInput ? `${eligibilityScore}%` : '--'} />
        <Result title="Approval Probability" value={hasInput ? approvalProbability : '--'} />
        <Result title="Risk Level" value={hasInput ? riskLevel : '--'} />
>>>>>>> origin/feature/admin-review
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