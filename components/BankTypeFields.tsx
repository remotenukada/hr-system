"use client";

import { useState } from "react";

type Props = {
  defaultBankType?: string;
  defaultYuchoSymbol?: string;
  defaultYuchoNumber?: string;
};

export default function BankTypeFields({
  defaultBankType = "BANK",
  defaultYuchoSymbol = "",
  defaultYuchoNumber = "",
}: Props) {
  const [bankType, setBankType] = useState(defaultBankType);

  const isYucho = bankType === "YUCHO";

  return (
    <>
      <div>
        <label className="mb-1 block text-sm font-medium">
          銀行種別
        </label>

        <select
          name="bankType"
          value={bankType}
          onChange={(event) => setBankType(event.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        >
          <option value="BANK">
            一般銀行
          </option>

          <option value="YUCHO">
            ゆうちょ銀行
          </option>
        </select>

        <p className="mt-1 text-xs text-gray-500">
          ゆうちょ銀行の場合のみ、記号・番号を入力してください。
        </p>
      </div>

      {isYucho && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">
              ゆうちょ記号
            </label>

            <input
              name="yuchoSymbol"
              defaultValue={defaultYuchoSymbol}
              placeholder="例: 12345"
              className="w-full rounded border px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              ゆうちょ番号
            </label>

            <input
              name="yuchoNumber"
              defaultValue={defaultYuchoNumber}
              placeholder="例: 12345671"
              className="w-full rounded border px-3 py-2"
              required
            />
          </div>
        </div>
      )}
    </>
  );
}
