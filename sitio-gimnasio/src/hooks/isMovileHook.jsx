'use client'

import React, {useEffect, useState} from 'react'

const MOVILE_BREAKPOINT = 768

function isMovileHook(callback) {
    useEffect(() => {
        const handleResize = () => {
            callback(window.innerWidth <= MOVILE_BREAKPOINT)
        };
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);
}

export default isMovileHook