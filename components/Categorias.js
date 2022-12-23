
import Image from 'next/image'
import LlamarContext from "../hooks/LlamarContext"

function Categorias(  {categorias } ) {

  
  const { categoriaActual , handleClickCategoria } = LlamarContext()

   const {nombre,icono,id} = categorias

  

  return (
      <div
          className={`${
              categoriaActual?.id === id ? 'bg-amber-400' : ''
          }  flex items-center gap-4 w-full border p-5 hover:bg-amber-400  hover:cursor-pointer `}
          onClick={() => handleClickCategoria(id)}>
          <Image
              src={`/assets/img/icono_${icono}.svg`}
              width={70}
              height={70}
              alt='Imagen Icono'
              className='mr-5'
              priority
          />
          <button type='button' className=' text-2xl font-bold  '>
              {nombre}
          </button>

      </div>
  );
}

export default Categorias