'use client'

import { useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'

type Props = {
  onChange: (value: string) => void
}

export default function SignaturePad({
  onChange,
}: Props) {
  const ref = useRef<SignatureCanvas>(null)

  const save = () => {
    const canvas = ref.current

    if (!canvas || canvas.isEmpty()) {
      onChange('')
      return
    }

    onChange(
      canvas
        .getTrimmedCanvas()
        .toDataURL('image/png'),
    )
  }

  const clear = () => {
    ref.current?.clear()
    onChange('')
  }

  return (
    <div className="space-y-2">
      <div className="rounded border bg-white">
        <SignatureCanvas
          ref={ref}
          penColor="black"
          canvasProps={{
            width: 600,
            height: 200,
            className: 'w-full',
          }}
          onEnd={save}
        />
      </div>

      <button
        type="button"
        onClick={clear}
        className="rounded border px-3 py-1 text-sm"
      >
        クリア
      </button>
    </div>
  )
}
