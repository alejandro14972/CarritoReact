import { useState, useEffect } from "react";
import { db } from "../data/db";

export const useCarrito = () => {
    const initialCarrito = () => {
        const almacenamientoCarrito = localStorage.getItem('carrito');
    
        if (almacenamientoCarrito == null) {
          return [];
        } else {
          return JSON.parse(almacenamientoCarrito)
        }
      }
    
      const [data] = useState(db);
      const [carrito, setCarrito] = useState(initialCarrito);
    
      useEffect(()=>{ //usaremos el use efect para cunado el estado de carrito cambie llmaremos al local 
        localStorage.setItem("carrito", JSON.stringify(carrito))
      },[carrito])
    
      function addCart(item) {
        const itemExist = carrito.findIndex(p => p.id === item.id);
        if (itemExist >= 0) {
          const actualizarCarrito = [...carrito];
          actualizarCarrito[itemExist].cantidad++;
          setCarrito(actualizarCarrito);
        } else {
          item.cantidad = 1; //añadir propiedad
          setCarrito([...carrito, item])
        }
      }
    
      function eliminarElemento(id) {
        const nuevoCarrito = carrito.filter(p => p.id !== id); // Excluye el elemento con el id dado
        setCarrito(nuevoCarrito); // Actualiza el estado con el nuevo carrito
      }
    
      function aumentarcantidad(id) {
        const itemExist = carrito.findIndex(p => p.id === id); //retorna posicion array
        if (itemExist >= 0) {
          const actualizarCarrito = [...carrito];
          actualizarCarrito[itemExist].cantidad++;
          setCarrito(actualizarCarrito);
        }
      }
    
    
      function reducirCantidad(id) {
        const itemExist = carrito.findIndex(p => p.id === id); 
        if (itemExist >= 0) {
          const actualizarCarrito = [...carrito];
          if (actualizarCarrito[itemExist].cantidad > 0) { //esto ta para evitar numero negativos
            actualizarCarrito[itemExist].cantidad--;
            setCarrito(actualizarCarrito);
          }
          if(actualizarCarrito[itemExist].cantidad === 0){
               eliminarElemento(actualizarCarrito[itemExist].id) 
          }
        }
      }
    
      function limpiarCarrito(){
          setCarrito([])
      }


    return{
        data,
        carrito,
        addCart,
        eliminarElemento,
        aumentarcantidad,
        reducirCantidad,
        limpiarCarrito
    }

}