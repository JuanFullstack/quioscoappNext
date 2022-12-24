import React, { useState, useEffect ,createContext} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import { useRouter } from 'next/router'


const Contenido = createContext();

function QuioscoProvaider({children}) {

    const router = useRouter()

    const [categorias ,setcategorias] = useState([])
    const [ categoriaActual , setcategoriaActual] = useState({})
    const [producto , setproducto] = useState({})
    const [modal , setmodal] = useState(false)
    const [pedido , setpedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)



    const ObtenerCategorias = async ( ) => {
        
        const url = "/api/categorias"
        const { data } = await axios (url)
        setcategorias(data) 
       
    }

    const handlesetproducto = (producto) => {
        setproducto(producto);
    };

    const handlesetmodal = (modal) => {
        setmodal(!modal);
    };

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad ) + total, 0)

        setTotal(nuevoTotal)
    }, [pedido])           
    
                
    const handleAgregarPedido = ({categoriaActual, ...producto}) => {
    //{categoriaActual, ...producto} --> quiero todo el obj producto menos la prop categoriaId  
    
        // verifico si el id ya existe en el array pedidos 
        if(pedido.some(productoState => productoState.id === producto.id)) {

            //actulizo todo el arrays y  me quedo con los cambios 
        const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
        setpedido(pedidoActualizado)
        toast.success('Guardado Correctamente')

        // si no identifica un id entonces en nuevo 
        } else {
            // los valores cargados son nuevos 
            setpedido([...pedido, producto])
            toast.success('Agregado al Pedido')
        
        }

        setmodal(false) 
    }

    const handleEditarCantidades = id => {
        const productoActualizar = pedido.filter( producto => producto.id === id)
        setproducto(productoActualizar[0])
        setmodal(!modal)
    }


   const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter( producto => producto.id !== id)
        setpedido(pedidoActualizado)
    }

    

    useEffect(() => {
        ObtenerCategorias()
      
    }, []);


    useEffect(() => {
        setcategoriaActual(categorias[0])
    }, [categorias]);

    const handleClickCategoria = id => {
        const categoria = categorias?.filter(  cat =>cat.id===id )
        setcategoriaActual(categoria[0])
        router.push('/')

    } 


    const colocarOrden = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})

            // Resetear la app
            setcategoriaActual(categorias[0])
            setpedido([])
            setNombre('')
            setTotal(0)


            toast.success('Pedido Realizado Correctamente')

            setTimeout(() => {
                router.push('/')
            }, 3000)

        } catch (error) {
            console.log(error)
        }

    };

   

    return (
        <Contenido.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handlesetproducto,
                modal,
                handlesetmodal,
                pedido,
                handleAgregarPedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre, 
                setNombre,
                total,
                colocarOrden
         
            }}>
            {children}
        </Contenido.Provider>
    );
}

export {QuioscoProvaider};
export default Contenido;