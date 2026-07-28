import { prisma } from "@/lib/prisma";
import { requireHRManager } from "@/lib/auth-guard";

function addYears(date: Date, years: number) {
  const result = new Date(date);
  result.setFullYear(
    result.getFullYear() + years,
  );
  return result;
}

export default async function LeaveExpirationPage() {
  await requireHRManager();

  const grants =
    await prisma.leaveGrantHistory.findMany({
      include: {
        employee: true,
      },
      orderBy: {
        grantDate: "asc",
      },
    });

  const expirationRows = grants.map(
    (grant) => ({
      id: grant.id,
      employeeNo:
        grant.employee.employeeNo,
      name: `${grant.employee.lastName} ${grant.employee.firstName}`,
      grantDate: grant.grantDate,
      expirationDate: addYears(
        new Date(grant.grantDate),
        2,
      ),
      days: grant.grantedDays,
      grantType: grant.grantType,
      note: grant.note,
    }),
  );

  return (
    <main className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          有給失効管理
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          失効予定の有給一覧を確認します。
        </p>
      </div>

      <div className="overflow-x-auto rounded border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left">
                社員番号
              </th>

              <th className="p-3 text-left">
                氏名
              </th>

              <th className="p-3 text-left">
                付与日
              </th>

              <th className="p-3 text-left">
                失効予定日
              </th>

              <th className="p-3 text-left">
                日数
              </th>

              <th className="p-3 text-left">
                区分
              </th>

              <th className="p-3 text-left">
                備考
              </th>
            </tr>
          </thead>

          <tbody>
            {expirationRows.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-gray-500"
                >
                  データはありません。
                </td>
              </tr>
            ) : (
              expirationRows.map(
                (row) => (
                  <tr
                    key={row.id}
                    className="border-t"
                  >
                    <td className="p-3">
                      {row.employeeNo}
                    </td>

                    <td className="p-3">
                      {row.name}
                    </td>

                    <td className="p-3">
                      {new Date(
                        row.grantDate,
                      ).toLocaleDateString(
                        "ja-JP",
                      )}
                    </td>

                    <td className="p-3 font-medium text-red-700">
                      {row.expirationDate.toLocaleDateString(
                        "ja-JP",
                      )}
                    </td>

                    <td className="p-3">
                      {row.days}日
                    </td>

                    <td className="p-3">
                      {row.grantType}
                    </td>

                    <td className="p-3">
                      {row.note ?? "-"}
                    </td>
                  </tr>
                ),
              )
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
