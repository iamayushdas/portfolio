import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AiBot } from "@/components/ai-bot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ayushdas.dev"),
  title: {
    default: "Ayush Das — Software Engineer",
    template: "%s | Ayush Das",
  },
  description: "I’m a product-minded software engineer building calm, scalable interfaces and AI-powered systems.",
  keywords: [
    "Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "AI/ML",
    "Full Stack Developer",
    "Open Source",
    "Portfolio",
  ],
  authors: [{ name: "Ayush Das" }],
  creator: "Ayush Das",
  publisher: "Ayush Das",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ayushdas.dev",
    title: "Ayush Das — Software Engineer",
    description: "I’m a product-minded software engineer building calm, scalable interfaces and AI-powered systems.",
    siteName: "Ayush Das Portfolio",
    images: [
      {
        url: "/assets/ayush-photo.png",
        width: 1200,
        height: 630,
        alt: "Ayush Das - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Das — Software Engineer",
    description: "I’m a product-minded software engineer building calm, scalable interfaces and AI-powered systems.",
    images: ["/assets/ayush-photo.png"],
    creator: "@iamayushdas",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d7ff65" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navigation />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <AiBot />
      </body>
    </html>
  );
}
