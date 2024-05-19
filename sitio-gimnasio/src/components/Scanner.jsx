import { Scanner } from '@yudiel/react-qr-scanner';
import React, { useState } from 'react';

const QrScanner = () => {

    const [state, setState] = useState(null);
    const handleScanDone = (text, result) => {
        console.log(state === "m" ? "Musculatura" : "Spinning" + text, result)
        setState(null)
    }
    return (
        <div className='w-full h-full flex justify-between'>
            <button className='bg-black rounded-md p-3 text-white'
                onClick={() => setState(state ? null : "M")}
            >
                Musculacion
            </button>
            <button className=' bg-black rounded-md p-3 text-white'
                onClick={() => setState(state ? null : "S")}
            >
                Spinning
            </button>
            {
                state &&
                <div className='absolute top-[10%] left-[30%] w-[40%]'>
                    <Scanner
                        onResult={handleScanDone}
                        onError={(error) => console.log(error?.message)}
                    />
                </div>
            }
        </div>
    );
}
export default QrScanner