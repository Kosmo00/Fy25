import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "F y 25",
  description: "Gimnasio y spinning",
  charset: "UTF-8",
};


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <body className={inter.className}>
        <Navbar />
        <ToastContainer/>
        <div className="main-container">
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
