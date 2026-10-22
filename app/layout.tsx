import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glow Up Concept",
  description:
    "Glow Up Concept — beleza, cuidado e autoestima em um só lugar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}