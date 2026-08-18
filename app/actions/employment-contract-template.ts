'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createEmploymentContractTemplate(
  formData: FormData,
) {
  const name =
    formData.get('name') as string

  const contractType =
    formData.get('contractType') as string

  const workStartTime =
    formData.get('workStartTime') as string

  const workEndTime =
    formData.get('workEndTime') as string

  const breakMinutes = Number(
    formData.get('breakMinutes') || 0,
  )

  const holidayRule =
    formData.get('holidayRule') as string

  const wageType =
    formData.get('wageType') as string

  const probationPeriod =
    formData.get('probationPeriod') as string

  await prisma.employmentContractTemplate.create({
    data: {
      name,
      contractType,
      workStartTime,
      workEndTime,
      breakMinutes,
      holidayRule,
      wageType,
      probationPeriod:
        probationPeriod || null,
    },
  })

  revalidatePath('/employee-contract-templates')
  redirect('/employee-contract-templates')
}

export async function updateEmploymentContractTemplate(
  formData: FormData,
) {
  const id =
    formData.get('id') as string

  const name =
    formData.get('name') as string

  const contractType =
    formData.get('contractType') as string

  const workStartTime =
    formData.get('workStartTime') as string

  const workEndTime =
    formData.get('workEndTime') as string

  const breakMinutes = Number(
    formData.get('breakMinutes') || 0,
  )

  const holidayRule =
    formData.get('holidayRule') as string

  const wageType =
    formData.get('wageType') as string

  const probationPeriod =
    formData.get('probationPeriod') as string

  const isActive =
    formData.get('isActive') === 'on'

  await prisma.employmentContractTemplate.update({
    where: {
      id,
    },
    data: {
      name,
      contractType,
      workStartTime,
      workEndTime,
      breakMinutes,
      holidayRule,
      wageType,
      probationPeriod:
        probationPeriod || null,
      isActive,
    },
  })

  revalidatePath('/employee-contract-templates')
}

export async function duplicateEmploymentContractTemplate(
  formData: FormData,
) {
  const id =
    formData.get('id') as string

  const current =
    await prisma.employmentContractTemplate.findUnique({
      where: {
        id,
      },
    })

  if (!current) {
    return
  }

  const duplicated =
    await prisma.employmentContractTemplate.create({
      data: {
        name: `${current.name} コピー`,
        description: current.description,

        contractType: current.contractType,

        workStartTime: current.workStartTime,
        workEndTime: current.workEndTime,
        breakMinutes: current.breakMinutes,

        holidayRule: current.holidayRule,
        leaveRule: current.leaveRule,

        wageType: current.wageType,
        baseSalary: current.baseSalary,

        allowanceNote: current.allowanceNote,

        payClosingDay: current.payClosingDay,
        payDate: current.payDate,

        bonusRule: current.bonusRule,
        raiseRule: current.raiseRule,

        probationPeriod: current.probationPeriod,

        contractRenewalRule: current.contractRenewalRule,
        contractRenewalCriteria: current.contractRenewalCriteria,

        retirementRule: current.retirementRule,
        retirementAllowanceRule: current.retirementAllowanceRule,

        socialInsuranceRule: current.socialInsuranceRule,
        employmentInsuranceRule: current.employmentInsuranceRule,

        consultationDesk: current.consultationDesk,
        workRuleLocation: current.workRuleLocation,

        remarks: current.remarks,

        isActive: false,
      },
    })

  revalidatePath('/employee-contract-templates')

  redirect(`/employee-contract-templates/${duplicated.id}/edit`)
}
