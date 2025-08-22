import "./globals.css";
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export const metadata = {
  title: "LTU Tabs Generator",
  description: "Generate HTML + JS Tabs code for Moodle LMS",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        <Header />
        <main style={{ padding: "20px" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
