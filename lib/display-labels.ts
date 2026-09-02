export const roleLabels: Record<string, string> = {
  ADMIN: "システム管理者",
  HR_MANAGER: "人事管理者",
  MANAGER: "部署責任者",
  USER: "一般利用者",
};

export const requestStatusLabels: Record<string, string> = {
  PENDING: "承認待ち",
  APPROVED: "承認済み",
  REJECTED: "却下",
  CANCELLED: "取消済み",
};

export const employeeStatusLabels: Record<string, string> = {
  PRE_HIRE: "採用予定",
  ACTIVE: "在職",
  LEAVE: "休職",
  RETIRED: "退職",
};
