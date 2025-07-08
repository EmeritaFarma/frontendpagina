import Carrucel from "@/components/main/Carrucel";
import Hero from "@/components/main/Hero";
import '@/App.css'
import Branchs from "@/components/main/locations/Branchs";
export default function Home() {

    return (
        <>
            <Hero />
            <section className="news">
                <div className="container">
                    <div className="news__body">
                        <h2 className="news__title title title--black ">Novedades</h2>
                        <Carrucel />
                    </div>
                </div>
            </section>
            <section className="products">
                <div className="container">
                    <div className="products__body">
                        <h2 className="title title--black">Productos</h2>
                        <p className="products__text">Conoce nuestra amplia variedad de productos</p>
                    </div>
                    <div className="products__gallery">
                        <article className="product-main product-main--medications">
                            <div className="product-main__bg"></div>
                            <h2 className="product-main__title">Medicamentos</h2>
                            <div className="product-main__body">
                                <p className="product-main__text">De patente y genéricos</p>
                            </div>
                        </article>
                        <article className="product-main product-main--baby">
                            <div className="product-main__bg"></div>
                            <h2 className="product-main__title">Bebés</h2>
                            <div className="product-main__body">
                                <ul className="product-main__list">
                                    <li className="product-main__item">Fórmulas infantiles</li>
                                    <li className="product-main__item">Pañales</li>
                                    <li className="product-main__item">Papillas</li>
                                    <li className="product-main__item">Higiene</li>
                                    <li className="product-main__item">Biberones</li>
                                    <li className="product-main__item">Lactancia</li>
                                </ul>

                            </div>
                        </article>
                        <article className="product-main product-main--dermatologists">
                            <div className="product-main__bg"></div>
                            <h2 className="product-main__title">Demartologicos</h2>
                            <div className="product-main__body">
                                <p className="product-main__text">Cuidado de la piel</p>
                            </div>
                        </article>
                        <article className="product-main product-main--warning">
                            <div className="product-main__bg"></div>
                            <h2 className="product-main__title">Cuidado personal</h2>
                            <div className="product-main__body">
                                <p className="product-main__text">Higiene y perfumeria</p>
                            </div>
                        </article>
                        <article className="product-main product-main--vitamins">
                            <div className="product-main__bg"></div>
                            <h2 className="product-main__title">VITAMINAS, SUPLEMENTOS Y PRODUCT-mainOS NATURISTAS</h2>

                        </article>
                        <article className="product-main product-main--material">
                            <div className="product-main__bg"></div>
                            <h2 className="product-main__title">Material de curación</h2>
                            <div className="product-main__body">
                                <p className="product-main__text">Y de uso hospitalario</p>
                            </div>
                        </article>
                        <article className="product-main product-main--cheminal">
                            <div className="product-main__bg"></div>
                            <h2 className="product-main__title">Product-mainos quimicos envasados</h2>
                        </article>
                        <article className="product-main product-main--equipment">
                            <div className="product-main__bg"></div>
                            <h2 className="product-main__title">Equipos especiales</h2>
                            <div className="product-main__body">
                                <ul className="product-main__list">
                                    <li className="product-main__item">Nebulizadores</li>
                                    <li className="product-main__item">Baumanómetros</li>
                                    <li className="product-main__item">Medidores de glucosa</li>
                                </ul>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
            <Branchs />
        </>
    )
}
