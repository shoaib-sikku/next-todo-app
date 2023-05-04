import React from 'react'
import Link from 'next/link'
import {LogoutBtn} from './Clients'

const Header = () => {
  return (
    <header>
        <div className='logo'>
            <Link href={'/'}>TODO.</Link>
        </div>
        <nav>
            <Link href='/'>HOME</Link>
            <Link href='/about'>ABOUT</Link>
            <LogoutBtn/>
        </nav>
    </header>
  )
}

export default Header
