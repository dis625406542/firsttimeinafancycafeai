import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalContent } from "@/lib/legal-content";

export const metadata: Metadata = { title: "Contact & Support | Tiny Desk AI Videos", description: legalContent["contact"].description, alternates: { canonical: "/contact" } };
export default function Page() { return <LegalPage slug="contact" />; }
