import LlamarContext from '../hooks/LlamarContext';
import Image from 'next/image';
import Categorias from './Categorias';

function Siderbar() {
    const {categorias} = LlamarContext();

    return (
        <>
            <Image
                width={300}
                height={100}
                alt="Imagen logo"
                src="/assets/img/logo.svg"
                priority 
            />
            <nav className='mt-10'>
                {categorias?.map((parametro, posicion) => (
                    <Categorias key={parametro.id} categorias={categorias[posicion]} />
                ))}
            </nav>
        </>
    );
}

export default Siderbar;
