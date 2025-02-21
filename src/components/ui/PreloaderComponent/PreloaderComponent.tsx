import React from "react";

const PreloaderComponent: React.FC = () => (
    <p className={`text-xl text-white/50 text-center
                        md:text-2xl`}
    >
        Ищем город и проверяем погоду...
    </p>
);

export default PreloaderComponent;
