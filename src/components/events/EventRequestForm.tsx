"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { EventService } from "@/types";
import { submitEventInquiry } from "@/services/events";
import { useTranslation } from "@/hooks/useTranslation";

const BUDGET_RANGES = ["Under $500", "$500 - $1,500", "$1,500 - $5,000", "$5,000+", "Not sure yet"];

export function EventRequestForm({ services, defaultServiceName }: { services: EventService[]; defaultServiceName?: string }) {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [confirmationId, setConfirmationId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventType: services[0]?.name ?? "",
    eventDate: "",
    eventLocation: "",
    guestCount: "",
    serviceRequested: defaultServiceName ?? services[0]?.name ?? "",
    budgetRange: BUDGET_RANGES[0],
    additionalInfo: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next.fullName = t("errors.requiredField");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = t("errors.invalidEmail");
    if (!form.phone.trim()) next.phone = t("errors.requiredField");
    if (!form.eventDate) next.eventDate = t("errors.requiredField");
    if (!form.eventLocation.trim()) next.eventLocation = t("errors.requiredField");
    if (!form.guestCount.trim()) next.guestCount = t("errors.requiredField");
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const inquiry = await submitEventInquiry(form);
    setSubmitting(false);
    setConfirmationId(inquiry.id);
  }

  if (confirmationId) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-leaf-500" />
        <h2 className="mt-4 font-display text-xl font-extrabold text-gray-900">{t("events.confirmationTitle")}</h2>
        <p className="mt-2 max-w-md text-sm text-gray-500">{t("events.confirmationBody")}</p>
        <p className="mt-4 text-xs font-semibold text-gray-400">Reference #{confirmationId}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full Name">
          <Input required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} error={errors.fullName} />
        </Field>
        <Field label="Email">
          <Input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} error={errors.email} />
        </Field>
        <Field label="Phone">
          <Input required value={form.phone} onChange={(e) => update("phone", e.target.value)} error={errors.phone} />
        </Field>
        <Field label={t("events.eventType")}>
          <Select value={form.eventType} onChange={(e) => update("eventType", e.target.value)}>
            {services.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={t("events.eventDate")}>
          <Input required type="date" value={form.eventDate} onChange={(e) => update("eventDate", e.target.value)} error={errors.eventDate} />
        </Field>
        <Field label={t("events.eventLocation")}>
          <Input required value={form.eventLocation} onChange={(e) => update("eventLocation", e.target.value)} error={errors.eventLocation} />
        </Field>
        <Field label={t("events.guestCount")}>
          <Input required value={form.guestCount} onChange={(e) => update("guestCount", e.target.value)} placeholder="e.g. 50" error={errors.guestCount} />
        </Field>
        <Field label={t("events.budgetRange")}>
          <Select value={form.budgetRange} onChange={(e) => update("budgetRange", e.target.value)}>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Service Requested" className="sm:col-span-2">
          <Input value={form.serviceRequested} onChange={(e) => update("serviceRequested", e.target.value)} />
        </Field>
        <Field label={t("events.additionalInfo")} className="sm:col-span-2">
          <textarea
            rows={4}
            value={form.additionalInfo}
            onChange={(e) => update("additionalInfo", e.target.value)}
            className="w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-brand-500 focus:outline-none"
          />
        </Field>
      </div>
      <Button type="submit" size="lg" disabled={submitting} className="mt-2 w-full sm:w-fit">
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {submitting ? "Submitting..." : t("events.requestQuote")}
      </Button>
    </form>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <span className="text-xs font-bold uppercase tracking-wide text-gray-500">{label}</span>
      {children}
    </label>
  );
}
