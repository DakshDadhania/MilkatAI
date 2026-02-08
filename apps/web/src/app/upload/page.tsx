"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";

type AnalysisResult = {
  ocr: { text: string; language: string };
  llm: { summary: string; issues: Array<{ title: string; severity: string }> };
  comparison?: Array<{ title: string; severity: string; details: string }>;
};

type Question = {
  id: string;
  en: string;
  gu: string;
};

type QuestionCategoryId =
  | "rentAgreement"
  | "dastavej"
  | "partnershipDeed"
  | "propertyRecords"
  | "complianceFinance"
  | "verificationKyc";

type QuestionCategory = {
  id: QuestionCategoryId;
  title: { en: string; gu: string };
  description: { en: string; gu: string };
  questions: Question[];
};

const documentQuestions: Question[] = [
  {
    id: "q1",
    en: "Is probate required in the document file according to you?",
    gu: "તમારા અનુસાર દસ્તાવેજ ફાઇલમાં પ્રોબેટ જરૂરી છે?",
  },
  {
    id: "q2",
    en: "Is stamp duty required while converting a partnership deed to private limited according to you?",
    gu: "તમારા અનુસાર પાર્ટનરશીપ ડીડને પ્રાઇવેટ લિમિટેડમાં ફેરવતી વખતે સ્ટેમ્પ ડ્યૂટી જરૂરી છે?",
  },
  {
    id: "q3",
    en: "Is a rent agreement required to be submitted at the police station after it is signed according to you?",
    gu: "તમારા અનુસાર ભાડા કરાર પર સહી થયા પછી પોલીસ સ્ટેશનમાં જમા કરાવવો જરૂરી છે?",
  },
  {
    id: "q4",
    en: "Is notarization required for this document according to you?",
    gu: "તમારા અનુસાર આ દસ્તાવેજ માટે નોટરાઇઝેશન જરૂરી છે?",
  },
  {
    id: "q5",
    en: "Is registration required for this document according to you?",
    gu: "તમારા અનુસાર આ દસ્તાવેજનું રજિસ્ટ્રેશન જરૂરી છે?",
  },
  {
    id: "q6",
    en: "Is a witness signature required according to you?",
    gu: "તમારા અનુસાર સાક્ષીની સહી જરૂરી છે?",
  },
  {
    id: "q7",
    en: "Is Aadhaar required for verification according to you?",
    gu: "તમારા અનુસાર ચકાસણી માટે આધાર કાર્ડ જરૂરી છે?",
  },
  {
    id: "q8",
    en: "Is PAN required for verification according to you?",
    gu: "તમારા અનુસાર ચકાસણી માટે પેન કાર્ડ જરૂરી છે?",
  },
  {
    id: "q9",
    en: "Is address proof required according to you?",
    gu: "તમારા અનુસાર સરનામા પુરાવાની જરૂર છે?",
  },
  {
    id: "q10",
    en: "Is photograph required according to you?",
    gu: "તમારા અનુસાર ફોટોગ્રાફ જરૂરી છે?",
  },
  {
    id: "q11",
    en: "Is a company seal required according to you?",
    gu: "તમારા અનુસાર કંપનીની સીલ જરૂરી છે?",
  },
  {
    id: "q12",
    en: "Is board resolution required according to you?",
    gu: "તમારા અનુસાર બોર્ડ રિઝોલ્યુશન જરૂરી છે?",
  },
  {
    id: "q13",
    en: "Is director consent required according to you?",
    gu: "તમારા અનુસાર ડિરેક્ટરનું સંમતિપત્ર જરૂરી છે?",
  },
  {
    id: "q14",
    en: "Is shareholder consent required according to you?",
    gu: "તમારા અનુસાર શેરહોલ્ડરનું સંમતિપત્ર જરૂરી છે?",
  },
  {
    id: "q15",
    en: "Is identity verification required according to you?",
    gu: "તમારા અનુસાર ઓળખ ચકાસણી જરૂરી છે?",
  },
  {
    id: "q16",
    en: "Is address verification required according to you?",
    gu: "તમારા અનુસાર સરનામા ચકાસણી જરૂરી છે?",
  },
  {
    id: "q17",
    en: "Is document attestation required according to you?",
    gu: "તમારા અનુસાર દસ્તાવેજ એટેસ્ટેશન જરૂરી છે?",
  },
  {
    id: "q18",
    en: "Is a gazetted officer attestation required according to you?",
    gu: "તમારા અનુસાર ગેઝેટેડ ઓફિસરનું એટેસ્ટેશન જરૂરી છે?",
  },
  {
    id: "q19",
    en: "Is a notary stamp required according to you?",
    gu: "તમારા અનુસાર નોટરી સ્ટેમ્પ જરૂરી છે?",
  },
  {
    id: "q20",
    en: "Is e-stamping required according to you?",
    gu: "તમારા અનુસાર ઇ-સ્ટેમ્પિંગ જરૂરી છે?",
  },
  {
    id: "q21",
    en: "Is court fee required according to you?",
    gu: "તમારા અનુસાર કોર્ટ ફી જરૂરી છે?",
  },
  {
    id: "q22",
    en: "Is affidavit required according to you?",
    gu: "તમારા અનુસાર એફિડેવિટ જરૂરી છે?",
  },
  {
    id: "q23",
    en: "Is indemnity bond required according to you?",
    gu: "તમારા અનુસાર ઈન્ડેમ્નિટી બોન્ડ જરૂરી છે?",
  },
  {
    id: "q24",
    en: "Is power of attorney required according to you?",
    gu: "તમારા અનુસાર પાવર ઓફ અટોર્ની જરૂરી છે?",
  },
  {
    id: "q25",
    en: "Is authority letter required according to you?",
    gu: "તમારા અનુસાર ઓથોરિટી લેટર જરૂરી છે?",
  },
  {
    id: "q26",
    en: "Is cancellation deed required according to you?",
    gu: "તમારા અનુસાર કેન્સલેશન ડીડ જરૂરી છે?",
  },
  {
    id: "q27",
    en: "Is rectification deed required according to you?",
    gu: "તમારા અનુસાર રેક્ટિફિકેશન ડીડ જરૂરી છે?",
  },
  {
    id: "q28",
    en: "Is possession letter required according to you?",
    gu: "તમારા અનુસાર પઝેશન લેટર જરૂરી છે?",
  },
  {
    id: "q29",
    en: "Is no-objection certificate required according to you?",
    gu: "તમારા અનુસાર એનઓસી જરૂરી છે?",
  },
  {
    id: "q30",
    en: "Is a tax receipt required according to you?",
    gu: "તમારા અનુસાર ટેક્સ રસીદ જરૂરી છે?",
  },
  {
    id: "q31",
    en: "Is a utility bill required according to you?",
    gu: "તમારા અનુસાર યુટિલિટી બિલ જરૂરી છે?",
  },
  {
    id: "q32",
    en: "Is bank statement required according to you?",
    gu: "તમારા અનુસાર બેંક સ્ટેટમેન્ટ જરૂરી છે?",
  },
  {
    id: "q33",
    en: "Is income proof required according to you?",
    gu: "તમારા અનુસાર આવક પુરાવો જરૂરી છે?",
  },
  {
    id: "q34",
    en: "Is employment proof required according to you?",
    gu: "તમારા અનુસાર રોજગાર પુરાવો જરૂરી છે?",
  },
  {
    id: "q35",
    en: "Is business proof required according to you?",
    gu: "તમારા અનુસાર વ્યવસાય પુરાવો જરૂરી છે?",
  },
  {
    id: "q36",
    en: "Is GST registration required according to you?",
    gu: "તમારા અનુસાર જીએસટી રજિસ્ટ્રેશન જરૂરી છે?",
  },
  {
    id: "q37",
    en: "Is MSME registration required according to you?",
    gu: "તમારા અનુસાર એમએસએમઈ રજિસ્ટ્રેશન જરૂરી છે?",
  },
  {
    id: "q38",
    en: "Is shop and establishment registration required according to you?",
    gu: "તમારા અનુસાર શોપ એન્ડ એસ્ટેબ્લિશમેન્ટ રજિસ્ટ્રેશન જરૂરી છે?",
  },
  {
    id: "q39",
    en: "Is trade license required according to you?",
    gu: "તમારા અનુસાર ટ્રેડ લાઇસન્સ જરૂરી છે?",
  },
  {
    id: "q40",
    en: "Is professional tax registration required according to you?",
    gu: "તમારા અનુસાર પ્રોફેશનલ ટેક્સ રજિસ્ટ્રેશન જરૂરી છે?",
  },
  {
    id: "q41",
    en: "Is PF registration required according to you?",
    gu: "તમારા અનુસાર પી.એફ. રજિસ્ટ્રેશન જરૂરી છે?",
  },
  {
    id: "q42",
    en: "Is ESIC registration required according to you?",
    gu: "તમારા અનુસાર ઇએસઆઇસી રજિસ્ટ્રેશન જરૂરી છે?",
  },
  {
    id: "q43",
    en: "Is labor license required according to you?",
    gu: "તમારા અનુસાર લેબર લાઇસન્સ જરૂરી છે?",
  },
  {
    id: "q44",
    en: "Is fire safety clearance required according to you?",
    gu: "તમારા અનુસાર ફાયર સેફ્ટી ક્લિયરન્સ જરૂરી છે?",
  },
  {
    id: "q45",
    en: "Is pollution control clearance required according to you?",
    gu: "તમારા અનુસાર પોલ્યુશન કંટ્રોલ ક્લિયરન્સ જરૂરી છે?",
  },
  {
    id: "q46",
    en: "Is building plan approval required according to you?",
    gu: "તમારા અનુસાર બિલ્ડિંગ પ્લાન મંજૂરી જરૂરી છે?",
  },
  {
    id: "q47",
    en: "Is occupancy certificate required according to you?",
    gu: "તમારા અનુસાર ઓક્યુપન્સી સર્ટિફિકેટ જરૂરી છે?",
  },
  {
    id: "q48",
    en: "Is completion certificate required according to you?",
    gu: "તમારા અનુસાર કમ્પ્લીશન સર્ટિફિકેટ જરૂરી છે?",
  },
  {
    id: "q49",
    en: "Is property tax clearance required according to you?",
    gu: "તમારા અનુસાર પ્રોપર્ટી ટેક્સ ક્લિયરન્સ જરૂરી છે?",
  },
  {
    id: "q50",
    en: "Is land title verification required according to you?",
    gu: "તમારા અનુસાર જમીન ટાઇટલ ચકાસણી જરૂરી છે?",
  },
  {
    id: "q51",
    en: "Is mutation entry required according to you?",
    gu: "તમારા અનુસાર મ્યુટેશન એન્ટ્રી જરૂરી છે?",
  },
  {
    id: "q52",
    en: "Is 7/12 extract required according to you?",
    gu: "તમારા અનુસાર 7/12 ઉતારો જરૂરી છે?",
  },
  {
    id: "q53",
    en: "Is property card required according to you?",
    gu: "તમારા અનુસાર પ્રોપર્ટી કાર્ડ જરૂરી છે?",
  },
  {
    id: "q54",
    en: "Is title clearance certificate required according to you?",
    gu: "તમારા અનુસાર ટાઇટલ ક્લિયરન્સ સર્ટિફિકેટ જરૂરી છે?",
  },
  {
    id: "q55",
    en: "Is an encumbrance certificate required according to you?",
    gu: "તમારા અનુસાર એન્કમ્બ્રન્સ સર્ટિફિકેટ જરૂરી છે?",
  },
  {
    id: "q56",
    en: "Is society NOC required according to you?",
    gu: "તમારા અનુસાર સોસાયટી એનઓસી જરૂરી છે?",
  },
  {
    id: "q57",
    en: "Is electricity meter transfer required according to you?",
    gu: "તમારા અનુસાર વીજ મીટર ટ્રાન્સફર જરૂરી છે?",
  },
  {
    id: "q58",
    en: "Is water connection transfer required according to you?",
    gu: "તમારા અનુસાર પાણી કનેક્શન ટ્રાન્સફર જરૂરી છે?",
  },
  {
    id: "q59",
    en: "Is a pipeline NOC required according to you?",
    gu: "તમારા અનુસાર પાઇપલાઇન એનઓસી જરૂરી છે?",
  },
  {
    id: "q60",
    en: "Is a bank NOC required according to you?",
    gu: "તમારા અનુસાર બેંક એનઓસી જરૂરી છે?",
  },
  {
    id: "q61",
    en: "Is a loan clearance letter required according to you?",
    gu: "તમારા અનુસાર લોન ક્લિયરન્સ લેટર જરૂરી છે?",
  },
  {
    id: "q62",
    en: "Is an EMI closure letter required according to you?",
    gu: "તમારા અનુસાર ઇએમઆઇ ક્લોઝર લેટર જરૂરી છે?",
  },
  {
    id: "q63",
    en: "Is a bank KYC required according to you?",
    gu: "તમારા અનુસાર બેંક કેવાયસી જરૂરી છે?",
  },
  {
    id: "q64",
    en: "Is a signature verification required according to you?",
    gu: "તમારા અનુસાર સહી ચકાસણી જરૂરી છે?",
  },
  {
    id: "q65",
    en: "Is video KYC required according to you?",
    gu: "તમારા અનુસાર વિડિઓ કેવાયસી જરૂરી છે?",
  },
  {
    id: "q66",
    en: "Is biometric verification required according to you?",
    gu: "તમારા અનુસાર બાયોમેટ્રિક ચકાસણી જરૂરી છે?",
  },
  {
    id: "q67",
    en: "Is a digital signature required according to you?",
    gu: "તમારા અનુસાર ડિજિટલ સહી જરૂરી છે?",
  },
  {
    id: "q68",
    en: "Is DSC registration required according to you?",
    gu: "તમારા અનુસાર ડીએસસી રજિસ્ટ્રેશન જરૂરી છે?",
  },
  {
    id: "q69",
    en: "Is an email verification required according to you?",
    gu: "તમારા અનુસાર ઇમેલ ચકાસણી જરૂરી છે?",
  },
  {
    id: "q70",
    en: "Is a mobile OTP verification required according to you?",
    gu: "તમારા અનુસાર મોબાઇલ ઓટીપી ચકાસણી જરૂરી છે?",
  },
  {
    id: "q71",
    en: "Is a declaration form required according to you?",
    gu: "તમારા અનુસાર ડીકલેરેશન ફોર્મ જરૂરી છે?",
  },
  {
    id: "q72",
    en: "Is a consent form required according to you?",
    gu: "તમારા અનુસાર કન્સેન્ટ ફોર્મ જરૂરી છે?",
  },
  {
    id: "q73",
    en: "Is a change request form required according to you?",
    gu: "તમારા અનુસાર ચેન્જ રિક્વેસ્ટ ફોર્મ જરૂરી છે?",
  },
  {
    id: "q74",
    en: "Is a verification call required according to you?",
    gu: "તમારા અનુસાર વેરિફિકેશન કોલ જરૂરી છે?",
  },
  {
    id: "q75",
    en: "Is a physical visit required according to you?",
    gu: "તમારા અનુસાર ફિઝિકલ વિઝિટ જરૂરી છે?",
  },
  {
    id: "q76",
    en: "Is a site inspection required according to you?",
    gu: "તમારા અનુસાર સાઇટ ઇન્સ્પેક્શન જરૂરી છે?",
  },
  {
    id: "q77",
    en: "Is a valuation report required according to you?",
    gu: "તમારા અનુસાર વેલ્યુએશન રિપોર્ટ જરૂરી છે?",
  },
  {
    id: "q78",
    en: "Is a legal opinion required according to you?",
    gu: "તમારા અનુસાર લીગલ ઓપિનિયન જરૂરી છે?",
  },
  {
    id: "q79",
    en: "Is a CA certificate required according to you?",
    gu: "તમારા અનુસાર સીએ સર્ટિફિકેટ જરૂરી છે?",
  },
  {
    id: "q80",
    en: "Is a ROC filing required according to you?",
    gu: "તમારા અનુસાર આરઓસી ફાઇલિંગ જરૂરી છે?",
  },
  {
    id: "q81",
    en: "Is a GST return required according to you?",
    gu: "તમારા અનુસાર જીએસટી રિટર્ન જરૂરી છે?",
  },
  {
    id: "q82",
    en: "Is an income tax return required according to you?",
    gu: "તમારા અનુસાર ઇન્કમ ટેક્સ રિટર્ન જરૂરી છે?",
  },
  {
    id: "q83",
    en: "Is a bank mandate required according to you?",
    gu: "તમારા અનુસાર બેંક મૅન્ડેટ જરૂરી છે?",
  },
  {
    id: "q84",
    en: "Is a UPI mandate required according to you?",
    gu: "તમારા અનુસાર યુપીઆઇ મૅન્ડેટ જરૂરી છે?",
  },
  {
    id: "q85",
    en: "Is a refund authorization required according to you?",
    gu: "તમારા અનુસાર રિફંડ ઓથોરાઇઝેશન જરૂરી છે?",
  },
  {
    id: "q86",
    en: "Is payment proof required according to you?",
    gu: "તમારા અનુસાર પેમેન્ટ પ્રૂફ જરૂરી છે?",
  },
  {
    id: "q87",
    en: "Is a delivery challan required according to you?",
    gu: "તમારા અનુસાર ડિલિવરી ચલાન જરૂરી છે?",
  },
  {
    id: "q88",
    en: "Is an invoice required according to you?",
    gu: "તમારા અનુસાર ઇન્વોઇસ જરૂરી છે?",
  },
  {
    id: "q89",
    en: "Is a purchase order required according to you?",
    gu: "તમારા અનુસાર પર્ચેસ ઓર્ડર જરૂરી છે?",
  },
  {
    id: "q90",
    en: "Is a quotation required according to you?",
    gu: "તમારા અનુસાર ક્વોટેશન જરૂરી છે?",
  },
  {
    id: "q91",
    en: "Is a work order required according to you?",
    gu: "તમારા અનુસાર વર્ક ઓર્ડર જરૂરી છે?",
  },
  {
    id: "q92",
    en: "Is a service agreement required according to you?",
    gu: "તમારા અનુસાર સર્વિસ એગ્રીમેન્ટ જરૂરી છે?",
  },
  {
    id: "q93",
    en: "Is an SLA required according to you?",
    gu: "તમારા અનુસાર એસએલએ જરૂરી છે?",
  },
  {
    id: "q94",
    en: "Is a warranty document required according to you?",
    gu: "તમારા અનુસાર વોરંટી દસ્તાવેજ જરૂરી છે?",
  },
  {
    id: "q95",
    en: "Is a return policy required according to you?",
    gu: "તમારા અનુસાર રિટર્ન પોલિસી જરૂરી છે?",
  },
  {
    id: "q96",
    en: "Is a privacy policy required according to you?",
    gu: "તમારા અનુસાર પ્રાઇવસી પોલિસી જરૂરી છે?",
  },
  {
    id: "q97",
    en: "Is a terms and conditions document required according to you?",
    gu: "તમારા અનુસાર ટર્મ્સ એન્ડ કન્ડિશન્સ દસ્તાવેજ જરૂરી છે?",
  },
  {
    id: "q98",
    en: "Is a data processing agreement required according to you?",
    gu: "તમારા અનુસાર ડેટા પ્રોસેસિંગ એગ્રીમેન્ટ જરૂરી છે?",
  },
  {
    id: "q99",
    en: "Is a consent withdrawal process required according to you?",
    gu: "તમારા અનુસાર કન્સેન્ટ વિથડ્રૉલ પ્રક્રિયા જરૂરી છે?",
  },
  {
    id: "q100",
    en: "Is a grievance redressal process required according to you?",
    gu: "તમારા અનુસાર ગ્રીવન્સ રિડ્રેસલ પ્રક્રિયા જરૂરી છે?",
  },
];

