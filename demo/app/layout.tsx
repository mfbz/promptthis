import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistPixelSquare } from "geist/font/pixel";
import "@promptthis/react/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "PromptThis — The share button, but for AI.",
  description:
    "Add a prompt button to any content. Visitors pick their AI tool and get a structured prompt — no API keys, no backend, no chatbot.",
  metadataBase: new URL("https://promptthis.dev"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
  },
  openGraph: {
    title: "PromptThis — The share button, but for AI.",
    description:
      "Add a prompt button to any content. Visitors pick their AI tool and get a structured prompt — no API keys, no backend, no chatbot.",
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
    title: "PromptThis — The share button, but for AI.",
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
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistPixelSquare.variable}`}
    >
      <body className="font-sans text-black bg-white antialiased leading-relaxed">
        {children}
      </body>
    </html>
  );
}
