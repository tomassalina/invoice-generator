import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
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
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flexDirection: 'column',
  },
  headerTitle: {
    fontSize: 44, // Super Size
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    marginTop: 4,
    color: '#94a3b8',
    fontSize: 18, // Super Size
  },
  headerRight: {
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  senderName: {
    fontSize: 26, // Super Size
    fontWeight: 'bold',
  },
  senderRole: {
    color: '#cbd5e1',
    marginTop: 2,
    fontSize: 14, // Super Size
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
    fontSize: 14, // Super Size
    color: '#94a3b8',
  },

  // Meta Section
  metaContainer: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
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
    fontSize: 14, // Super Size
    fontWeight: 'bold',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  recipientCompany: {
    fontSize: 24, // Super Size
    fontWeight: 'bold',
    color: '#0f172a',
  },
  recipientDetails: {
    fontSize: 14, // Super Size
    color: '#475569',
    marginTop: 2,
  },
  dateValue: {
    fontSize: 18, // Super Size
    fontWeight: 'medium',
    color: '#0f172a',
  },
  totalAmountLarge: {
    fontSize: 36, // Super Size
    fontWeight: 'bold',
    color: '#2563eb',
  },

  // Items Table
  itemsContainer: {
    padding: 24,
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 22, // Super Size
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableHeaderCell: {
    fontSize: 14, // Super Size
    fontWeight: 'bold',
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  // Grid columns (mocking 12 grid system)
  col2: { width: '16.66%' },
  col7: { width: '58.33%' },
  col1: { width: '8.33%' },
  col3: { width: '25%' },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
    alignItems: 'flex-start',
  },
  cellDate: {
    fontSize: 16, // Super Size
    color: '#64748b',
    fontWeight: 'medium',
  },
  cellDesc: {
    fontSize: 16, // Super Size
    color: '#1e293b',
    lineHeight: 1.4,
  },
  cellHours: {
    fontSize: 16, // Super Size
    color: '#475569',
    textAlign: 'right',
  },
  cellAmount: {
    fontSize: 16, // Super Size
    fontWeight: 'medium',
    color: '#0f172a',
    textAlign: 'right',
  },

  // Footer Totals
  footerContainer: {
    marginTop: 'auto',
  },
  totalsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 8,
    alignItems: 'flex-end',
  },
  totalsBox: {
    width: '50%',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: 16, // Super Size
    color: '#475569',
  },
  totalValue: {
    fontSize: 16, // Super Size
    fontWeight: 'medium',
    color: '#475569',
  },
  finalTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#0f172a',
    marginTop: 8,
    paddingTop: 8,
  },
  finalTotalLabel: {
    fontSize: 20, // Super Size
    fontWeight: 'bold',
    color: '#0f172a',
  },
  finalTotalValue: {
    fontSize: 32, // Super Size
    fontWeight: 'bold',
    color: '#0f172a',
  },

  // Bottom Payment Bar
  paymentContainer: {
    marginTop: 24, // Added separation from totals
    marginBottom: 24, // Added separation from footer
    backgroundColor: '#f8fafc',
    padding: 24, // Increased padding
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentTitle: {
    fontSize: 18, // Super Size
    fontWeight: 'bold',
    color: '#0f172a',
  },
  paymentSubtitle: {
    fontSize: 14, // Super Size
    color: '#64748b',
    marginTop: 2,
  },
  paymentButton: {
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    textDecoration: 'none',
    fontSize: 16, // Super Size
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
  },
  thankYouMsg: {
    textAlign: 'center',
    fontSize: 16, // Super Size
    color: '#94a3b8',
    marginTop: 12,
    marginBottom: 24, // Added bottom margin
  },
  linkIcon: {
    width: 14,
    height: 14,
    marginLeft: 6,
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
          {/* Condition: Bank vs Link Layouts */}
          {data.payment.type === 'link' ? (
            <>
              {/* Totals (Standard Stacked Layout) */}
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

              {/* Payment Link (Grey Box) */}
              <View style={styles.paymentContainer}>
                <View>
                  <Text style={styles.paymentTitle}>Payment Information</Text>
                  <Text style={styles.paymentSubtitle}>
                    Please remit payment via {data.payment.method || 'link'}.
                  </Text>
                </View>
                {data.payment.link && (
                  <Link src={data.payment.link} style={styles.paymentButton}>
                    Pay via {data.payment.method || 'Link'}
                  </Link>
                )}
              </View>
            </>
          ) : (
            /* Bank Transfer (Side-by-Side Layout) */
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 24, // Aligned with other sections
                borderTopWidth: 1,
                borderTopColor: '#f1f5f9',
                alignItems: 'flex-start',
              }}
            >
              {/* Left: Payment Info */}
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={styles.paymentTitle}>Payment Information</Text>
                <View style={{ marginTop: 2, gap: 1.5 }}>
                  {data.payment.bankName && (
                    <Text style={styles.paymentSubtitle}>
                      <Text style={{ fontWeight: 'bold', color: '#0f172a' }}>Bank: </Text>
                      {data.payment.bankName}
                    </Text>
                  )}
                  {data.payment.accountName && (
                    <Text style={styles.paymentSubtitle}>
                      <Text style={{ fontWeight: 'bold', color: '#0f172a' }}>Account Holder: </Text>
                      {data.payment.accountName}
                    </Text>
                  )}
                  {data.payment.accountNumber && (
                    <Text style={styles.paymentSubtitle}>
                      <Text style={{ fontWeight: 'bold', color: '#0f172a' }}>
                        Account No / IBAN:{' '}
                      </Text>
                      {data.payment.accountNumber}
                    </Text>
                  )}
                  {data.payment.routingNumber && (
                    <Text style={styles.paymentSubtitle}>
                      <Text style={{ fontWeight: 'bold', color: '#0f172a' }}>
                        Routing / Swift:{' '}
                      </Text>
                      {data.payment.routingNumber}
                    </Text>
                  )}
                </View>
                {data.payment.additionalBankInfo && (
                  <Text style={{ ...styles.paymentSubtitle, marginTop: 4, lineHeight: 1.5 }}>
                    {data.payment.additionalBankInfo}
                  </Text>
                )}
              </View>

              {/* Right: Totals */}
              <View style={{ width: '45%' }}>
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
          )}

          <Text style={styles.thankYouMsg}>
            Thank you for your business, {data.recipient.company}!
          </Text>
        </View>
      </Page>
    </Document>
  );
};
