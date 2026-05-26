import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Chandra Kiran Narala | FPGA Engineer',
  description:
    'Portfolio of Chandra Kiran Narala — FPGA Engineer, RTL Design, Low-Latency Systems, and ASIC/SoC Design.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      {/*
        Anti-flash script: runs before React hydration.
        Reads localStorage and sets the correct theme class immediately
        so there's no flicker on page load. Default is dark mode.
      */}
      <head>
        <link rel="icon" href="/favicon-v2.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                  }
                  // Default (no stored pref) = dark, so no class needed
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}