import "./globals.css";
import PageAnimatePresence from "./components/PageAnimatePresence";

export const metadata = {
  title: "RISEMATE VENTURE | One Vision. Four Empires.",
  description: "A premium conglomerate merging Bworth, VegaVrudhi, RYM, and Synchronous Digital Build under the RISEMATE banner.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Outfit:wght@100..900&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning={true} className="bg-white text-dark font-secondary overflow-x-hidden selection:bg-blue-600 selection:text-white antialiased">
        <PageAnimatePresence>
          {children}
        </PageAnimatePresence>
      </body>
    </html>
  );
}


