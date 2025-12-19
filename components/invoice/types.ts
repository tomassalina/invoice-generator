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
    method: string;
    link: string;
    rate: number;
  };
  items: InvoiceItem[];
}