const getCategoryId = (questionId: string): QuestionCategoryId => {
  const numericId = Number(questionId.replace("q", ""));
  const rentAgreementIds = new Set(["q3", "q28", "q30", "q31", "q57", "q58", "q75"]);
  const partnershipDeedIds = new Set([
    "q2",
    "q11",
    "q12",
    "q13",
    "q14",
    "q35",
    "q36",
    "q37",
    "q38",
    "q39",
    "q40",
    "q41",
    "q42",
    "q43",
    "q44",
    "q45",
    "q79",
    "q80",
  ]);
  const verificationIds = new Set([
    "q7",
    "q8",
    "q9",
    "q10",
    "q15",
    "q16",
    "q17",
    "q18",
    "q19",
    "q20",
    "q63",
    "q64",
    "q65",
    "q66",
    "q67",
    "q68",
    "q69",
    "q70",
  ]);
  const financeIds = new Set([
    "q32",
    "q33",
    "q34",
    "q60",
    "q61",
    "q62",
    "q81",
    "q82",
    "q83",
    "q84",
    "q85",
    "q86",
    "q87",
    "q88",
    "q89",
    "q90",
  ]);

  if (rentAgreementIds.has(questionId)) return "rentAgreement";
  if (partnershipDeedIds.has(questionId)) return "partnershipDeed";
  if (verificationIds.has(questionId)) return "verificationKyc";
  if (financeIds.has(questionId)) return "complianceFinance";
  if (numericId >= 46 && numericId <= 56) return "propertyRecords";
  return "dastavej";
};

