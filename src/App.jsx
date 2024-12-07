import { useState, useEffect } from "react";
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db";

function App() {

  const [data, setData] = useState(db);
  const [carrito, setCarrito] = useState([]);

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


  return (
    <>
      <Header
        carrito={carrito}
        eliminarElemento={eliminarElemento}
        aumentarcantidad={aumentarcantidad}
        reducirCantidad={reducirCantidad}
        limpiarCarrito={limpiarCarrito}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addCart={addCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
