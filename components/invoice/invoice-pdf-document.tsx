import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link, Image, Font } from '@react-pdf/renderer';
import { InvoiceData } from './types';

// Register standard fonts
// Register standard fonts
// Font.register({
//   family: 'Helvetica',
//   fonts: [
//     { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf' }, // Regular
//     {
//       src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf',
//       fontWeight: 'bold',
//     }, // Bold (simulated for standard fonts usually, or load specific weights)
//   ],
// });

// Define styles matching the Tailwind classes
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    padding: 0,
    flexDirection: 'column',
  },

  // Header Section (bg-slate-900)
  headerContainer: {
    backgroundColor: '#0f172a', // slate-900
    color: '#ffffff',
    padding: 32, // p-8 => 2rem => 32px (approx)
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flexDirection: 'column',
  },
  headerTitle: {
    fontSize: 36, // text-4xl
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: -0.5, // tracking-tight
  },
  headerSubtitle: {
    marginTop: 8,
    color: '#94a3b8', // slate-400
    fontSize: 18, // text-lg
  },
  headerRight: {
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  senderName: {
    fontSize: 24, // text-2xl
    fontWeight: 'bold',
  },
  senderRole: {
    color: '#cbd5e1', // slate-300
    marginTop: 4,
    fontSize: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
    fontSize: 14,
    color: '#94a3b8', // slate-400
  },

  // Meta Section
  metaContainer: {
    padding: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6', // gray-100
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 32,
  },
  metaLeft: {
    flex: 1,
  },
  metaRight: {
    flex: 1,
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 12, // text-xs
    fontWeight: 'bold',
    color: '#94a3b8', // slate-400
    textTransform: 'uppercase',
    letterSpacing: 0.5, // wider
    marginBottom: 4,
  },
  recipientCompany: {
    fontSize: 20, // text-xl
    fontWeight: 'bold',
    color: '#0f172a', // slate-900
  },
  recipientDetails: {
    fontSize: 14,
    color: '#475569', // slate-600
    marginTop: 2,
  },
  dateValue: {
    fontSize: 18, // text-lg
    fontWeight: 'medium',
    color: '#0f172a', // slate-900
  },
  totalAmountLarge: {
    fontSize: 30, // text-3xl
    fontWeight: 'bold',
    color: '#2563eb', // blue-600
  },

  // Items Table
  itemsContainer: {
    padding: 32,
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 20, // text-xl
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 24,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#f1f5f9', // slate-100
    paddingBottom: 12,
    marginBottom: 8,
  },
  tableHeaderCell: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#94a3b8', // slate-400
    textTransform: 'uppercase',
  },
  // Grid columns (mocking 12 grid system)
  col2: { width: '16.66%' },
  col7: { width: '58.33%' },
  col1: { width: '8.33%' },
  col3: { width: '25%' }, // Combining amount cols for simplicity

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc', // slate-50
    alignItems: 'flex-start',
  },
  cellDate: {
    fontSize: 14,
    color: '#64748b', // slate-500
    fontWeight: 'medium',
  },
  cellDesc: {
    fontSize: 14,
    color: '#1e293b', // slate-800
    lineHeight: 1.5,
  },
  cellHours: {
    fontSize: 14,
    color: '#475569', // slate-600
    textAlign: 'right',
  },
  cellAmount: {
    fontSize: 14,
    fontWeight: 'medium',
    color: '#0f172a', // slate-900
    textAlign: 'right',
  },

  // Footer Totals
  footerContainer: {
    marginTop: 'auto',
  },
  totalsContainer: {
    paddingHorizontal: 32,
    paddingBottom: 16,
    alignItems: 'flex-end',
  },
  totalsBox: {
    width: '45%', // w-5/12 approx
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#475569', // slate-600
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 'medium',
    color: '#475569',
  },
  finalTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#0f172a', // slate-900
    marginTop: 8,
    paddingTop: 12,
  },
  finalTotalLabel: {
    fontSize: 20, // text-xl
    fontWeight: 'bold',
    color: '#0f172a',
  },
  finalTotalValue: {
    fontSize: 30, // text-3xl
    fontWeight: 'bold',
    color: '#0f172a',
  },

  // Bottom Payment Bar
  paymentContainer: {
    backgroundColor: '#f8fafc', // slate-50
    padding: 32,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9', // slate-100
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  paymentSubtitle: {
    fontSize: 14,
    color: '#64748b', // slate-500
    marginTop: 4,
  },
  paymentButton: {
    backgroundColor: '#4f46e5', // indigo-600
    color: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
  },
  thankYouMsg: {
    textAlign: 'center',
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 32,
  },
  linkIcon: {
    width: 12,
    height: 12,
    marginLeft: 8,
  },
});

