import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jhnllydsmsn.vercel.app"),
  title: "Jhon Lloyd Samson | Portfolio",
  description: "Full-Stack Developer & QA Engineer — Maritime Licensing System, Cypress Automation, Next.js.",
  openGraph: {
    title: "Jhon Lloyd Samson | Portfolio",
    description: "Full-Stack Developer & QA Engineer based in Davao del Norte.",
    images: ["/images/profile/avatar.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
