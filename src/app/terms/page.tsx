import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalContent } from "@/lib/legal-content";

export const metadata: Metadata = { title: "Terms of Service | I Love The Smiths AI", description: legalContent["terms"].description, alternates: { canonical: "/terms" } };
export default function Page() { return <LegalPage slug="terms" />; }
