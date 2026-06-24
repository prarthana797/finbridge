import { useState } from 'react';

export default function PensionCalculator({ type }) {
  const [values, setValues] = useState({
    currentAge: '',
    retirementAge: 60,
    monthlyContribution: '',
    expectedReturn: '',
    pensionAmount: '',
    investmentAmount: '',
  });

  function updateValue(e) {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const currentAge = Number(values.currentAge);
  const retirementAge = Number(values.retirementAge);
  const monthlyContribution = Number(values.monthlyContribution);
  const expectedReturn = Number(values.expectedReturn);
  const pensionAmount = Number(values.pensionAmount);
  const investmentAmount = Number(values.investmentAmount);

  const years = Math.max(retirementAge - currentAge, 0);
  const months = years * 12;
  const monthlyRate = expectedReturn / 100 / 12;

  const retirementCorpus =
    monthlyContribution && expectedReturn && months
      ? Math.round(
          monthlyContribution *
            (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
              (1 + monthlyRate))
        )
      : 0;

  const totalInvestment = monthlyContribution * months;
  const wealthGenerated = retirementCorpus - totalInvestment;
  const monthlyPension = Math.round(retirementCorpus * 0.006);

  const apyContribution =
    pensionAmount === 1000 ? 42 :
    pensionAmount === 2000 ? 84 :
    pensionAmount === 3000 ? 126 :
    pensionAmount === 4000 ? 168 :
    pensionAmount === 5000 ? 210 : 0;

  const pmSymContribution =
    currentAge <= 18 ? 55 :
    currentAge <= 25 ? 80 :
    currentAge <= 30 ? 105 :
    currentAge <= 40 ? 200 : 0;

  const seniorMonthlyPension = Math.round(investmentAmount * 0.00825);
  const seniorAnnualPension = seniorMonthlyPension * 12;

  return (
    <div className="card !border-t-2 !border-t-[#2563EB]">
      <h3 className="text-lg font-semibold text-theme-primary mb-4">
        Pension Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {type === 'nps' && (
          <>
            <Input label="Current Age" name="currentAge" value={values.currentAge} onChange={updateValue} />
            <Input label="Retirement Age" name="retirementAge" value={values.retirementAge} onChange={updateValue} />
            <Input label="Monthly Contribution (₹)" name="monthlyContribution" value={values.monthlyContribution} onChange={updateValue} />
            <Input label="Expected Return (%)" name="expectedReturn" value={values.expectedReturn} onChange={updateValue} />

            <Result label="Retirement Corpus" value={retirementCorpus} />
            <Result label="Monthly Pension" value={monthlyPension} />
            <Result label="Total Investment" value={totalInvestment} />
            <Result label="Wealth Generated" value={wealthGenerated} />
          </>
        )}

        {type === 'apy' && (
          <>
            <Input label="Age" name="currentAge" value={values.currentAge} onChange={updateValue} />

            <div>
              <label className="label">Pension Amount</label>
              <select name="pensionAmount" className="input-field" value={values.pensionAmount} onChange={updateValue}>
                <option value="">Select Pension</option>
                <option value="1000">₹1,000</option>
                <option value="2000">₹2,000</option>
                <option value="3000">₹3,000</option>
                <option value="4000">₹4,000</option>
                <option value="5000">₹5,000</option>
              </select>
            </div>

            <Result label="Monthly Contribution Required" value={apyContribution} />
          </>
        )}

        {type === 'pmSym' && (
          <>
            <Input label="Age" name="currentAge" value={values.currentAge} onChange={updateValue} />
            <Result label="Monthly Contribution" value={pmSymContribution} />
            <Result label="Government Contribution" value={pmSymContribution} />
          </>
        )}

        {type === 'senior' && (
          <>
            <Input label="Investment Amount (₹)" name="investmentAmount" value={values.investmentAmount} onChange={updateValue} />
            <Result label="Monthly Pension" value={seniorMonthlyPension} />
            <Result label="Annual Pension" value={seniorAnnualPension} />
          </>
        )}
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        name={name}
        value={value}
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
}

function Result({ label, value }) {
  return (
    <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
      <p className="text-sm text-theme-muted">{label}</p>
      <p className="text-xl font-bold text-theme-brand">
        ₹{Number(value || 0).toLocaleString()}
      </p>
    </div>
  );
}