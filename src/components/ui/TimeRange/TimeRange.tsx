import React from 'react';

const RANGE = [3, 6, 12, 24] as const;

interface TimeRangeProps {
    timeInterval: typeof RANGE[number];
    handleChangeInterval: (type: typeof RANGE[number]) => void;
}

const TimeRange:React.FC<TimeRangeProps> = ({timeInterval, handleChangeInterval}) => {
    return (
        <div className={`w-full flex justify-start md:justify-end`}>
            <div className={`text-base flex gap-2 bg-primary_40 rounded-2xl md:text-xl`}>
                {RANGE.map((el, i) => {
                    const isActive = timeInterval === el;
                    return <button key={i} onClick={() => handleChangeInterval(el)}
                              className={`rounded-2xl cursor-pointer hover:bg-primary_80 px-4 py-2 ${isActive ? 'bg-[#6167A1CC]' : ''}`}>
                        {el}ч
                    </button>
                })}
            </div>
        </div>
    );
};

export default TimeRange;