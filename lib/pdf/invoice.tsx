import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import type { Document as DocType, Profile, Client, LineItem } from "@/types";

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", backgroundColor: "#ffffff", padding: 48 },
  watermark: {
    position: "absolute", top: "50%", left: "50%",
    transform: "translate(-50%, -50%) rotate(-30deg)",
    fontSize: 48, color: "#e5e7eb", opacity: 0.4, fontWeight: "bold",
  },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 40 },
  logo: { width: 80, height: 32, objectFit: "contain" },
  brandName: { fontSize: 22, fontWeight: "bold", color: "#111827" },
  docType: { fontSize: 28, fontWeight: "bold", color: "#6366f1", marginBottom: 4 },
  docMeta: { fontSize: 10, color: "#6b7280", marginBottom: 2 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 9, fontWeight: "bold", color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 },
  partyName: { fontSize: 12, fontWeight: "bold", color: "#111827", marginBottom: 2 },
  partyDetail: { fontSize: 10, color: "#6b7280", marginBottom: 1 },
  divider: { borderBottom: 1, borderColor: "#e5e7eb", marginVertical: 20 },
  tableHeader: { flexDirection: "row", backgroundColor: "#f9fafb", padding: 8, borderRadius: 4 },
  tableHeaderCell: { fontSize: 9, fontWeight: "bold", color: "#6b7280", textTransform: "uppercase" },
  tableRow: { flexDirection: "row", paddingVertical: 10, borderBottom: 1, borderColor: "#f3f4f6" },
  tableCell: { fontSize: 10, color: "#374151" },
  descCol: { flex: 3 },
  numCol: { flex: 1, textAlign: "right" },
  totalsSection: { marginTop: 16, alignItems: "flex-end" },
  totalRow: { flexDirection: "row", justifyContent: "space-between", width: 220, marginBottom: 4 },
  totalLabel: { fontSize: 10, color: "#6b7280" },
  totalValue: { fontSize: 10, color: "#374151" },
  grandTotalRow: { flexDirection: "row", justifyContent: "space-between", width: 220, marginTop: 8, paddingTop: 8, borderTop: 1, borderColor: "#6366f1" },
  grandTotalLabel: { fontSize: 13, fontWeight: "bold", color: "#111827" },
  grandTotalValue: { fontSize: 13, fontWeight: "bold", color: "#6366f1" },
  notes: { marginTop: 32, padding: 12, backgroundColor: "#f9fafb", borderRadius: 4 },
  notesTitle: { fontSize: 9, fontWeight: "bold", color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  notesText: { fontSize: 10, color: "#6b7280", lineHeight: 1.5 },
  footer: { position: "absolute", bottom: 32, left: 48, right: 48, flexDirection: "row", justifyContent: "space-between" },
  footerText: { fontSize: 8, color: "#d1d5db" },
});

function calcSubtotal(items: LineItem[]) {
  return items.reduce((s, i) => s + i.qty * i.rate, 0);
}

function fmt(n: number) {
  return `$${n.toFixed(2)}`;
}

interface Props {
  doc: DocType;
  profile: Profile;
  client: Client | null;
  watermark?: boolean;
}

export function InvoicePDF({ doc, profile, client, watermark = false }: Props) {
  const subtotal = calcSubtotal(doc.line_items);
  const tax = subtotal * (doc.tax_rate / 100);
  const total = subtotal + tax;
  const docNumber = `#${doc.id.slice(0, 6).toUpperCase()}`;
  const isInvoice = doc.type === "invoice";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {watermark && (
          <Text style={styles.watermark}>Made with CloseKit</Text>
        )}

        {/* Header */}
        <View style={styles.header}>
          <View>
            {profile.brand_logo_url ? (
              <Image src={profile.brand_logo_url} style={styles.logo} />
            ) : (
              <Text style={styles.brandName}>{profile.email.split("@")[0]}</Text>
            )}
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.docType}>{isInvoice ? "INVOICE" : "PROPOSAL"}</Text>
            <Text style={styles.docMeta}>Number: {docNumber}</Text>
            <Text style={styles.docMeta}>Date: {new Date(doc.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</Text>
            {isInvoice && (
              <Text style={styles.docMeta}>Due: Net 30</Text>
            )}
          </View>
        </View>

        <View style={styles.divider} />

        {/* Bill To */}
        {client && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bill To</Text>
            <Text style={styles.partyName}>{client.name}</Text>
            {client.company && <Text style={styles.partyDetail}>{client.company}</Text>}
            {client.email && <Text style={styles.partyDetail}>{client.email}</Text>}
            {client.address && <Text style={styles.partyDetail}>{client.address}</Text>}
          </View>
        )}

        {/* Line Items Table */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, styles.descCol]}>Description</Text>
          <Text style={[styles.tableHeaderCell, styles.numCol]}>Qty</Text>
          <Text style={[styles.tableHeaderCell, styles.numCol]}>Rate</Text>
          <Text style={[styles.tableHeaderCell, styles.numCol]}>Amount</Text>
        </View>

        {doc.line_items.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.descCol]}>{item.description}</Text>
            <Text style={[styles.tableCell, styles.numCol]}>{item.qty}</Text>
            <Text style={[styles.tableCell, styles.numCol]}>{fmt(item.rate)}</Text>
            <Text style={[styles.tableCell, styles.numCol]}>{fmt(item.qty * item.rate)}</Text>
          </View>
        ))}

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>{fmt(subtotal)}</Text>
          </View>
          {doc.tax_rate > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tax ({doc.tax_rate}%)</Text>
              <Text style={styles.totalValue}>{fmt(tax)}</Text>
            </View>
          )}
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={styles.grandTotalValue}>{fmt(total)}</Text>
          </View>
        </View>

        {/* Notes */}
        {doc.notes && (
          <View style={styles.notes}>
            <Text style={styles.notesTitle}>Notes</Text>
            <Text style={styles.notesText}>{doc.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Thank you for your business.</Text>
          {watermark && (
            <Text style={styles.footerText}>Created with CloseKit · closekit.app</Text>
          )}
        </View>
      </Page>
    </Document>
  );
}
