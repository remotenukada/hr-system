'use server'

import { prisma } from '@/lib/prisma'
import { logAudit } from '@/lib/audit-log'


function getWorkSchedules(formData: FormData) {
  const names = formData.getAll('workScheduleName') as string[]
  const startTimes = formData.getAll('workScheduleStartTime') as string[]
  const endTimes = formData.getAll('workScheduleEndTime') as string[]
  const breaks = formData.getAll('workScheduleBreakMinutes') as string[]

  return names
    .map((name, index) => ({
      name: name?.trim() || '',
      startTime: startTimes[index] || '',
      endTime: endTimes[index] || '',
      breakMinutes: Number(breaks[index] || 0),
      sortOrder: index,
    }))
    .filter((item) => item.name || item.startTime || item.endTime)
    .map((item) => ({
      name: item.name || '勤務',
      startTime: item.startTime || '09:00',
      endTime: item.endTime || '18:00',
      breakMinutes: item.breakMinutes || 60,
      sortOrder: item.sortOrder,
    }))
}

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createEmploymentContract(
  formData: FormData,
) {
  const employeeId =
    formData.get('employeeId') as string

  const contractType =
    formData.get('contractType') as string

  const employmentCategory =
    formData.get('employmentCategory') as string

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

  const workSchedules = getWorkSchedules(formData)

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

  const allowanceNames =
    formData.getAll('allowanceName').map(String)

  const allowanceValues =
    formData.getAll('allowanceValue').map(String)

  const allowanceNote = allowanceNames
    .map((name, index) => {
      const value = allowanceValues[index]?.trim()
      return value ? `${name}: ${value}` : null
    })
    .filter((line): line is string => Boolean(line))
    .join('\n')

  const contract = await prisma.employmentContract.create({
    data: {
      employeeId,
      contractType,
      employmentCategory: employmentCategory || null,

      startDate: new Date(startDate),
      endDate: endDate
        ? new Date(endDate)
        : null,

      workplace,
      jobDescription,

      workStartTime: workStartTime || '09:00',
      workEndTime: workEndTime || '18:00',

      breakMinutes: breakMinutes || 60,
      workSchedules: {
        create: workSchedules,
      },

      holidayRule: holidayRule || '土日祝',

      wageType: wageType || '月給',

      baseSalary,

      leaveRule: leaveRule || null,
      allowanceNote: allowanceNote || null,
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


  await logAudit({
    action: 'EMPLOYMENT_CONTRACT_CREATED',
    targetType: 'EmploymentContract',
    targetId: contract.id,
    description: `雇用条件書 v${contract.version} を作成`,
    afterData: contract,
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

  const employmentCategory =
    formData.get('employmentCategory') as string

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

  const workSchedules = getWorkSchedules(formData)

  const holidayRule =
    formData.get('holidayRule') as string

  const leaveRule =
    formData.get('leaveRule') as string

  const allowanceNames =
    formData.getAll('allowanceName').map(String)

  const allowanceValues =
    formData.getAll('allowanceValue').map(String)

  const allowanceNote = allowanceNames
    .map((name, index) => {
      const value = allowanceValues[index]?.trim()
      return value ? `${name}: ${value}` : null
    })
    .filter((line): line is string => Boolean(line))
    .join('\n')

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
        employmentCategory: employmentCategory || null,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        workplace,
        jobDescription,
        workStartTime: workStartTime || '09:00',
        workEndTime: workEndTime || '18:00',
        breakMinutes: breakMinutes || 60,
      workSchedules: {
        create: workSchedules,
      },
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

  await logAudit({
    action: 'EMPLOYMENT_CONTRACT_UPDATED',
    targetType: 'EmploymentContract',
    targetId: newContract.id,
    description: `雇用条件書 v${newContract.version} を更新`,
    beforeData: currentContract,
    afterData: newContract,
  })

  revalidatePath('/employee-contracts')
  redirect(`/employee-contracts/${newContract.id}`)
}
