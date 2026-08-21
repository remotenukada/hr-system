import fs from 'fs'
import path from 'path'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

type Context = {
  params: Promise<{ id: string }>
}

const SAVE_DIR = '/data/hr-system/paper-consents'

export async function GET(
  _request: Request,
  { params }: Context,
) {
  const session = await auth()

  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { id } = await params

  const consent =
    await prisma.employmentContractConsent.findFirst({
      where: {
        employmentContractId: id,
        consentMethod: 'PAPER',
      },
      include: {
        employmentContract: {
          include: {
            employee: {
              select: {
                userId: true,
              },
            },
          },
        },
      },
      orderBy: {
        consentedAt: 'desc',
      },
    })

  if (!consent?.signedPdfPath) {
    return new Response('PDF not found', { status: 404 })
  }

  const isManager =
    session.user.role === 'ADMIN' ||
    session.user.role === 'HR_MANAGER'

  const isOwner =
    consent.employmentContract.employee.userId ===
    session.user.id

  if (!isManager && !isOwner) {
    return new Response('Forbidden', { status: 403 })
  }

  const fileName = path.basename(consent.signedPdfPath)
  const filePath = path.join(SAVE_DIR, fileName)

  if (!fs.existsSync(filePath)) {
    return new Response('PDF not found', { status: 404 })
  }

  const pdf = fs.readFileSync(filePath)

  return new Response(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition':
        `inline; filename="${fileName}"`,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
