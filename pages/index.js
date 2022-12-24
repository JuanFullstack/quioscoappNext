import Head from 'next/head'
import Image from 'next/image'
import Layout from '../layout/Layout'
import LlamarContext from "../hooks/LlamarContext"
import Producto from '../components/Producto'



 function Home() {

 
  const { categoriaActual } = LlamarContext()



  return (
    <>
    <Layout  title={`Menu ${categoriaActual?.nombre}`} >
    <h1 className=' text-4xl font-extrabold uppercase  '> {categoriaActual?.nombre} </h1>
    <p className='text-2xl my-10'  > Elije y personaliza tu pedido </p>
    <div className='grid gap-4 grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 h-screen overflow-y-scroll' >
    {categoriaActual?.productos?.map( producto=>(
            <Producto
            key={producto.id}
            producto = {producto}
            />
          ))}
    </div>

    </Layout>
    </>
  )
}


import React from 'react'

function index() {
  return (
    <div>index</div>
  )
}

export default Home


