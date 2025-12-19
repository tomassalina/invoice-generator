'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InvoiceData } from './types';
import { InvoiceForm } from './invoice-form';
import { InvoicePreview } from './invoice-preview';

const INITIAL_DATA: InvoiceData = {
  invoiceNumber: 'INV-001',
  date: new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }),
  dueDate: 'Upon Receipt',
  sender: {
    name: 'Tomas Salina',
    email: 'salinatomass53@gmail.com',
    website: 'tomassalina.netlify.app',
    role: 'Software Engineer',
  },
  recipient: {
    company: 'Client Company',
    contact: 'Client Name',
    email: 'client@example.com',
    website: 'www.client.com',
    location: 'City, Country',
  },
  payment: {
    type: 'link',
    method: 'Takenos',
    link: 'https://app.takenos.com/pay/...',
    bankName: 'Lead Bank',
    accountName: 'Tomas Ezequiel Salina',
    accountNumber: '211945505146',
    routingNumber: '101019644',
    additionalBankInfo:
      'Account Type: Personal checking\nBank Address: 1801 Main St., Kansas City, MO, 64108',
    rate: 50,
  },
  items: [
    {
      date: new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      description: 'Software Development Services',
      hours: 10,
    },
  ],
};

export function InvoiceGenerator() {
  const [data, setData] = useState<InvoiceData>(INITIAL_DATA);
  const [isMounted, setIsMounted] = useState(false);

  // Load from local storage on mount
  React.useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('invoice-generator-data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure we merge with defaults to avoid missing keys if structure changed
        setData((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Failed to parse local storage', e);
      }
    }
  }, []);

  // Save to local storage on change
  React.useEffect(() => {
    if (isMounted) {
      localStorage.setItem('invoice-generator-data', JSON.stringify(data));
    }
  }, [data, isMounted]);

  if (!isMounted) {
    return null; // or a skeleton loader
  }

  return (
    <div className="container mx-auto py-6 md:py-10 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Invoice Generator</h1>
      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="edit">Edit Details</TabsTrigger>
          <TabsTrigger value="preview">PDF Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <InvoiceForm data={data} onChange={setData} />
        </TabsContent>
        <TabsContent value="preview">
          <InvoicePreview data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
