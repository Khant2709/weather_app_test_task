import React from 'react';
import {CATEGORY_CHART} from "../../../config/envData";

interface Category {
    id: number;
    name: string;
    type: CATEGORY_CHART;
}

const category: Category[] = [
    {
        id: 0,
        name: 'Температура',
        type: CATEGORY_CHART.TEMP,
    },
    {
        id: 1,
        name: 'Ветер',
        type: CATEGORY_CHART.WIND,
    },
    {
        id: 2,
        name: 'Осадки',
        type: CATEGORY_CHART.RAINFALL,
    }
]

interface HeaderChartComponentProps {
    cityName: string;
    categoryChart: CATEGORY_CHART;
    handleChangeCategory: (type: CATEGORY_CHART) => void;
}

const HeaderChartComponent: React.FC<HeaderChartComponentProps> = ({cityName, categoryChart, handleChangeCategory}) => {
    return (
        <section className={`flex flex-col justify-normal items-start gap-8
                             md:flex-row md:justify-between md:items-end `}
        >
            <h2 className={`text-3xl tracking-widest ml-0 
                            md:text-4xl xl:ml-16`}
            >
                {cityName}
            </h2>
            <nav className={`text-base flex gap-2 bg-[#6167A166] rounded-2xl 
                            md:text-xl`}
            >
                {category.map(el => {
                    const isActive = categoryChart === el.type;
                    return <button key={el.id}
                                   onClick={() => handleChangeCategory(el.type)}
                                   className={`rounded-2xl cursor-pointer hover:bg-[#6167A1CC] px-4 py-2 
                              ${isActive ? 'bg-[#6167A1CC]' : ''}`}>
                        {el.name}
                    </button>
                })}
            </nav>
        </section>
    );
};

export default HeaderChartComponent;