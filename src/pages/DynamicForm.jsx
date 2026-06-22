import { useApp } from '../contexts/AppContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useEffect, useState } from 'react';
import PensionCalculator from '../components/PensionCalculator.jsx';
import EligibilityChecker from '../components/EligibilityChecker.jsx';
import LoanCalculator from '../components/LoanCalculator.jsx';
export default function DynamicForm() {
  const { currentCategory, currentScheme, openCategory, addSubmission, switchView } = useApp();
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setCurrentStep(0);
    setSubmitted(false);
    setFormData({});
  }, [currentScheme?.id, currentScheme?.name]);

  if (!currentCategory || !currentScheme) {
    switchView('schemesView');
    return null;
  }

  function handleChange(e) {
    const { name, type, value, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0]?.name || '' : type === 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addSubmission(formData, currentUser?.id);
    setSubmitted(true);
  }

  const schemeName = currentScheme.name.toLowerCase();

  const isPersonalLoan = schemeName.includes('personal');
  const isHomeLoan = schemeName.includes('home loan');
  const isCarLoan = schemeName.includes('car') || schemeName.includes('vehicle loan');
  const isEducationLoan = schemeName.includes('education') || schemeName.includes('edu');
  const isBusinessLoan = schemeName.includes('business');
  const isLifeInsurance = schemeName.includes('life insurance');
  const isHealthInsurance = schemeName.includes('health insurance');
  const isVehicleInsurance = schemeName.includes('vehicle insurance');
  const isTermInsurance = schemeName.includes('term');
  const isNps = schemeName.includes('national pension') || schemeName.includes('nps');
