'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  Gender,
  EmploymentType,
  EmployeeStatus,
} from '@/generated/prisma'

export async function createEmployee(formData: FormData) {
  const employeeNo = formData.get('employeeNo') as string
  const lastName = formData.get('lastName') as string
  const firstName = formData.get('firstName') as string
  const email = formData.get('email') as string
  const departmentId = formData.get('departmentId') as string

  const lastNameKana = formData.get('lastNameKana') as string
  const firstNameKana = formData.get('firstNameKana') as string

  const genderRaw = formData.get('gender') as string

  const birthDate = formData.get('birthDate') as string

  const phoneNumber = formData.get('phoneNumber') as string

  const address = formData.get('address') as string

  const occupation = formData.get('occupation') as string

  const position = formData.get('position') as string

  const hireDate = formData.get('hireDate') as string

  const employmentTypeRaw =
    formData.get('employmentType') as string

  const commutingType =
    formData.get('commutingType') as string

  const statusRaw =
    formData.get('status') as string

  const retirementDate =
    formData.get('retirementDate') as string

  const healthInsuranceNo =
    formData.get('healthInsuranceNo') as string

  const employmentInsuranceNo =
    formData.get('employmentInsuranceNo') as string

  await prisma.employee.create({
    data: {
      employeeNo,

      lastName,
      firstName,

      lastNameKana: lastNameKana || null,
      firstNameKana: firstNameKana || null,

      gender: genderRaw
        ? (genderRaw as Gender)
        : null,

      birthDate: birthDate
        ? new Date(birthDate)
        : null,

      phoneNumber: phoneNumber || null,

      address: address || null,

      email,

      departmentId: departmentId || null,

      occupation: occupation || null,

      position: position || null,

      hireDate: hireDate
        ? new Date(hireDate)
        : null,

      employmentType: employmentTypeRaw
        ? (employmentTypeRaw as EmploymentType)
        : null,

      commutingType: commutingType || null,

      status: statusRaw
        ? (statusRaw as EmployeeStatus)
        : 'ACTIVE',

      retirementDate: retirementDate
        ? new Date(retirementDate)
        : null,

      healthInsuranceNo:
        healthInsuranceNo || null,

      employmentInsuranceNo:
        employmentInsuranceNo || null,
    },
  })

  revalidatePath('/employees')

  redirect('/employees')
}
