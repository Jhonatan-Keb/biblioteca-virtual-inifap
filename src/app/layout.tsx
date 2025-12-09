import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
// Asegúrate de que estas rutas existan (ver nota abajo)
import { Header } from "@/components/gob/Header";
import { Footer } from "@/components/gob/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Biblioteca Virtual INIFAP",
  description: "Publicaciones técnicas y científicas del INIFAP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${openSans.variable} font-sans antialiased bg-gray-50 flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}