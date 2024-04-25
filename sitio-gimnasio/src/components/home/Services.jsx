'use client'

import React, { useState, useEffect } from 'react'

function Services() {
    return (
        <>
            <Opt2 />
            <Opt1 />
        </>
    )
}

const MOVILE_BREAKPOINT = 768

function Opt1() {
    const text = ' Cycling - Perder peso - Ganar músculo - Tonificar - Fortalecimiento -'

    const [isMovile, setIsMovile] = useState(false)
    const [currentString, setCurrentString] = useState(text.substring(0, text.length))
    let actualPos = text.length

    useEffect(() => {
        const handleResize = () => {
            setIsMovile(window.innerWidth < MOVILE_BREAKPOINT)
        };
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

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
                className='flex justify-center items-center bg-black text-white text-2xl'
                style={{ height: '90px', whiteSpace: 'nowrap', overflowX: 'hidden'}}
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


export default Services