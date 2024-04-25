'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

function Carousel() {
    const carouselImages = ['/wasoski.jpg', '/foto2.jpeg', '/foto3.jpg', '/foto4.jpeg']
    const [actualImage, setActualImage] = useState(0)

    useEffect(() => {
        const intervalo = setInterval(() => {
            setActualImage((actualImage) => (actualImage + 1) % carouselImages.length);
        }, 30000);
        return () => clearInterval(intervalo);
      }, []);
        

    return (
        <div className="w-full h-screen relative">
            <div className="h-screen w-full absolute top-0 left-0 z-0 bg-white p-10">
                <Image
                    className='m-auto'
                    src={carouselImages[actualImage]} 
                    width={700}
                    height={700}
                    alt='Imagen no cargada'
                />
            </div>
        </div>
    )
}

export default Carousel