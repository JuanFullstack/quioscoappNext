import Image from 'next/image'
import { formatearDinero } from '../helpers'
import LlamarContext from '../hooks/LlamarContext'

function Producto({producto} ) {

    const {handlesetproducto , handlesetmodal} = LlamarContext()

    const {nombre,imagen,precio} = producto


  return (
    <div className=' border p-3   '  >
        <Image
              src={`/assets/img/${imagen}.jpg`}
              width={500}
              height={600}
              alt={ `Imagen platillo${nombre}`}
              priority 
             
              
          />
        <div className='p-5'  >
          <h3 className=' text-2xl font-bold ' > {nombre}  </h3>
          <p className='mt-5 font-back text-4xl text-amber-500 ' >  
          {formatearDinero(precio)}
          </p>
        <button
        type='button'
        className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold '
        onClick={()=> {
            handlesetmodal()
            handlesetproducto(producto) }}
        >
         Agregar
        </button>

        </div>
    </div>
    

  )
}

export default Producto