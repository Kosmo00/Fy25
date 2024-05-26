'use client'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image';

function UploadImage({ setImage, dontShowTopLabel, image }) {

    const [imageUrl, setImageUrl] = useState(image)

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        maxSize: 1024 * 1024, // 1mb
        onDropAccepted(files, event) {
            setImageUrl(URL.createObjectURL(files[0]));
            setImage(files[0])
        },
    });
    return (
        <div className="form-control w-full">
            <label className='label' htmlFor='profile_image' hidden={dontShowTopLabel}>Foto de perfil<sup>*</sup></label>
            <div
                {...getRootProps({ className: 'dropzone' })}
                htmlFor="profile_image"
                className="w-50 h-40 bg-white text-center flex items-center justify-center rounded-xl cursor-pointer border-4 border-dashed border-black ml-[-5px] sm:ml-0 mb-1 overflow-hidden"
            >
                {!imageUrl ?
                    <p className='text-xl underline decoration-dashed'>Agregar Imagen</p> :
                    <Image src={imageUrl} alt='No es una imagen' width={250} height={220} />
                }
                <input {...getInputProps()} />
            </div>
        </div>
    )
}

export default UploadImage