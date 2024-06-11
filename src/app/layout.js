// import localFont from 'next/font/local';
import { Inter } from 'next/font/google'
import "./global.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export const metadata = {
  title: 'Soltopia Guide Panel',
  description: 'Soltopia Guide Panel Powered By Ideausher',
}
// const mfaCustom = localFont({ 
//   src: [{
//     path: '../../public/fonts/font.ttf',
//     weight:"500"
//   }],
//   variable: "--font-mfa"
// })
const inter =  Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={` ${inter.variable}`}>
      <body>{children}
      <ToastContainer/>
      </body>
    </html>
  )
}
