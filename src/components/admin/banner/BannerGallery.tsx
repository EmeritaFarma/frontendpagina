
interface Props {
    children: React.ReactNode;
}

export default function BannerGallery({ children }: Props) {
    return (
        <div className="border-2 border-gray-300 rounded-lg p-2 bg-white border-dashed relative">
            {children}
    </div>
    )
}
