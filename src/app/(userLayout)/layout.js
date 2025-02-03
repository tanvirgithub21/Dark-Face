import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="max-w-screen-md mx-auto">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
