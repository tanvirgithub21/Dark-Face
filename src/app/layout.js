import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Head>
      <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Watch and share exclusive videos of US, UK, and Canadian girls on Dark Face, the ultimate social media platform." />
        <meta name="keywords" content="social media, viral videos, US girls, UK girls, Canada girls, trending videos, short videos" />
        <meta property="og:title" content="Dark Face - Social Media for Exclusive Videos" />
        <meta property="og:description" content="Dark Face is a social media platform featuring trending videos from US, UK, and Canadian girls." />
        <meta property="og:image" content="https://dark-face.vercel.app/og-image.jpg" />
        <meta property="og:url" content="https://dark-face.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dark Face - Social Media for Exclusive Videos" />
        <meta name="twitter:description" content="Join Dark Face to watch and share trending videos from the US, UK, and Canada." />
        <meta name="twitter:image" content="https://dark-face.vercel.app/twitter-image.jpg" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
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
