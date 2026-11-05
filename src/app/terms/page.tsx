import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalContent } from "@/lib/legal-content";

export const metadata: Metadata = { title: "Terms of Service | Tiny Desk AI Videos", description: legalContent["terms"].description, alternates: { canonical: "/terms" } };
export default function Page() { return <LegalPage slug="terms" />; }
