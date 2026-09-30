"use client";

type Props = {
  invitationId: string;
};

export default function DeleteInvitationButton({
  invitationId,
}: Props) {
  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    const message =
      "この招待を完全に削除します。よろしいですか？";

    if (!window.confirm(message)) {
      event.preventDefault();
    }
  }

  return (
    <form
      action={`/api/user-invitations/${invitationId}/delete`}
      method="POST"
      onSubmit={handleSubmit}
    >
      <button
        type="submit"
        className="text-red-600 hover:underline"
      >
        削除
      </button>
    </form>
  );
}
