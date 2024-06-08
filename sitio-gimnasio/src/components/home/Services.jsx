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
                style={{ whiteSpace: 'nowrap', overflowX: 'hidden' }}
            >
                {isMovile ? currentString : text.substring(0, text.length - 1)}
            </div>
        </>
    )
}

function Opt3() {
    return (
        <div className='principal-bg py-5 flex flex-col items-center'>
            <div className='flex my-5'>
                <div className='w-[45vw] h-[200px] relative'>
                    <div className="absolute inset-0 z-5 bg-black/70 hover:bg-black/95 transition duration-300 ease-out rounded-lg flex justify-center items-center">
                        <p className='text-xl sm:text-2xl font-bold text-white'>
                            SPINNING
                        </p>
                    </div>
                    <Image
                        className='mx-auto rounded-lg'
                        style={styles.imgFluid}
                        src='/foto12.jpeg'
                        width={450}
                        height={150}
                        alt='foto12'
                    />
                </div>
                <div className='w-[35vw] h-[200px] flex items-center justify-start'>
                    <p className='ml-5 text-xl font-medium text-white'>
                        Zona de bicicletas estáticas,
                        complementa tu rutina con
                        un ejercicio dinámico
                    </p>

                </div>
            </div>
            <div className='flex my-5'>
                <div className='w-[35vw] h-[200px] flex items-center justify-end'>
                    <p className='mr-5 text-xl font-medium text-white'>
                        La zona perfecta para
                        desarrollar tus músculos
                    </p>
                </div>
                <div className='w-[45vw] h-[200px] relative'>
                    <div className="absolute inset-0 z-5 bg-black/70 hover:bg-black/95 transition duration-300 ease-out flex justify-center items-center rounded-lg">
                        <p className='text-xl sm:text-2xl font-bold text-white'>
                            MUSCULACIÓN
                        </p>
                    </div>
                    <Image
                        className='mx-auto rounded-lg'
                        style={styles.imgFluid}
                        src='/foto13.jpg'
                        width={450}
                        height={150}
                        alt='foto11'
                    />
                </div>
            </div>
            <div className='flex my-5'>
                <div className='w-[45vw] h-[200px] relative'>
                    <div className="absolute inset-0 z-5 bg-black/70 hover:bg-black/95 transition duration-300 ease-out rounded-lg flex justify-center items-center">
                        <p className='text-xl sm:text-2xl font-bold text-white'>
                            ACTIVIDADES
                        </p>
                    </div>
                    <Image
                        className=' mx-auto rounded-lg'
                        style={styles.imgFluid}
                        src='/foto11.jpeg'
                        width={450}
                        height={150}
                        alt='foto13'
                    />
                </div>
                <div className='w-[35vw] h-[200px] flex items-center justify-end'>
                    <p className='ml-5 text-xl font-medium text-white'>
                        Participamos en eventos
                        de diversas modalidades.
                        Maratones, ciclismo y mucho más
                    </p>
                </div>

            </div>
            <div className='flex my-5'>
                <div className='w-[35vw] h-[200px] flex items-center justify-end'>
                    <p className='mr-5 text-xl font-medium text-white'>
                        Actividades al aire libre,
                        ejercicio en un entorno diferente
                    </p>
                </div>
                <div className='w-[45vw] h-[200px] relative'>
                    <div className="absolute inset-0 z-5 bg-black/70 hover:bg-black/95 transition duration-300 ease-out rounded-lg flex justify-center items-center">
                        <p className='text-xl sm:text-2xl font-bold text-white'>
                            OUTDOOR
                        </p>
                    </div>
                    <Image
                        className=' mx-auto rounded-lg'
                        style={styles.imgFluid}
                        src='/foto10.jpeg'
                        width={450}
                        height={150}
                        alt='foto10'
                    />
                </div>

            </div>
        </div>
    )
}


export default Services

export const styles = {
    imgFluid: {
        width: "100%",
        height: "100%",
        borderRadius: 12,
        objectFit: 'cover'
    }
}