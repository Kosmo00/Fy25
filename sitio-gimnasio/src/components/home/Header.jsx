import React from 'react'
import ThreeImages from './header/ThreeImages'

function Header() {
    return (
        <div 
            className='grid lg:grid-cols-2 grid-cols-1' 
            style={{height: 'calc(25vh + 450px)', marginTop: '150px', overflowX: 'hidden'}}
        >
            <div className='mx-auto'>
                <div>
                    <h1 className='text-4xl home-section-header'>
                        Tu espacio F<sub className='text-2xl ml-[-7px] mr-1'>y</sub>25 
                    </h1>
                    <p className='ml-3 mt-3 text-2xl break-words home-section-header'>
                        Más que un gimnasio, <br /> una familia
                    </p>
                    <div className='mt-5 lg:mt-0 lg:hidden'>
                        <ThreeImages />
                    </div>
                    <button 
                        className="bg-neutral-800 hover:bg-neutral-950 text-white font-bold py-3 px-5 rounded-lg font-light start-button text-lg" 
                    >
                        Comienza aquí
                    </button>
                </div>
            </div>
            <div className='mt-5 lg:mt-0 lg:block hidden'>
                <ThreeImages />
            </div>
        </div>
    )
}

export default Header