export interface InvoiceItem {
  date: string;
  description: string;
  hours: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  sender: {
    name: string;
    email: string;
    website: string;
    role: string;
  };
  recipient: {
    company: string;
    contact: string;
    email: string;
    website: string;
    location: string;
  };
  payment: {
    type: 'link' | 'bank';
    method?: string; // e.g. "Takenos" or "Bank Transfer"
    link?: string;
    // Bank Fields
    bankName?: string;
    accountName?: string;
    accountNumber?: string; // IBAN / CBU / Acc No
    routingNumber?: string; // SWIFT / Alias / Routing
    additionalBankInfo?: string; // Address, Type, etc.
    rate: number;
  };
  items: InvoiceItem[];
}
