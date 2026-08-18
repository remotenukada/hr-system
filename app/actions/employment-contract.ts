'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createEmploymentContract(
  formData: FormData,
) {
  const employeeId =
    formData.get('employeeId') as string

  const contractType =
    formData.get('contractType') as string

  const startDate =
    formData.get('startDate') as string

  const endDate =
    formData.get('endDate') as string

  const workplace =
    formData.get('workplace') as string

  const jobDescription =
    formData.get('jobDescription') as string

  const baseSalary = Number(
    formData.get('baseSalary') || 0,
  )

  const workStartTime =
    formData.get('workStartTime') as string

  const workEndTime =
    formData.get('workEndTime') as string

  const breakMinutes = Number(
    formData.get('breakMinutes') || 0,
  )

  const holidayRule =
    formData.get('holidayRule') as string

  const leaveRule =
    formData.get('leaveRule') as string

  const wageType =
    formData.get('wageType') as string

  const payClosingDay =
    formData.get('payClosingDay') as string

  const payDate =
    formData.get('payDate') as string

  const bonusRule =
    formData.get('bonusRule') as string

  const raiseRule =
    formData.get('raiseRule') as string

  const probationPeriod =
    formData.get('probationPeriod') as string

  const contractRenewalRule =
    formData.get('contractRenewalRule') as string

  const contractRenewalCriteria =
    formData.get('contractRenewalCriteria') as string

  const retirementAllowanceRule =
    formData.get('retirementAllowanceRule') as string

  const socialInsuranceRule =
    formData.get('socialInsuranceRule') as string

  const employmentInsuranceRule =
    formData.get('employmentInsuranceRule') as string

  const consultationDesk =
    formData.get('consultationDesk') as string

  const workRuleLocation =
    formData.get('workRuleLocation') as string

  const remarks =
    formData.get('remarks') as string

  await prisma.employmentContract.create({
    data: {
      employeeId,
      contractType,

      startDate: new Date(startDate),
      endDate: endDate
        ? new Date(endDate)
        : null,

      workplace,
      jobDescription,

      workStartTime: workStartTime || '09:00',
      workEndTime: workEndTime || '18:00',

      breakMinutes: breakMinutes || 60,

      holidayRule: holidayRule || '土日祝',

      wageType: wageType || '月給',

      baseSalary,

      leaveRule: leaveRule || null,
      allowanceNote: null,
      payClosingDay: payClosingDay || null,
      payDate: payDate || null,
      bonusRule: bonusRule || null,
      raiseRule: raiseRule || null,
      probationPeriod: probationPeriod || null,

      contractRenewalRule:
        contractRenewalRule || null,

      contractRenewalCriteria:
        contractRenewalCriteria || null,

      retirementRule: null,

      retirementAllowanceRule:
        retirementAllowanceRule || null,

      socialInsuranceRule:
        socialInsuranceRule || null,

      employmentInsuranceRule:
        employmentInsuranceRule || null,

      consultationDesk:
        consultationDesk || null,

      workRuleLocation:
        workRuleLocation || null,

      remarks: remarks || null,
    },
  })

  revalidatePath('/employee-contracts')

  redirect('/employee-contracts')
}

export async function updateEmploymentContract(
  formData: FormData,
) {
  const id =
    formData.get('id') as string

  const contractType =
    formData.get('contractType') as string

  const startDate =
    formData.get('startDate') as string

  const endDate =
    formData.get('endDate') as string

  const workplace =
    formData.get('workplace') as string

  const jobDescription =
    formData.get('jobDescription') as string

  const wageType =
    formData.get('wageType') as string

  const baseSalary = Number(
    formData.get('baseSalary') || 0,
  )

  const workStartTime =
    formData.get('workStartTime') as string

  const workEndTime =
    formData.get('workEndTime') as string

  const breakMinutes = Number(
    formData.get('breakMinutes') || 0,
  )

  const holidayRule =
    formData.get('holidayRule') as string

  const leaveRule =
    formData.get('leaveRule') as string

  const allowanceNote =
    formData.get('allowanceNote') as string

  const payClosingDay =
    formData.get('payClosingDay') as string

  const payDate =
    formData.get('payDate') as string

  const bonusRule =
    formData.get('bonusRule') as string

  const raiseRule =
    formData.get('raiseRule') as string

  const probationPeriod =
    formData.get('probationPeriod') as string

  const contractRenewalRule =
    formData.get('contractRenewalRule') as string

  const contractRenewalCriteria =
    formData.get('contractRenewalCriteria') as string

  const retirementRule =
    formData.get('retirementRule') as string

  const retirementAllowanceRule =
    formData.get('retirementAllowanceRule') as string

  const socialInsuranceRule =
    formData.get('socialInsuranceRule') as string

  const employmentInsuranceRule =
    formData.get('employmentInsuranceRule') as string

  const consultationDesk =
    formData.get('consultationDesk') as string

  const workRuleLocation =
    formData.get('workRuleLocation') as string

  const remarks =
    formData.get('remarks') as string

  const currentContract =
    await prisma.employmentContract.findUnique({
      where: {
        id,
      },
    })

  if (!currentContract) {
    throw new Error('雇用条件書が見つかりません')
  }

  await prisma.employmentContract.update({
    where: {
      id,
    },
    data: {
      isCurrent: false,
      supersededAt: new Date(),
    },
  })

  const newContract =
    await prisma.employmentContract.create({
      data: {
        employeeId: currentContract.employeeId,
        version: currentContract.version + 1,
        isCurrent: true,
        contractType,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        workplace,
        jobDescription,
        workStartTime: workStartTime || '09:00',
        workEndTime: workEndTime || '18:00',
        breakMinutes: breakMinutes || 60,
        holidayRule: holidayRule || '土日祝',
        leaveRule: leaveRule || null,
        wageType: wageType || '月給',
        baseSalary,
        allowanceNote: allowanceNote || null,
        payClosingDay: payClosingDay || null,
        payDate: payDate || null,
        bonusRule: bonusRule || null,
        raiseRule: raiseRule || null,
        probationPeriod: probationPeriod || null,
        contractRenewalRule: contractRenewalRule || null,
        contractRenewalCriteria: contractRenewalCriteria || null,
        retirementRule: retirementRule || null,
        retirementAllowanceRule: retirementAllowanceRule || null,
        socialInsuranceRule: socialInsuranceRule || null,
        employmentInsuranceRule: employmentInsuranceRule || null,
        consultationDesk: consultationDesk || null,
        workRuleLocation: workRuleLocation || null,
        remarks: remarks || null,
      },
    })

  revalidatePath('/employee-contracts')
  redirect(`/employee-contracts/${newContract.id}`)
}
