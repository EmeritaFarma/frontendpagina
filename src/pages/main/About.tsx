import Banner from "@/components/main/Banner";

export default function About() {
  return (
    <>
    <Banner title="Nosotros" />
    <main className="about">
        <div className="container">
            <div className="about__body">
                <article className="about__card">
                    <h2 className="about__title">Quiénes somos</h2>
                    <p className="about__text">Somos una empresa farmacéutica 100% yucateca comprometida con el bienestar de
                        la sociedad, actualmente contamos con más de 30 sucursales en el estado.</p>
                    <p className="about__text">En Emérita Farmacias tenemos más de 20 años de experiencia sobre la
                        comercialización de medicamentos para la salud, ofreciendo una amplia variedad de productos en
                        cada una de nuestras sucursales.</p>
                </article>
                <article className="about__card">
                    <h2 className="about__title">Misión</h2>
                    <p className="about__text">
                        Satisfacer las expectativas de nuestros clientes brindando un excelente servicio con calidez
                        humana, sensibilidad y trato profesional en permanente superación.
                    </p>
                </article>
                <article className="about__card">
                    <h2 className="about__title">Visión</h2>
                    <p className="about__text">Promover el cuidado de la salud y el bienestar de la sociedad al mismo tiempo que ofrecemos a nuestros clientes un amplio surtido a precios accesibles con el trato personalizado que nos distingue.</p>
                    
                </article>
            </div>
        </div>
    </main>
    </>
  )
}
