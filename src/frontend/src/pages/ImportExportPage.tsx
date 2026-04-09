import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  FileDown,
  FileSpreadsheet,
  FileText,
  Loader2,
  Upload,
  X,
  XCircle,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { Hall, TimeOfDay } from "../backend";
import { HALL_OPTIONS, hallLabel } from "../components/BookingForm";
import {
  useAllBookings,
  useCreateBooking,
  usePendingBookings,
} from "../lib/backend-client";
import { calcBalanceReceivable, formatDate } from "../lib/utils";
import type { Booking, BookingInput } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PreviewRow {
  rowNum: number;
  customerName: string;
  bookingDate: string;
  functionDate: string;
  timeOfDay: string;
  hall: string;
  rentAmount: number;
  advanceReceived: number;
  discount: number;
  settlementAmount: number;
  totalCashReceipt: number;
  totalBankReceipt: number;
  remarks: string;
  valid: boolean;
  errors: string[];
  // Store parsed Date objects for actual submission
  _bookingDateObj: Date | null;
  _functionDateObj: Date | null;
  _tod: TimeOfDay | null;
  _hall: Hall;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseExcelDate(raw: unknown): Date | null {
  if (!raw) return null;
  if (typeof raw === "number") {
    // Excel serial → JS date
    const utc = new Date(Date.UTC(1899, 11, 30) + raw * 86400000);
    return utc;
  }
  if (typeof raw === "string") {
    const ddmm = raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
    if (ddmm) {
      const [, d, m, y] = ddmm;
      return new Date(Number(y), Number(m) - 1, Number(d));
    }
    const p = new Date(raw);
    if (!Number.isNaN(p.getTime())) return p;
  }
  if (raw instanceof Date) return raw;
  return null;
}

function parseTimeOfDay(raw: unknown): TimeOfDay | null {
  if (!raw) return null;
  const s = String(raw).toLowerCase().trim();
  if (s === "day") return TimeOfDay.day;
  if (s === "evening") return TimeOfDay.evening;
  return null;
}

function parseHall(raw: unknown): Hall {
  if (!raw) return Hall.tileFactory;
  const s = String(raw).toLowerCase().trim().replace(/\s+/g, "");
  if (s === "tilefactory" || s === "tile") return Hall.tileFactory;
  if (s === "terra") return Hall.terra;
  if (s === "frenchhall" || s === "french") return Hall.frenchHall;
  if (s === "businesshall" || s === "business") return Hall.businessHall;
  if (s === "others" || s === "other") return Hall.others;
  return Hall.tileFactory;
}

function parseNum(raw: unknown): number {
  if (raw === null || raw === undefined || raw === "") return 0;
  const n = Number(raw);
  return Number.isNaN(n) ? 0 : n;
}

function dateToNs(d: Date): bigint {
  return BigInt(d.getTime()) * 1_000_000n;
}

function normalizeKey(k: string): string {
  return k.toLowerCase().replace(/[^a-z]/g, "");
}

const KEY_MAP: Record<string, string> = {
  customername: "customerName",
  bookingdate: "bookingDate",
  functiondate: "functionDate",
  time: "timeOfDay",
  timeofday: "timeOfDay",
  hall: "hall",
  hallname: "hall",
  venue: "hall",
  rentamount: "rentAmount",
  advancereceived: "advanceReceived",
  advance: "advanceReceived",
  discount: "discount",
  settlementamount: "settlementAmount",
  settlement: "settlementAmount",
  cashreceipt: "totalCashReceipt",
  totalcashreceipt: "totalCashReceipt",
  bankreceipt: "totalBankReceipt",
  totalbankreceipt: "totalBankReceipt",
  remarks: "remarks",
};

function parseSheet(ws: XLSX.WorkSheet): PreviewRow[] {
  const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, {
    defval: "",
    raw: true,
  });

  return raw.map((row, i) => {
    const norm: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(row)) {
      const mapped = KEY_MAP[normalizeKey(k)];
      if (mapped) norm[mapped] = v;
    }

    const errors: string[] = [];

    const customerName = String(norm.customerName ?? "").trim();
    if (!customerName) errors.push("Customer Name required");

    const bdObj = parseExcelDate(norm.bookingDate);
    if (!bdObj) errors.push("Booking Date invalid");

    const fdObj = parseExcelDate(norm.functionDate);
    if (!fdObj) errors.push("Function Date invalid");

    const tod = parseTimeOfDay(norm.timeOfDay);
    if (!tod) errors.push("Time must be Day or Evening");

    const parsedHall = parseHall(norm.hall);

    return {
      rowNum: i + 2,
      customerName,
      bookingDate: bdObj
        ? bdObj.toLocaleDateString("en-IN")
        : String(norm.bookingDate ?? ""),
      functionDate: fdObj
        ? fdObj.toLocaleDateString("en-IN")
        : String(norm.functionDate ?? ""),
      timeOfDay: String(norm.timeOfDay ?? ""),
      hall: String(norm.hall ?? ""),
      rentAmount: parseNum(norm.rentAmount),
      advanceReceived: parseNum(norm.advanceReceived),
      discount: parseNum(norm.discount),
      settlementAmount: parseNum(norm.settlementAmount),
      totalCashReceipt: parseNum(norm.totalCashReceipt),
      totalBankReceipt: parseNum(norm.totalBankReceipt),
      remarks: String(norm.remarks ?? ""),
      valid: errors.length === 0,
      errors,
      _bookingDateObj: bdObj,
      _functionDateObj: fdObj,
      _tod: tod,
      _hall: parsedHall,
    };
  });
}

