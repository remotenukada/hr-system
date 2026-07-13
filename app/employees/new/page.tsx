export default function NewEmployeePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        社員登録
      </h1>

      <form className="mt-6 space-y-4 max-w-md">
        <input
          name="employeeNo"
          className="border p-2 w-full"
          placeholder="社員番号"
        />

        <input
          name="lastName"
          className="border p-2 w-full"
          placeholder="姓"
        />

        <input
          name="firstName"
          className="border p-2 w-full"
          placeholder="名"
        />

        <input
          name="email"
          className="border p-2 w-full"
          placeholder="メールアドレス"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          登録
        </button>
      </form>
    </main>
  );
}