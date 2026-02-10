import type { Metadata } from "next";
import localFont from "next/font/local";
import "@promptthis/react/styles.css";
import "./globals.css";

const geistSans = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistPixel = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-pixel/GeistPixel-Square.woff2",
  variable: "--font-geist-pixel-square",
  weight: "500",
});

export const metadata: Metadata = {
  title: "PromptThis - The share button, but for AI.",
  description:
    "Add a prompt button to any content. Visitors pick their AI tool and get a structured prompt. No API keys, no backend, no chatbot.",
  metadataBase: new URL("https://promptthis.dev"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
  },
  openGraph: {
    title: "PromptThis - The share button, but for AI.",
    description:
      "Add a prompt button to any content. Visitors pick their AI tool and get a structured prompt. No API keys, no backend, no chatbot.",
    type: "website",
    siteName: "PromptThis",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "PromptThis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptThis - The share button, but for AI.",
    description:
      "Add a prompt button to any content. Visitors pick their AI tool and get a structured prompt.",
    images: ["/banner.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistPixel.variable}`}>
      <body
        className={`${geistPixel.className} text-black bg-white antialiased leading-relaxed`}
      >
        {children}
      </body>
    </html>
  );
}
