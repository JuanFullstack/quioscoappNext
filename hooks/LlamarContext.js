import  { useContext } from 'react';
import Contenido from '../context/QuioscoProvaider';


function LlamarContext () {
    return  useContext(Contenido)    
  }
   
  export default LlamarContext 