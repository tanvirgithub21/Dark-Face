import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children, modal }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="max-w-screen-md bg-white dark:bg-gray-900 lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto flex justify-between">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
