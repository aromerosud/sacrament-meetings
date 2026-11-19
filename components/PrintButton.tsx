"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-md bg-primary px-4 py-2 text-white hover:opacity-90 print:hidden"
    >
      Print Program
    </button>
  );
}