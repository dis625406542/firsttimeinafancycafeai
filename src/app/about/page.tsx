import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalContent } from "@/lib/legal-content";

export const metadata: Metadata = { title: "About | Tiny Desk AI Videos", description: legalContent["about"].description, alternates: { canonical: "/about" } };
export default function Page() { return <LegalPage slug="about" />; }
