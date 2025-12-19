'use client';

import React from 'react';
import { InvoiceData, InvoiceItem } from './types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';
import { format } from 'date-fns';

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

export function InvoiceForm({ data, onChange }: InvoiceFormProps) {
  const handleChange = (
    section: keyof InvoiceData,
    field: string | null,
    value: string | number
  ) => {
    if (section === 'items') return;

    if (field) {
      onChange({
        ...data,
        [section]: {
          // @ts-ignore
          ...data[section],
          [field]: value,
        },
      });
    } else {
      onChange({
        ...data,
        [section]: value,
      });
    }
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...data.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    onChange({
      ...data,
      items: newItems,
    });
  };

  const addItem = () => {
    onChange({
      ...data,
      items: [
        ...data.items,
        {
          date: format(new Date(), 'MMM d, yyyy'),
          description: 'New Service Description',
          hours: 1,
        },
      ],
    });
  };

  const removeItem = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index);
    onChange({
      ...data,
      items: newItems,
    });
  };

  // Helper to safely parse date string or return undefined
  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? undefined : date;
  };

  return (
    <div className="space-y-8 p-6 bg-card rounded-lg border shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Invoice Meta */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Invoice Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={data.invoiceNumber}
                onChange={(e) => handleChange('invoiceNumber', null, e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date Issued</Label>
              <DatePicker
                date={parseDate(data.date)}
                onSelect={(date) =>
                  handleChange('date', null, date ? format(date, 'MMMM d, yyyy') : '')
                }
              />
            </div>
          </div>
        </div>

        {/* Sender Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Sender Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="senderName">Name</Label>
              <Input
                id="senderName"
                value={data.sender.name}
                onChange={(e) => handleChange('sender', 'name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senderRole">Role</Label>
              <Input
                id="senderRole"
                value={data.sender.role}
                onChange={(e) => handleChange('sender', 'role', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senderEmail">Email</Label>
              <Input
                id="senderEmail"
                value={data.sender.email}
                onChange={(e) => handleChange('sender', 'email', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senderWebsite">Website</Label>
              <Input
                id="senderWebsite"
                value={data.sender.website}
                onChange={(e) => handleChange('sender', 'website', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Recipient Info */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recipient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="recipientCompany">Company Name</Label>
            <Input
              id="recipientCompany"
              value={data.recipient.company}
              onChange={(e) => handleChange('recipient', 'company', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientContact">Contact Person</Label>
            <Input
              id="recipientContact"
              value={data.recipient.contact}
              onChange={(e) => handleChange('recipient', 'contact', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientEmail">Email</Label>
            <Input
              id="recipientEmail"
              value={data.recipient.email}
              onChange={(e) => handleChange('recipient', 'email', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientLocation">Location</Label>
            <Input
              id="recipientLocation"
              value={data.recipient.location}
              onChange={(e) => handleChange('recipient', 'location', e.target.value)}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Payment Info */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Payment Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Method</Label>
            <Input
              id="paymentMethod"
              value={data.payment.method}
              onChange={(e) => handleChange('payment', 'method', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentLink">Payment Link</Label>
            <Input
              id="paymentLink"
              value={data.payment.link}
              onChange={(e) => handleChange('payment', 'link', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentRate">Hourly Rate ($)</Label>
            <Input
              id="paymentRate"
              type="number"
              value={data.payment.rate}
              onChange={(e) => handleChange('payment', 'rate', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Items</h2>
        </div>

        <div className="space-y-4">
          {data.items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 items-start border p-4 rounded-md bg-background/50"
            >
              <div className="col-span-3 space-y-2">
                <Label className="text-xs text-muted-foreground">Date</Label>
                <DatePicker
                  date={parseDate(item.date)}
                  onSelect={(date) =>
                    handleItemChange(index, 'date', date ? format(date, 'EEE, MMM d, yyyy') : '')
                  }
                />
              </div>
              <div className="col-span-6 space-y-2">
                <Label className="text-xs text-muted-foreground">Description</Label>
                <Input
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label className="text-xs text-muted-foreground">Hours</Label>
                <Input
                  type="number"
                  value={item.hours}
                  onChange={(e) =>
                    handleItemChange(index, 'hours', parseFloat(e.target.value) || 0)
                  }
                />
              </div>
              <div className="col-span-1 pt-6 flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(index)}
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button onClick={addItem} variant="outline" className="w-full border-dashed">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>
    </div>
  );
}
