import React from 'react';

const DescriptionComponent: React.FC = () => (
    <section className={'max-w-[64rem] w-full mx-auto px-8'}>
        <p className={`text-base text-center
                        md:text-2xl`}
        >
            Узнайте точный прогноз погоды на 5 дней для любого города! Просто введите название населенного пункта, и
            получите актуальную информацию о температуре, осадках, влажности, скорости ветра и атмосферном давлении.
            Планируйте свои дни с уверенностью — всегда будьте в курсе изменений погоды!
        </p>
    </section>
);

export default DescriptionComponent;