import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalContent } from "@/lib/legal-content";

export const metadata: Metadata = { title: "Refund & Delivery Policy | Fancy Cafe AI", description: legalContent["refund-policy"].description, alternates: { canonical: "/refund-policy" } };
export default function Page() { return <LegalPage slug="refund-policy" />; }
