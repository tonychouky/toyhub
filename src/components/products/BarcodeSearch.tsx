"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ScanBarcode, Loader2 } from "lucide-react";
import { lookupBarcode } from "@/services/barcode";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

/**
 * Manual barcode entry + lookup. There is no camera/hardware scanner
 * library wired in — see src/services/barcode.ts for exactly where and
 * how one would be integrated. This component is fully functional for
 * typed or scanner-emulated (keyboard-wedge) input today.
 */
export function BarcodeSearch() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);
    const result = await lookupBarcode(code);
    if (result.status === "found" && result.product) {
      router.push(`/product/${result.product.id}`);
      return;
    }
    setStatus("error");
    setMessage(result.message ?? "No matching product found.");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 p-5">
      <div className="flex items-center gap-2 text-gray-700">
        <ScanBarcode className="h-5 w-5 text-brand-500" />
        <h3 className="font-display text-sm font-bold">Search by barcode</h3>
      </div>
      <p className="text-xs text-gray-500">
        Enter a product barcode (e.g. from packaging) to jump straight to that item. Compatible with USB/Bluetooth
        barcode scanners that type into this field.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="e.g. 194735123456"
          inputMode="numeric"
          aria-label="Barcode"
        />
        <Button type="submit" disabled={status === "loading"} className="shrink-0">
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Find Product"}
        </Button>
      </div>
      {status === "error" && message && <p className="text-xs font-medium text-red-500">{message}</p>}
    </form>
  );
}
