import LogoTransparent from '@/assets/img/logo-transparent.png'
import { Link } from 'react-router-dom'

const links: {name: string, to: string}[] = [
    { name: 'Aviso de Privacidad', to: '/privacy' },
    { name: 'Política de Devoluciones', to: '/policy' },
    { name: 'Sucursales', to: '/branches' },
    { name: 'Bolsa de Trabajo', to: '/branches' },
    { name: 'Contacto', to: '/contacts' },
]

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__top">
                <div className="container">
                    <div className="footer__body">
                        <div className="footer__left">
                            <a className="footer__logo" href="#">
                                <img src={LogoTransparent} alt="logo" />
                            </a>
                            <p className="footer__text"> Somos una empresa farmacéutica 100% yucateca comprometida con el bienestar de la sociedad, actualmente contamos con más de 20 sucursales en la península.</p>
                            <p className="footer__text"> En Emérita Farmacias tenemos más de 20 años de experiencia sobre la comercialización de medicamentos para la salud, ofreciendo una amplia variedad de productos en cada una de nuestras sucursales.</p>
                            <ul className="footer__list">
                                {
                                    links.map((link, index) => (
                                        <li className="footer__item" key={index}>
                                            <Link to={link.to} className="footer__link" >{link.name}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="footer__right">
                            <p className="footer__subtitle">Servicio a domicilio</p>
                            <p className="footer__text">Contamos con servicio a domicilio <strong className="footer__text--white">en horario de 8 am a 9 pm</strong> en todas nuestras sucursales, pagando en efectivo o con tarjeta de débito o crédito.</p>
                            <p className="footer__text">¡Solo <span className="footer__text--white">busca la sucursal</span> más cercana a tu domicilio y llámanos!</p>
                            <strong className="footer__text footer__text--white">*SERVICIO SOLO PARA MÉRIDA Y PROGRESO, YUCATÁN.</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer__bottom">
                <div className="container">
                    <span className="footer__copyright">Emérita Farmacias. Copyright 2017 Distribuidora de Medicamentos CIFLO</span>
                </div>
            </div>
        </footer>
    )
}
