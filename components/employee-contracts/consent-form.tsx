'use client'

import { useState } from 'react'

import { createEmploymentContractConsent } from '@/app/actions/employment-contract-consent'
import SignaturePad from '@/components/employee-contracts/signature-pad'

type Props = {
  employmentContractId: string
  defaultSignerName: string
}

export default function ConsentForm({
  employmentContractId,
  defaultSignerName,
}: Props) {
  const [signatureImage, setSignatureImage] =
    useState('')

  return (
    <form action={createEmploymentContractConsent} className="space-y-4">
      <input
        type="hidden"
        name="employmentContractId"
        value={employmentContractId}
      />

      <input
        type="hidden"
        name="signatureImage"
        value={signatureImage}
      />

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          署名者名
        </label>
        <input
          name="signerName"
          required
          defaultValue={defaultSignerName}
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          手書き署名
        </label>

        <SignaturePad onChange={setSignatureImage} />

        {!signatureImage && (
          <p className="mt-1 text-xs text-gray-500">
            署名欄に手書き署名してください。
          </p>
        )}
      </div>

      <p className="text-sm text-gray-600">
        内容を確認し、本人が雇用条件通知書に同意した記録として保存します。
      </p>

      <button
        type="submit"
        disabled={!signatureImage}
        className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        同意する
      </button>
    </form>
  )
}
