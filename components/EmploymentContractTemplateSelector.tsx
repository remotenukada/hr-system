"use client";

type Template = {
  id: string;
  name: string;
  contractType: string;
  workStartTime: string;
  workEndTime: string;
  breakMinutes: number;
  holidayRule: string;
  leaveRule: string | null;
  wageType: string;
  baseSalary: number | null;
  allowanceNote: string | null;
  payClosingDay: string | null;
  payDate: string | null;
  bonusRule: string | null;
  raiseRule: string | null;
  probationPeriod: string | null;
  contractRenewalRule: string | null;
  contractRenewalCriteria: string | null;
  retirementRule: string | null;
  retirementAllowanceRule: string | null;
  socialInsuranceRule: string | null;
  employmentInsuranceRule: string | null;
  consultationDesk: string | null;
  workRuleLocation: string | null;
  remarks: string | null;
};

type Props = {
  templates: Template[];
};

function setFieldValue(name: string, value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return;
  }

  const field = document.querySelector<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >(`[name="${name}"]`);

  if (!field) {
    return;
  }

  field.value = String(value);
}

export function EmploymentContractTemplateSelector({
  templates,
}: Props) {
  return (
    <div className="md:col-span-2 rounded border bg-blue-50 p-4">
      <label className="mb-1 block text-sm font-medium text-blue-800">
        テンプレート
      </label>

      <select
        className="w-full rounded border bg-white p-2"
        defaultValue=""
        onChange={(event) => {
          const template = templates.find(
            (item) => item.id === event.target.value,
          );

          if (!template) {
            return;
          }

          setFieldValue("contractType", template.contractType);
          setFieldValue("workStartTime", template.workStartTime);
          setFieldValue("workEndTime", template.workEndTime);
          setFieldValue("breakMinutes", template.breakMinutes);
          setFieldValue("holidayRule", template.holidayRule);
          setFieldValue("leaveRule", template.leaveRule);
          setFieldValue("wageType", template.wageType);
          setFieldValue("baseSalary", template.baseSalary);
          setFieldValue("allowanceNote", template.allowanceNote);
          setFieldValue("payClosingDay", template.payClosingDay);
          setFieldValue("payDate", template.payDate);
          setFieldValue("bonusRule", template.bonusRule);
          setFieldValue("raiseRule", template.raiseRule);
          setFieldValue("probationPeriod", template.probationPeriod);
          setFieldValue("contractRenewalRule", template.contractRenewalRule);
          setFieldValue(
            "contractRenewalCriteria",
            template.contractRenewalCriteria,
          );
          setFieldValue("retirementRule", template.retirementRule);
          setFieldValue(
            "retirementAllowanceRule",
            template.retirementAllowanceRule,
          );
          setFieldValue("socialInsuranceRule", template.socialInsuranceRule);
          setFieldValue(
            "employmentInsuranceRule",
            template.employmentInsuranceRule,
          );
          setFieldValue("consultationDesk", template.consultationDesk);
          setFieldValue("workRuleLocation", template.workRuleLocation);
          setFieldValue("remarks", template.remarks);
        }}
      >
        <option value="">使用しない</option>
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>

      <p className="mt-2 text-xs text-blue-700">
        選択したテンプレートの内容をフォームへコピーします。コピー後は自由に編集できます。
      </p>
    </div>
  );
}
