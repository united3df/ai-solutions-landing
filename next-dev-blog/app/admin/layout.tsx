import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono, DM_Sans } from "next/font/google";
import { AdminHeader } from "@/components/admin/AdminHeader";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-dev-display",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dev-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dev-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Admin",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`dev-page min-h-screen bg-dev-bg text-dev-text ${bebasNeue.variable} ${dmMono.variable} ${dmSans.variable}`}
      style={{ fontFamily: "var(--font-dev-sans), sans-serif" }}
    >
      <AdminHeader />
      {children}
    </div>
  );
}
