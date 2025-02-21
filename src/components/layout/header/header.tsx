import React from "react";

const Header: React.FC = () => {
    return (
        <header className={`w-full p-4 border-b-1 border-slate-700 mb-8 
                            md:mb-16`}
        >
            <p className={`text-3xl text-center tracking-[8px]
                            md:text-4xl`}
            >
                WEATHER.RU
            </p>
        </header>
    );
};

export default Header;