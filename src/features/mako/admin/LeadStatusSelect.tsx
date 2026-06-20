'use client';

import { updateLeadStatus } from '../actions';
import { LEAD_STATUSES } from '../types';

/** Status dropdown that submits the lead pipeline change on selection. */
export const LeadStatusSelect = ({ id, status }: { id: number; status: string }) => (
  <form action={updateLeadStatus}>
    <input type="hidden" name="id" value={id} />
    <select
      name="status"
      defaultValue={status}
      onChange={e => e.currentTarget.form?.requestSubmit()}
      className="
        rounded-md border border-input bg-background px-2 py-1 text-sm
        capitalize
      "
    >
      {LEAD_STATUSES.map(s => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  </form>
);
