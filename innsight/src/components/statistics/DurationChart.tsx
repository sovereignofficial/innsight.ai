import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { LoadingPage } from "../LoadingPage";
import { Booking } from "~/types/bookings.d";
import { memo, useMemo } from "react";

type PieFilterType = {
    name: string;
    value: number;
    color: string;
};


const pieFilters: PieFilterType[] = [
    { name: '3-10 days', value: 0, color: "#ef4444" },
    { name: '11-20 days', value: 0, color: "#f97316" },
    { name: '21-30 days', value: 0, color: "#eab308" },
    { name: '31-60 days', value: 0, color: "#84cc16" },
    { name: '61-90 days', value: 0, color: "#22c55e" },
]


function prepareData(pieFilters: PieFilterType[], stays: Booking[]): PieFilterType[] {
    const updatedFilters = pieFilters.map((filter) => ({ ...filter, value: 0 }));

    stays?.forEach((stay) => {
        const { numNigths } = stay;
        if (numNigths >= 3 && numNigths <= 10) {
            updatedFilters[0].value += 1;
        } else if (numNigths >= 11 && numNigths <= 20) {
            updatedFilters[1].value += 1;
        } else if (numNigths >= 21 && numNigths <= 30) {
            updatedFilters[2].value += 1;
        } else if (numNigths >= 31 && numNigths <= 60) {
            updatedFilters[3].value += 1;
        } else if (numNigths >= 61 && numNigths <= 90) {
            updatedFilters[4].value += 1;
        }
    });

    return updatedFilters;
}


export const DurationChart: React.FC<{ confirmedStays: Booking[],isLoading:boolean }> = memo(
    ({ confirmedStays,isLoading }) => {
        const data = useMemo(() => prepareData(pieFilters, confirmedStays), [pieFilters, confirmedStays]);
    
        return (
            <div className="col-span-1  h-[400px] p-5 rounded-xl dark:bg-secondary dark:shadow-none shadow-md relative overflow-hidden">
                {isLoading && <LoadingPage/>}
                <h3 className="text-start">Stay duration summary </h3>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            nameKey="duration"
                            dataKey="value"
                            innerRadius='60%'
                            outerRadius='75%'
                            cx="40%"
                            cy="50%"
                            paddingAngle={3}
                        >
                            {data.map((entry) => (
                                <Cell
                                    fill={entry.color}
                                    stroke={entry.color}
                                    key={entry.name}
                                />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value, index) => [`${value}`,`${pieFilters[Number(index)].name}: ` ]} />
                        <Legend
                            verticalAlign="middle"
                            align="right"
                            width={150}
                            layout="vertical"
                            iconSize={15}
                            iconType="circle"
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        )
    }
)