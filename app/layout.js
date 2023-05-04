import '../styles/globals.scss'
import Header from '../components/Header';
import {ContextProvider} from '../components/Clients';


export const metadata = {
  title: 'Home',
  description: 'This a Fullsatck todo App Project',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      
      <body>
        <ContextProvider>
        <>
          <Header/>
          {children}
        </>
        </ContextProvider>
      </body>
    </html>
  )
}

export const server = "http://localhost:4000/api/v1"
