import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalContent } from "@/lib/legal-content";

export const metadata: Metadata = { title: "Security & Safety | Tiny Desk AI Videos", description: legalContent["security"].description, alternates: { canonical: "/security" } };
export default function Page() { return <LegalPage slug="security" />; }
