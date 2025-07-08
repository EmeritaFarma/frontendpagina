
export default function Policy() {
  return (
    <main className="policy">
    <div className="container">
        <div className="policy__body">

            <h1 className="policy__title">Política de Devoluciones</h1>
    
            <p className="policy__intro">
                Estimado cliente, en Emérita Farmacias trabajamos para ofrecerle productos de calidad y un servicio excepcional. Para garantizar su satisfacción y cumplir con normativas sanitarias, nuestra política de devoluciones establece las siguientes condiciones:
            </p>
    
            <h2 className="policy__subtitle">Condiciones para realizar una devolución:</h2>
    
            <ul className="policy__list">
                <li className="policy__item">
                    <strong>Defectos de fabricación</strong>
                    <ul className="policy__sublist">
                        <li>
                            Si el artículo presenta defectos de fabricación, deberá acudir a la sucursal donde realizó la compra con el ticket de venta y/o factura original, junto con el producto, en un plazo no mayor a 3 días naturales (72 horas) posteriores a su compra.
                        </li>
                    </ul>
                </li>
                <li className="policy__item">
                    <strong>Error en el artículo enviado o comprado</strong>
                    <ul className="policy__sublist">
                        <li>
                            Deberá acudir a la sucursal donde realizó la compra con el ticket de venta y/o factura original, junto con el artículo en las mismas condiciones en que fue entregado o comprado, sin muestras de maltrato y en su empaque original, dentro de un plazo no mayor a 3 días naturales (72 horas) posteriores a la compra.
                        </li>
                        <li>
                            En el caso de dispositivos médicos, el producto deberá encontrarse en las mismas condiciones en que fue entregado o comprado, acompañado de todas sus partes, accesorios, manuales y en su empaque original. Por razones de higiene y seguridad, los dispositivos médicos que hayan sido abiertos o utilizados no podrán ser devueltos.
                        </li>
                    </ul>
                </li>
            </ul>
    
            <p className="policy__text">
                💡 Si tiene dudas sobre la elegibilidad de su devolución, le recomendamos comunicarse con nuestra sucursal antes de acudir.
            </p>
    
            <h2 className="policy__subtitle">Artículos sin cambios ni devoluciones:</h2>
    
            <p className="policy__list__title">
                Por razones de seguridad, normativas sanitarias y control de calidad, no se aceptan cambios ni devoluciones en los siguientes productos:
            </p>
    
            <ul className="policy__list">
                <li className="policy__item">Medicamentos refrigerados</li>
                <li className="policy__item">Medicamentos controlados</li>
                <li className="policy__item">Material de curación</li>
                <li className="policy__item">Productos de diagnóstico (Ej. tiras reactivas para glucómetros)</li>
                <li className="policy__item">Productos de salud sexual</li>
                <li className="policy__item">Productos dermatológicos</li>
            </ul>
    
            <p className="policy__text">
                <span className="policy__text--bold">Nota:</span> Emérita Farmacias se reserva el derecho de realizar cambios y/o devoluciones en casos no contemplados en esta política.
            </p>
    
            <h2 className="policy__subtitle">Horario de atención:</h2>
            
            <ul className="policy__schedule">
                <li className="policy__schedule__item">📅 Lunes a Sábado: 8:00 – 23:00 hrs</li>
                <li className="policy__schedule__item">📅 Domingo: 9:00 – 21:00 hrs</li>
            </ul>
    
            <p className="policy__contact">
                📩 Para preguntas, sugerencias o comentarios, escríbenos a: <a href="mailto:info@emeritafarmacias.com" className="policy__email">info@emeritafarmacias.com</a>
            </p>
    
        </div>
    </div>
</main>
  )
}
