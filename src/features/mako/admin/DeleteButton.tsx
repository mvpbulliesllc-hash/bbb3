'use client';

type DeleteButtonProps = {
  action: (formData: FormData) => void;
  id: number;
  label?: string;
  confirmText?: string;
};

/** Small inline form that posts to a delete server action, with a confirm prompt. */
export const DeleteButton = ({ action, id, label = 'Delete', confirmText = 'Delete this item? This cannot be undone.' }: DeleteButtonProps) => (
  <form
    action={action}
    onSubmit={(e) => {
      // eslint-disable-next-line no-alert
      if (!window.confirm(confirmText)) {
        e.preventDefault();
      }
    }}
  >
    <input type="hidden" name="id" value={id} />
    <button
      type="submit"
      className="
        text-sm font-medium text-destructive
        hover:underline
      "
    >
      {label}
    </button>
  </form>
);
