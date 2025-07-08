import { Branch } from "@/lib/types/branch"
import { Link } from "react-router-dom"

interface Props {
    branch: Branch, 
    index: number
}

export default function BranchItem({branch, index}: Props) {

    const {  name, contact } = branch

    const contacts = contact?.reduce((acc, item) => {
    
        const array = acc[item.type] ? [...acc[item.type], item.number] : [item.number]
        
        return {
            ...acc,
            [item.type]: array
        }

    }, {} as any) as { tel: string[], cel: string[] }
    
    const { tel, cel } = contacts

    
    return (
        <li className="contacts__item">
            <a className="contacts__btn" href="#">
                <Link to={'?index='+index} className="contacts__link">{name}</Link>
                <div className="contacts__numbers">
                   {tel?.length > 0 && <p className="contacts__number">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg> 
                     Tel: { tel?.join(', ')}
                    </p>}
                    {cel?.length > 0 &&<p className="contacts__number">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smartphone"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg> 
                    Tel: { cel?.join(', ')}
                    </p>}
                </div>
            </a>
        </li>
    )
}
