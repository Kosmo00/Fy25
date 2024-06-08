'use client'
import React, { useState } from 'react'
import RestApiClient from '@/utils/rest_api_client'
import { ApiEndpoint } from '@/utils/rest_api_config'
import { useRouter } from 'next/navigation'

function useQueryHook(route){
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  async function handleQuery(data){
    if(loading){
      return 
    }
    setLoading(true)
    try{
      await RestApiClient.post(route, data)
    }
    catch(err){
      console.log(err)
    }
    setLoading(false)
    router.refresh();
  }

  return [loading, handleQuery]
}

function AthleteOptions({role, user}){
  if(role === 'athlete'){
    const [amount, setAmount] = useState('')

    const [spinningAssistanceLoading, spinningPaymentHandleQuery] = useQueryHook(ApiEndpoint.athlete_assistance)
    function handleSpinningPayment(){
      spinningPaymentHandleQuery({userId: user.id, serviceName: 'Spinning'})
    }
  
    const [muscleAssistanceLoading, musclePaymentHandleQuery] = useQueryHook(ApiEndpoint.athlete_assistance)
    function handleMusclePayment(){
      musclePaymentHandleQuery({userId: user.id, serviceName: 'Muscle'})
    }
  
    const [rechargeLoading, rechargeHandleQuery] = useQueryHook(ApiEndpoint.athlete_recharge)
    function handleRecharge(){
      const actualAmount = amount.length === 0 ? 0 : parseInt(amount)
      rechargeHandleQuery({userId: user.id, amount: actualAmount})
    }

    function handleAmountChange(ev){
      if(ev.target.value === '' || /^\d+$/.test(ev.target.value)){
        setAmount(ev.target.value)
      }
    }
    return (
      <>
        <div className='block'>
          <label className='text-2xl'>Saldo a agregar</label><br />
          <input 
          type='text' 
          className='mt-3 text-black text-xl p-2 bg-white rounded-md w-[320px] sm:w-[350px] border-2 border-black'
          onChange={handleAmountChange}
          value={amount}
          />
           <button className='text-xl block w-[320px] sm:w-[350px] bg-green-500 hover:bg-green-700 text-white py-2 rounded-lg text-center mt-5'
            onClick={handleRecharge}
           >
            {
              rechargeLoading && ('Enviando...')
            }
            {
              !rechargeLoading && ('Agregar saldo')
            }  
          </button>
        </div>
        <button 
          className='text-xl block w-[320px] sm:w-[350px] bg-neutral-800 hover:bg-neutral-900 text-white py-2 rounded-lg text-center mt-5'
          onClick={handleSpinningPayment}
        >
          {
            spinningAssistanceLoading && ('Enviando...')
          }
          {
            !spinningAssistanceLoading && ('Asistencia spinning')
          }

        </button>
        <button 
          className='text-xl block w-[320px] sm:w-[350px] bg-neutral-800 hover:bg-neutral-900 text-white py-2 rounded-lg text-center mt-5'
          onClick={handleMusclePayment}
        >
          {
            muscleAssistanceLoading && ('Enviando...')
          }
          {
            !muscleAssistanceLoading && ('Asistencia musculatura')
          }  
        </button>
      </>
    )
  }
}

function TrainerRole({role, user}){
  if(role === 'trainer'){
    const [trainerPaymentLoading, trainerPaymentHandleQuery] = useQueryHook(ApiEndpoint.trainer_payment)
    function handleTrainerPayment(){
      trainerPaymentHandleQuery({userId: user.id})
    }
    return (
      <>
        <button 
          className='text-xl block w-[320px] sm:w-[350px] bg-neutral-800 hover:bg-neutral-900 text-white py-2 rounded-lg text-center'
          onClick={handleTrainerPayment}
        >
        {
            trainerPaymentLoading && ('Enviando...')
          }
          {
            !trainerPaymentLoading && ('Realizar pago')
          }  
        </button>
      </>
    )
  }
}

function ActionsOverUsers({role, user}) {
  return (
    <div>
      <div className='pt-10 flex items-center flex-col'>
        <h3 className='text-3xl font-bold'>Acciones sobre el usuario</h3>
        <div className='mt-20'></div>
        <AthleteOptions role={role} user={user} />
        <TrainerRole role={role} user={user} />
        <button className='text-xl block w-[320px] sm:w-[350px] bg-red-500 hover:bg-red-700 text-white py-2 rounded-lg text-center mt-5'>Eliminar</button>
      </div>
   </div>
  )
}

export default ActionsOverUsers