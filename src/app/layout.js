// import localFont from 'next/font/local';
import { Inter } from 'next/font/google'
import "./global.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export const metadata = {
  title: 'Soltopiah Admin Panel',
  description: 'Soltopiah Admin Panel Powered By Ideausher',
  // icons: {
  //   icon: "favicon.ico",
  // }
}


const inter =  Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={` ${inter.variable}`}>
      <head>
        <link rel="icon"  type="image/x-icon" href="/favicon.ico" /> 
      </head>
      <body>{children}
      <ToastContainer/>
      </body>
    </html>
  )
}
