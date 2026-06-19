import { TitleBar } from '@/features/dashboard/TitleBar';
import { deleteLead } from '@/features/mako/actions';
import { DeleteButton } from '@/features/mako/admin/DeleteButton';
import { LeadStatusSelect } from '@/features/mako/admin/LeadStatusSelect';
import { Brand, whatsappLink } from '@/features/mako/Brand';
import { getLeads } from '@/features/mako/queries';

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <>
      <TitleBar title="Inquiries" description="Everyone who contacted you through the site. Move each one through your pipeline." />

      <div className="overflow-x-auto rounded-xl border bg-card">
        {leads.length === 0
          ? (
              <p className="p-5 text-sm text-muted-foreground">No inquiries yet. They'll appear here as visitors submit forms.</p>
            )
          : (
              <table className="w-full text-sm">
                <thead className="
                  border-b bg-muted/50 text-left text-muted-foreground
                "
                >
                  <tr>
                    <th className="px-4 py-2 font-medium">Date</th>
                    <th className="px-4 py-2 font-medium">Name</th>
                    <th className="px-4 py-2 font-medium">Contact</th>
                    <th className="px-4 py-2 font-medium">Interest</th>
                    <th className="px-4 py-2 font-medium">Source</th>
                    <th className="px-4 py-2 font-medium">Message</th>
                    <th className="px-4 py-2 font-medium">Status</th>
                    <th className="px-4 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {leads.map(lead => (
                    <tr
                      key={lead.id}
                      className="
                        border-b align-top
                        last:border-0
                      "
                    >
                      <td className="
                        px-4 py-3 whitespace-nowrap text-muted-foreground
                      "
                      >
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {lead.name}
                        {lead.country && (
                          <span className="block text-xs text-muted-foreground">
                            {lead.country}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {lead.email && <span className="block">{lead.email}</span>}
                        {lead.phone && (
                          <a
                            className="
                              block text-primary
                              hover:underline
                            "
                            href={whatsappLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {lead.phone}
                          </a>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground capitalize">{lead.interest}</td>
                      <td className="px-4 py-3 text-muted-foreground">{lead.source || '—'}</td>
                      <td className="max-w-xs px-4 py-3 text-muted-foreground">{lead.message || '—'}</td>
                      <td className="px-4 py-3">
                        <LeadStatusSelect id={lead.id} status={lead.status} />
                      </td>
                      <td className="px-4 py-3">
                        <DeleteButton action={deleteLead} id={lead.id} confirmText="Delete this inquiry?" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Tip: reply fastest on WhatsApp (
        {Brand.phone}
        ).
      </p>
    </>
  );
}
