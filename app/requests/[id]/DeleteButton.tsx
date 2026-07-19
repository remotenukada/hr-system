"use client";

export default function DeleteButton() {
  return (
    <button 
      type="submit" 
      onClick={(e) => {
        if (!confirm("この申請データを完全に削除しますか？")) {
          e.preventDefault();
        }
      }}
      className="text-sm text-rose-600 hover:text-rose-700 font-medium hover:underline"
    >
      この申請を削除する
    </button>
  );
}
