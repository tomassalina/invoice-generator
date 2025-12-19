'use client';

import React from 'react';
import { format } from 'date-fns';
import { Trash2, Plus } from 'lucide-react';

import { InvoiceData, InvoiceItem } from './types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

    if (field && (section === 'sender' || section === 'recipient' || section === 'payment')) {
      onChange({
        ...data,
        [section]: {
          ...data[section],
          [field]: value,
        },
      });
    } else if (!field) {
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
          date: format(new Date(), 'EEE, MMM d, yyyy'),
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
    <div className="space-y-8 p-4 md:p-6 bg-card rounded-lg border shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Invoice Meta */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Invoice Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Payment Type</Label>
              <Select
                value={data.payment.type}
                onValueChange={(val: 'link' | 'bank') => handleChange('payment', 'type', val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="link">Payment Link</SelectItem>
                </SelectContent>
              </Select>
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

          {data.payment.type === 'link' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Method Name</Label>
                <Input
                  id="paymentMethod"
                  value={data.payment.method || ''}
                  onChange={(e) => handleChange('payment', 'method', e.target.value)}
                  placeholder="e.g. Takenos"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentLink">Link URL</Label>
                <Input
                  id="paymentLink"
                  value={data.payment.link || ''}
                  onChange={(e) => handleChange('payment', 'link', e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>
          ) : (
            <div className="bg-muted/40 p-4 rounded-lg border space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={data.payment.bankName || ''}
                      onChange={(e) => handleChange('payment', 'bankName', e.target.value)}
                      placeholder="e.g. Lead Bank"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Holder</Label>
                    <Input
                      id="accountName"
                      value={data.payment.accountName || ''}
                      onChange={(e) => handleChange('payment', 'accountName', e.target.value)}
                      placeholder="e.g. Tomas Salina"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number / IBAN</Label>
                    <Input
                      id="accountNumber"
                      value={data.payment.accountNumber || ''}
                      onChange={(e) => handleChange('payment', 'accountNumber', e.target.value)}
                      placeholder="e.g. 1234567890"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="routingNumber">Routing / Swift / CBU</Label>
                    <Input
                      id="routingNumber"
                      value={data.payment.routingNumber || ''}
                      onChange={(e) => handleChange('payment', 'routingNumber', e.target.value)}
                      placeholder="e.g. 021000..."
                    />
                  </div>
                </div>

                <div className="md:col-span-4 space-y-2 flex flex-col">
                  <Label htmlFor="additionalBankInfo">Additional Details</Label>
                  <Textarea
                    id="additionalBankInfo"
                    value={data.payment.additionalBankInfo || ''}
                    onChange={(e) => handleChange('payment', 'additionalBankInfo', e.target.value)}
                    placeholder="Address, Account Type, etc."
                    className="flex-1 min-h-[130px]"
                  />
                </div>
              </div>
            </div>
          )}
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
              <div className="col-span-12 md:col-span-3 space-y-2">
                <Label className="text-xs text-muted-foreground">Date</Label>
                <DatePicker
                  date={parseDate(item.date)}
                  onSelect={(date) =>
                    handleItemChange(index, 'date', date ? format(date, 'EEE, MMM d, yyyy') : '')
                  }
                />
              </div>
              <div className="col-span-12 md:col-span-6 space-y-2">
                <Label className="text-xs text-muted-foreground">Description</Label>
                <Input
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                />
              </div>
              <div className="col-span-9 md:col-span-2 space-y-2">
                <Label className="text-xs text-muted-foreground">Hours</Label>
                <Input
                  type="number"
                  value={item.hours}
                  onChange={(e) =>
                    handleItemChange(index, 'hours', parseFloat(e.target.value) || 0)
                  }
                />
              </div>
              <div className="col-span-3 md:col-span-1 pt-6 flex justify-end">
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
