import Banner from "@/components/main/Banner";
import Branchs from "@/components/main/locations/Branchs";
export default function Branch() {


  return (
    <>
      <Banner title="Sucursales" />
      <main className="main-branch">
        <div className="container">
          <div className="main-branch__body">
            <p className="main-branch__text">Actualmente contamos con 27 sucursales en la Península de Yucatán, así como un Centro de Distribución en la Ciudad de Mérida.</p>
            <p className="main-branch__text">Para ver dirección, horarios y teléfonos de cualquiera de nuestras sucursales haga click en el marcador correspondiente en el mapa.</p>
            <Branchs />
          </div>
        </div>
      </main>
    </>
  )
}
