"use client";

import { useState } from "react";

export default function MyNumberInput() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        マイナンバー（個人番号 12桁）
      </label>

      <div className="flex gap-2">
        <input
          type={show ? "text" : "password"}
          name="myNumber"
          placeholder="12桁の半角数字を入力"
          maxLength={12}
          className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          inputMode="numeric"
          pattern="[0-9]{12}"
          autoComplete="off"
          required
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          aria-label={show ? "入力内容を非表示にする" : "入力内容を表示する"}
          className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {show ? "非表示" : "表示"}
        </button>
      </div>

      <p className="mt-1 text-xs text-gray-500">
        ボタンを押すと入力中の番号の表示・非表示を切り替えできます。
      </p>
    </div>
  );
}
