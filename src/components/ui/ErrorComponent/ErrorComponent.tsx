import React from "react";

interface ErrorComponentProps {
    error?: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({error}) => (
    <div role="alert" className={`text-xl text-red-500/75 text-center md:text-2xl `}>
        {error || "Произошла ошибка"}
    </div>
);

export default ErrorComponent;
