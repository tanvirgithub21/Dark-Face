import MobileNavbar from "@/components/MobileNavbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
          <MobileNavbar />
          {children}
        </div>
      </body>
    </html>
  );
}
