import type { Metadata, Viewport } from "next";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";

export const viewport: Viewport = {
  themeColor: "#D95338",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Flukah Party — 01/09 | DJ Virus",
  description:
    "A night on the Nile. Mixed Arabic & English music by DJ Virus. 01/09, 11 PM–3 AM. Limited guests.",
  keywords: [
    "Flukah Party",
    "DJ Virus",
    "Nile River Party",
    "Cairo Events",
    "Felucca Party",
    "Egyptian Music Party",
  ],
  authors: [{ name: "Flukah Events" }],
  openGraph: {
    title: "Flukah Party — 01/09 | DJ Virus",
    description:
      "A night on the Nile. Mixed Arabic & English music by DJ Virus. 01/09, 11 PM–3 AM. Limited guests.",
    url: "/",
    siteName: "Flukah Party",
    images: [
      {
        url: "/poster.png",
        width: 1200,
        height: 1500,
        alt: "Flukah Party Event Poster - 01/09 DJ Virus",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flukah Party — 01/09 | DJ Virus",
    description:
      "A night on the Nile. Mixed Arabic & English music by DJ Virus. 01/09, 11 PM–3 AM. Limited guests.",
    images: ["/poster.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body bg-parchment text-ink antialiased selection:bg-terracotta selection:text-white">
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
