import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import ReduxProvider from "@/redux/reduxProvider";

export const metadata = {
  title: "Ecommerce App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ToastProvider />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