// ─── Export helpers ───────────────────────────────────────────────────────────

function toSheetData(bookings: Booking[]) {
  return bookings.map((b) => ({
    "Customer Name": b.customerName,
    "Booking Date": formatDate(b.bookingDate),
    "Function Date": formatDate(b.functionDate),
    Time: b.timeOfDay === TimeOfDay.day ? "Day" : "Evening",
    Hall: hallLabel(b.hall),
    "Rent Amount": Number(b.rentAmount),
    "Advance Received": Number(b.advanceReceived),
    Discount: Number(b.discount),
    "Settlement Amount": Number(b.settlementAmount),
    "Total Cash Receipt": Number(b.totalCashReceipt),
    "Total Bank Receipt": Number(b.totalBankReceipt),
    "Balance Receivable": calcBalanceReceivable(
      b.rentAmount,
      b.advanceReceived,
      b.discount,
      b.settlementAmount,
    ),
    Remarks: b.remarks,
  }));
}

function dlXlsx(data: Record<string, unknown>[], filename: string) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data");
  XLSX.writeFile(wb, filename);
}

function dlCsv(data: Record<string, unknown>[], filename: string) {
  const ws = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadTemplate() {
  const sample = [
    {
      "Customer Name": "Sharma Weddings",
      "Booking Date": "01/06/2025",
      "Function Date": "15/06/2025",
      "Time (Day/Evening)": "Evening",
      Hall: "French Hall",
      "Rent Amount": 50000,
      "Advance Received": 20000,
      Discount: 0,
      "Settlement Amount": 0,
      "Cash Receipt": 20000,
      "Bank Receipt": 0,
      Remarks: "Full hall booking",
    },
  ];
  const ws = XLSX.utils.json_to_sheet(sample);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Template");
  XLSX.writeFile(wb, "KlayHills_Import_Template.xlsx");
}

// ─── Export Section ───────────────────────────────────────────────────────────

function ExportSection({
  allBookings,
  pendingBookings,
  loadingAll,
  loadingPending,
}: {
  allBookings: Booking[];
  pendingBookings: Booking[];
  loadingAll: boolean;
  loadingPending: boolean;
}) {
  const actions = [
    {
      id: "export-all-excel",
      label: "Export All Bookings",
      sub: "Excel (.xlsx)",
      icon: <FileSpreadsheet className="h-6 w-6 text-green-600" />,
      count: allBookings.length,
      loading: loadingAll,
      onClick() {
        if (!allBookings.length) {
          toast.info("No bookings to export");
          return;
        }
        dlXlsx(toSheetData(allBookings), "KlayHills_All_Bookings.xlsx");
        toast.success("All bookings exported to Excel");
      },
    },
    {
      id: "export-pending-excel",
      label: "Export Pending Report",
      sub: "Excel (.xlsx)",
      icon: <FileText className="h-6 w-6 text-destructive" />,
      count: pendingBookings.length,
      loading: loadingPending,
      onClick() {
        if (!pendingBookings.length) {
          toast.info("No pending bookings to export");
          return;
        }
        dlXlsx(toSheetData(pendingBookings), "KlayHills_Pending_Report.xlsx");
        toast.success("Pending report exported to Excel");
      },
    },
    {
      id: "export-all-csv",
      label: "Export All Bookings",
      sub: "CSV (.csv)",
      icon: <FileDown className="h-6 w-6 text-primary" />,
      count: allBookings.length,
      loading: loadingAll,
      onClick() {
        if (!allBookings.length) {
          toast.info("No bookings to export");
          return;
        }
        dlCsv(toSheetData(allBookings), "KlayHills_All_Bookings.csv");
        toast.success("All bookings exported as CSV");
      },
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Download className="h-5 w-5 text-primary" />
          Export Data
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Download bookings data as Excel or CSV for offline use.
        </p>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-3">
        {actions.map((a) => (
          <button
            key={a.id}
            type="button"
            data-ocid={a.id}
            disabled={a.loading}
            onClick={a.onClick}
            className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-5 text-left transition-smooth hover:border-primary/40 hover:bg-primary/5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="flex items-start justify-between">
              {a.icon}
              <FileDown className="h-4 w-4 text-muted-foreground opacity-0 transition-smooth group-hover:opacity-100" />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground leading-tight">
                {a.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{a.sub}</p>
              {a.loading ? (
                <Skeleton className="mt-1.5 h-3 w-16" />
              ) : (
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {a.count} record{a.count !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}

// ─── Drop Zone ────────────────────────────────────────────────────────────────

function DropZone({
  onFile,
  disabled,
}: { onFile: (f: File) => void; disabled?: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      if (disabled) return;
      const f = e.dataTransfer.files[0];
      if (f) onFile(f);
    },
    [onFile, disabled],
  );

  return (
    <button
      type="button"
      data-ocid="import-dropzone"
      disabled={disabled}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => ref.current?.click()}
      className={[
        "w-full flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-12 text-center transition-smooth",
        dragging
          ? "border-primary bg-primary/5 scale-[1.01]"
          : "border-border hover:border-primary/50 hover:bg-muted/40",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
      ].join(" ")}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <Upload className="h-7 w-7 text-primary" />
      </div>
      <div>
        <p className="font-semibold text-foreground">
          Drag & drop your file here
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          or <span className="text-primary underline">click to browse</span> —
          .xlsx, .xls, .csv
        </p>
      </div>
      <input
        ref={ref}
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        data-ocid="import-file-input"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) {
            onFile(f);
            e.target.value = "";
          }
        }}
      />
    </button>
  );
}

// ─── Preview Table ────────────────────────────────────────────────────────────

function PreviewTable({
  rows,
  onConfirm,
  onCancel,
  importing,
  progress,
}: {
  rows: PreviewRow[];
  onConfirm: () => void;
  onCancel: () => void;
  importing: boolean;
  progress: number;
}) {
  const validCount = rows.filter((r) => r.valid).length;
  const invalidCount = rows.length - validCount;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-foreground">
          Preview — {rows.length} row{rows.length !== 1 ? "s" : ""} found
        </span>
        <Badge
          variant="outline"
          className="gap-1 border-green-500/40 text-green-600 dark:text-green-400"
        >
          <CheckCircle2 className="h-3 w-3" />
          {validCount} valid
        </Badge>
        {invalidCount > 0 && (
          <Badge
            variant="outline"
            className="gap-1 border-destructive/40 text-destructive"
          >
            <XCircle className="h-3 w-3" />
            {invalidCount} invalid
          </Badge>
        )}
      </div>

      <ScrollArea
        className="h-80 rounded-lg border border-border"
        data-ocid="preview-scroll-area"
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-10 text-center">Row</TableHead>
              <TableHead className="w-10">Status</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Booking Date</TableHead>
              <TableHead>Function Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Hall</TableHead>
              <TableHead className="text-right">Rent</TableHead>
              <TableHead className="text-right">Advance</TableHead>
              <TableHead className="text-right">Discount</TableHead>
              <TableHead className="text-right">Settlement</TableHead>
              <TableHead className="text-right">Cash</TableHead>
              <TableHead className="text-right">Bank</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.rowNum}
                data-ocid={`preview-row-${row.rowNum}`}
                className={
                  row.valid ? "" : "bg-destructive/5 hover:bg-destructive/10"
                }
              >
                <TableCell className="text-center text-xs text-muted-foreground">
                  {row.rowNum}
                </TableCell>
                <TableCell>
                  {row.valid ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="flex items-start gap-1 min-w-[120px]">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                      <span className="text-xs text-destructive leading-tight">
                        {row.errors.join("; ")}
                      </span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium min-w-[110px] max-w-[140px] truncate">
                  {row.customerName || "—"}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap">
                  {row.bookingDate || "—"}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap">
                  {row.functionDate || "—"}
                </TableCell>
                <TableCell>
                  {row.timeOfDay ? (
                    <Badge variant="outline" className="text-xs capitalize">
                      {row.timeOfDay}
                    </Badge>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="text-xs whitespace-nowrap"
                  >
                    {hallLabel(row._hall)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-sm font-mono">
                  {row.rentAmount
                    ? `₹${row.rentAmount.toLocaleString("en-IN")}`
                    : "—"}
                </TableCell>
                <TableCell className="text-right text-sm font-mono">
                  {row.advanceReceived
                    ? `₹${row.advanceReceived.toLocaleString("en-IN")}`
                    : "—"}
                </TableCell>
                <TableCell className="text-right text-sm font-mono">
                  {row.discount
                    ? `₹${row.discount.toLocaleString("en-IN")}`
                    : "—"}
                </TableCell>
                <TableCell className="text-right text-sm font-mono">
                  {row.settlementAmount
                    ? `₹${row.settlementAmount.toLocaleString("en-IN")}`
                    : "—"}
                </TableCell>
                <TableCell className="text-right text-sm font-mono">
                  {row.totalCashReceipt
                    ? `₹${row.totalCashReceipt.toLocaleString("en-IN")}`
                    : "—"}
                </TableCell>
                <TableCell className="text-right text-sm font-mono">
                  {row.totalBankReceipt
                    ? `₹${row.totalBankReceipt.toLocaleString("en-IN")}`
                    : "—"}
                </TableCell>
                <TableCell className="max-w-[120px] truncate text-sm text-muted-foreground">
                  {row.remarks || "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      {importing && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Loader2 className="h-4 w-4 animate-spin" />
              Importing rows…
            </span>
            <span className="font-semibold text-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress
            value={progress}
            className="h-2"
            data-ocid="import-progress"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Button
          data-ocid="confirm-import-btn"
          onClick={onConfirm}
          disabled={validCount === 0 || importing}
        >
          {importing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Importing…
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Confirm Import ({validCount} row{validCount !== 1 ? "s" : ""})
            </>
          )}
        </Button>
        <Button
          variant="outline"
          data-ocid="cancel-import-btn"
          onClick={onCancel}
          disabled={importing}
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ImportExportPage() {
  const { data: allBookings = [], isLoading: loadingAll } = useAllBookings();
  const { data: pendingBookings = [], isLoading: loadingPending } =
    usePendingBookings();
  const createBooking = useCreateBooking();

  const [previewRows, setPreviewRows] = useState<PreviewRow[] | null>(null);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [importResult, setImportResult] = useState<{
    success: number;
    failed: number;
  } | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  function handleFile(file: File) {
    setParseError(null);
    setImportResult(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: "array", cellDates: false });
        const sheetName = wb.SheetNames[0];
        if (!sheetName) throw new Error("No sheets found in file");
        const ws = wb.Sheets[sheetName];
        const rows = parseSheet(ws);
        if (rows.length === 0) throw new Error("File has no data rows");
        setPreviewRows(rows);
      } catch (err) {
        setParseError(
          err instanceof Error ? err.message : "Failed to parse file",
        );
      }
    };
    reader.readAsArrayBuffer(file);
  }

  async function handleConfirmImport() {
    if (!previewRows) return;
    const validRows = previewRows.filter((r) => r.valid);
    if (validRows.length === 0) return;

    setImporting(true);
    setProgress(0);
    let successCount = 0;
    let failedCount = 0;

    for (let i = 0; i < validRows.length; i++) {
      const row = validRows[i];
      try {
        if (!row._bookingDateObj || !row._functionDateObj || !row._tod)
          throw new Error("parse");
        const input: BookingInput = {
          customerName: row.customerName,
          bookingDate: dateToNs(row._bookingDateObj),
          functionDate: dateToNs(row._functionDateObj),
          timeOfDay: row._tod,
          hall: row._hall,
          rentAmount: BigInt(Math.round(row.rentAmount)),
          advanceReceived: BigInt(Math.round(row.advanceReceived)),
          discount: BigInt(Math.round(row.discount)),
          settlementAmount: BigInt(Math.round(row.settlementAmount)),
          totalCashReceipt: BigInt(Math.round(row.totalCashReceipt)),
          totalBankReceipt: BigInt(Math.round(row.totalBankReceipt)),
          remarks: row.remarks,
        };
        await createBooking.mutateAsync(input);
        successCount++;
      } catch {
        failedCount++;
      }
      setProgress(((i + 1) / validRows.length) * 100);
    }

    setImporting(false);
    setPreviewRows(null);
    setImportResult({ success: successCount, failed: failedCount });

    if (successCount > 0) {
      toast.success(
        `Imported ${successCount} booking${successCount !== 1 ? "s" : ""} successfully`,
      );
    }
    if (failedCount > 0) {
      toast.error(
        `${failedCount} row${failedCount !== 1 ? "s" : ""} failed to import`,
      );
    }
  }

  function handleCancelImport() {
    setPreviewRows(null);
    setParseError(null);
  }

  return (
    <div className="space-y-8 p-4 md:p-6" data-ocid="import-export-page">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Import / Export
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Bulk import bookings from Excel/CSV, or export data for offline use.
        </p>
      </div>

      <ExportSection
        allBookings={allBookings}
        pendingBookings={pendingBookings}
        loadingAll={loadingAll}
        loadingPending={loadingPending}
      />

      <Separator />

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Upload className="h-5 w-5 text-primary" />
                Import Bookings
              </CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Upload an Excel or CSV file, preview rows, then confirm to
                import valid rows.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              data-ocid="download-template-btn"
              onClick={downloadTemplate}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download Template
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Success / result banner */}
          {importResult && (
            <div
              data-ocid="import-result-banner"
              className={[
                "flex items-start gap-3 rounded-lg border p-4 text-sm",
                importResult.failed === 0
                  ? "border-green-500/30 bg-green-50 text-green-800 dark:bg-green-950/40 dark:text-green-300"
                  : "border-yellow-500/30 bg-yellow-50 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-300",
              ].join(" ")}
            >
              {importResult.failed === 0 ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              ) : (
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              )}
              <div>
                <p className="font-semibold">
                  {importResult.success} booking
                  {importResult.success !== 1 ? "s" : ""} imported
                  {importResult.failed > 0 && `, ${importResult.failed} failed`}
                </p>
                <button
                  type="button"
                  onClick={() => setImportResult(null)}
                  className="mt-1 text-xs underline opacity-70 hover:opacity-100"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Parse error */}
          {parseError && (
            <div
              data-ocid="import-parse-error"
              className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-destructive text-sm"
            >
              <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">Could not read file</p>
                <p className="mt-0.5 opacity-80">{parseError}</p>
              </div>
            </div>
          )}

          {/* Drop zone shown only when no preview */}
          {!previewRows && (
            <DropZone onFile={handleFile} disabled={importing} />
          )}

          {/* Preview table */}
          {previewRows && (
            <PreviewTable
              rows={previewRows}
              onConfirm={handleConfirmImport}
              onCancel={handleCancelImport}
              importing={importing}
              progress={progress}
            />
          )}

          {/* Column guide */}
          {!previewRows && (
            <div className="rounded-lg bg-muted/40 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Expected columns (case-insensitive)
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Customer Name",
                  "Booking Date",
                  "Function Date",
                  "Time (Day/Evening)",
                  "Hall",
                  "Rent Amount",
                  "Advance Received",
                  "Discount",
                  "Settlement Amount",
                  "Cash Receipt",
                  "Bank Receipt",
                  "Remarks",
                ].map((col) => (
                  <Badge
                    key={col}
                    variant="secondary"
                    className="font-mono text-xs"
                  >
                    {col}
                  </Badge>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Dates: DD/MM/YYYY or YYYY-MM-DD. Time: "Day" or "Evening". Hall:
                "Tile Factory", "Terra", "French Hall", "Business Hall",
                "Others" (defaults to Tile Factory). Numeric fields default to 0
                if blank.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
