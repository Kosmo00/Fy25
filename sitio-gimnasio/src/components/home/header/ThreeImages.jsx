'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const MIN_IMAGE_SIZE = 1.5
const MAX_IMAGE_SIZE = 1
const MOVILE_BREAKPOINT = 768

function ThreeImages() {

    const [imageScale, setImageScale] = useState(MAX_IMAGE_SIZE)

    useEffect(() => {
        const handleResize = () => {
          setImageScale(window.innerWidth < MOVILE_BREAKPOINT ? MIN_IMAGE_SIZE : MAX_IMAGE_SIZE)
        };
    
        window.addEventListener('resize', handleResize);
    
        // Set the initial screen size
        handleResize();
    
        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    const images = ['/gym2.png', '/gym.jpeg', '/gym3.jpeg']
    const imageWidth1 = 200 / imageScale
    const imageHeight1 = 250 / imageScale
    const imageWidth2 = 300 / imageScale
    const imageHeight2 = 150 / imageScale
    const imageWidth3 = 220 / imageScale
    const imageHeight3 = 140 / imageScale
    return (
        <>
            <Image 
                src={images[0]}
                alt="Imagen no cargada"
                height={imageHeight1}
                width={imageWidth1}
                style={{height: `${imageHeight1}px`, transform: 'rotateY(180deg)'}}
                className='rounded-xl'
            />
            <Image 
                src={images[1]}
                alt="Imagen no cargada"
                height={imageHeight2}
                width={imageWidth2}
                style={{
                        marginTop:`-${(imageScale === MAX_IMAGE_SIZE ? 80 : 60)}px`, 
                        marginLeft: `${(imageWidth1 - (imageScale === MAX_IMAGE_SIZE ? 50 : 35))}px`, 
                        height: `${ imageHeight2 }px`, transform: 'rotateY(360deg)'
                       }}
                className='rounded-xl'
            />
            <Image 
                src={images[2]}
                alt="Imagen no cargada"
                height={imageHeight3}
                width={imageWidth3}
                style={{
                        marginTop:`-${(imageHeight2 + imageHeight3 + 10)}px`, 
                        marginLeft: `${ (imageWidth1 + 10)}px`, 
                        height: `${ imageHeight3 }px`}}
                className='rounded-xl'
            />
        </>
    )
}

export default ThreeImages