const baseQuestionCategories: Record<QuestionCategoryId, QuestionCategory> = {
  rentAgreement: {
    id: "rentAgreement",
    title: { en: "Rent Agreement", gu: "ભાડા કરાર" },
    description: {
      en: "Tenant, police submission, utilities, and occupancy checks.",
      gu: "ભાડુઆત, પોલીસ સબમિશન, યુટિલિટી અને ઓક્યુપન્સી ચકાસણીઓ.",
    },
    questions: [],
  },
  dastavej: {
    id: "dastavej",
    title: { en: "Dastavej & Legal Documents", gu: "દસ્તાવેજ અને કાનૂની દસ્તાવેજો" },
    description: {
      en: "General legal documents, affidavits, and agreements.",
      gu: "સામાન્ય કાનૂની દસ્તાવેજો, એફિડેવિટ અને કરારો.",
    },
    questions: [],
  },
  partnershipDeed: {
    id: "partnershipDeed",
    title: { en: "Partnership Deed", gu: "પાર્ટનરશીપ ડીડ" },
    description: {
      en: "Company conversion, registrations, and operational compliance.",
      gu: "કંપની રૂપાંતર, રજિસ્ટ્રેશન અને અનુપાલન.",
    },
    questions: [],
  },
  propertyRecords: {
    id: "propertyRecords",
    title: { en: "Property & Land Records", gu: "પ્રોપર્ટી અને જમીન રેકોર્ડ્સ" },
    description: {
      en: "Land title, mutation, encumbrance, and property certificates.",
      gu: "ટાઇટલ, મ્યુટેશન, એન્કમ્બ્રન્સ અને પ્રોપર્ટી સર્ટિફિકેટ્સ.",
    },
    questions: [],
  },
  complianceFinance: {
    id: "complianceFinance",
    title: { en: "Compliance & Finance", gu: "અનુપાલન અને નાણાકીય" },
    description: {
      en: "Financial proofs, filings, invoices, and payment checks.",
      gu: "નાણાકીય પુરાવા, ફાઇલિંગ, ઇન્વોઇસ અને પેમેન્ટ ચકાસણીઓ.",
    },
    questions: [],
  },
  verificationKyc: {
    id: "verificationKyc",
    title: { en: "Verification & KYC", gu: "ચકાસણી અને KYC" },
    description: {
      en: "Identity verification, signatures, and digital approvals.",
      gu: "ઓળખ ચકાસણી, સહી અને ડિજિટલ મંજૂરીઓ.",
    },
    questions: [],
  },
};

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [scrapeJson, setScrapeJson] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [questionLanguage, setQuestionLanguage] = useState<"en" | "gu">("en");
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, "yes" | "no">>(
    () =>
      Object.fromEntries(documentQuestions.map((question) => [question.id, "no"]))
  );
  const { t } = useI18n();

  const questionCategories = useMemo(() => {
    const categoryMap: Record<QuestionCategoryId, QuestionCategory> = {
      rentAgreement: { ...baseQuestionCategories.rentAgreement, questions: [] },
      dastavej: { ...baseQuestionCategories.dastavej, questions: [] },
      partnershipDeed: {
        ...baseQuestionCategories.partnershipDeed,
        questions: [],
      },
      propertyRecords: {
        ...baseQuestionCategories.propertyRecords,
        questions: [],
      },
      complianceFinance: {
        ...baseQuestionCategories.complianceFinance,
        questions: [],
      },
      verificationKyc: { ...baseQuestionCategories.verificationKyc, questions: [] },
    };

    documentQuestions.forEach((question) => {
      const categoryId = getCategoryId(question.id);
      categoryMap[categoryId].questions.push(question);
    });

    return Object.values(categoryMap);
  }, []);

  const settingsSummary = useMemo(() => {
    const yesCount = Object.values(questionAnswers).filter(
      (answer) => answer === "yes"
    ).length;
    return { yesCount, totalCount: documentQuestions.length };
  }, [questionAnswers]);

  const getLanguageButtonClass = (isActive: boolean) => {
    if (isActive) {
      return "rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white";
    }
    return "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10";
  };

  const getAnswerButtonClass = (isSelected: boolean) => {
    if (isSelected) {
      return "rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm shadow-emerald-500/40";
    }
    return "rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/10";
  };

  const handleAnswerChange = (questionId: string, value: "yes" | "no") => {
    setQuestionAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSaveSettings = () => {
    window.alert(
      "You're editing rules manually. Changes may not follow current laws. The app isn't liable for disputes."
    );
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (scrapeJson.trim()) {
        formData.append("scrape", scrapeJson);
      }
      const response = await fetch("/api/documents/analyze", {
        method: "POST",
        body: formData,
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to analyze document.");
      }
      setResult(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-[0_30px_80px_-40px_rgba(56,189,248,0.45)]">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300/80">
                Secure upload
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
          {t.app.upload.title}
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          {t.app.upload.subtitle}
        </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 px-5 py-4 text-xs text-slate-300">
              AI review in minutes • Gujarati + English supported
            </div>
          </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="file"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="w-full flex-1 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-white shadow-inner shadow-black/40"
              aria-label="Upload document file"
            />
            <button
              type="button"
              onClick={() => setShowSettings((prev) => !prev)}
              className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
              aria-label="Edit document settings"
            >
              {showSettings ? "Hide settings" : "Edit settings"}
            </button>
          </div>
          {showSettings ? (
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Document settings
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    Default answers are set to No. Adjust if required.
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
                  <button
                    type="button"
                    onClick={() => setQuestionLanguage("en")}
                    className={getLanguageButtonClass(questionLanguage === "en")}
                    aria-label="Switch questions to English"
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuestionLanguage("gu")}
                    className={getLanguageButtonClass(questionLanguage === "gu")}
                    aria-label="Switch questions to Gujarati"
                  >
                    ગુજરાતી
                  </button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3">
                <p className="text-xs font-semibold text-slate-200">
                  Selected Yes: {settingsSummary.yesCount} /{" "}
                  {settingsSummary.totalCount}
                </p>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-fuchsia-500/30"
                  aria-label="Save settings with warning"
                >
                  Save settings
                </button>
              </div>
              <div className="mt-4 grid gap-4">
                {questionCategories.map((category) => {
                  const categoryTitle =
                    questionLanguage === "en" ? category.title.en : category.title.gu;
                  const categoryDescription =
                    questionLanguage === "en"
                      ? category.description.en
                      : category.description.gu;
                  return (
                    <div
                      key={category.id}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {categoryTitle}
                          </p>
                          <p className="mt-1 text-xs text-slate-300">
                            {categoryDescription}
                          </p>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200">
                          {category.questions.length} questions
                        </span>
                      </div>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        {category.questions.map((question) => {
                          const label =
                            questionLanguage === "en" ? question.en : question.gu;
                          const answer = questionAnswers[question.id] ?? "no";
                          return (
                            <div
                              key={question.id}
                              className="rounded-xl border border-white/10 bg-slate-900/60 p-4"
                            >
                              <p className="text-sm font-medium text-white">
                                {label}
                              </p>
                              <div className="mt-3 flex flex-wrap items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAnswerChange(question.id, "yes")
                                  }
                                  className={getAnswerButtonClass(answer === "yes")}
                                  aria-label="Answer yes"
                                >
                                  Yes
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAnswerChange(question.id, "no")
                                  }
                                  className={getAnswerButtonClass(answer === "no")}
                                  aria-label="Answer no"
                                >
                                  No
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
          <textarea
            value={scrapeJson}
            onChange={(event) => setScrapeJson(event.target.value)}
            placeholder={t.app.upload.scrapeHint}
            className="h-28 w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-xs text-white shadow-inner shadow-black/40"
          />
          <button
            type="submit"
            disabled={loading || !file}
            className="rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:brightness-110 disabled:opacity-60"
          >
            {loading ? t.app.upload.analyzing : t.app.upload.button}
          </button>
        </form>
        {error ? <p className="mt-4 text-xs text-rose-300">{error}</p> : null}
        {result ? (
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">
              {t.app.upload.summary}
            </h2>
            <p className="mt-2 text-sm text-slate-300">{result.llm.summary}</p>
            <h3 className="mt-4 text-sm font-semibold text-white">
              {t.app.upload.issues}
            </h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-300">
              {result.llm.issues.map((issue) => (
                <li key={issue.title}>
                  {issue.title} • {issue.severity}
                </li>
              ))}
            </ul>
            {result.comparison?.length ? (
              <>
                <h3 className="mt-4 text-sm font-semibold text-white">
                  {t.app.upload.comparison}
                </h3>
                <ul className="mt-2 space-y-2 text-sm text-slate-300">
                  {result.comparison.map((issue) => (
                    <li key={issue.title}>
                      {issue.title} • {issue.severity}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            <h3 className="mt-4 text-sm font-semibold text-white">
              {t.app.upload.ocrExcerpt}
            </h3>
            <p className="mt-2 text-xs text-slate-400">{result.ocr.text}</p>
          </div>
        ) : null}
        </div>
      </div>
    </div>
  );
}
