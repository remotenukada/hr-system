"use client";

type Employee = {
  id: string;
  employeeNo: string;
  lastName: string;
  firstName: string;
  occupation: string | null;
  position: string | null;
};

type Props = {
  employees: Employee[];
};

function setSelectValue(name: string, value: string | null) {
  const field = document.querySelector<HTMLSelectElement>(
    `select[name="${name}"]`,
  );

  if (!field) {
    return;
  }

  field.value = value ?? "";
  field.dispatchEvent(new Event("change", { bubbles: true }));
}

export function EmploymentContractEmployeeSelector({
  employees,
}: Props) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        対象社員 <span className="text-red-500">*</span>
      </label>

      <select
        name="employeeId"
        required
        defaultValue=""
        className="w-full rounded border p-2"
        onChange={(event) => {
          const employee = employees.find(
            (item) => item.id === event.target.value,
          );

          setSelectValue(
            "occupation",
            employee?.occupation ?? null,
          );

          setSelectValue(
            "position",
            employee?.position ?? null,
          );
        }}
      >
        <option value="">選択してください</option>

        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.employeeNo} {employee.lastName}{" "}
            {employee.firstName}
          </option>
        ))}
      </select>
    </div>
  );
}
