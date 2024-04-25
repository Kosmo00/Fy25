"use client"
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Loading from './Loading';

const CarouselComponent = ({ images }) => {
    const [show, setShow] = useState(false)
    const swiperRef = useRef(null)
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setShow(!show)
    }
    const handlePrev = () => {
        swiperRef.current.swiper.slidePrev()
    };

    const handleNext = () => {
        swiperRef.current.swiper.slideNext()
    };
    return (
        <Swiper
            ref={swiperRef}
            spaceBetween={'15vw'}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            }}
            className="rounded-[12px] w-[80%] h-[90vh] mx-auto"
            onClick={handleClick}
        >


            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <div className="w-full h-full overflow-hidden rounded-[12px] flex justify-center items-center">
                        {loading? <Loading />:
                        <Image
                            src={image.src}
                            alt={`slide-${index}`}
                            // onLoadedData={() => setLoading(false)}
                            onLoad={()=> setLoading(false)}
                            onLoadStart={() => setLoading(true)}
                            priority
                            className="w-full h-full rounded-[12px] object-cover"
                            width={500}
                            height={500} />}
                        {show && <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
                            <p className="text-white text-xl text-center">{image.txt}</p>
                        </div>}
                    </div>
                </SwiperSlide>
            ))}
            {images.length > 1 && <div>
                <div className="swiper-button-prev text-white" onClick={handlePrev}></div>
                <div className="swiper-button-next text-white" onClick={handleNext}></div>
            </div>

            }
        </Swiper >
    );
};

export default CarouselComponent;