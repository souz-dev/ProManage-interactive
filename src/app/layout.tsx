import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Promanage Interactive",
  description: "Gerencie seus projetos de forma eficiente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased"}>{children}</body>
    </html>
  );
}
