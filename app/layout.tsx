import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jayel.vercel.app"),
  title: "Jhon Lloyd Samson | Portfolio",
  description:
    "Software Developer & QA Engineer — Maritime Licensing System, Cypress Automation, Full-Stack Web Development.",
  openGraph: {
    title: "Jhon Lloyd Samson | Portfolio",
    description: "Software Developer & QA Engineer based in Davao del Norte.",
    images: ["/images/profile/avatar.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
