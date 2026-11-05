import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalContent } from "@/lib/legal-content";

export const metadata: Metadata = { title: "Contact & Support | Fancy Cafe AI", description: legalContent["contact"].description, alternates: { canonical: "/contact" } };
export default function Page() { return <LegalPage slug="contact" />; }
