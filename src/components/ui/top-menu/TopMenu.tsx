'use client'
import { titleFont } from '@/config/fonts'
import { useUIStore } from '@/store'
import Link from 'next/link'
import React from 'react'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'

export const TopMenu = () => {
    const openSideMenu = useUIStore( state => state.openSideMenu );

    return (
        <nav className='flex px-5 justify-between items-center w-full'>
            {/* LOGO */}
            <div>
                <Link
                    href="/">
                        <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
                        <span> | Shop</span>
                </Link>
            </div>

            {/* CENTER MENU */}
            <div className='hidden sm:block'>
                <Link href="/gender/men" className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>Hombres</Link>
                <Link href="/gender/women" className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>Mujeres</Link>
                <Link href="/gender/kid" className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>Niños</Link>
            </div>

            {/* SEARCH, CAR, MENU */}
            <div className='flex items-center'>
                <Link href="/search" className='mx-2'>
                    <IoSearchOutline className='h-5 w-5'/>
                </Link>
                <Link href="/cart" className='mx-2'>
                    <div className='relative'>
                        <span className='absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white'>
                            3
                        </span>
                        <IoCartOutline className='h-5 w-5'/>
                    </div>
                </Link>
                <button
                type='button'
                onClick={openSideMenu}
                    className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>
                    Menù
                </button>
            </div>
        </nav>
    )
}