interface InvoicePDFProps {
  data: InvoiceData;
}

export const InvoicePDFDocument = ({ data }: InvoicePDFProps) => {
  const totalHours = data.items.reduce((acc, item) => acc + item.hours, 0);
  const totalAmount = totalHours * data.payment.rate;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Invoice</Text>
            <Text style={styles.headerSubtitle}>#{data.invoiceNumber}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.senderName}>{data.sender.name}</Text>
            <Text style={styles.senderRole}>{data.sender.role}</Text>
            <View style={{ marginTop: 16, alignItems: 'flex-end' }}>
              <View style={styles.contactRow}>
                {/* Icons are hard in PDF without images/svg paths, simplifying to text or omitted for cleaner PDF look, 
                    OR using basic unicode/images if strictly required. Text is cleaner for PDF copy-paste. */}
                <Text>{data.sender.email}</Text>
              </View>
              <View style={styles.contactRow}>
                <Link
                  src={`https://${data.sender.website}`}
                  style={{ color: '#94a3b8', textDecoration: 'none' }}
                >
                  {data.sender.website}
                </Link>
              </View>
            </View>
          </View>
        </View>

        {/* Meta */}
        <View style={styles.metaContainer}>
          <View style={styles.metaLeft}>
            <Text style={styles.label}>Bill To</Text>
            <Text style={styles.recipientCompany}>{data.recipient.company}</Text>
            <Text style={styles.recipientDetails}>Attn: {data.recipient.contact}</Text>
            <Text style={styles.recipientDetails}>{data.recipient.email}</Text>
            <Text style={styles.recipientDetails}>{data.recipient.location}</Text>
          </View>
          <View style={styles.metaRight}>
            <View style={{ marginBottom: 24 }}>
              <Text style={styles.label}>Date issued</Text>
              <Text style={styles.dateValue}>{data.date}</Text>
            </View>
            <View>
              <Text style={styles.label}>Total Amount</Text>
              <Text style={styles.totalAmountLarge}>${totalAmount.toFixed(2)} USD</Text>
            </View>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.itemsContainer}>
          <Text style={styles.sectionTitle}>Development Services</Text>

          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.col2]}>Date</Text>
            <Text style={[styles.tableHeaderCell, styles.col7]}>Description</Text>
            <Text style={[styles.tableHeaderCell, styles.col1, { textAlign: 'right' }]}>Hours</Text>
            <Text style={[styles.tableHeaderCell, styles.col2, { textAlign: 'right' }]}>
              Amount
            </Text>
          </View>

          {data.items.map((item, index) => (
            <View key={index} style={styles.tableRow} wrap={false}>
              <Text style={[styles.cellDate, styles.col2]}>{item.date}</Text>
              <Text style={[styles.cellDesc, styles.col7]}>{item.description}</Text>
              <Text style={[styles.cellHours, styles.col1]}>{item.hours}</Text>
              <Text style={[styles.cellAmount, styles.col2]}>
                ${(item.hours * data.payment.rate).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Footer Section - Ensure it pushes to bottom or flows naturally */}
        <View style={styles.footerContainer} wrap={false}>
          {/* Totals */}
          <View style={styles.totalsContainer}>
            <View style={styles.totalsBox}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Hours</Text>
                <Text style={styles.totalValue}>{totalHours} hrs</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Hourly Rate</Text>
                <Text style={styles.totalValue}>${data.payment.rate.toFixed(2)}/hr</Text>
              </View>
              <View style={styles.finalTotalRow}>
                <Text style={styles.finalTotalLabel}>Total Due</Text>
                <Text style={styles.finalTotalValue}>${totalAmount.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          {/* Payment Info */}
          <View style={styles.paymentContainer}>
            <View>
              <Text style={styles.paymentTitle}>Payment Information</Text>
              <Text style={styles.paymentSubtitle}>
                Please remit payment via {data.payment.method}.
              </Text>
            </View>
            <Link src={data.payment.link} style={styles.paymentButton}>
              Pay via {data.payment.method}
            </Link>
          </View>

          <Text style={styles.thankYouMsg}>
            Thank you for your business, {data.recipient.company}!
          </Text>
        </View>
      </Page>
    </Document>
  );
};
