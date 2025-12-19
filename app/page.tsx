import { InvoiceGenerator } from '@/components/invoice/invoice-generator';

export default function Page() {
  return (
    <div className="min-h-screen p-4 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <InvoiceGenerator />
    </div>
  );
}
