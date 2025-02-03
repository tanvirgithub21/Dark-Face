import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
