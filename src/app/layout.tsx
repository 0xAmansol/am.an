import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aman Kalal",
  description:
    "Personal website of Aman Kalal - Developer building things on the internet",
  generator: "Next.js",
  applicationName: "Aman Kalal Portfolio",
  keywords: [
    "Aman Kalal",
    "frontend",
    "backend",
    "AI",
    "crypto",
    "developer",
    "portfolio",
  ],
  authors: [{ name: "Aman Kalal" }],
  creator: "Aman Kalal",
  publisher: "Aman Kalal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Aman Kalal",
    description: "Developer building things on the internet",
    url: "https://am-an.vercel.app/",
    siteName: "Aman kalal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aman Kalal - Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aman Kalal",
    description: "Developer building things on the internet",
    creator: "@0xAmankalal",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative">
          <div className="relative mx-auto max-w-screen-xl">
            <div className="absolute left-8 top-0 bottom-0 border-l border-dotted border-[var(--border)] border-opacity-40 h-full overflow-hidden"></div>

            <div className="absolute right-8 top-0 bottom-0 border-l border-dotted border-[var(--border)] border-opacity-40 h-full overflow-hidden"></div>

            <div className="px-[34px]">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
