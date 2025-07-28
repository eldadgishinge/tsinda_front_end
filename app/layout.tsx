import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import { ToastProvider } from "@/providers/toast-provider";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins"
});

export const viewport: Viewport = {
  themeColor: "#1045A1",
};

export const metadata: Metadata = {
  title: "Tsindacyane - Your Journey to Safe Driving",
  description: "Learn driving theory anytime, anywhere with Tsindacyane.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <QueryProvider>
          {children}
          <ToastProvider />
        </QueryProvider>
      </body>
    </html>
  );
}
