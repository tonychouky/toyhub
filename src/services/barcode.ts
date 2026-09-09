import { getProductByBarcode } from "@/services/products";
import { Product } from "@/types";

// -----------------------------------------------------------------------
// Barcode lookup service.
//
// Today: validates format and looks the code up in the local mock catalog.
// Later: this is the seam where a real barcode/UPC scanning integration
// plugs in. Two realistic upgrade paths:
//
//   1. Camera-based scanning in the browser via a library such as
//      `@zxing/browser` or `html5-qrcode` — the scanned string would be
//      passed into `lookupBarcode()` exactly like manual input is today.
//   2. A hardware USB/Bluetooth barcode scanner, which types the barcode
//      into the focused input field (most scanners emulate a keyboard) —
//      already fully supported since BarcodeSearch is a plain text input.
//
// No scanning library is installed in this project. We do not fake a
// working camera scanner; the input-based lookup below is real and fully
// functional, and is the extension point for both paths above.
// -----------------------------------------------------------------------

export interface BarcodeLookupResult {
  status: "found" | "not_found" | "invalid";
  product?: Product;
  message?: string;
}

/** A barcode is treated as valid if it is 8-14 numeric digits (covers UPC-A, EAN-13, etc). */
export function isValidBarcodeFormat(code: string): boolean {
  return /^\d{8,14}$/.test(code.trim());
}

export async function lookupBarcode(code: string): Promise<BarcodeLookupResult> {
  const trimmed = code.trim();

  if (!trimmed) {
    return { status: "invalid", message: "Enter a barcode to search." };
  }

  if (!isValidBarcodeFormat(trimmed)) {
    return {
      status: "invalid",
      message: "That doesn't look like a valid barcode. Barcodes are 8-14 digits.",
    };
  }

  const product = await getProductByBarcode(trimmed);

  if (!product) {
    return { status: "not_found", message: `No product found for barcode ${trimmed}.` };
  }

  return { status: "found", product };
}
