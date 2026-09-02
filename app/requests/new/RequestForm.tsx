"use client";

import { useState } from "react";

type LeaveType = {
  id: string;
  code: string;
  name: string;

  allowDay: boolean;
  allowAmHalf: boolean;
  allowPmHalf: boolean;
  allowHourly: boolean;
  allowDateRange: boolean;
  manageBalance: boolean;
  remainingDays: number | null;
};

type Props = {
  leaveTypes: LeaveType[];
  action: (formData: FormData) => void | Promise<void>;
};

type RequestCategory =
  "LEAVE" | "LATE" | "EARLY" | "OUTING" | "CHILD_CARE" | "FAMILY_CARE";

export default function RequestForm({ leaveTypes, action }: Props) {
  const [category, setCategory] = useState<RequestCategory>("LEAVE");

  const [unitType, setUnitType] = useState("");

  const inputClass = "w-full rounded-lg border border-gray-300 bg-white p-2.5";
  const labelClass = "mb-1 block font-medium text-gray-700";

  const isCare = category === "CHILD_CARE" || category === "FAMILY_CARE";

  const [selectedLeaveTypeId, setSelectedLeaveTypeId] = useState("");

  const selectedLeaveType =
    leaveTypes.find((x) => x.id === selectedLeaveTypeId) ?? null;

  return (
    <form action={action} className="space-y-6">
      <div>
        <label className={labelClass}>申請区分</label>

        <select
          name="requestCategory"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value as RequestCategory);
            setUnitType("");
          }}
          className={inputClass}
          required
        >
          <option value="LEAVE">休暇申請</option>

          <option value="LATE">遅刻申請</option>

          <option value="EARLY">早退申請</option>

          <option value="OUTING">外出申請</option>

          <option value="CHILD_CARE">子の看護休暇</option>

          <option value="FAMILY_CARE">介護休暇</option>
        </select>
      </div>

      {category === "LEAVE" && (
        <section className="space-y-4 rounded-lg border bg-gray-50 p-4">
          <h2 className="font-semibold">休暇内容</h2>

          <div>
            <label className={labelClass}>休暇種別</label>

            <select
              name="leaveTypeId"
              value={selectedLeaveTypeId}
              onChange={(event) => {
                setSelectedLeaveTypeId(event.target.value);
                setUnitType("");
              }}
              className={inputClass}
              required
            >
              <option value="">選択してください</option>

              {leaveTypes.map((leaveType) => (
                <option key={leaveType.id} value={leaveType.id}>
                  {leaveType.name}
                  {leaveType.remainingDays !== null
                    ? `（残 ${leaveType.remainingDays.toFixed(1)}日）`
                    : ""}
                </option>
              ))}
            </select>
          </div>

          {selectedLeaveType?.remainingDays !== null && selectedLeaveType && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
              <p className="text-sm text-blue-700">現在の休暇残数</p>
              <p className="text-xl font-bold text-blue-900">
                {selectedLeaveType.remainingDays.toFixed(1)}日
              </p>
            </div>
          )}

          {selectedLeaveType?.allowDateRange ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>開始日</label>
                <input
                  type="date"
                  name="leaveStartDate"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>終了日</label>
                <input
                  type="date"
                  name="leaveEndDate"
                  className={inputClass}
                  required
                />
              </div>
            </div>
          ) : (
            <DateInput className={inputClass} labelClass={labelClass} />
          )}

          {selectedLeaveType && !selectedLeaveType.allowDateRange && (
            <div>
              <label className={labelClass}>取得単位</label>

              <select
                name="unitType"
                value={unitType}
                onChange={(event) => setUnitType(event.target.value)}
                className={inputClass}
                required
              >
                <option value="">選択してください</option>

                {selectedLeaveType.allowDay && (
                  <option value="DAY">全日</option>
                )}

                {selectedLeaveType.allowAmHalf && (
                  <option value="AM_HALF">午前休</option>
                )}

                {selectedLeaveType.allowPmHalf && (
                  <option value="PM_HALF">午後休</option>
                )}

                {selectedLeaveType.allowHourly && (
                  <option value="HOUR">時間単位</option>
                )}
              </select>
            </div>
          )}

          {selectedLeaveType?.allowHourly && unitType === "HOUR" && (
            <TimeInputs
              startLabel="開始時刻"
              endLabel="終了時刻"
              inputClass={inputClass}
              labelClass={labelClass}
            />
          )}

          {unitType && unitType !== "HOUR" && (
            <p className="rounded bg-blue-50 p-3 text-sm text-blue-800">
              取得日数：
              {unitType === "DAY" ? "1日" : "0.5日"}
            </p>
          )}
        </section>
      )}

      {category === "LATE" && (
        <section className="space-y-4 rounded-lg border bg-gray-50 p-4">
          <h2 className="font-semibold">遅刻内容</h2>

          <DateInput className={inputClass} labelClass={labelClass} />

          <TimeInputs
            startLabel="始業予定時刻"
            endLabel="出勤時刻"
            inputClass={inputClass}
            labelClass={labelClass}
          />
        </section>
      )}

      {category === "EARLY" && (
        <section className="space-y-4 rounded-lg border bg-gray-50 p-4">
          <h2 className="font-semibold">早退内容</h2>

          <DateInput className={inputClass} labelClass={labelClass} />

          <TimeInputs
            startLabel="終業予定時刻"
            endLabel="退勤時刻"
            inputClass={inputClass}
            labelClass={labelClass}
          />
        </section>
      )}

      {category === "OUTING" && (
        <section className="space-y-4 rounded-lg border bg-gray-50 p-4">
          <h2 className="font-semibold">外出内容</h2>

          <DateInput className={inputClass} labelClass={labelClass} />

          <TimeInputs
            startLabel="開始時刻"
            endLabel="終了時刻"
            inputClass={inputClass}
            labelClass={labelClass}
          />
        </section>
      )}

      {isCare && (
        <section className="space-y-4 rounded-lg border bg-gray-50 p-4">
          <h2 className="font-semibold">
            {category === "CHILD_CARE" ? "子の看護休暇内容" : "介護休暇内容"}
          </h2>

          <DateInput className={inputClass} labelClass={labelClass} />

          <div>
            <label className={labelClass}>取得単位</label>
            <select
              name="unitType"
              value={unitType}
              onChange={(e) => setUnitType(e.target.value)}
              className={inputClass}
              required
            >
              <option value="">選択してください</option>
              <option value="DAY">全日</option>
              <option value="HALF_DAY">半日</option>
              <option value="AM_HALF">午前休</option>
              <option value="PM_HALF">午後休</option>
              <option value="HOUR">時間単位</option>
            </select>
          </div>

          {unitType === "HOUR" && (
            <TimeInputs
              startLabel="開始時刻"
              endLabel="終了時刻"
              inputClass={inputClass}
              labelClass={labelClass}
            />
          )}
        </section>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium hover:bg-blue-700"
      >
        申請する
      </button>
    </form>
  );
}

function DateInput({
  className,
  labelClass,
}: {
  className: string;
  labelClass: string;
}) {
  return (
    <div>
      <label className={labelClass}>対象日</label>
      <input type="date" name="targetDate" className={className} required />
    </div>
  );
}

function TimeInputs({
  startLabel,
  endLabel,
  inputClass,
  labelClass,
}: {
  startLabel: string;
  endLabel: string;
  inputClass: string;
  labelClass: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className={labelClass}>{startLabel}</label>
        <input type="time" name="startTime" className={inputClass} required />
      </div>
      <div>
        <label className={labelClass}>{endLabel}</label>
        <input type="time" name="endTime" className={inputClass} required />
      </div>
    </div>
  );
}
