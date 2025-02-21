import React, {useEffect, useState, useMemo} from 'react';
import iconSun from '../../../assets/sun.png';

interface Time {
    hour: number;
    minute: number;
    time: number;
}

const getHoursAndMinutes = (unixTime: number): Time => {
    const date = new Date(unixTime * 1000);
    return {hour: date.getHours(), minute: date.getMinutes(), time: date.getTime()};
};

const formatTime = (value: number): string => value.toString().padStart(2, '0');

const getTimeToSun = (sunriseTime: Time, sunsetTime: Time): string => {
    const now = Date.now();
    const isDaytime = now >= sunriseTime.time && now < sunsetTime.time;
    const targetTime = isDaytime ? sunsetTime.time : sunriseTime.time + (now > sunriseTime.time ? 24 * 60 * 60 * 1000 : 0);
    const difference = targetTime - now;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${isDaytime ? 'Закат' : 'Восход'} через: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
};

interface SunComponentProps {
    sunrise: number;
    sunset: number;
}

const SunComponent: React.FC<SunComponentProps> = ({sunrise, sunset}) => {
    const sunriseTime = useMemo(() => getHoursAndMinutes(sunrise), [sunrise]);
    const sunsetTime = useMemo(() => getHoursAndMinutes(sunset), [sunset]);
    const [notification, setNotification] = useState<string>(getTimeToSun(sunriseTime, sunsetTime));

    useEffect(() => {
        const interval = setInterval(() => {
            setNotification(getTimeToSun(sunriseTime, sunsetTime));
        }, 1000);

        return () => clearInterval(interval);
    }, [sunriseTime, sunsetTime]);

    return (
        <section className={"mx-auto mt-8 px-8 py-4 flex flex-col items-center bg-[#6167A133] rounded-2xl"}>
            <p className={`text-xl text-center tracking-widest 
                            sm:text-2xl md:text-3xl `}
            >
                Время восхода и заката.
            </p>
            <p className={`text-base text-center text-white/40 mt-4 
                            sm:text-xl`}
            >
                {notification}
            </p>
            <img alt="sun" src={iconSun} className={"w-[25rem] h-auto"}/>
            <div className={`w-full text-base flex justify-between items-center gap-8 
                            md:text-xl sm:text-2xl`}
            >
                <p>Восход: {formatTime(sunriseTime.hour)}:{formatTime(sunriseTime.minute)}</p>
                <p>Закат: {formatTime(sunsetTime.hour)}:{formatTime(sunsetTime.minute)}</p>
            </div>
        </section>
    );
};

export default SunComponent;
