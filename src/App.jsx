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
      item.cantidad = 1; //añadir p`ropiedad
      setCarrito([...carrito, item])
    }
  }


  return (
    <>
      <Header 
        carrito={carrito}
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
