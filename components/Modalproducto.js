import  { useState, useEffect } from 'react';
import Image from "next/image"
import LlamarContext from "../hooks/LlamarContext"
import { formatearDinero } from "../helpers"


export default function Modalproducto() {

    const [ cantidad , setcantidad ]= useState(1)
    const [edicion , setedicion] =useState(false)

    const { producto , pedido , handlesetmodal , handleAgregarPedido} = LlamarContext()

    useEffect(() => {
        if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
          const productoEdicion = pedido.find(
            (pedidoState) => pedidoState.id === producto.id
          );
          setedicion(true)
          setcantidad(productoEdicion.cantidad);
        
        }
      }, [producto, pedido]);
      





  return (
      <div className='   md:flex     gap-10 '>
          <div className=' md:w-1/3 '>
              <Image
                  src={`/assets/img/${producto.imagen}.jpg`}
                  width={300}
                  height={500}
                  alt={`imagen producto ${producto.nombre}`}
                  priority 
              />
          </div>
          <div className=' md:w-2/3 '>
              <div className=' flex justify-end ' onClick={handlesetmodal}>
                  <button>
                      <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6    cursor-pointer '>
                          <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M6 18L18 6M6 6l12 12'
                          />
                      </svg>
                  </button>
              </div>
              <h1 className='text-3xl font-bold mt-5 '> {producto.nombre} </h1>
              <p className=' mt-5 font-black text-5xl text-amber-500 '>
                  {formatearDinero(producto.precio)}
              </p>
              <div  className='flex gap-4 mt-5' >
                  <button
                  type='button'
                  onClick={ ()=>{  
                    if(cantidad<=1 ) return
                    setcantidad (cantidad - 1)} }
                  >
                      <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-7 h-7'>
                          <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                      </svg>
                  </button>
                  <p className=' text-3xl '  > {cantidad} </p>
                  <button
                   type='button'
                   onClick={ ()=>{  
                    if(cantidad >=5 ) return
                    setcantidad (cantidad + 1)} }
                  >
                      <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-7 h-7'>
                          <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                      </svg>
                  </button>
              </div>
              <button
              type='button'
              className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 
              text-white font-bold   uppercase  rounded
              '
              onClick={() =>handleAgregarPedido( {...producto , cantidad })}
              
              >
               {edicion ? "Guardar cambios " : " Añadir al Pedido"}
              </button>



          </div>
      </div>
  );
}




