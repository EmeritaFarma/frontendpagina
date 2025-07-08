import LogoTransparent from '@/assets/img/logo-transparent.png'
import Logo from '@/assets/img/logo.png'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Cart from './cart/Cart'
import CartButton from './cart/CartButton'

const links: {name: string, to: string}[] = [
    { name: 'Inicio', to: '/' },
    { name: 'Productos', to: '/products' },
    { name: 'Sucursales', to: '/branches' },
    { name: 'Nosotros', to: '/about' },
    { name: 'Contacto', to: '/contacts' },
]


export default function Header() {

    const [isScrolledHeader, setisScrolledHeader] = useState(false)
    const [showCart, setshowCart] = useState(false)
    const location = useLocation()

    const {  pathname } = location

    const scrollHandler = () => {
        if (window.scrollY > 0) {
            setisScrolledHeader(true)
            return
        }
        setisScrolledHeader(false)
    }

    useEffect(() => {
        
        window.scrollTo({
            top: 0,
        })

        if (pathname !== '/') {
            setisScrolledHeader(true)
        }else{
            window.addEventListener('scroll', scrollHandler)
            setisScrolledHeader(false)
        }
        
        if(showCart){
            setshowCart(false)
        }
        
        return () => {
            window.removeEventListener('scroll', scrollHandler)
        }

    }, [pathname])


    
    return (
        <>
        <header className={(isScrolledHeader) ? "header scroll" : "header"}>
            <div className="container">
            <div className="header__body">
                    {showCart &&  <Cart setshowCart={setshowCart} />}
                    <Link className="header__logo" to="/">
                        <img className="header__image header__image--white" src={LogoTransparent} alt="logo"/>
                        <img className="header__image header__image--base disabled" src={Logo} alt="logo"/>
                    </Link>
                    <div className="header__right">
                        <input className="header__check" type="checkbox" name="menu" id="menu"/>
                        <nav className="main-nav ">
                            <ul className="main-nav__list">
                                {
                                    links.map((link, index) =>(
                                        <li className="main-nav__item" key={index}><Link to={link.to} className={`main-nav__link ${pathname === link.to ? 'active' : ''}`} viewTransition>{link.name}</Link></li>
                                    ) 
                                    )
                                }
                            </ul>
                        </nav>
                       <CartButton setshowCart={setshowCart} />
                        <label className="header__btn" role="button" htmlFor="menu">x</label>
                    </div>
                </div>
            </div>
        </header>
        </>
    )
}