const isApy = schemeName.includes('atal') || schemeName.includes('apy');
const isPmSym = schemeName.includes('pm-sym') || schemeName.includes('shram yogi');
const isSeniorCitizenPension = schemeName.includes('senior citizen pension');
const isEShram = schemeName.includes('e-shram') || schemeName.includes('eshram');
const isPmKisan = schemeName.includes('pm kisan') || schemeName.includes('kisan');
const isLabourWelfare = schemeName.includes('labour welfare') || schemeName.includes('labor welfare');
const isScholarship = schemeName.includes('scholarship');

  const commonPersonalDetails = (prefix) => [
    ['Full Name', `${prefix}FullName`, 'text'],
    ['Date of Birth', `${prefix}DateOfBirth`, 'date'],
    ['Gender', `${prefix}Gender`, 'select', ['Male', 'Female', 'Other']],
    ['Marital Status', `${prefix}MaritalStatus`, 'select', ['Single', 'Married', 'Other']],
    ['Mobile Number', `${prefix}MobileNumber`, 'tel'],
    ['Email Address', `${prefix}EmailAddress`, 'email'],
    ['PAN Number', `${prefix}PanNumber`, 'text'],
    ['Aadhaar Number', `${prefix}AadhaarNumber`, 'text'],
    ['Residential Address', `${prefix}ResidentialAddress`, 'textarea'],
  ];

  const cityStatePin = (prefix) => [
    ['City', `${prefix}City`, 'text'],
    ['State', `${prefix}State`, 'text'],
    ['PIN Code', `${prefix}PinCode`, 'text'],
  ];

  const employeeFields = (prefix) => [
    ['Employment Type', `${prefix}EmploymentType`, 'select', ['Salaried', 'Self-Employed']],
    ['Company Name', `${prefix}CompanyName`, 'text'],
    ['Designation', `${prefix}Designation`, 'text'],
    ['Employee ID', `${prefix}EmployeeId`, 'text'],
    ['Monthly Salary', `${prefix}MonthlySalary`, 'number'],
    ['Work Experience', `${prefix}WorkExperience`, 'text'],
    ['Business Name', `${prefix}BusinessName`, 'text'],
    ['Business Type', `${prefix}BusinessType`, 'text'],
    ['Annual Income', `${prefix}AnnualIncome`, 'number'],
    ['GST Number', `${prefix}GstNumber`, 'text'],
    ['Years in Business', `${prefix}YearsInBusiness`, 'number'],
  ];

  const personalLoanSections = [
    {
      title: 'Personal Details',
      fields: [...commonPersonalDetails('personal'), ['Nationality', 'personalNationality', 'text']],
    },
    {
      title: 'Employment Details',
      fields: [
        ['Employment Type', 'personalEmploymentType', 'select', ['Salaried', 'Self-Employed']],
        ['Company Name', 'personalCompanyName', 'text'],
        ['Designation', 'personalDesignation', 'text'],
        ['Monthly Salary', 'personalMonthlySalary', 'number'],
        ['Office Address', 'personalOfficeAddress', 'textarea'],
      ],
    },
    {
      title: 'Financial Details',
      fields: [
        ['Monthly Income', 'personalMonthlyIncome', 'number'],
        ['Other Sources of Income', 'personalOtherIncome', 'text'],
        ['Existing EMIs', 'personalExistingEmis', 'number'],
        ['Credit Card Outstanding', 'personalCreditCardOutstanding', 'number'],
        ['Bank Account Details', 'personalBankAccountDetails', 'text'],
        ['Savings & Investments', 'personalSavingsInvestments', 'text'],
      ],
    },
    {
      title: 'Loan Details',
      fields: [
        ['Loan Amount Required', 'personalLoanAmountRequired', 'number'],
        ['Purpose of Loan', 'personalPurposeOfLoan', 'select', ['Education', 'Medical Emergency', 'Wedding', 'Travel', 'Home Renovation', 'Debt Consolidation', 'Other']],
        ['Preferred Loan Tenure (Months/Years)', 'personalPreferredLoanTenure', 'text'],
      ],
    },
    {
      title: 'Upload Documents',
      fields: [
        ['PAN Card', 'personalPanCard', 'file'],
        ['Aadhaar Card', 'personalAadhaarCard', 'file'],
        ['Passport Photo', 'personalPassportPhoto', 'file'],
        ['Salary Slips (Last 3 Months)', 'personalSalarySlips', 'file'],
        ['Bank Statement (Last 6 Months)', 'personalBankStatement', 'file'],
        ['Form 16 / ITR', 'personalForm16Itr', 'file'],
      ],
    },
    {
      title: 'Review & Submit',
      fields: [
        ['Credit Score (CIBIL)', 'personalCreditScore', 'number'],
        ['Existing Loans', 'personalExistingLoans', 'text'],
        ['Debt-to-Income Ratio', 'personalDebtToIncomeRatio', 'text'],
        ['Review Notes', 'personalReviewNotes', 'textarea'],
      ],
    },
  ];

  const homeLoanSections = [
    {
      title: 'Applicant Details',
      fields: [
        ['Full Name', 'homeFullName', 'text'],
        ['Date of Birth', 'homeDateOfBirth', 'date'],
        ['Gender', 'homeGender', 'select', ['Male', 'Female', 'Other']],
        ['Marital Status', 'homeMaritalStatus', 'select', ['Single', 'Married', 'Other']],
        ['Mobile Number', 'homeMobileNumber', 'tel'],
        ['Email Address', 'homeEmailAddress', 'email'],
        ['PAN Number', 'homePanNumber', 'text'],
        ['Aadhaar Number', 'homeAadhaarNumber', 'text'],
        ['Current Address', 'homeCurrentAddress', 'textarea'],
        ['Permanent Address', 'homePermanentAddress', 'textarea'],
      ],
    },
    {
      title: 'Employment Details',
      fields: [
        ['Employment Type', 'homeEmploymentType', 'select', ['Salaried', 'Self-Employed']],
        ['Company Name', 'homeCompanyName', 'text'],
        ['Designation', 'homeDesignation', 'text'],
        ['Monthly Salary', 'homeMonthlySalary', 'number'],
        ['Work Experience', 'homeWorkExperience', 'text'],
        ['Business Name', 'homeBusinessName', 'text'],
        ['Business Type', 'homeBusinessType', 'text'],
        ['Annual Income', 'homeAnnualIncome', 'number'],
        ['GST Number (if applicable)', 'homeGstNumber', 'text'],
        ['Years in Business', 'homeYearsInBusiness', 'number'],
      ],
    },
    {
      title: 'Financial Information',
      fields: [
        ['Monthly Income', 'homeMonthlyIncome', 'number'],
        ['Existing EMIs', 'homeExistingEmis', 'number'],
        ['Credit Card Liabilities', 'homeCreditCardLiabilities', 'number'],
        ['Savings & Investments', 'homeSavingsInvestments', 'text'],
        ['Bank Account Details', 'homeBankAccountDetails', 'text'],
        ['Credit Score (CIBIL)', 'homeCreditScore', 'number'],
      ],
    },
    {
      title: 'Property Details',
      fields: [
        ['Property Type', 'homePropertyType', 'select', ['Apartment', 'Villa', 'Independent House', 'Plot + Construction']],
        ['Property Address', 'homePropertyAddress', 'textarea'],
        ['Property Value', 'homePropertyValue', 'number'],
        ['Builder/Seller Name', 'homeBuilderSellerName', 'text'],
        ['Property Age', 'homePropertyAge', 'text'],
        ['Property Size (sq.ft)', 'homePropertySize', 'number'],
      ],
    },
    {
      title: 'Loan Details',
      fields: [
        ['Loan Amount Required', 'homeLoanAmountRequired', 'number'],
        ['Property Cost', 'homePropertyCost', 'number'],
        ['Down Payment Amount', 'homeDownPaymentAmount', 'number'],
        ['Loan Tenure (Years)', 'homeLoanTenure', 'number'],
        ['Interest Type', 'homeInterestType', 'select', ['Fixed', 'Floating']],
      ],
    },
    {
      title: 'Co-Applicant Details',
      fields: [
        ['Co-Applicant Name', 'homeCoApplicantName', 'text'],
        ['Relationship', 'homeRelationship', 'text'],
        ['Income Details', 'homeCoApplicantIncome', 'text'],
        ['PAN & Aadhaar', 'homeCoApplicantPanAadhaar', 'text'],
      ],
    },
    {
      title: 'Document Upload',
      fields: [
        ['Aadhaar Card', 'homeAadhaarCard', 'file'],
        ['PAN Card', 'homePanCard', 'file'],
        ['Passport/Voter ID', 'homePassportVoterId', 'file'],
        ['Salary Slips (Last 3–6 Months)', 'homeSalarySlips', 'file'],
        ['Bank Statements (Last 6–12 Months)', 'homeBankStatements', 'file'],
        ['Form 16 / ITR', 'homeForm16Itr', 'file'],
        ['Sale Agreement', 'homeSaleAgreement', 'file'],
        ['Property Title Deed', 'homePropertyTitleDeed', 'file'],
        ['Encumbrance Certificate', 'homeEncumbranceCertificate', 'file'],
        ['Approved Building Plan', 'homeApprovedBuildingPlan', 'file'],
        ['Property Tax Receipts', 'homePropertyTaxReceipts', 'file'],
      ],
    },
    {
      title: 'EMI Preview & Review',
      fields: [
        ['Estimated EMI', 'homeEstimatedEmi', 'number'],
        ['Review Notes', 'homeReviewNotes', 'textarea'],
      ],
    },
  ];

  const carLoanSections = [
    { title: 'Personal Details', fields: commonPersonalDetails('car') },
    { title: 'Employment Details', fields: employeeFields('car') },
    {
      title: 'Financial Details',
      fields: [
        ['Monthly Income', 'carMonthlyIncome', 'number'],
        ['Existing EMIs', 'carExistingEmis', 'number'],
        ['Credit Card Dues', 'carCreditCardDues', 'number'],
        ['Bank Account Details', 'carBankAccountDetails', 'text'],
        ['Credit Score (CIBIL)', 'carCreditScore', 'number'],
      ],
    },
    {
      title: 'Vehicle Details',
      fields: [
        ['Vehicle Type', 'carVehicleType', 'select', ['Car', 'SUV', 'Electric Vehicle']],
        ['New or Used Vehicle', 'carVehicleCondition', 'select', ['New', 'Used']],
        ['Manufacturer', 'carManufacturer', 'select', ['Toyota', 'Hyundai', 'Tata Motors', 'Mahindra', 'Maruti Suzuki', 'Honda', 'Other']],
        ['Model Name', 'carModelName', 'text'],
        ['Variant', 'carVariant', 'text'],
        ['Ex-Showroom Price', 'carExShowroomPrice', 'number'],
        ['On-Road Price', 'carOnRoadPrice', 'number'],
        ['Dealer Name', 'carDealerName', 'text'],
      ],
    },
    {
      title: 'Loan Details',
      fields: [
        ['Loan Amount Required', 'carLoanAmountRequired', 'number'],
        ['Down Payment Amount', 'carDownPaymentAmount', 'number'],
        ['Loan Tenure (1–7 Years)', 'carLoanTenure', 'select', ['1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years', '7 Years']],
      ],
    },
    {
      title: 'Co-Applicant Details',
      fields: [
        ['Name', 'carCoApplicantName', 'text'],
        ['Relationship', 'carCoApplicantRelationship', 'text'],
        ['Income Details', 'carCoApplicantIncome', 'text'],
      ],
    },
    {
      title: 'Upload Documents',
      fields: [
        ['Aadhaar Card', 'carAadhaarCard', 'file'],
        ['PAN Card', 'carPanCard', 'file'],
        ['Passport/Voter ID', 'carPassportVoterId', 'file'],
        ['Utility Bill', 'carUtilityBill', 'file'],
        ['Rental Agreement', 'carRentalAgreement', 'file'],
        ['Salary Slips (Last 3 Months)', 'carSalarySlips', 'file'],
        ['Bank Statements (Last 6 Months)', 'carBankStatements', 'file'],
        ['Form 16 / ITR', 'carForm16Itr', 'file'],
        ['Vehicle Quotation from Dealer', 'carVehicleQuotation', 'file'],
        ['Proforma Invoice', 'carProformaInvoice', 'file'],
      ],
    },
    {
      title: 'EMI Calculator & Review',
      fields: [
        ['Estimated EMI', 'carEstimatedEmi', 'number'],
        ['Review Notes', 'carReviewNotes', 'textarea'],
      ],
    },
  ];

  const educationLoanSections = [
    {
      title: 'Student Details',
      fields: [
        ['Full Name', 'eduFullName', 'text'],
        ['Date of Birth', 'eduDateOfBirth', 'date'],
        ['Gender', 'eduGender', 'select', ['Male', 'Female', 'Other']],
        ['Mobile Number', 'eduMobileNumber', 'tel'],
        ['Email Address', 'eduEmailAddress', 'email'],
        ['Aadhaar Number', 'eduAadhaarNumber', 'text'],
        ['PAN Number (if available)', 'eduPanNumber', 'text'],
        ['Residential Address', 'eduResidentialAddress', 'textarea'],
      ],
    },
    {
      title: 'Academic Details',
      fields: [
        ['Course Name', 'eduCourseName', 'text'],
        ['Degree Type', 'eduDegreeType', 'select', ['B.Tech', 'MBA', 'MBBS', 'MS', 'B.Sc', 'M.Tech', 'Other']],
        ['College/University Name', 'eduCollegeName', 'text'],
        ['Country of Study', 'eduCountryOfStudy', 'text'],
        ['Admission Status', 'eduAdmissionStatus', 'select', ['Applied', 'Admitted']],
        ['Entrance Exam Scores (if applicable)', 'eduEntranceExamScores', 'text'],
        ['Academic Records (10th, 12th, UG Marks)', 'eduAcademicRecords', 'textarea'],
      ],
    },
    {
      title: 'Loan Details',
      fields: [
        ['Loan Amount Required', 'eduLoanAmountRequired', 'number'],
        ['Tuition Fees', 'eduTuitionFees', 'number'],
        ['Hostel Fees', 'eduHostelFees', 'number'],
        ['Books & Equipment Costs', 'eduBooksEquipmentCosts', 'number'],
        ['Travel Expenses (for overseas studies)', 'eduTravelExpenses', 'number'],
        ['Loan Tenure', 'eduLoanTenure', 'text'],
        ['Moratorium Period', 'eduMoratoriumPeriod', 'text'],
      ],
    },
    {
      title: 'Parent/Guardian Details',
      fields: [
        ['Full Name', 'eduGuardianFullName', 'text'],
        ['Relationship to Student', 'eduGuardianRelationship', 'text'],
        ['Mobile Number', 'eduGuardianMobileNumber', 'tel'],
        ['Email Address', 'eduGuardianEmailAddress', 'email'],
        ['PAN Number', 'eduGuardianPanNumber', 'text'],
        ['Aadhaar Number', 'eduGuardianAadhaarNumber', 'text'],
        ['Address', 'eduGuardianAddress', 'textarea'],
      ],
    },
    {
      title: 'Income Details',
      fields: [
        ['Employment Type', 'eduGuardianEmploymentType', 'select', ['Salaried', 'Self-Employed']],
        ['Employer Name', 'eduEmployerName', 'text'],
        ['Designation', 'eduGuardianDesignation', 'text'],
        ['Monthly Income', 'eduGuardianMonthlyIncome', 'number'],
        ['Salary Slips', 'eduSalarySlips', 'file'],
        ['Business Name', 'eduGuardianBusinessName', 'text'],
        ['Annual Income', 'eduGuardianAnnualIncome', 'number'],
        ['GST Details', 'eduGstDetails', 'text'],
        ['ITR Documents', 'eduItrDocuments', 'file'],
      ],
    },
    {
      title: 'Document Upload',
      fields: [
        ['Student Aadhaar Card', 'eduStudentAadhaarCard', 'file'],
        ['Student PAN Card', 'eduStudentPanCard', 'file'],
        ['Admission Letter', 'eduAdmissionLetter', 'file'],
        ['Fee Structure', 'eduFeeStructure', 'file'],
        ['Academic Mark Sheets', 'eduMarkSheets', 'file'],
        ['Parent/Guardian PAN Card', 'eduGuardianPanCard', 'file'],
        ['Parent/Guardian Aadhaar Card', 'eduGuardianAadhaarCard', 'file'],
        ['Bank Statements', 'eduBankStatements', 'file'],
      ],
    },
    {
      title: 'Review & Submit',
      fields: [['Review Notes', 'eduReviewNotes', 'textarea']],
    },
  ];

  const businessLoanSections = [
    {
      title: 'Applicant Details',
      fields: [
        ['Full Name', 'businessApplicantFullName', 'text'],
        ['Date of Birth', 'businessApplicantDob', 'date'],
        ['Gender', 'businessApplicantGender', 'select', ['Male', 'Female', 'Other']],
        ['Mobile Number', 'businessApplicantMobile', 'tel'],
        ['Email Address', 'businessApplicantEmail', 'email'],
        ['PAN Number', 'businessApplicantPan', 'text'],
        ['Aadhaar Number', 'businessApplicantAadhaar', 'text'],
        ['Residential Address', 'businessApplicantAddress', 'textarea'],
      ],
    },
    {
      title: 'Business Details',
      fields: [
        ['Business Name', 'businessName', 'text'],
        ['Business Type', 'businessType', 'select', ['Sole Proprietorship', 'Partnership', 'LLP', 'Private Limited Company', 'Public Limited Company']],
        ['Industry Type', 'industryType', 'text'],
        ['Years in Business', 'yearsInBusiness', 'number'],
        ['GST Number', 'gstNumber', 'text'],
        ['UDYAM/MSME Registration Number (if applicable)', 'udyamMsmeNumber', 'text'],
        ['Business Address', 'businessAddress', 'textarea'],
      ],
    },
    {
      title: 'Financial Information',
      fields: [
        ['Annual Turnover', 'annualTurnover', 'number'],
        ['Monthly Revenue', 'monthlyRevenue', 'number'],
        ['Annual Profit', 'annualProfit', 'number'],
        ['Existing Business Loans', 'existingBusinessLoans', 'text'],
        ['Existing EMIs', 'businessExistingEmis', 'number'],
        ['Business Bank Account Details', 'businessBankAccountDetails', 'text'],
        ['Credit Score (CIBIL)', 'businessCreditScore', 'number'],
      ],
    },
    {
      title: 'Loan Details',
      fields: [
        ['Loan Amount Required', 'businessLoanAmountRequired', 'number'],
        ['Loan Purpose', 'businessLoanPurpose', 'select', ['Working Capital', 'Business Expansion', 'Equipment Purchase', 'Inventory Purchase', 'Machinery Purchase', 'Franchise Setup', 'Other']],
        ['Loan Tenure', 'businessLoanTenure', 'text'],
        ['Preferred EMI Range', 'businessPreferredEmiRange', 'text'],
      ],
    },
    {
      title: 'Co-Applicant / Guarantor Details',
      fields: [
        ['Full Name', 'businessGuarantorFullName', 'text'],
        ['Relationship', 'businessGuarantorRelationship', 'text'],
        ['Mobile Number', 'businessGuarantorMobile', 'tel'],
        ['PAN Number', 'businessGuarantorPan', 'text'],
        ['Aadhaar Number', 'businessGuarantorAadhaar', 'text'],
        ['Income Details', 'businessGuarantorIncomeDetails', 'text'],
      ],
    },
    {
      title: 'Document Upload',
      fields: [
        ['Aadhaar Card', 'businessAadhaarCard', 'file'],
        ['PAN Card', 'businessPanCard', 'file'],
        ['Passport/Voter ID', 'businessPassportVoterId', 'file'],
        ['GST Certificate', 'businessGstCertificate', 'file'],
        ['UDYAM/MSME Certificate', 'businessUdyamCertificate', 'file'],
        ['Trade License', 'businessTradeLicense', 'file'],
        ['Partnership Deed / Incorporation Certificate', 'businessPartnershipDeed', 'file'],
        ['Bank Statements (Last 6–12 Months)', 'businessBankStatements', 'file'],
        ['Income Tax Returns (Last 2 Years)', 'businessItr', 'file'],
        ['Profit & Loss Statement', 'businessProfitLoss', 'file'],
        ['Balance Sheet', 'businessBalanceSheet', 'file'],
        ['GST Returns', 'businessGstReturns', 'file'],
        ['Business Address Proof', 'businessAddressProof', 'file'],
        ['Cancelled Cheque', 'businessCancelledCheque', 'file'],
        ['Existing Loan Statements (if any)', 'businessExistingLoanStatements', 'file'],
      ],
    },
    {
      title: 'Eligibility & EMI Preview',
      fields: [
        ['Eligibility Score', 'businessEligibilityScore', 'number'],
        ['Estimated EMI', 'businessEstimatedEmi', 'number'],
      ],
    },
    {
      title: 'Review & Submit',
      fields: [['Review Notes', 'businessReviewNotes', 'textarea']],
    },
  ];

  const lifeInsuranceSections = [
    {
      title: 'Personal Details',
      fields: [
        ...commonPersonalDetails('life'),
        ['Nationality', 'lifeNationality', 'text'],
        ['Occupation', 'lifeOccupation', 'text'],
      ],
    },
    { title: 'Employment Details', fields: employeeFields('life') },
    {
      title: 'Financial Details',
      fields: [
        ['Annual Income', 'lifeAnnualIncome', 'number'],
        ['Existing Loans', 'lifeExistingLoans', 'text'],
        ['Existing EMIs', 'lifeExistingEmis', 'number'],
        ['Savings & Investments', 'lifeSavingsInvestments', 'text'],
        ['Bank Account Details', 'lifeBankAccountDetails', 'text'],
      ],
    },
    {
      title: 'Health & Lifestyle Details',
      fields: [
        ['Height', 'lifeHeight', 'number'],
        ['Weight', 'lifeWeight', 'number'],
        ['Blood Group', 'lifeBloodGroup', 'select', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']],
        ['Smoking Habit', 'lifeSmoking', 'select', ['Yes', 'No']],
        ['Alcohol Consumption', 'lifeAlcohol', 'select', ['Yes', 'No']],
        ['Existing Medical Conditions', 'lifeMedicalConditions', 'textarea'],
        ['Current Medications', 'lifeCurrentMedications', 'textarea'],
        ['Family Medical History', 'lifeFamilyMedicalHistory', 'textarea'],
        ['Previous Surgeries (if any)', 'lifePreviousSurgeries', 'textarea'],
      ],
    },
    {
      title: 'Insurance Plan Details',
      fields: [
        ['Insurance Type', 'lifeInsuranceType', 'select', ['Term Insurance', 'Whole Life Insurance', 'Endowment Plan', 'ULIP', 'Child Plan', 'Retirement Plan']],
        ['Sum Assured Required', 'lifeSumAssured', 'number'],
        ['Policy Term (Years)', 'lifePolicyTerm', 'number'],
        ['Premium Payment Frequency', 'lifePremiumFrequency', 'select', ['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly']],
        ['Riders Required', 'lifeRiders', 'select', ['Accidental Death Benefit', 'Critical Illness Cover', 'Disability Cover', 'Waiver of Premium']],
      ],
    },
    {
      title: 'Nominee Details',
      fields: [
        ['Nominee Name', 'lifeNomineeName', 'text'],
        ['Relationship', 'lifeNomineeRelationship', 'text'],
        ['Date of Birth', 'lifeNomineeDob', 'date'],
        ['Mobile Number', 'lifeNomineeMobile', 'tel'],
        ['Percentage Share', 'lifeNomineeShare', 'number'],
        ['Address', 'lifeNomineeAddress', 'textarea'],
      ],
    },
    {
      title: 'Document Upload',
      fields: [
        ['Aadhaar Card', 'lifeAadhaarCard', 'file'],
        ['PAN Card', 'lifePanCard', 'file'],
        ['Passport / Voter ID', 'lifePassportVoterId', 'file'],
        ['Salary Slips (Last 3 Months)', 'lifeSalarySlips', 'file'],
        ['Bank Statements (Last 6 Months)', 'lifeBankStatements', 'file'],
        ['Form 16 / ITR', 'lifeForm16Itr', 'file'],
        ['Health Reports', 'lifeHealthReports', 'file'],
        ['Medical Test Reports (if required)', 'lifeMedicalReports', 'file'],
        ['Passport Size Photo', 'lifePassportPhoto', 'file'],
      ],
    },
    {
      title: 'Premium Estimate',
      fields: [
        ['Sum Assured', 'lifePremiumSumAssured', 'number'],
        ['Policy Term', 'lifePremiumPolicyTerm', 'number'],
        ['Estimated Premium', 'lifeEstimatedPremium', 'number'],
        ['Rider Charges', 'lifeRiderCharges', 'number'],
        ['Total Premium', 'lifeTotalPremium', 'number'],
      ],
    },
    {
      title: 'Review & Submit',
      fields: [
        ['Review Application', 'lifeReviewApplication', 'textarea'],
        ['Accept Terms & Conditions', 'lifeAcceptTerms', 'checkbox'],
        ['e-Signature Checkbox', 'lifeESignature', 'checkbox'],
      ],
    },
  ];

  const healthInsuranceSections = [
    {
      title: 'Personal Details',
      fields: [...commonPersonalDetails('health'), ...cityStatePin('health')],
    },
    {
      title: 'Family Details',
      fields: [
        ['Policy Type', 'healthPolicyType', 'select', ['Individual', 'Family Floater', 'Senior Citizen', 'Critical Illness']],
        ['Member 1 Full Name', 'healthMember1Name', 'text'],
        ['Member 1 Relationship', 'healthMember1Relationship', 'text'],
        ['Member 1 Date of Birth', 'healthMember1Dob', 'date'],
        ['Member 1 Gender', 'healthMember1Gender', 'select', ['Male', 'Female', 'Other']],
        ['Member 2 Full Name', 'healthMember2Name', 'text'],
        ['Member 2 Relationship', 'healthMember2Relationship', 'text'],
        ['Member 2 Date of Birth', 'healthMember2Dob', 'date'],
        ['Member 2 Gender', 'healthMember2Gender', 'select', ['Male', 'Female', 'Other']],
      ],
    },
    {
      title: 'Health Information',
      fields: [
        ['Height (cm)', 'healthHeight', 'number'],
        ['Weight (kg)', 'healthWeight', 'number'],
        ['Blood Group', 'healthBloodGroup', 'select', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']],
        ['Existing Medical Conditions', 'healthMedicalConditions', 'select', ['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Thyroid', 'Kidney Disease', 'Cancer', 'Other', 'None']],
        ['Current Medications', 'healthCurrentMedications', 'textarea'],
        ['Previous Hospitalization', 'healthPreviousHospitalization', 'select', ['Yes', 'No']],
        ['Previous Surgeries', 'healthPreviousSurgeries', 'select', ['Yes', 'No']],
        ['Family Medical History', 'healthFamilyMedicalHistory', 'select', ['Heart Disease', 'Diabetes', 'Cancer', 'Hypertension', 'None']],
      ],
    },
    {
      title: 'Lifestyle Details',
      fields: [
        ['Smoking Habit', 'healthSmoking', 'select', ['Yes', 'No']],
        ['Alcohol Consumption', 'healthAlcohol', 'select', ['Yes', 'No']],
        ['Tobacco Usage', 'healthTobacco', 'select', ['Yes', 'No']],
        ['Exercise Frequency', 'healthExerciseFrequency', 'select', ['Daily', 'Weekly', 'Rarely', 'Never']],
      ],
    },
    {
      title: 'Policy Details',
      fields: [
        ['Insurance Type', 'healthInsuranceType', 'select', ['Individual Health Insurance', 'Family Floater', 'Senior Citizen Plan', 'Critical Illness Plan', 'Personal Accident Cover']],
        ['Sum Insured', 'healthSumInsured', 'select', ['₹3 Lakhs', '₹5 Lakhs', '₹10 Lakhs', '₹15 Lakhs', '₹25 Lakhs', '₹50 Lakhs']],
        ['Policy Tenure', 'healthPolicyTenure', 'select', ['1 Year', '2 Years', '3 Years']],
        ['Add-ons', 'healthAddOns', 'select', ['Room Rent Waiver', 'Critical Illness Rider', 'Maternity Cover', 'OPD Cover', 'Personal Accident Cover']],
      ],
    },
    {
      title: 'Employment & Income Details',
      fields: [
        ['Occupation', 'healthOccupation', 'text'],
        ['Employment Type', 'healthEmploymentType', 'select', ['Salaried', 'Self-Employed', 'Student', 'Retired', 'Other']],
        ['Employer Name', 'healthEmployerName', 'text'],
        ['Annual Income', 'healthAnnualIncome', 'number'],
      ],
    },
    {
      title: 'Document Upload',
      fields: [
        ['Aadhaar Card', 'healthAadhaarCard', 'file'],
        ['PAN Card', 'healthPanCard', 'file'],
        ['Passport / Voter ID', 'healthPassportVoterId', 'file'],
        ['Utility Bill', 'healthUtilityBill', 'file'],
        ['Rental Agreement', 'healthRentalAgreement', 'file'],
        ['Health Reports', 'healthHealthReports', 'file'],
        ['Prescription Records', 'healthPrescriptionRecords', 'file'],
        ['Previous Insurance Policy', 'healthPreviousPolicy', 'file'],
        ['Passport Size Photo', 'healthPassportPhoto', 'file'],
      ],
    },
    {
      title: 'Premium Estimate',
      fields: [
        ['Selected Plan', 'healthSelectedPlan', 'text'],
        ['Sum Insured', 'healthEstimateSumInsured', 'text'],
        ['Members Covered', 'healthMembersCovered', 'number'],
        ['Add-ons Selected', 'healthAddOnsSelected', 'text'],
        ['Estimated Premium', 'healthEstimatedPremium', 'number'],
      ],
    },
    {
      title: 'Review & Submit',
      fields: [
        ['Review Details', 'healthReviewDetails', 'textarea'],
        ['Terms & Conditions Checkbox', 'healthTerms', 'checkbox'],
        ['Declaration Checkbox', 'healthDeclaration', 'checkbox'],
      ],
    },
  ];

  const vehicleInsuranceSections = [
    {
      title: 'Personal Details',
      fields: [...commonPersonalDetails('vehicleIns'), ...cityStatePin('vehicleIns'), ['Nationality', 'vehicleInsNationality', 'text']],
    },
    { title: 'Employment Details', fields: employeeFields('vehicleIns') },
    {
      title: 'Financial Details',
      fields: [
        ['Monthly Income', 'vehicleInsMonthlyIncome', 'number'],
        ['Annual Income', 'vehicleInsAnnualIncome', 'number'],
        ['Existing EMIs', 'vehicleInsExistingEmis', 'number'],
        ['Existing Loans', 'vehicleInsExistingLoans', 'text'],
        ['Credit Card Outstanding', 'vehicleInsCreditCardOutstanding', 'number'],
        ['Credit Score (CIBIL)', 'vehicleInsCreditScore', 'number'],
        ['Bank Name', 'vehicleInsBankName', 'text'],
        ['Account Number', 'vehicleInsAccountNumber', 'text'],
        ['IFSC Code', 'vehicleInsIfscCode', 'text'],
        ['Savings & Investments', 'vehicleInsSavingsInvestments', 'text'],
      ],
    },
    {
      title: 'Vehicle Details',
      fields: [
        ['Vehicle Type', 'vehicleInsVehicleType', 'select', ['Car', 'Bike', 'SUV', 'EV', 'Commercial Vehicle']],
        ['New or Used Vehicle', 'vehicleInsVehicleCondition', 'select', ['New', 'Used']],
        ['Manufacturer', 'vehicleInsManufacturer', 'select', ['Hyundai', 'Toyota', 'Honda', 'Tata', 'Mahindra', 'Kia', 'BMW', 'Audi', 'Other']],
        ['Model Name', 'vehicleInsModelName', 'text'],
        ['Variant', 'vehicleInsVariant', 'text'],
        ['Fuel Type', 'vehicleInsFuelType', 'select', ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid']],
        ['Manufacturing Year', 'vehicleInsManufacturingYear', 'number'],
        ['Ex-Showroom Price', 'vehicleInsExShowroomPrice', 'number'],
        ['On-Road Price', 'vehicleInsOnRoadPrice', 'number'],
        ['Dealer Name', 'vehicleInsDealerName', 'text'],
        ['Dealer Location', 'vehicleInsDealerLocation', 'text'],
      ],
    },
    {
      title: 'Policy / Loan Details',
      fields: [
        ['Loan Amount Required', 'vehicleInsLoanAmountRequired', 'number'],
        ['Down Payment Amount', 'vehicleInsDownPaymentAmount', 'number'],
        ['Loan Tenure', 'vehicleInsLoanTenure', 'select', ['1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years', '7 Years']],
        ['Preferred EMI Range', 'vehicleInsPreferredEmiRange', 'text'],
        ['Interest Rate Preference', 'vehicleInsInterestPreference', 'select', ['Fixed', 'Floating']],
      ],
    },
    {
      title: 'Co-Applicant Details',
      fields: [
        ['Full Name', 'vehicleInsCoApplicantName', 'text'],
        ['Relationship', 'vehicleInsCoApplicantRelationship', 'text'],
        ['Mobile Number', 'vehicleInsCoApplicantMobile', 'tel'],
        ['PAN Number', 'vehicleInsCoApplicantPan', 'text'],
        ['Aadhaar Number', 'vehicleInsCoApplicantAadhaar', 'text'],
        ['Occupation', 'vehicleInsCoApplicantOccupation', 'text'],
        ['Monthly Income', 'vehicleInsCoApplicantMonthlyIncome', 'number'],
        ['Credit Score', 'vehicleInsCoApplicantCreditScore', 'number'],
      ],
    },
    {
      title: 'Document Upload',
      fields: [
        ['Aadhaar Card', 'vehicleInsAadhaarCard', 'file'],
        ['PAN Card', 'vehicleInsPanCard', 'file'],
        ['Passport / Voter ID', 'vehicleInsPassportVoterId', 'file'],
        ['Utility Bill', 'vehicleInsUtilityBill', 'file'],
        ['Rental Agreement', 'vehicleInsRentalAgreement', 'file'],
        ['Salary Slips (Last 3 Months)', 'vehicleInsSalarySlips', 'file'],
        ['Bank Statements (Last 6 Months)', 'vehicleInsBankStatements', 'file'],
        ['Form 16 / ITR', 'vehicleInsForm16Itr', 'file'],
        ['Vehicle Quotation from Dealer', 'vehicleInsVehicleQuotation', 'file'],
        ['Proforma Invoice', 'vehicleInsProformaInvoice', 'file'],
        ['Vehicle Specification Sheet', 'vehicleInsVehicleSpecSheet', 'file'],
      ],
    },
    {
      title: 'Eligibility & EMI Preview',
      fields: [
        ['Estimated EMI', 'vehicleInsEstimatedEmi', 'number'],
        ['Maximum Eligible Loan Amount', 'vehicleInsMaxEligibleLoanAmount', 'number'],
        ['Eligibility Score', 'vehicleInsEligibilityScore', 'number'],
        ['Approval Probability', 'vehicleInsApprovalProbability', 'number'],
        ['Debt-to-Income Ratio', 'vehicleInsDebtToIncomeRatio', 'text'],
        ['Bank Recommendations', 'vehicleInsBankRecommendations', 'select', ['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Tata Capital', 'Bajaj Finance']],
      ],
    },
    {
      title: 'Review & Submit',
      fields: [
        ['Review Details', 'vehicleInsReviewDetails', 'textarea'],
        ['Terms & Conditions Checkbox', 'vehicleInsTerms', 'checkbox'],
        ['Consent for Credit Check', 'vehicleInsCreditCheckConsent', 'checkbox'],
      ],
    },
  ];

  const termInsuranceSections = [
    {
      title: 'Personal Details',
      fields: [...commonPersonalDetails('term'), ['Nationality', 'termNationality', 'text'], ...cityStatePin('term')],
    },
    { title: 'Employment & Income Details', fields: employeeFields('term') },
    {
      title: 'Health Details',
      fields: [
        ['Height (cm)', 'termHeight', 'number'],
        ['Weight (kg)', 'termWeight', 'number'],
        ['Blood Group', 'termBloodGroup', 'select', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']],
        ['Medical Conditions', 'termMedicalConditions', 'select', ['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Thyroid', 'Kidney Disease', 'Cancer', 'Other', 'None']],
        ['Current Medications', 'termCurrentMedications', 'textarea'],
        ['Previous Surgeries', 'termPreviousSurgeries', 'textarea'],
        ['Hospitalization History', 'termHospitalizationHistory', 'textarea'],
        ['Family Medical History', 'termFamilyMedicalHistory', 'select', ['Diabetes', 'Heart Disease', 'Cancer', 'Hypertension', 'None']],
      ],
    },
    {
      title: 'Lifestyle Details',
      fields: [
        ['Smoking Habit', 'termSmoking', 'select', ['Yes', 'No']],
        ['Tobacco Usage', 'termTobacco', 'select', ['Yes', 'No']],
        ['Alcohol Consumption', 'termAlcohol', 'select', ['Yes', 'No']],
        ['Adventure Sports Participation', 'termAdventureSports', 'select', ['Yes', 'No']],
        ['International Travel Frequency', 'termTravelFrequency', 'select', ['Never', 'Rarely', 'Sometimes', 'Frequently']],
      ],
    },
    {
      title: 'Insurance Plan Details',
      fields: [
        ['Term Insurance Type', 'termInsuranceType', 'select', ['Pure Term Plan', 'Increasing Term Plan', 'Decreasing Term Plan', 'Return of Premium Plan']],
        ['Sum Assured Required', 'termSumAssured', 'select', ['₹25 Lakhs', '₹50 Lakhs', '₹1 Crore', '₹2 Crores', '₹5 Crores']],
        ['Policy Term', 'termPolicyTerm', 'select', ['10 Years', '20 Years', '30 Years', '40 Years']],
        ['Premium Payment Frequency', 'termPremiumFrequency', 'select', ['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly']],
      ],
    },
    {
      title: 'Riders & Additional Covers',
      fields: [
        ['Accidental Death Benefit Rider', 'termAccidentalRider', 'checkbox'],
        ['Critical Illness Rider', 'termCriticalIllnessRider', 'checkbox'],
        ['Disability Rider', 'termDisabilityRider', 'checkbox'],
        ['Waiver of Premium Rider', 'termWaiverRider', 'checkbox'],
        ['Income Benefit Rider', 'termIncomeBenefitRider', 'checkbox'],
      ],
    },
    {
      title: 'Nominee Details',
      fields: [
        ['Nominee Full Name', 'termNomineeFullName', 'text'],
        ['Relationship', 'termNomineeRelationship', 'text'],
        ['Date of Birth', 'termNomineeDob', 'date'],
        ['Mobile Number', 'termNomineeMobile', 'tel'],
        ['Aadhaar Number', 'termNomineeAadhaar', 'text'],
        ['Percentage Share', 'termNomineeShare', 'number'],
        ['Address', 'termNomineeAddress', 'textarea'],
      ],
    },
    {
      title: 'Document Upload',
      fields: [
        ['Aadhaar Card', 'termAadhaarCard', 'file'],
        ['PAN Card', 'termPanCard', 'file'],
        ['Passport / Voter ID', 'termPassportVoterId', 'file'],
        ['Salary Slips (Last 3 Months)', 'termSalarySlips', 'file'],
        ['Bank Statements (Last 6 Months)', 'termBankStatements', 'file'],
        ['Form 16 / ITR', 'termForm16Itr', 'file'],
        ['Medical Reports', 'termMedicalReports', 'file'],
        ['Prescription Records', 'termPrescriptionRecords', 'file'],
        ['Health Checkup Reports', 'termHealthCheckupReports', 'file'],
        ['Passport Size Photo', 'termPassportPhoto', 'file'],
      ],
    },
    {
      title: 'Premium Estimate',
      fields: [
        ['Sum Assured', 'termEstimateSumAssured', 'text'],
        ['Policy Term', 'termEstimatePolicyTerm', 'text'],
        ['Base Premium', 'termBasePremium', 'number'],
        ['Rider Charges', 'termRiderCharges', 'number'],
        ['GST', 'termGst', 'number'],
        ['Total Premium Payable', 'termTotalPremium', 'number'],
        ['AI Risk Assessment', 'termAiRiskAssessment', 'select', ['Low', 'Medium', 'High']],
        ['Coverage Recommendation', 'termCoverageRecommendation', 'text'],
      ],
    },
    {
      title: 'Review & Submit',
      fields: [
        ['Review Application', 'termReviewApplication', 'textarea'],
        ['Declaration Checkbox', 'termDeclaration', 'checkbox'],
        ['Consent for Medical Verification', 'termMedicalConsent', 'checkbox'],
        ['Terms & Conditions Checkbox', 'termTerms', 'checkbox'],
      ],
    },
  ];
  const npsSections = [
  {
    title: 'Personal Details',
    fields: [
      ['Full Name', 'npsFullName', 'text'],
      ["Father's Name", 'npsFatherName', 'text'],
      ["Mother's Name", 'npsMotherName', 'text'],
      ['Date of Birth', 'npsDob', 'date'],
      ['Gender', 'npsGender', 'select', ['Male', 'Female', 'Other']],
      ['Marital Status', 'npsMaritalStatus', 'select', ['Single', 'Married', 'Other']],
      ['Mobile Number', 'npsMobile', 'tel'],
      ['Email Address', 'npsEmail', 'email'],
      ['PAN Number', 'npsPan', 'text'],
      ['Aadhaar Number', 'npsAadhaar', 'text'],
      ['Nationality', 'npsNationality', 'text'],
      ['Residential Status', 'npsResidentialStatus', 'select', ['Resident Indian', 'NRI', 'OCI']],
      ['Occupation', 'npsOccupation', 'text'],
      ['Annual Income', 'npsAnnualIncome', 'number'],
    ],
  },
  {
    title: 'Address Details',
    fields: [
      ['Address Line 1', 'npsAddress1', 'text'],
      ['Address Line 2', 'npsAddress2', 'text'],
      ['City', 'npsCity', 'text'],
      ['State', 'npsState', 'text'],
      ['PIN Code', 'npsPinCode', 'text'],
      ['Same as Communication Address', 'npsSameAddress', 'checkbox'],
      ['Permanent Address', 'npsPermanentAddress', 'textarea'],
      ['Permanent City', 'npsPermanentCity', 'text'],
      ['Permanent State', 'npsPermanentState', 'text'],
      ['Permanent PIN Code', 'npsPermanentPin', 'text'],
    ],
  },
  {
    title: 'Employment & Income Details',
    fields: [
      ['Employment Type', 'npsEmploymentType', 'select', ['Government Employee', 'Private Employee', 'Self-Employed', 'Professional', 'Business Owner', 'Farmer', 'Student', 'Retired']],
      ['Employer/Company Name', 'npsEmployerName', 'text'],
      ['Designation', 'npsDesignation', 'text'],
      ['Monthly Income', 'npsMonthlyIncome', 'number'],
      ['Annual Income', 'npsEmploymentAnnualIncome', 'number'],
      ['Years of Experience', 'npsExperience', 'number'],
    ],
  },
  {
    title: 'NPS Account Details',
    fields: [
      ['Account Type', 'npsAccountType', 'select', ['Tier I Account', 'Tier II Account', 'Both']],
      ['Subscriber Category', 'npsSubscriberCategory', 'select', ['Individual', 'Corporate Employee', 'Government Employee']],
      ['Existing PRAN Number', 'npsPranNumber', 'text'],
      ['Initial Contribution Amount', 'npsInitialContribution', 'number'],
      ['Monthly Contribution Amount', 'npsMonthlyContribution', 'number'],
      ['Contribution Frequency', 'npsContributionFrequency', 'select', ['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly']],
    ],
  },
  {
    title: 'Pension Fund Preferences',
    fields: [
      ['Pension Fund Manager', 'npsFundManager', 'select', ['SBI Pension Fund', 'HDFC Pension Fund', 'ICICI Prudential Pension Fund', 'LIC Pension Fund', 'UTI Pension Fund', 'Kotak Pension Fund']],
      ['Investment Choice', 'npsInvestmentChoice', 'select', ['Active Choice', 'Auto Choice']],
      ['Equity Allocation', 'npsEquityAllocation', 'number'],
      ['Corporate Debt Allocation', 'npsCorporateDebt', 'number'],
      ['Government Securities Allocation', 'npsGovernmentSecurities', 'number'],
      ['Alternative Investment Funds Allocation', 'npsAlternativeFunds', 'number'],
      ['Risk Appetite', 'npsRiskAppetite', 'select', ['Conservative', 'Moderate', 'Aggressive']],
    ],
  },
  {
    title: 'Nominee Details',
    fields: [
      ['Nominee Name', 'npsNomineeName', 'text'],
      ['Relationship', 'npsNomineeRelationship', 'text'],
      ['Date of Birth', 'npsNomineeDob', 'date'],
      ['Aadhaar Number', 'npsNomineeAadhaar', 'text'],
      ['Mobile Number', 'npsNomineeMobile', 'tel'],
      ['Percentage Share', 'npsNomineeShare', 'number'],
      ['Address', 'npsNomineeAddress', 'textarea'],
    ],
  },
  {
    title: 'Bank Details',
    fields: [
      ['Bank Name', 'npsBankName', 'text'],
      ['Account Number', 'npsAccountNumber', 'text'],
      ['Confirm Account Number', 'npsConfirmAccountNumber', 'text'],
      ['IFSC Code', 'npsIfscCode', 'text'],
      ['Branch Name', 'npsBranchName', 'text'],
      ['Account Type', 'npsBankAccountType', 'select', ['Savings', 'Current']],
    ],
  },
  {
    title: 'Document Upload',
    fields: [
      ['Aadhaar Card', 'npsAadhaarCard', 'file'],
      ['PAN Card', 'npsPanCard', 'file'],
      ['Passport', 'npsPassport', 'file'],
      ['Voter ID', 'npsVoterId', 'file'],
      ['Utility Bill', 'npsUtilityBill', 'file'],
      ['Driving Licence', 'npsDrivingLicence', 'file'],
      ['Cancelled Cheque', 'npsCancelledCheque', 'file'],
      ['Passbook Copy', 'npsPassbookCopy', 'file'],
      ['Passport Size Photo', 'npsPhoto', 'file'],
      ['Signature Upload', 'npsSignature', 'file'],
    ],
  },
  {
    title: 'Pension Projection',
    fields: [
      ['Monthly Contribution', 'npsProjectionMonthlyContribution', 'number'],
      ['Expected Return (%)', 'npsExpectedReturn', 'number'],
      ['Investment Period', 'npsInvestmentPeriod', 'number'],
      ['Retirement Age', 'npsRetirementAge', 'number'],
      ['Estimated Corpus at Retirement', 'npsEstimatedCorpus', 'number'],
      ['Estimated Monthly Pension', 'npsEstimatedPension', 'number'],
      ['Tax Benefits under 80CCD(1)', 'npsTax80ccd1', 'number'],
      ['Tax Benefits under 80CCD(1B)', 'npsTax80ccd1b', 'number'],
      ['Retirement Readiness Score', 'npsReadinessScore', 'number'],
    ],
  },
  {
    title: 'Review & Submit',
    fields: [
      ['Review Application', 'npsReview', 'textarea'],
      ['FATCA Declaration', 'npsFatca', 'checkbox'],
      ['CRS Declaration', 'npsCrs', 'checkbox'],
      ['Nominee Confirmation', 'npsNomineeConfirmation', 'checkbox'],
      ['Terms & Conditions', 'npsTerms', 'checkbox'],
      ['e-Sign Consent', 'npsESign', 'checkbox'],
    ],
  },
];

const apySections = [
  {
    title: 'Personal Details',
    fields: [
      ...commonPersonalDetails('apy'),
      ...cityStatePin('apy'),
      ['Nationality', 'apyNationality', 'text'],
    ],
  },
  {
    title: 'Bank Account Details',
    fields: [
      ['Bank Name', 'apyBankName', 'text'],
      ['Branch Name', 'apyBranchName', 'text'],
      ['Account Number', 'apyAccountNumber', 'text'],
      ['Confirm Account Number', 'apyConfirmAccountNumber', 'text'],
      ['IFSC Code', 'apyIfscCode', 'text'],
      ['Auto-Debit Consent', 'apyAutoDebitConsent', 'select', ['Yes', 'No']],
      ['Existing APY Account', 'apyExistingAccount', 'select', ['Yes', 'No']],
    ],
  },
  {
    title: 'Pension Details',
    fields: [
      ['Desired Monthly Pension', 'apyDesiredPension', 'select', ['₹1,000', '₹2,000', '₹3,000', '₹4,000', '₹5,000']],
      ['Contribution Frequency', 'apyContributionFrequency', 'select', ['Monthly', 'Quarterly', 'Half-Yearly']],
      ['Joining Age', 'apyJoiningAge', 'number'],
      ['Retirement Age', 'apyRetirementAge', 'text'],
    ],
  },
  {
    title: 'Employment & Income Details',
    fields: [
      ['Occupation', 'apyOccupation', 'select', ['Salaried Employee', 'Government Employee', 'Self-Employed', 'Farmer', 'Labourer', 'Business Owner', 'Student', 'Other']],
      ['Monthly Income', 'apyMonthlyIncome', 'number'],
      ['Annual Income', 'apyAnnualIncome', 'number'],
      ['Income Tax Payer', 'apyIncomeTaxPayer', 'select', ['Yes', 'No']],
      ['EPF / EPS Subscriber', 'apyEpfSubscriber', 'select', ['Yes', 'No']],
    ],
  },
  {
    title: 'Nominee Details',
    fields: [
      ['Nominee Name', 'apyNomineeName', 'text'],
      ['Relationship', 'apyNomineeRelationship', 'text'],
      ['Date of Birth', 'apyNomineeDob', 'date'],
      ['Aadhaar Number', 'apyNomineeAadhaar', 'text'],
      ['Mobile Number', 'apyNomineeMobile', 'tel'],
      ['Address', 'apyNomineeAddress', 'textarea'],
      ['Guardian Name', 'apyGuardianName', 'text'],
      ['Guardian Relationship', 'apyGuardianRelationship', 'text'],
      ['Guardian Mobile Number', 'apyGuardianMobile', 'tel'],
    ],
  },
  {
    title: 'Document Upload',
    fields: [
      ['Aadhaar Card', 'apyAadhaarCard', 'file'],
      ['PAN Card', 'apyPanCard', 'file'],
      ['Voter ID', 'apyVoterId', 'file'],
      ['Utility Bill', 'apyUtilityBill', 'file'],
      ['Passport', 'apyPassport', 'file'],
      ['Passbook Copy', 'apyPassbookCopy', 'file'],
      ['Cancelled Cheque', 'apyCancelledCheque', 'file'],
      ['Passport Size Photo', 'apyPhoto', 'file'],
    ],
  },
  {
    title: 'Pension Projection',
    fields: [
      ['Selected Pension Amount', 'apySelectedPension', 'text'],
      ['Monthly Contribution', 'apyMonthlyContribution', 'number'],
      ['Total Contribution till Age 60', 'apyTotalContribution', 'number'],
      ['Government Benefits', 'apyGovernmentBenefits', 'number'],
      ['Estimated Pension after Retirement', 'apyEstimatedPension', 'number'],
      ['Retirement Score', 'apyRetirementScore', 'number'],
      ['Suggestions', 'apySuggestions', 'textarea'],
    ],
  },
  {
    title: 'Review & Submit',
    fields: [
      ['Review Application', 'apyReview', 'textarea'],
      ['Nominee Confirmation', 'apyNomineeConfirmation', 'checkbox'],
      ['Auto-Debit Authorization', 'apyAutoDebitAuthorization', 'checkbox'],
      ['Declaration Checkbox', 'apyDeclaration', 'checkbox'],
      ['Terms & Conditions', 'apyTerms', 'checkbox'],
    ],
  },
];
const pmSymSections = [
  {
    title: 'Personal Details',
    fields: [
      ['Full Name', 'pmSymFullName', 'text'],
      ['Date of Birth', 'pmSymDob', 'date'],
      ['Age', 'pmSymAge', 'number'],
      ['Gender', 'pmSymGender', 'select', ['Male', 'Female', 'Other']],
      ['Marital Status', 'pmSymMaritalStatus', 'select', ['Single', 'Married', 'Other']],
      ['Mobile Number', 'pmSymMobile', 'tel'],
      ['Email Address', 'pmSymEmail', 'email'],
      ['Aadhaar Number', 'pmSymAadhaar', 'text'],
      ['PAN Number', 'pmSymPan', 'text'],
      ['Nationality', 'pmSymNationality', 'text'],
      ['Residential Address', 'pmSymAddress', 'textarea'],
      ['City', 'pmSymCity', 'text'],
      ['State', 'pmSymState', 'text'],
      ['PIN Code', 'pmSymPin', 'text'],
    ],
  },
  {
    title: 'Occupational Details',
    fields: [
      ['Worker Category', 'pmSymWorkerCategory', 'select', ['Street Vendor', 'Rickshaw Puller', 'Construction Worker', 'Domestic Worker', 'Agricultural Worker', 'Mid-Day Meal Worker', 'Cobbler', 'Washerman', 'Home-based Worker', 'Other Unorganized Worker']],
      ['Occupation Name', 'pmSymOccupationName', 'text'],
      ['Years of Experience', 'pmSymExperience', 'number'],
      ['Monthly Income', 'pmSymMonthlyIncome', 'number'],
      ['Employer Name', 'pmSymEmployerName', 'text'],
      ['Employment Status', 'pmSymEmploymentStatus', 'select', ['Self-Employed', 'Wage Worker', 'Daily Wage Worker']],
    ],
  },
  {
    title: 'Eligibility Details',
    fields: [
      ['Annual Income', 'pmSymAnnualIncome', 'number'],
      ['EPFO Member', 'pmSymEpfoMember', 'select', ['Yes', 'No']],
      ['ESIC Member', 'pmSymEsicMember', 'select', ['Yes', 'No']],
      ['NPS Subscriber', 'pmSymNpsSubscriber', 'select', ['Yes', 'No']],
      ['Income Tax Payer', 'pmSymTaxPayer', 'select', ['Yes', 'No']],
      ['BPL Card Holder', 'pmSymBplHolder', 'select', ['Yes', 'No']],
    ],
  },
  {
    title: 'Pension Scheme Details',
    fields: [
      ['Desired Pension', 'pmSymDesiredPension', 'text'],
      ['Joining Age', 'pmSymJoiningAge', 'number'],
      ['Monthly Contribution', 'pmSymMonthlyContribution', 'number'],
      ['Government Matching Contribution', 'pmSymGovContribution', 'number'],
      ['Retirement Age', 'pmSymRetirementAge', 'text'],
    ],
  },
  {
    title: 'Bank Account Details',
    fields: [
      ['Bank Name', 'pmSymBankName', 'text'],
      ['Branch Name', 'pmSymBranchName', 'text'],
      ['Account Number', 'pmSymAccountNumber', 'text'],
      ['Confirm Account Number', 'pmSymConfirmAccount', 'text'],
      ['IFSC Code', 'pmSymIfsc', 'text'],
      ['Account Type', 'pmSymAccountType', 'select', ['Savings', 'Current']],
      ['Auto-Debit Authorization', 'pmSymAutoDebit', 'select', ['Yes', 'No']],
    ],
  },
  {
    title: 'Nominee Details',
    fields: [
      ['Nominee Name', 'pmSymNomineeName', 'text'],
      ['Relationship', 'pmSymNomineeRelationship', 'text'],
      ['Date of Birth', 'pmSymNomineeDob', 'date'],
      ['Aadhaar Number', 'pmSymNomineeAadhaar', 'text'],
      ['Mobile Number', 'pmSymNomineeMobile', 'tel'],
      ['Address', 'pmSymNomineeAddress', 'textarea'],
      ['Guardian Name', 'pmSymGuardianName', 'text'],
      ['Guardian Relationship', 'pmSymGuardianRelationship', 'text'],
      ['Guardian Mobile Number', 'pmSymGuardianMobile', 'tel'],
    ],
  },
  {
    title: 'Document Upload',
    fields: [
      ['Aadhaar Card', 'pmSymAadhaarCard', 'file'],
      ['PAN Card', 'pmSymPanCard', 'file'],
      ['Voter ID', 'pmSymVoterId', 'file'],
      ['Utility Bill', 'pmSymUtilityBill', 'file'],
      ['Ration Card', 'pmSymRationCard', 'file'],
      ['Passbook Copy', 'pmSymPassbookCopy', 'file'],
      ['Cancelled Cheque', 'pmSymCancelledCheque', 'file'],
      ['Passport Size Photo', 'pmSymPhoto', 'file'],
    ],
  },
  {
    title: 'Pension Projection',
    fields: [
      ['Current Age', 'pmSymCurrentAge', 'number'],
      ['Monthly Contribution', 'pmSymProjectionMonthlyContribution', 'number'],
      ['Government Contribution', 'pmSymProjectionGovContribution', 'number'],
      ['Years Until Retirement', 'pmSymYearsUntilRetirement', 'number'],
      ['Total Contribution', 'pmSymTotalContribution', 'number'],
      ['Estimated Monthly Pension', 'pmSymEstimatedPension', 'number'],
      ['Retirement Readiness Score', 'pmSymReadinessScore', 'number'],
    ],
  },
  {
    title: 'Review & Submit',
    fields: [
      ['Review Application', 'pmSymReview', 'textarea'],
      ['Aadhaar Verification', 'pmSymAadhaarVerification', 'checkbox'],
      ['Auto-Debit Authorization', 'pmSymAutoDebitAuthorization', 'checkbox'],
      ['Declaration Checkbox', 'pmSymDeclaration', 'checkbox'],
      ['Terms & Conditions', 'pmSymTerms', 'checkbox'],
    ],
  },
];

const seniorCitizenPensionSections = [
  {
    title: 'Personal Details',
    fields: [
      ['Full Name', 'seniorFullName', 'text'],
      ['Date of Birth', 'seniorDob', 'date'],
      ['Age', 'seniorAge', 'number'],
      ['Gender', 'seniorGender', 'select', ['Male', 'Female', 'Other']],
      ['Marital Status', 'seniorMaritalStatus', 'select', ['Single', 'Married', 'Widowed']],
      ['Mobile Number', 'seniorMobile', 'tel'],
      ['Email Address', 'seniorEmail', 'email'],
      ['Aadhaar Number', 'seniorAadhaar', 'text'],
      ['PAN Number', 'seniorPan', 'text'],
      ['Nationality', 'seniorNationality', 'text'],
      ['Residential Address', 'seniorAddress', 'textarea'],
      ['City', 'seniorCity', 'text'],
      ['State', 'seniorState', 'text'],
      ['PIN Code', 'seniorPin', 'text'],
    ],
  },
  {
    title: 'Retirement Details',
    fields: [
      ['Retirement Status', 'seniorRetirementStatus', 'select', ['Retired', 'Retiring Soon', 'Pensioner', 'Self-Funded Retiree']],
      ['Retirement Date', 'seniorRetirementDate', 'date'],
      ['Previous Occupation', 'seniorPreviousOccupation', 'text'],
      ['Last Employer Name', 'seniorLastEmployer', 'text'],
      ['Years of Service', 'seniorYearsOfService', 'number'],
      ['Pension Receiving', 'seniorPensionReceiving', 'select', ['Yes', 'No']],
      ['Monthly Pension', 'seniorMonthlyPension', 'number'],
    ],
  },
  {
    title: 'Financial Details',
    fields: [
      ['Monthly Income', 'seniorMonthlyIncome', 'number'],
      ['Monthly Pension Income', 'seniorPensionIncome', 'number'],
      ['Annual Income', 'seniorAnnualIncome', 'number'],
      ['Savings & Investments', 'seniorSavings', 'text'],
      ['Fixed Deposits', 'seniorFixedDeposits', 'number'],
      ['Mutual Funds', 'seniorMutualFunds', 'number'],
      ['Existing EMIs', 'seniorExistingEmis', 'number'],
      ['Existing Loans', 'seniorExistingLoans', 'text'],
      ['Bank Account Details', 'seniorBankDetails', 'text'],
      ['Credit Score', 'seniorCreditScore', 'number'],
    ],
  },
  {
    title: 'Family & Dependents',
    fields: [
      ['Spouse Name', 'seniorSpouseName', 'text'],
      ['Spouse Date of Birth', 'seniorSpouseDob', 'date'],
      ['Spouse Aadhaar Number', 'seniorSpouseAadhaar', 'text'],
      ['Spouse Mobile Number', 'seniorSpouseMobile', 'tel'],
      ['Number of Dependents', 'seniorDependentsCount', 'number'],
      ['Dependent Details', 'seniorDependentDetails', 'textarea'],
      ['Nominee Name', 'seniorNomineeName', 'text'],
      ['Relationship', 'seniorNomineeRelationship', 'text'],
      ['Nominee Date of Birth', 'seniorNomineeDob', 'date'],
      ['Nominee Aadhaar Number', 'seniorNomineeAadhaar', 'text'],
      ['Nominee Mobile Number', 'seniorNomineeMobile', 'tel'],
    ],
  },
  {
    title: 'Pension Plan Details',
    fields: [
      ['Pension Scheme Type', 'seniorPensionType', 'select', ['Monthly Pension Plan', 'Immediate Annuity', 'Deferred Annuity', 'Lifetime Pension', 'Joint Life Pension']],
      ['Lump Sum Investment', 'seniorLumpSumInvestment', 'number'],
      ['Expected Pension Start Date', 'seniorPensionStartDate', 'date'],
      ['Pension Frequency', 'seniorPensionFrequency', 'select', ['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly']],
      ['Pension Duration', 'seniorPensionDuration', 'select', ['Lifetime', 'Fixed Period']],
    ],
  },
  {
    title: 'Health Information',
    fields: [
      ['Height', 'seniorHeight', 'number'],
      ['Weight', 'seniorWeight', 'number'],
      ['Blood Group', 'seniorBloodGroup', 'select', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']],
      ['Existing Medical Conditions', 'seniorMedicalConditions', 'textarea'],
      ['Current Medications', 'seniorCurrentMedications', 'textarea'],
      ['Previous Hospitalizations', 'seniorHospitalizations', 'textarea'],
      ['Previous Surgeries', 'seniorSurgeries', 'textarea'],
      ['Disability Status', 'seniorDisabilityStatus', 'select', ['Yes', 'No']],
      ['Family Medical History', 'seniorFamilyMedicalHistory', 'textarea'],
    ],
  },
  {
    title: 'Document Upload',
    fields: [
      ['Aadhaar Card', 'seniorAadhaarCard', 'file'],
      ['PAN Card', 'seniorPanCard', 'file'],
      ['Passport', 'seniorPassport', 'file'],
      ['Voter ID', 'seniorVoterId', 'file'],
      ['Utility Bill', 'seniorUtilityBill', 'file'],
      ['Pension Book', 'seniorPensionBook', 'file'],
      ['Pension Statement', 'seniorPensionStatement', 'file'],
      ['Bank Statement (Last 6 Months)', 'seniorBankStatement', 'file'],
      ['Investment Proof', 'seniorInvestmentProof', 'file'],
      ['Passport Size Photo', 'seniorPhoto', 'file'],
    ],
  },
  {
    title: 'Pension Projection',
    fields: [
      ['Current Age', 'seniorCurrentAge', 'number'],
      ['Expected Pension', 'seniorExpectedPension', 'number'],
      ['Estimated Lifetime Benefit', 'seniorLifetimeBenefit', 'number'],
      ['Investment Value', 'seniorInvestmentValue', 'number'],
      ['Monthly Payout', 'seniorMonthlyPayout', 'number'],
      ['Retirement Readiness Score', 'seniorReadinessScore', 'number'],
      ['Risk Level', 'seniorRiskLevel', 'select', ['Low', 'Medium', 'High']],
      ['Recommended Monthly Pension', 'seniorRecommendedPension', 'number'],
    ],
  },
  {
    title: 'Review & Submit',
    fields: [
      ['Review Application', 'seniorReview', 'textarea'],
      ['Nominee Verification', 'seniorNomineeVerification', 'checkbox'],
      ['Declaration Checkbox', 'seniorDeclaration', 'checkbox'],
      ['Terms & Conditions', 'seniorTerms', 'checkbox'],
    ],
  },
];

const eShramSections = [
  {
    title: 'Personal Details',
    fields: [
      ['Full Name', 'eShramFullName', 'text'],
      ['Date of Birth', 'eShramDob', 'date'],
      ['Age', 'eShramAge', 'number'],
      ['Gender', 'eShramGender', 'select', ['Male', 'Female', 'Other']],
      ['Marital Status', 'eShramMaritalStatus', 'select', ['Single', 'Married', 'Widowed']],
      ['Mobile Number', 'eShramMobile', 'tel'],
      ['Email Address', 'eShramEmail', 'email'],
      ['Aadhaar Number', 'eShramAadhaar', 'text'],
      ['PAN Number', 'eShramPan', 'text'],
      ['Nationality', 'eShramNationality', 'text'],
      ["Father's Name", 'eShramFatherName', 'text'],
      ["Mother's Name", 'eShramMotherName', 'text'],
    ],
  },
  {
    title: 'Address Details',
    fields: [
      ['Address Line 1', 'eShramAddress1', 'text'],
      ['Address Line 2', 'eShramAddress2', 'text'],
      ['City', 'eShramCity', 'text'],
      ['District', 'eShramDistrict', 'text'],
      ['State', 'eShramState', 'text'],
      ['PIN Code', 'eShramPin', 'text'],
      ['Same as Current Address', 'eShramSameAddress', 'checkbox'],
      ['Permanent Address', 'eShramPermanentAddress', 'textarea'],
      ['Permanent City', 'eShramPermanentCity', 'text'],
      ['Permanent District', 'eShramPermanentDistrict', 'text'],
      ['Permanent State', 'eShramPermanentState', 'text'],
      ['Permanent PIN Code', 'eShramPermanentPin', 'text'],
    ],
  },
  {
    title: 'Worker / Occupation Details',
    fields: [
      ['Worker Category', 'eShramWorkerCategory', 'select', ['Construction Worker', 'Domestic Worker', 'Street Vendor', 'Agricultural Worker', 'Driver', 'Delivery Partner', 'Electrician', 'Plumber', 'Tailor', 'Shop Worker', 'Other']],
      ['Primary Occupation', 'eShramPrimaryOccupation', 'text'],
      ['Secondary Occupation', 'eShramSecondaryOccupation', 'text'],
      ['Years of Experience', 'eShramExperience', 'number'],
      ['Monthly Income', 'eShramMonthlyIncome', 'number'],
      ['Employment Type', 'eShramEmploymentType', 'select', ['Self-Employed', 'Daily Wage Worker', 'Contract Worker', 'Migrant Worker']],
    ],
  },
  {
    title: 'Bank Details',
    fields: [
      ['Bank Name', 'eShramBankName', 'text'],
      ['Branch Name', 'eShramBranchName', 'text'],
      ['Account Number', 'eShramAccountNumber', 'text'],
      ['Confirm Account Number', 'eShramConfirmAccountNumber', 'text'],
      ['IFSC Code', 'eShramIfsc', 'text'],
      ['Account Type', 'eShramAccountType', 'select', ['Savings', 'Current']],
    ],
  },
  {
    title: 'Nominee Details',
    fields: [
      ['Nominee Name', 'eShramNomineeName', 'text'],
      ['Relationship', 'eShramNomineeRelationship', 'text'],
      ['Date of Birth', 'eShramNomineeDob', 'date'],
      ['Aadhaar Number', 'eShramNomineeAadhaar', 'text'],
      ['Mobile Number', 'eShramNomineeMobile', 'tel'],
      ['Address', 'eShramNomineeAddress', 'textarea'],
    ],
  },
  {
    title: 'Social Security Details',
    fields: [
      ['EPFO Member', 'eShramEpfo', 'select', ['Yes', 'No']],
      ['ESIC Member', 'eShramEsic', 'select', ['Yes', 'No']],
      ['Income Tax Payer', 'eShramIncomeTax', 'select', ['Yes', 'No']],
      ['Existing E-SHRAM Card', 'eShramExistingCard', 'select', ['Yes', 'No']],
      ['Ration Card Number', 'eShramRationCard', 'text'],
      ['BPL Card Holder', 'eShramBplHolder', 'select', ['Yes', 'No']],
    ],
  },
  {
    title: 'Document Upload',
    fields: [
      ['Aadhaar Card', 'eShramAadhaarCard', 'file'],
      ['PAN Card', 'eShramPanCard', 'file'],
      ['Voter ID', 'eShramVoterId', 'file'],
      ['Utility Bill', 'eShramUtilityBill', 'file'],
      ['Ration Card', 'eShramRationCardUpload', 'file'],
      ['Passbook Copy', 'eShramPassbookCopy', 'file'],
      ['Cancelled Cheque', 'eShramCancelledCheque', 'file'],
      ['Passport Size Photo', 'eShramPhoto', 'file'],
    ],
  },
  {
    title: 'Benefits & Eligibility Preview',
    fields: [
      ['Eligibility Status', 'eShramEligibilityStatus', 'text'],
      ['Worker Category', 'eShramPreviewWorkerCategory', 'text'],
      ['Accident Insurance Benefit', 'eShramAccidentBenefit', 'text'],
      ['Social Security Coverage', 'eShramCoverage', 'text'],
      ['Registration Status', 'eShramRegistrationStatus', 'text'],
    ],
  },
  {
    title: 'Review & Submit',
    fields: [
      ['Review Application', 'eShramReview', 'textarea'],
      ['Aadhaar Verification', 'eShramAadhaarVerification', 'checkbox'],
      ['Bank Verification', 'eShramBankVerification', 'checkbox'],
      ['Declaration Checkbox', 'eShramDeclaration', 'checkbox'],
      ['Terms & Conditions', 'eShramTerms', 'checkbox'],
    ],
  },
];

const pmKisanSections = [
  {
    title: 'Farmer Personal Details',
    fields: [
      ['Full Name', 'pmKisanFullName', 'text'],
      ["Father's / Husband's Name", 'pmKisanFatherHusbandName', 'text'],
      ['Date of Birth', 'pmKisanDob', 'date'],
      ['Gender', 'pmKisanGender', 'select', ['Male', 'Female', 'Other']],
      ['Mobile Number', 'pmKisanMobile', 'tel'],
      ['Email Address', 'pmKisanEmail', 'email'],
      ['Aadhaar Number', 'pmKisanAadhaar', 'text'],
      ['PAN Number', 'pmKisanPan', 'text'],
      ['Nationality', 'pmKisanNationality', 'text'],
      ['Category', 'pmKisanCategory', 'select', ['General', 'OBC', 'SC', 'ST']],
    ],
  },
  {
    title: 'Address Details',
    fields: [
      ['Address Line 1', 'pmKisanAddress1', 'text'],
      ['Address Line 2', 'pmKisanAddress2', 'text'],
      ['Village', 'pmKisanVillage', 'text'],
      ['Taluk / Block', 'pmKisanTalukBlock', 'text'],
      ['District', 'pmKisanDistrict', 'text'],
      ['State', 'pmKisanState', 'text'],
      ['PIN Code', 'pmKisanPin', 'text'],
    ],
  },
  {
    title: 'Land Ownership Details',
    fields: [
      ['State', 'pmKisanLandState', 'text'],
      ['District', 'pmKisanLandDistrict', 'text'],
      ['Taluk / Block', 'pmKisanLandTalukBlock', 'text'],
      ['Village', 'pmKisanLandVillage', 'text'],
      ['Survey Number', 'pmKisanSurveyNumber', 'text'],
      ['Patta Number', 'pmKisanPattaNumber', 'text'],
      ['Land Ownership Type', 'pmKisanLandOwnershipType', 'select', ['Individual', 'Joint Ownership', 'Inherited Land']],
      ['Total Land Holding (Acres)', 'pmKisanTotalLandHolding', 'number'],
      ['Cultivable Land Area', 'pmKisanCultivableLandArea', 'number'],
      ['Land Document Number', 'pmKisanLandDocumentNumber', 'text'],
    ],
  },
  {
    title: 'Farming Details',
    fields: [
      ['Farmer Type', 'pmKisanFarmerType', 'select', ['Small Farmer', 'Marginal Farmer', 'Medium Farmer', 'Large Farmer']],
      ['Primary Crop', 'pmKisanPrimaryCrop', 'text'],
      ['Secondary Crop', 'pmKisanSecondaryCrop', 'text'],
      ['Irrigation Type', 'pmKisanIrrigationType', 'select', ['Rainfed', 'Canal', 'Borewell', 'Drip Irrigation']],
      ['Annual Agricultural Income', 'pmKisanAnnualAgriIncome', 'number'],
      ['Farming Experience (Years)', 'pmKisanFarmingExperience', 'number'],
    ],
  },
  {
    title: 'Bank Account Details',
    fields: [
      ['Bank Name', 'pmKisanBankName', 'text'],
      ['Branch Name', 'pmKisanBranchName', 'text'],
      ['Account Number', 'pmKisanAccountNumber', 'text'],
      ['Confirm Account Number', 'pmKisanConfirmAccountNumber', 'text'],
      ['IFSC Code', 'pmKisanIfsc', 'text'],
      ['Account Type', 'pmKisanAccountType', 'select', ['Savings', 'Current']],
      ['Aadhaar Linked Bank Account', 'pmKisanAadhaarLinkedBank', 'select', ['Yes', 'No']],
    ],
  },
  {
    title: 'Family Details',
    fields: [
      ['Family Members Count', 'pmKisanFamilyMembersCount', 'number'],
      ['Spouse Name', 'pmKisanSpouseName', 'text'],
      ['Aadhaar Number', 'pmKisanSpouseAadhaar', 'text'],
      ['Mobile Number', 'pmKisanSpouseMobile', 'tel'],
      ['Family Farmer Status', 'pmKisanFamilyFarmerStatus', 'select', ['Yes', 'No']],
      ['Existing PM-KISAN Beneficiary in Family', 'pmKisanExistingBeneficiary', 'select', ['Yes', 'No']],
    ],
  },
  {
    title: 'Document Upload',
    fields: [
      ['Aadhaar Card', 'pmKisanAadhaarCard', 'file'],
      ['PAN Card', 'pmKisanPanCard', 'file'],
      ['Voter ID', 'pmKisanVoterId', 'file'],
      ['Patta Copy', 'pmKisanPattaCopy', 'file'],
      ['Chitta / Adangal', 'pmKisanChittaAdangal', 'file'],
      ['Land Ownership Certificate', 'pmKisanLandOwnershipCertificate', 'file'],
      ['Passbook Copy', 'pmKisanPassbookCopy', 'file'],
      ['Cancelled Cheque', 'pmKisanCancelledCheque', 'file'],
      ['Passport Size Photo', 'pmKisanPhoto', 'file'],
    ],
  },
  {
    title: 'Eligibility & Benefit Preview',
    fields: [
      ['Farmer Category', 'pmKisanPreviewFarmerCategory', 'text'],
      ['Land Holding Size', 'pmKisanPreviewLandHolding', 'text'],
      ['Eligibility Status', 'pmKisanEligibilityStatus', 'text'],
      ['Annual Benefit Amount', 'pmKisanAnnualBenefit', 'number'],
      ['Installment Amount', 'pmKisanInstallmentAmount', 'number'],
      ['Next Payment Cycle', 'pmKisanNextPaymentCycle', 'text'],
      ['Eligibility Score', 'pmKisanEligibilityScore', 'number'],
    ],
  },
  {
    title: 'Review & Submit',
    fields: [
      ['Review Application', 'pmKisanReview', 'textarea'],
      ['Aadhaar Verification', 'pmKisanAadhaarVerification', 'checkbox'],
      ['Land Ownership Declaration', 'pmKisanLandDeclaration', 'checkbox'],
      ['Bank Verification', 'pmKisanBankVerification', 'checkbox'],
      ['Self Declaration', 'pmKisanSelfDeclaration', 'checkbox'],
      ['Terms & Conditions', 'pmKisanTerms', 'checkbox'],
    ],
  },
];

const labourWelfareSections = [
  {
    title: 'Worker Personal Details',
    fields: [
      ['Full Name', 'labourFullName', 'text'],
      ["Father's / Husband's Name", 'labourFatherHusbandName', 'text'],
      ['Date of Birth', 'labourDob', 'date'],
      ['Age', 'labourAge', 'number'],
      ['Gender', 'labourGender', 'select', ['Male', 'Female', 'Other']],
      ['Marital Status', 'labourMaritalStatus', 'select', ['Single', 'Married', 'Widowed']],
      ['Mobile Number', 'labourMobile', 'tel'],
      ['Email Address', 'labourEmail', 'email'],
      ['Aadhaar Number', 'labourAadhaar', 'text'],
      ['PAN Number', 'labourPan', 'text'],
      ['Nationality', 'labourNationality', 'text'],
      ['Category', 'labourCategory', 'select', ['General', 'OBC', 'SC', 'ST']],
    ],
  },
  {
    title: 'Address Details',
    fields: [
      ['Address Line 1', 'labourAddress1', 'text'],
      ['Address Line 2', 'labourAddress2', 'text'],
      ['Village / Town', 'labourVillageTown', 'text'],
      ['District', 'labourDistrict', 'text'],
      ['State', 'labourState', 'text'],
      ['PIN Code', 'labourPin', 'text'],
      ['Residential Status', 'labourResidentialStatus', 'select', ['Own House', 'Rental House', 'Temporary Residence']],
    ],
  },
  {
    title: 'Employment Details',
    fields: [
      ['Worker Category', 'labourWorkerCategory', 'select', ['Construction Worker', 'Factory Worker', 'Domestic Worker', 'Driver', 'Security Guard', 'Electrician', 'Plumber', 'Carpenter', 'Agricultural Worker', 'Sanitation Worker', 'Street Vendor', 'Other']],
      ['Occupation Name', 'labourOccupationName', 'text'],
      ['Employer Name', 'labourEmployerName', 'text'],
      ['Work Location', 'labourWorkLocation', 'text'],
      ['Years of Experience', 'labourExperience', 'number'],
      ['Monthly Income', 'labourMonthlyIncome', 'number'],
      ['Annual Income', 'labourAnnualIncome', 'number'],
      ['Employment Type', 'labourEmploymentType', 'select', ['Permanent', 'Contract', 'Daily Wage', 'Self Employed']],
    ],
  },
  {
    title: 'Labour Board Registration Details',
    fields: [
      ['Labour Board Registration Number', 'labourBoardRegistrationNumber', 'text'],
      ['Registration Date', 'labourRegistrationDate', 'date'],
      ['UAN Number', 'labourUanNumber', 'text'],
      ['E-Shram Card Number', 'labourEShramCardNumber', 'text'],
      ['EPFO Member', 'labourEpfoMember', 'select', ['Yes', 'No']],
      ['ESIC Member', 'labourEsicMember', 'select', ['Yes', 'No']],
      ['Trade Union Member', 'labourTradeUnionMember', 'select', ['Yes', 'No']],
    ],
  },
  {
    title: 'Family Details',
    fields: [
      ['Spouse Name', 'labourSpouseName', 'text'],
      ['Spouse Aadhaar Number', 'labourSpouseAadhaar', 'text'],
      ['Spouse Mobile Number', 'labourSpouseMobile', 'tel'],
      ['Number of Dependents', 'labourDependentsCount', 'number'],
      ['Dependent Details', 'labourDependentDetails', 'textarea'],
      ['Nominee Name', 'labourNomineeName', 'text'],
      ['Relationship', 'labourNomineeRelationship', 'text'],
      ['Nominee Aadhaar Number', 'labourNomineeAadhaar', 'text'],
      ['Nominee Mobile Number', 'labourNomineeMobile', 'tel'],
      ['Nominee Date of Birth', 'labourNomineeDob', 'date'],
    ],
  },
  {
    title: 'Bank Account Details',
    fields: [
      ['Bank Name', 'labourBankName', 'text'],
      ['Branch Name', 'labourBranchName', 'text'],
      ['Account Number', 'labourAccountNumber', 'text'],
      ['Confirm Account Number', 'labourConfirmAccountNumber', 'text'],
      ['IFSC Code', 'labourIfsc', 'text'],
      ['Account Type', 'labourAccountType', 'select', ['Savings', 'Current']],
      ['Aadhaar Linked Account', 'labourAadhaarLinkedAccount', 'select', ['Yes', 'No']],
    ],
  },
  {
    title: 'Welfare Benefits Selection',
    fields: [
      ['Education Assistance', 'labourEducationAssistance', 'checkbox'],
      ['Marriage Assistance', 'labourMarriageAssistance', 'checkbox'],
      ['Maternity Benefit', 'labourMaternityBenefit', 'checkbox'],
      ['Medical Assistance', 'labourMedicalAssistance', 'checkbox'],
      ['Accident Assistance', 'labourAccidentAssistance', 'checkbox'],
      ['Disability Assistance', 'labourDisabilityAssistance', 'checkbox'],
      ['Death Benefit', 'labourDeathBenefit', 'checkbox'],
      ['Pension Benefit', 'labourPensionBenefit', 'checkbox'],
      ['Housing Assistance', 'labourHousingAssistance', 'checkbox'],
      ['Tool Purchase Assistance', 'labourToolPurchaseAssistance', 'checkbox'],
    ],
  },
  {
    title: 'Document Upload',
    fields: [
      ['Aadhaar Card', 'labourAadhaarCard', 'file'],
      ['PAN Card', 'labourPanCard', 'file'],
      ['Voter ID', 'labourVoterId', 'file'],
      ['Employer Certificate', 'labourEmployerCertificate', 'file'],
      ['Work ID Card', 'labourWorkIdCard', 'file'],
      ['Labour Card', 'labourLabourCard', 'file'],
      ['Wage Slip', 'labourWageSlip', 'file'],
      ['Utility Bill', 'labourUtilityBill', 'file'],
      ['Ration Card', 'labourRationCard', 'file'],
      ['Passbook Copy', 'labourPassbookCopy', 'file'],
      ['Cancelled Cheque', 'labourCancelledCheque', 'file'],
      ['Passport Size Photo', 'labourPhoto', 'file'],
    ],
  },
  {
    title: 'Eligibility & Benefits Dashboard',
    fields: [
      ['Worker Category', 'labourPreviewWorkerCategory', 'text'],
      ['Years of Service', 'labourYearsOfService', 'number'],
      ['Eligibility Status', 'labourEligibilityStatus', 'text'],
      ['Available Benefits', 'labourAvailableBenefits', 'textarea'],
      ['Estimated Benefit Amount', 'labourEstimatedBenefitAmount', 'number'],
      ['Welfare Score', 'labourWelfareScore', 'number'],
      ['Payment History', 'labourPaymentHistory', 'textarea'],
      ['Pending Documents', 'labourPendingDocuments', 'textarea'],
    ],
  },
  {
    title: 'Review & Submit',
    fields: [
      ['Review Application', 'labourReview', 'textarea'],
      ['Aadhaar Verification', 'labourAadhaarVerification', 'checkbox'],
      ['Labour Welfare Declaration', 'labourWelfareDeclaration', 'checkbox'],
      ['Employment Declaration', 'labourEmploymentDeclaration', 'checkbox'],
      ['Bank Verification', 'labourBankVerification', 'checkbox'],
      ['Terms & Conditions', 'labourTerms', 'checkbox'],
    ],
  },
];

const scholarshipSections = [
  {
    title: 'Student Personal Details',
    fields: [
      ['Full Name', 'scholarFullName', 'text'],
      ["Father's Name", 'scholarFatherName', 'text'],
      ["Mother's Name", 'scholarMotherName', 'text'],
      ['Date of Birth', 'scholarDob', 'date'],
      ['Gender', 'scholarGender', 'select', ['Male', 'Female', 'Other']],
      ['Mobile Number', 'scholarMobile', 'tel'],
      ['Email Address', 'scholarEmail', 'email'],
      ['Aadhaar Number', 'scholarAadhaar', 'text'],
      ['PAN Number', 'scholarPan', 'text'],
      ['Category', 'scholarCategory', 'select', ['General', 'OBC', 'SC', 'ST', 'EWS']],
      ['Nationality', 'scholarNationality', 'text'],
      ['Disability Status', 'scholarDisabilityStatus', 'select', ['Yes', 'No']],
    ],
  },
  {
    title: 'Address Details',
    fields: [
      ['Address Line 1', 'scholarAddress1', 'text'],
      ['Address Line 2', 'scholarAddress2', 'text'],
      ['City', 'scholarCity', 'text'],
      ['District', 'scholarDistrict', 'text'],
      ['State', 'scholarState', 'text'],
      ['PIN Code', 'scholarPin', 'text'],
      ['Residential Status', 'scholarResidentialStatus', 'select', ['Rural', 'Urban']],
    ],
  },
  {
    title: 'Academic Details',
    fields: [
      ['Course Level', 'scholarCourseLevel', 'select', ['School', 'Diploma', 'Undergraduate', 'Postgraduate', 'PhD']],
      ['Course Name', 'scholarCourseName', 'text'],
      ['Institution Name', 'scholarInstitutionName', 'text'],
      ['University / Board Name', 'scholarUniversityBoardName', 'text'],
      ['Admission Number', 'scholarAdmissionNumber', 'text'],
      ['Roll Number', 'scholarRollNumber', 'text'],
      ['Academic Year', 'scholarAcademicYear', 'text'],
      ['Current Semester / Year', 'scholarCurrentSemesterYear', 'text'],
      ['Previous Percentage / CGPA', 'scholarPreviousPercentage', 'number'],
      ['Current Percentage / CGPA', 'scholarCurrentPercentage', 'number'],
      ['Backlogs', 'scholarBacklogs', 'number'],
      ['Attendance Percentage', 'scholarAttendancePercentage', 'number'],
    ],
  },
  {
    title: 'Family Income Details',
    fields: [
      ["Father's Occupation", 'scholarFatherOccupation', 'text'],
      ["Mother's Occupation", 'scholarMotherOccupation', 'text'],
      ['Annual Family Income', 'scholarAnnualFamilyIncome', 'number'],
      ['Income Certificate Number', 'scholarIncomeCertificateNumber', 'text'],
      ['Income Certificate Issue Date', 'scholarIncomeCertificateIssueDate', 'date'],
      ['BPL Card Holder', 'scholarBplHolder', 'select', ['Yes', 'No']],
    ],
  },
  {
    title: 'Scholarship Details',
    fields: [
      ['Scholarship Type', 'scholarshipType', 'select', ['Merit Scholarship', 'Minority Scholarship', 'SC/ST Scholarship', 'OBC Scholarship', 'EWS Scholarship', 'Sports Scholarship', 'Disability Scholarship', 'Girl Child Scholarship']],
      ['Tuition Fee Amount', 'scholarTuitionFee', 'number'],
      ['Hostel Fee Amount', 'scholarHostelFee', 'number'],
      ['Other Educational Expenses', 'scholarOtherExpenses', 'number'],
      ['Scholarship Mode', 'scholarshipMode', 'select', ['Fresh Application', 'Renewal Application']],
    ],
  },
  {
    title: 'Bank Account Details',
    fields: [
      ['Bank Name', 'scholarBankName', 'text'],
      ['Branch Name', 'scholarBranchName', 'text'],
      ['Account Holder Name', 'scholarAccountHolderName', 'text'],
      ['Account Number', 'scholarAccountNumber', 'text'],
      ['Confirm Account Number', 'scholarConfirmAccountNumber', 'text'],
      ['IFSC Code', 'scholarIfsc', 'text'],
      ['Aadhaar Linked Account', 'scholarAadhaarLinkedAccount', 'select', ['Yes', 'No']],
    ],
  },
  {
    title: 'Document Upload',
    fields: [
      ['Aadhaar Card', 'scholarAadhaarCard', 'file'],
      ['Student ID Card', 'scholarStudentIdCard', 'file'],
      ['Mark Sheets', 'scholarMarkSheets', 'file'],
      ['Transfer Certificate', 'scholarTransferCertificate', 'file'],
      ['Bonafide Certificate', 'scholarBonafideCertificate', 'file'],
      ['Admission Letter', 'scholarAdmissionLetter', 'file'],
      ['Income Certificate', 'scholarIncomeCertificate', 'file'],
      ['Community Certificate', 'scholarCommunityCertificate', 'file'],
      ['Disability Certificate', 'scholarDisabilityCertificate', 'file'],
      ['Passbook Copy', 'scholarPassbookCopy', 'file'],
      ['Cancelled Cheque', 'scholarCancelledCheque', 'file'],
      ['Passport Size Photo', 'scholarPhoto', 'file'],
    ],
  },
  {
    title: 'Scholarship Eligibility Dashboard',
    fields: [
      ['Academic Percentage', 'scholarDashboardAcademicPercentage', 'number'],
      ['Family Income', 'scholarDashboardFamilyIncome', 'number'],
      ['Category', 'scholarDashboardCategory', 'text'],
      ['Scholarship Type', 'scholarDashboardScholarshipType', 'text'],
      ['Eligibility Status', 'scholarEligibilityStatus', 'text'],
      ['Scholarship Amount', 'scholarshipAmount', 'number'],
      ['Merit Score', 'scholarMeritScore', 'number'],
      ['Approval Probability', 'scholarApprovalProbability', 'number'],
    ],
  },
  {
    title: 'AI Scholarship Advisor',
    fields: [
      ['Academic Percentage', 'scholarAiAcademicPercentage', 'number'],
      ['Family Income', 'scholarAiFamilyIncome', 'number'],
      ['Course', 'scholarAiCourse', 'text'],
      ['Recommended Scholarships', 'scholarRecommendedScholarships', 'textarea'],
      ['Success Chance', 'scholarSuccessChance', 'number'],
      ['Suggested Scholarship Amount', 'scholarSuggestedAmount', 'number'],
      ['Total Educational Cost', 'scholarTotalEducationCost', 'number'],
      ['Estimated Scholarship', 'scholarEstimatedScholarship', 'number'],
      ['Student Contribution', 'scholarStudentContribution', 'number'],
    ],
  },
  {
    title: 'Review & Submit',
    fields: [
      ['Review Application', 'scholarReview', 'textarea'],
      ['Aadhaar Verification', 'scholarAadhaarVerification', 'checkbox'],
      ['Income Certificate Verification', 'scholarIncomeVerification', 'checkbox'],
      ['Academic Certificate Verification', 'scholarAcademicVerification', 'checkbox'],
      ['Declaration Checkbox', 'scholarDeclaration', 'checkbox'],
      ['Terms & Conditions', 'scholarTerms', 'checkbox'],
    ],
  },
];

  const selectedSections = isPersonalLoan
    ? personalLoanSections
    : isHomeLoan
      ? homeLoanSections
      : isCarLoan
        ? carLoanSections
        : isEducationLoan
          ? educationLoanSections
          : isBusinessLoan
            ? businessLoanSections
            : isTermInsurance
              ? termInsuranceSections
              : isLifeInsurance
                ? lifeInsuranceSections
                : isHealthInsurance
                  ? healthInsuranceSections
                  : isVehicleInsurance
                    ? vehicleInsuranceSections
                    : isNps
                      ? npsSections
                      : isApy
                        ? apySections
                        : isPmSym
                          ? pmSymSections
                          : isSeniorCitizenPension
                            ? seniorCitizenPensionSections
                            : isEShram
                              ? eShramSections
                              : isPmKisan
                                ? pmKisanSections
                                : isLabourWelfare
                                  ? labourWelfareSections
                                  : isScholarship
                                    ? scholarshipSections
                                    : [];

  const progress =
    selectedSections.length > 0
      ? Math.round(((currentStep + 1) / selectedSections.length) * 100)
      : 0;

  const currentSection = selectedSections[currentStep];

  const renderField = ([label, name, type, options]) => {
    const lowerLabel = label.toLowerCase();

    const isAmountField =
      type === 'number' &&
      (
        lowerLabel.includes('income') ||
        lowerLabel.includes('salary') ||
        lowerLabel.includes('amount') ||
        lowerLabel.includes('fees') ||
        lowerLabel.includes('cost') ||
        lowerLabel.includes('price') ||
        lowerLabel.includes('emi') ||
        lowerLabel.includes('turnover') ||
        lowerLabel.includes('revenue') ||
        lowerLabel.includes('profit') ||
        lowerLabel.includes('value') ||
        lowerLabel.includes('premium') ||
        lowerLabel.includes('charges') ||
        lowerLabel.includes('gst')
      );

    if (type === 'checkbox') {
      return (
        <label key={name} className="flex items-center gap-3 rounded-lg border border-theme-light bg-theme-bg px-4 py-3 text-sm font-medium text-theme-secondary">
          <input
            type="checkbox"
            name={name}
            checked={Boolean(formData[name])}
            onChange={handleChange}
            className="h-4 w-4"
          />
          {label}
        </label>
      );
    }
    if (type === 'file') {
  return (
    <div key={name}>
      <label className="label">{label}</label>

      <label
        htmlFor={name}
<<<<<<< HEAD
        className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/60 px-4 py-6 text-center transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md"
=======
        className="group flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-blue-300 bg-blue-50/50 px-3 py-3 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-sm"
>>>>>>> origin/feature/admin-review
      >
        <input
          id={name}
          type="file"
          name={name}
          onChange={handleChange}
          className="hidden"
        />

<<<<<<< HEAD
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-sm transition-all duration-300 group-hover:scale-110">
          📤
        </div>

        <p className="text-sm font-semibold text-theme-primary">
          {formData[name] ? 'File Selected' : 'Click to Upload'}
        </p>

        <p className="mt-1 text-xs text-theme-muted">
          PDF, JPG, PNG allowed
        </p>

        {formData[name] && (
          <div className="mt-3 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            ✓ {formData[name]}
          </div>
=======
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-lg shadow-sm transition group-hover:scale-105">
          📤
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-theme-primary">
            {formData[name] ? formData[name] : 'Click to upload'}
          </p>
          <p className="text-xs text-theme-muted">
            PDF, JPG, PNG allowed
          </p>
        </div>

        {formData[name] && (
          <span className="shrink-0 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
            ✓
          </span>
>>>>>>> origin/feature/admin-review
        )}
      </label>
    </div>
  );
}

    return (
      <div key={name} className={type === 'textarea' ? 'md:col-span-2' : ''}>
        <label className="label">
          {label}
          {isAmountField && <span className="text-theme-brand ml-1">(₹)</span>}
        </label>

        {type === 'select' ? (
          <select name={name} required={false} className="input-field" onChange={handleChange} value={formData[name] || ''}>
            <option value="">Select Option</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea name={name} required={false} className="input-field" rows="2" onChange={handleChange} value={formData[name] || ''} />
        ) : (
          <>
            <input
              type={type === 'number' ? 'text' : type}
              inputMode={type === 'number' ? 'numeric' : undefined}
              pattern={type === 'number' ? '[0-9]*' : undefined}
              name={name}
              required={false}
              className="input-field"
              onChange={handleChange}
              value={type === 'file' ? undefined : formData[name] || ''}
            />

            
          </>
        )}
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-theme-primary mb-3">
            Application Submitted Successfully
          </h2>
          <p className="text-theme-muted mb-4">
            Your application has been submitted for review.
          </p>
          <p className="font-semibold text-theme-brand mb-6">
            Reference ID: FT{Date.now().toString().slice(-8)}
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => openCategory(currentCategory.id)}
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <button onClick={() => openCategory(currentCategory.id)} className="btn-secondary mb-6 pl-3 group">
        Back
      </button>

      <div className="mb-8">
        <span className="text-xs font-semibold text-theme-brand uppercase tracking-widest">
          {currentCategory.name}
        </span>
        <h2 className="text-2xl font-bold text-theme-primary">{currentScheme.name}</h2>
        <p className="text-theme-muted mt-2">Fill the required details below.</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium mb-2">
          <span>Application Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-theme-muted mt-2">
          Page {currentStep + 1} of {selectedSections.length}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentSection ? (
          <>
          {currentSection?.title === 'Pension Projection' && isNps && (
  <PensionCalculator type="nps" />
)}

{currentSection?.title === 'Pension Projection' && isApy && (
  <PensionCalculator type="apy" />
)}

{currentSection?.title === 'Pension Projection' && isPmSym && (
  <PensionCalculator type="pmSym" />
)}

{currentSection?.title === 'Pension Projection' && isSeniorCitizenPension && (
  <PensionCalculator type="senior" />
)}
{(
  isPersonalLoan ||
  isHomeLoan ||
  isCarLoan ||
  isEducationLoan ||
  isBusinessLoan
) && currentSection?.title?.toLowerCase().includes('financial') && (
  <EligibilityChecker />
)}

{(
  isPersonalLoan ||
  isHomeLoan ||
  isCarLoan ||
  isEducationLoan ||
  isBusinessLoan
) && currentSection?.title?.toLowerCase().includes('loan') && (
  <LoanCalculator />
)}
            <div className="card !border-t-2 !border-t-[#2563EB]">
              <h3 className="text-lg font-semibold text-theme-primary mb-4">
                {currentSection.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {currentSection.fields.map(renderField)}
              </div>
            </div>

            <div className="flex gap-4">
              {currentStep > 0 && (
                <button
                  type="button"
                  className="btn-secondary flex-1 justify-center"
                  onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                >
                  Previous
                </button>
              )}

              {currentStep < selectedSections.length - 1 ? (
                <button
                  type="button"
                  className="btn-primary flex-1"
                  onClick={() => setCurrentStep((prev) => Math.min(prev + 1, selectedSections.length - 1))}
                >
                  Next
                </button>
              ) : (
                <button type="submit" className="btn-primary flex-1">
                  Submit Application
                </button>
              )}
            </div>
          </>
        ) : (
          <p>This form is not available yet.</p>
        )}
      </form>
    </div>
  );
}