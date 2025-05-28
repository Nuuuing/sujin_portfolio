
import { CareerItem } from "@/components";
import { careerData, careerT } from "@/modules/career";

export const CareerSection = () => {
    const CareerMainData = careerData.map((data: careerT, index: number) => {
        return (
            <CareerItem
                key={'carr-' + index}
                data={data}
            />
        )
    })

    return (
        <div >
            <div
                className="w-[11rem]">
                <h1 className="text-3xl font-bold">CAREER</h1>
            </div>
            <div className="py-[3rem] flex justify-center">
                <div>
                    {CareerMainData}
                </div>
            </div>
        </div>
    )
}

