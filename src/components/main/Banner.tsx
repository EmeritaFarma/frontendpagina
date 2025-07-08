
interface Props{
    title: string
}

export default function Banner({title}: Props) {
    return (
        <div className="banner">
            <div className="container">
                <div className="banner__body">
                    <h2 className="banner__title">{title}</h2>
                </div>
            </div>
        </div>
    )
}
