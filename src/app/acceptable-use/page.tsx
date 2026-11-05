import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalContent } from "@/lib/legal-content";

export const metadata: Metadata = { title: "Acceptable Use Policy | Tiny Desk AI Videos", description: legalContent["acceptable-use"].description, alternates: { canonical: "/acceptable-use" } };
export default function Page() { return <LegalPage slug="acceptable-use" />; }
