import AdComponent from "@/components/AdComponent";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";

export const metadata = {
  title: "Dark Face - Social Media for Exclusive Videos",
  description:
    "Watch and share exclusive videos of US, UK, and Canadian girls on Dark Face, the ultimate social media platform.",
  keywords:
    "social media, viral videos, US girls, UK girls, Canada girls, trending videos, short videos",
  openGraph: {
    title: "Dark Face - Social Media for Exclusive Videos",
    description:
      "Dark Face is a social media platform featuring trending videos from US, UK, and Canadian girls.",
    url: "https://dark-face.vercel.app/",
    siteName: "Dark Face",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dark Face Social Media",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dark Face - Social Media for Exclusive Videos",
    description:
      "Join Dark Face to watch and share trending videos from the US, UK, and Canada.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon-16x16.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <div className="max-w-screen-md mx-auto">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
