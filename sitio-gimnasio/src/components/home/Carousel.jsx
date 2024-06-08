"use client"
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/swiper-bundle.css';
import 'swiper/css/effect-fade';
import Loading from '../Loading';
import isMovileHook from '@/hooks/isMovileHook';

SwiperCore.use([Autoplay]);

const SLIDES_IN_DESKTOP = 4
const SLIDES_IN_MOVILE = 2

const CarouselComponent = ({ images, autoplayDelay, reverseDirection = false }) => {
    const [show, setShow] = useState(false)
    const [numberOfSlides, setNumberOfSlides] = useState(SLIDES_IN_DESKTOP)
    const swiperRef = useRef(null)
    const [loading, setLoading] = useState(false);

    isMovileHook(isMovile => {
        setNumberOfSlides(isMovile ? SLIDES_IN_MOVILE : SLIDES_IN_DESKTOP)
    })
    return (
        <Swiper
            loop={true}
            ref={swiperRef}
            slidesPerView={numberOfSlides}
            speed={1000}
            autoplay={{
                delay: autoplayDelay,
                pauseOnMouseEnter: false,
                disableOnInteraction: false,
                stopOnLastSlide: false,
                reverseDirection: reverseDirection
            }}
            pagination={{ clickable: true }}
            
            className="h-[200px] md:h-[250px] lg:h-[300px] mx-auto"
        >


            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <div className="w-full h-full overflow-hidden flex justify-center items-center">
                        {loading? <Loading />:
                        <Image
                            src={image.src}
                            alt={`slide-${index}`}
                            onLoad={()=> setLoading(false)}
                            onLoadStart={() => setLoading(true)}
                            priority
                            className="w-full h-full object-cover m-auto"
                            width={500}
                            height={500} />}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper >
    );
};

export default CarouselComponent;