'use client';

import dynamic from 'next/dynamic';
import { InvoiceData } from './types';
import { InvoicePDFDocument } from './invoice-pdf-document';

const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFViewer), {
  ssr: false,
  loading: () => <p>Loading PDF Viewer...</p>,
});

interface InvoicePreviewProps {
  data: InvoiceData;
}

export function InvoicePreview({ data }: InvoicePreviewProps) {
  return (
    <div className="h-[calc(100vh-200px)] w-full border rounded-lg overflow-hidden bg-slate-500">
      <PDFViewer className="w-full h-full">
        <InvoicePDFDocument data={data} />
      </PDFViewer>
    </div>
  );
}
