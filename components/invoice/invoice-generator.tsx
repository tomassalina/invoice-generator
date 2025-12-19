'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InvoiceData } from './types';
import { InvoiceForm } from './invoice-form';
import { InvoicePreview } from './invoice-preview';

const INITIAL_DATA: InvoiceData = {
  invoiceNumber: 'RO-001',
  date: 'December 8, 2025',
  dueDate: 'Upon Receipt',
  sender: {
    name: 'Tomas Salina',
    email: 'salinatomass53@gmail.com',
    website: 'tomassalina.netlify.app',
    role: 'Full Stack Developer',
  },
  recipient: {
    company: 'Recruitment Oasis',
    contact: 'Nicolás Winter',
    email: 'nicolas@recruitmentoasis.org',
    website: 'recruitmentoasis.org',
    location: 'Miami, FL',
  },
  payment: {
    method: 'Takenos',
    link: 'https://app.takenos.com/pay/cd947b81-db6d-4165-8c40-2177e61c50da',
    rate: 30,
  },
  items: [
    {
      date: 'Fri, Dec 5, 2025',
      description: 'Deep Analysis: Repository Codebase & Firestore Architecture Review',
      hours: 2,
    },
    {
      date: 'Fri, Dec 5, 2025',
      description: 'Cloud Infrastructure: Generating Google Cloud & Microsoft Azure Credentials',
      hours: 1,
    },
    {
      date: 'Fri, Dec 5, 2025',
      description: 'Authentication: Implementation of OAuth 2.0 (Google & Microsoft Login)',
      hours: 2,
    },
    {
      date: 'Fri, Dec 5, 2025',
      description:
        'UX/UI: Development of 3-Step Onboarding Flow (Student Info, Email & Calendar Sync)',
      hours: 2,
    },
    {
      date: 'Sat, Dec 6, 2025',
      description:
        'Frontend Security: Implementation of Protected Routes & Global Error Handling UI',
      hours: 1,
    },
    {
      date: 'Sat, Dec 6, 2025',
      description: 'User Profile: Integration of Email & Calendar Synchronization Settings',
      hours: 1,
    },
    {
      date: 'Sat, Dec 6, 2025',
      description: 'Backend Logic: Connecting Local Calendar with Google/Outlook Providers',
      hours: 2,
    },
    {
      date: 'Sat, Dec 6, 2025',
      description: 'Feature Implementation: Email Dispatching System via Google/Microsoft APIs',
      hours: 2,
    },
    {
      date: 'Mon, Dec 8, 2025',
      description: 'Localization: Implementation of Global Time Zone Support',
      hours: 1,
    },
    {
      date: 'Mon, Dec 8, 2025',
      description: 'CRUD Operations: Update & Delete Event Functionality for External Calendars',
      hours: 1,
    },
    {
      date: 'Mon, Dec 8, 2025',
      description:
        'Quality Assurance: Final Bug Fixes, Detail Polishing & End-to-End (E2E) Testing',
      hours: 1,
    },
  ],
};

export function InvoiceGenerator() {
  const [data, setData] = useState<InvoiceData>(INITIAL_DATA);

  return (
    <div className="container mx-auto py-10 max-w-5xl">
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
