import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useCarrito } from "./hooks/useCarrito";

function App() {
  const { data,
    carrito,
    addCart,
    eliminarElemento,
    aumentarcantidad,
    reducirCantidad,
    limpiarCarrito } = useCarrito();

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
