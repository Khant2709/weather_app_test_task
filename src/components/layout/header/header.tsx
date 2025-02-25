import React from "react";

const Header: React.FC = () => {
    return (
        <header className={`w-full p-4 border-b-2 border-primary_80 mb-8 md:mb-16`}>
            <p className={`text-3xl text-center tracking-[8px] md:text-4xl`}>
                WEATHER.RU
            </p>
        </header>
    );
};

export default Header;