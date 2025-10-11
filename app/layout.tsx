import type { Metadata } from "next";
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";

export const metadata: Metadata = {
  title: "Axion Scientifics - Natural Feed Supplements for Livestock",
  description:
    "Empowered by Science, Innovative in Solutions. Axion Scientifics pioneers natural, science-backed feed supplements for livestock growth, health, and immunity worldwide.",
  keywords: "livestock, feed supplements, natural, herbal, aquaculture, poultry, dairy, cattle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <RootLayoutClient>{children}</RootLayoutClient>
    </html>
  );
}


