import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
         <div className="bg"></div>
         <div className="hero">
            <div className="container">
                <div className="hero__body">
                    <div className="hero__content">
                        <h1 className="hero__title title title--white">Mereces el mejor cuidado</h1>
                        <p className="hero__text">Calidad, salud y bienestar</p>
                        <div className="hero__actions">
                            <Link className="hero__btn btn btn--outline" to="/products">cotizador en línea</Link>
                            <Link className="hero__btn btn btn--outline" to="/branches">sucursales</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
