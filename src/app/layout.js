import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Dark Face - Social Media for Exclusive Videos</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Dark Face - A social media platform to watch and share trending videos and photos from Europe and America."
        />
        <meta
          name="keywords"
          content="social media, viral videos, Europe, America, trending videos, short videos, exclusive content"
        />
        <meta property="og:title" content="Dark Face - Social Media for Exclusive Videos" />
        <meta
          property="og:description"
          content="Dark Face is a social media platform featuring trending videos and photos from Europe and America."
        />
        <meta property="og:image" content="/darkface-preview.png" />
        <meta property="og:url" content="https://dark-face.vercel.app/" />
        <link rel="shortcut icon" href="/favicon-16x16.png" type="image/x-icon" />
        <link rel="icon" href="/favicon-16x16.png" type="image/x-icon" />
      </Head>

      <body>
        <ClerkProvider>
          <div className="max-w-screen-md bg-gray-900 dark:bg-gray-900 mx-auto flex justify-between">
            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
