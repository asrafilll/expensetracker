import { Title } from "@/components/Home/Title";
import "@/styles/globals.css";

export const metadata = {
  title: "Daily Expense Tracker",
  description: "Simple Expense Tracker and Calculator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="lg:h-screen flex flex-col lg:flex-row">
        <aside className="lg:h-screen lg:w-1/2">
          <Title />
        </aside>
        <section className="lg:h-screen lg:overflow-y-auto lg:w-1/2">
          {children}
        </section>
      </body>
    </html>
  );
}
