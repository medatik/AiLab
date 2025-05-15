import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "AI Lab - Powered by Gemini",
  description: "Experience the power of AI with our creative tools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <main className="min-h-screen lg:pl-64">
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
