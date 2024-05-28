'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import isMovileHook from '@/hooks/isMovileHook'

function Services() {
    return (
        <>
            <Opt3 />
            <Opt1 />
        </>
    )
}

function Opt1() {
    const text = ' Cycling - Perder peso - Ganar músculo - Tonificar - Fortalecimiento -'

    const [isMovile, setIsMovile] = useState(false)
    const [currentString, setCurrentString] = useState(text.substring(0, text.length))
    let actualPos = text.length

    isMovileHook(isActuallyMovile => setIsMovile(isActuallyMovile))

    useEffect(() => {
        const intervalo = setInterval(() => {
            let absolutePos = actualPos % text.length
            setCurrentString(currentString => currentString.substring(1) + text[absolutePos])
            actualPos++
        }, 250);
        return () => clearInterval(intervalo);
      }, []);

    return (
        <>
            <div 
                className='flex justify-center items-center bg-[#404040] text-white text-xl lg:text-2xl lg:p-7 p-4'
                style={{ whiteSpace: 'nowrap', overflowX: 'hidden'}}
            >
                {isMovile ? currentString : text.substring(0, text.length - 1)}
            </div>
        </>
    )
}

function Opt2() {
    return (
        <div className='bg-black py-4 px-8'>
            <div className='border-white border rounded-3xl overflow-hidden'>
                <div 
                    className='flex justify-center items-center bg-gray-200'
                    style={{height: '50px'}}
                >
                    <p className='font-bold text-2xl'>
                        ÁREAS
                    </p>
                </div>
                <div className='grid lg:grid-cols-2 grid-cols-1'>
                    <div className='bg-black flex justify-center items-center' style={{height: '150px'}}>
                        <p className='text-white text-2xl'>
                            SPINNING
                        </p>
                    </div>
                    <div className='flex justify-center items-center bg-green-100' style={{height: '150px'}}>
                        <p className='text-2xl'>
                            MUSCULATURA
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Opt3() {
    return (
        <div className='principal-bg py-10 grid lg:grid-cols-2 grid-cols-1'>
            <div>
                <Image 
                    className='bg-green-500 lg:ml-[25vw] home-area-card lg:mb-[220px] mx-auto rounded-lg' 
                    src='/foto12.jpeg'
                    width={450}
                    height={150}
                    alt='foto12'
                />
                <Image 
                    className='bg-green-500 lg:ml-[25vw] home-area-card mt-7 mx-auto rounded-lg'
                    src='/foto11.jpeg'
                    width={450}
                    height={150}
                    alt='foto11'    
                />
            </div>
            <div>
                <Image className='bg-green-500 lg:mt-[185px] lg:ml-[-10vh] home-area-card mt-7 mx-auto rounded-lg' 
                    src='/foto13.jpg'
                    width={450}
                    height={150}
                    alt='foto13'  
                />
                <Image 
                    className='bg-green-500 lg:mt-[220px] lg:ml-[-10vh] home-area-card mt-7 mx-auto rounded-lg'
                    src='/foto10.jpeg'
                    width={450}
                    height={150}
                    alt='foto10' 
                />
            </div>
        </div>
    )
}


export default Services