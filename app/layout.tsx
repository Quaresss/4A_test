import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat, Raleway } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin", "cyrillic"],
  weight: ["700"],
  display: "swap",
});

const gilroyMedium = localFont({
  src: "../node_modules/@qpokychuk/gilroy/src/Gilroy-Medium.woff",
  variable: "--font-gilroy-medium",
  weight: "500",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Тарифы",
  description: "Выбор тарифа",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${montserrat.variable} ${raleway.variable} ${gilroyMedium.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
