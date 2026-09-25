'use server'

import { requireHRManager } from "@/lib/auth-guard";

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

  const occupation =
    formData.get('occupation') as string

  const position =
    formData.get('position') as string


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

  const retirementRule =
    formData.get('retirementRule') as string

  const retirementAllowanceRule =
    formData.get('retirementAllowanceRule') as string

  const socialInsuranceRule =
    formData.get('socialInsuranceRule') as string

  const employmentInsuranceRule =
    formData.get('employmentInsuranceRule') as string

  const treatmentDeskDepartment = formData.get('treatmentDeskDepartment') as string
  const treatmentDeskPerson = formData.get('treatmentDeskPerson') as string
  const treatmentDeskPhone = formData.get('treatmentDeskPhone') as string
  const treatmentDeskEmail = formData.get('treatmentDeskEmail') as string
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
      occupation: occupation || null,
      position: position || null,

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

      retirementRule: retirementRule || null,

      retirementAllowanceRule:
        retirementAllowanceRule || null,

      socialInsuranceRule:
        socialInsuranceRule || null,

      employmentInsuranceRule:
        employmentInsuranceRule || null,

      consultationDesk:
        consultationDesk || null,
      treatmentDeskDepartment:
        treatmentDeskDepartment || null,
      treatmentDeskPerson:
        treatmentDeskPerson || null,
      treatmentDeskPhone:
        treatmentDeskPhone || null,
      treatmentDeskEmail:
        treatmentDeskEmail || null,

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

  const occupation =
    formData.get('occupation') as string

  const position =
    formData.get('position') as string

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

  const treatmentDeskDepartment = formData.get('treatmentDeskDepartment') as string
  const treatmentDeskPerson = formData.get('treatmentDeskPerson') as string
  const treatmentDeskPhone = formData.get('treatmentDeskPhone') as string
  const treatmentDeskEmail = formData.get('treatmentDeskEmail') as string
  const consultationDesk =
    formData.get('consultationDesk') as string

  const workRuleLocation =
    formData.get('workRuleLocation') as string

  const remarks =
    formData.get('remarks') as string

  const { currentContract, newContract } =
    await prisma.$transaction(async (tx) => {
      const currentContract =
        await tx.employmentContract.findUnique({
          where: { id },
        })

      if (!currentContract) {
        throw new Error('雇用条件書が見つかりません')
      }

      if (!currentContract.isCurrent) {
        throw new Error('履歴契約は更新できません')
      }

      const result =
        await tx.employmentContract.updateMany({
          where: {
            id,
            isCurrent: true,
          },
          data: {
            isCurrent: false,
            supersededAt: new Date(),
          },
        })

      if (result.count !== 1) {
        throw new Error('契約は既に更新されています')
      }

      const newContract =
        await tx.employmentContract.create({
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
            occupation: occupation || null,
            position: position || null,
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
            contractRenewalCriteria:
              contractRenewalCriteria || null,
            retirementRule: retirementRule || null,
            retirementAllowanceRule:
              retirementAllowanceRule || null,
            socialInsuranceRule:
              socialInsuranceRule || null,
            employmentInsuranceRule:
              employmentInsuranceRule || null,
            consultationDesk: consultationDesk || null,
            treatmentDeskDepartment:
              treatmentDeskDepartment || null,
            treatmentDeskPerson:
              treatmentDeskPerson || null,
            treatmentDeskPhone:
              treatmentDeskPhone || null,
            treatmentDeskEmail:
              treatmentDeskEmail || null,
            workRuleLocation: workRuleLocation || null,
            remarks: remarks || null,
          },
        })

      return {
        currentContract,
        newContract,
      }
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
  revalidatePath('/employee-contracts/renewals')
  redirect(`/employee-contracts/${newContract.id}`)
}


export async function cancelEmploymentContract(
  formData: FormData,
) {
  const session = await requireHRManager();

  const id = String(formData.get("id") ?? "");
  const reason = String(formData.get("reason") ?? "").trim();

  if (!id || !reason) {
    throw new Error("取消理由は必須です。");
  }

  const result = await prisma.$transaction(async (tx) => {
    const current = await tx.employmentContract.findUnique({
      where: { id },
      include: {
        employmentContractConsents: {
          select: { id: true },
        },
      },
    });

    if (!current?.isCurrent) {
      throw new Error("現行契約が見つかりません。");
    }

    if (current.employmentContractConsents.length > 0) {
      throw new Error("同意済み契約は取り消せません。");
    }

    const previous = await tx.employmentContract.findFirst({
      where: {
        employeeId: current.employeeId,
        isCurrent: false,
        version: { lt: current.version },
      },
      orderBy: { version: "desc" },
    });

    if (!previous) {
      throw new Error("復元可能な直前契約がありません。");
    }

    await tx.employmentContract.update({
      where: { id: previous.id },
      data: {
        isCurrent: true,
        supersededAt: null,
      },
    });

    await tx.employmentContract.delete({
      where: { id: current.id },
    });

    return { current, previous };
  });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "EMPLOYMENT_CONTRACT_CANCELLED",
    targetType: "EmploymentContract",
    targetId: result.current.id,
    description:
      `契約更新取消: v${result.current.version} → ` +
      `v${result.previous.version}、理由: ${reason}`,
    beforeData: result.current,
    afterData: {
      restoredContractId: result.previous.id,
      restoredVersion: result.previous.version,
      reason,
    },
  });

  revalidatePath("/employee-contracts");
  redirect("/employee-contracts");
}

export async function deleteEmploymentContractHistory(
  formData: FormData,
) {
  const session = await requireHRManager();

  const id = String(formData.get("id") ?? "");
  const reason = String(formData.get("reason") ?? "").trim();

  if (!id || !reason) {
    throw new Error("削除理由は必須です。");
  }

  const contract = await prisma.employmentContract.findUnique({
    where: { id },
    include: {
      employmentContractConsents: {
        select: { id: true },
      },
    },
  });

  if (!contract) {
    throw new Error("契約が見つかりません。");
  }

  if (contract.isCurrent) {
    throw new Error("現行契約は削除できません。");
  }

  if (contract.employmentContractConsents.length > 0) {
    throw new Error("同意済み契約は削除できません。");
  }

  await prisma.employmentContract.delete({
    where: { id },
  });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "EMPLOYMENT_CONTRACT_DELETED",
    targetType: "EmploymentContract",
    targetId: contract.id,
    description:
      `履歴契約削除: v${contract.version}、理由: ${reason}`,
    beforeData: contract,
  });

  revalidatePath("/employee-contracts");
  redirect("/employee-contracts");
}