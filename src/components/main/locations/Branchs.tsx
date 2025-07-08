import Maps from "../Maps";
import { useQuery } from "@tanstack/react-query";
import { getBranchs } from "@/services/branch.services";
import BranchItem from "./BranchItem";

export default function Branchs() {


    const { data } = useQuery({ queryKey: ['branchs'], queryFn: getBranchs })

    return (
        <section className="branch">
            <div className="container">
                <div className="branch__body">
                    <h2 className="title title--black branch__title ">Sucursales</h2>
                    <div className="branch__grid">
                        <div className="branch__map">
                            <Maps branch={data ?? []} />
                        </div>
                        <aside className="contacts">
                            <ul className="contacts__list">
                                {
                                    data?.map((item, index) => (
                                        <BranchItem key={index} branch={item} index={index} />
                                    ))
                                }
                            </ul>
                        </aside>

                    </div>

                </div>
            </div>
        </section>
    )
}
