import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalContent } from "@/lib/legal-content";

export const metadata: Metadata = { title: "Privacy Policy | Tiny Desk AI Videos", description: legalContent["privacy"].description, alternates: { canonical: "/privacy" } };
export default function Page() { return <LegalPage slug="privacy" />; }
