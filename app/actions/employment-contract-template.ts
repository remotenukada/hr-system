'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function optionalText(formData: FormData, name: string) {
  const value = String(formData.get(name) ?? '').trim()
  return value || null
}

export async function createEmploymentContractTemplate(
  formData: FormData,
) {
  const name = String(formData.get('name') ?? '').trim()
  const contractType = String(formData.get('contractType') ?? '').trim()
  const workStartTime = String(formData.get('workStartTime') ?? '')
  const workEndTime = String(formData.get('workEndTime') ?? '')
  const breakMinutes = Number(formData.get('breakMinutes') || 0)
  const holidayRule = String(formData.get('holidayRule') ?? '').trim()
  const wageType = String(formData.get('wageType') ?? '').trim()

  await prisma.employmentContractTemplate.create({
    data: {
      name,
      contractType,
      workStartTime,
      workEndTime,
      breakMinutes,
      holidayRule,
      wageType,
      probationPeriod: optionalText(formData, 'probationPeriod'),
      raiseRule: optionalText(formData, 'raiseRule'),
      bonusRule: optionalText(formData, 'bonusRule'),
      retirementRule: optionalText(formData, 'retirementRule'),
      retirementAllowanceRule: optionalText(
        formData,
        'retirementAllowanceRule',
      ),
      socialInsuranceRule: optionalText(
        formData,
        'socialInsuranceRule',
      ),
      employmentInsuranceRule: optionalText(
        formData,
        'employmentInsuranceRule',
      ),
      consultationDesk: optionalText(formData, 'consultationDesk'),
      workRuleLocation: optionalText(formData, 'workRuleLocation'),
    },
  })

  revalidatePath('/employee-contract-templates')
  redirect('/employee-contract-templates')
}

export async function updateEmploymentContractTemplate(
  formData: FormData,
) {
  const id = String(formData.get('id') ?? '')
  const name = String(formData.get('name') ?? '').trim()
  const contractType = String(formData.get('contractType') ?? '').trim()
  const workStartTime = String(formData.get('workStartTime') ?? '')
  const workEndTime = String(formData.get('workEndTime') ?? '')
  const breakMinutes = Number(formData.get('breakMinutes') || 0)
  const holidayRule = String(formData.get('holidayRule') ?? '').trim()
  const wageType = String(formData.get('wageType') ?? '').trim()
  const isActive = formData.get('isActive') === 'on'

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
      probationPeriod: optionalText(formData, 'probationPeriod'),
      raiseRule: optionalText(formData, 'raiseRule'),
      bonusRule: optionalText(formData, 'bonusRule'),
      retirementRule: optionalText(formData, 'retirementRule'),
      retirementAllowanceRule: optionalText(
        formData,
        'retirementAllowanceRule',
      ),
      socialInsuranceRule: optionalText(
        formData,
        'socialInsuranceRule',
      ),
      employmentInsuranceRule: optionalText(
        formData,
        'employmentInsuranceRule',
      ),
      consultationDesk: optionalText(formData, 'consultationDesk'),
      workRuleLocation: optionalText(formData, 'workRuleLocation'),
      isActive,
    },
  })

  revalidatePath('/employee-contract-templates')
  revalidatePath(`/employee-contract-templates/${id}/edit`)
}

export async function duplicateEmploymentContractTemplate(
  formData: FormData,
) {
  const id = String(formData.get('id') ?? '')

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
