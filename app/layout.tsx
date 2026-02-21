import '@/app/ui/global.css';
import Navbar from '@/app/ui/navbar';
import Footer from '@/app/ui/footer';



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}