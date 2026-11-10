import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalContent } from "@/lib/legal-content";

export const metadata: Metadata = { title: "Privacy Policy | I Love The Smiths AI", description: legalContent["privacy"].description, alternates: { canonical: "/privacy" } };
export default function Page() { return <LegalPage slug="privacy" />; }
