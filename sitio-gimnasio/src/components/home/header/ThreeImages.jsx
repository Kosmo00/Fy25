'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import isMovileHook from '@/hooks/isMovileHook'

const MIN_IMAGE_SIZE = 1.6
const MAX_IMAGE_SIZE = 1

function ThreeImages() {

    const [imageScale, setImageScale] = useState(MAX_IMAGE_SIZE)

    isMovileHook(isMovile => {
        setImageScale(isMovile ? MIN_IMAGE_SIZE : MAX_IMAGE_SIZE)
    })

    const images = ['/gym2.png', '/gym.jpeg', '/gym3.jpeg']
    const imageWidth1 = 250 / imageScale
    const imageHeight1 = 300 / imageScale
    const imageWidth2 = 350 / imageScale
    const imageHeight2 = 200 / imageScale
    const imageWidth3 = 240 / imageScale
    const imageHeight3 = 160 / imageScale
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