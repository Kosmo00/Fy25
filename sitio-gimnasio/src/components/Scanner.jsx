"use client"
import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

const QrScannerComponent = () => {

  const [state, setState] = useState(null);
  const videoRef = useRef(null);
  const [result, setResult] = useState('');

  function onResult(data) {
    setResult(data);
    setState(null);
  }

  useEffect(() => {
    if (state) {
      if(!navigator.mediaDevices?.getUserMedia){
        throw new Error("No soporta camaras")
      }
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => onResult(console.log(result)),
        {
          returnDetailedScanResult: true,
          onDecodeError: (error) => console.error(error),
          maxScansPerSecond: 1,
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: "user"
        }
      );
      const checkCameraPermission = async () => {
  
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: {
            facingMode: 'environment'
          } });
          console.log(stream)
          stream.getTracks().forEach(track => track.stop());
          qrScanner.start();
        } catch (err) {
          setError('Camera permission denied or not available');
          console.error(err);
        }
      };

      checkCameraPermission();
      qrScanner.start();

      return () => {
        qrScanner.stop();
      };
    }
  }, [state]);
  return (
    <div className='w-full h-full flex justify-between'>
      <button className='bg-black rounded-md p-3 text-white'
        onClick={() => setState(state ? null : "M")}
      >
        Musculacion
      </button>
      <p className='text-4xl text-[red]' hidden={result.length === 0}>{result}</p>
      <button className=' bg-black rounded-md p-3 text-white'
        onClick={() => setState(state ? null : "S")}
      >
        Spinning
      </button>
      {
        state &&
        <div className='absolute top-[10%] left-[30%] w-[40%]'>
          <div className='bg-[green]'>
            <h1>QR Scanner</h1>
            <video ref={videoRef} style={{ width: '100%' }}></video>
          </div>
        </div>
      }
    </div>
  );
  // const [val, setVal] = useState('');

  // const handleRead = (code) => {
  //   setVal(code.data);
  // };

  // return (
  //   <>
  //     <QrCodeReader delay={100} width={500} height={500} onRead={handleRead} />
  //     <p>{val}</p>
  //   </>
  // );
}
export default QrScannerComponent
