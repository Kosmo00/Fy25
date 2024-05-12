import React from 'react';

function UserProfile() {
  return (
    <div className='absolute bg-[#16161d] top-0 w-full h-full flex flex-col md:flex-row'>
      <div className='w-full md:w-1/2 h-full flex flex-col justify-center items-center md:overflow-y-auto pt-20'>
        <div className='w-[70%]'>
          <div className='flex flex-col md:flex-row justify-start items-start text-white'>
            <img src="/wasoski.jpg" alt="user" className='rounded-lg border-dashed border-[5px]' />
            <div id="text" className='mt-5 md:mt-0 ml-5 text-[24px] font-bold' >
              <p id="name" className='my-2'>Name</p>
              <p id="lastname" className='my-2'>Lastname</p>
              <p id="second_lastname" className='my-2'>Lastname</p>
              <br />
            </div>
          </div>
          <div id="inputs" className='md:pt-10 pt-0'>
            <input type="email" name="email" id="email" value="nombreapellido@gmail.com" className='form-control rounded w-full my-3 py-2 px-3' />
            <input type="tel" name="phone" id="phone" value="+53 56425509" className='form-control rounded w-full my-3 py-2 px-3' />
            <input type="text" name="text" id="text" value="555676245A" className='form-control rounded w-full my-3 py-2 px-3' />
            <div className='flex justify-between items-center'>
              <p className='text-white'>
                Fecha de nacimiento
              </p>
              <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" className='form-control rounded w-full my-3 py-2 px-3' />
            </div>
            <button type="button" className='rounded w-full my-3 py-2 text-black bg-white' >
              Cambiar contraseña
            </button>
          </div>
        </div>
      </div>
      <div id="QR" className='bg-[#d5ebd4] w-full md:w-1/2 h-full rounded-t-[20px] flex flex-col justify-center items-center'>
        <div className='flex-col border-[5px] border-[black] mt-20'>
          <div className='w-[50%] h-[7px] bg-[#d5ebd4] mx-auto mt-[-6px]'></div>
          <div className='flex'>
            <div className='h-[120px] my-auto w-[7px] bg-[#d5ebd4] ml-[-6px]'></div>
            <img src="/qr.jpg" alt="user_qr" className='p-5' />
            <div className='h-[120px] my-auto w-[7px] bg-[#d5ebd4] mr-[-6px]'></div>

          </div>
          <div className='w-[50%] h-[7px] bg-[#d5ebd4] mx-auto mb-[-6px]'></div>

        </div>
        <div className='flex mt-10 w-[45%]'>
          <div className='bg-[white] h-[5px] w-[75%]'></div>
          <div className='bg-[black] h-[5px] w-[25%]'></div>
        </div>
        <p className='mt-10 text-[24px] font-bold'>
          TU CODIGO QR
        </p>
        <p className='mx-auto text-center w-[60%]'>
          Muéstralo en recepción para acceder al gimnasio
          y realizar los pagos correspondientes.
        </p>
        <button type='button' className='bg-white p-3 mt-5 rounded mb-10'>Consigue aquí tu descuénto como referido</button>
      </div>
    </div>
  );
}

export default UserProfile;
