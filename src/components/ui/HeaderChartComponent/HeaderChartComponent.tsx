import React from 'react';
import {CATEGORY_CHART} from "../../../config/envData";

interface Category {
    id: number;
    name: string;
    type: CATEGORY_CHART;
}

interface HeaderChartComponentProps {
    cityName: string;
    categoryChart: CATEGORY_CHART;
    handleChangeCategory: (type: CATEGORY_CHART) => void;
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
];

const HeaderChartComponent: React.FC<HeaderChartComponentProps> = ({cityName, categoryChart, handleChangeCategory}) => {
    return (
        <section
            className={`flex flex-col justify-normal items-start gap-8 md:flex-row md:justify-between md:items-end `}>
            <h2 className={`text-3xl tracking-widest ml-0 md:text-4xl xl:ml-16`}>
                {cityName}
            </h2>
            <nav className={`text-base flex gap-2 bg-primary_40 rounded-2xl md:text-xl`}>
                {category.map(({id, type, name}) => {
                    const isActive = categoryChart === type;
                    return <button key={id}
                                   onClick={() => handleChangeCategory(type)}
                                   className={`rounded-2xl cursor-pointer hover:bg-primary_80 px-4 py-2 ${isActive ? 'bg-primary_80' : ''}`}
                    >
                        {name}
                    </button>
                })}
            </nav>
        </section>
    );
};

export default HeaderChartComponent;