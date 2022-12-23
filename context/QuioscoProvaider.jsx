import React, { useState, useEffect ,createContext} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'

const Contenido = createContext();

function QuioscoProvaider({children}) {

    const [categorias ,setcategorias] = useState([])
    const [ categoriaActual , setcategoriaActual] = useState({})
    const [producto , setproducto] = useState({})
    
    const [modal , setmodal] = useState(false)

    const [pedido , setpedido] = useState([])


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


    

    useEffect(() => {
        ObtenerCategorias()
      
    }, []);


    useEffect(() => {
        setcategoriaActual(categorias[0])
    }, [categorias]);

    const handleClickCategoria = id => {
        const categoria = categorias?.filter(  cat =>cat.id===id )
        setcategoriaActual(categoria[0])
    } 


   

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
                handleAgregarPedido
         
            }}>
            {children}
        </Contenido.Provider>
    );
}

export {QuioscoProvaider};
export default Contenido;