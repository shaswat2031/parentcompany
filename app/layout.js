import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "RISEMATE VENTURE | One Vision. Four Empires.",
  description: "A premium conglomerate merging Bworth, VegaVrudhi, RYM, and Synchronous Digital Build under the RISEMATE banner.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=DM+Sans:ital,wght@0,100..1000;1,100..1000&family=Bebas+Neue&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning={true} className="bg-[#080808] text-[#F5F5F0] antialiased selection:bg-[#C9A84C] selection:text-[#080808]">
        {children}
      </body>
    </html>
  );
}
