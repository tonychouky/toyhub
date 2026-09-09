"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/providers/ToastProvider";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return;
    showToast("Thanks for subscribing! Watch your inbox for deals and gift ideas.");
    setEmail("");
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-gray-900 px-6 py-12 text-center sm:px-12">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
          <Mail className="h-6 w-6" />
        </span>
        <h2 className="font-display text-2xl font-extrabold text-white">Stay in the loop</h2>
        <p className="max-w-md text-sm text-white/70">
          Get seasonal gift ideas, promotions, and new arrivals straight to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="mt-2 flex w-full max-w-sm flex-col gap-2 sm:flex-row">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white"
          />
          <Button type="submit" variant="secondary" className="border-white bg-white text-gray-900 hover:bg-white/90">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
