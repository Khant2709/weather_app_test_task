import Header from './components/layout/header/header'
import DescriptionComponent from "./particlesPage/DescriptionComponent/DescriptionComponent";
import WrapperWeatherComponent from "./particlesPage/WrapperWeatherComponent/WrapperWeatherComponent";

function App() {
    return (
        <main className={`w-full min-h-screen bg-slate-950
                          md:gap-16`}
        >
            <Header/>
            <section className={`max-w-[96rem] mx-auto flex flex-col gap-8 pb-16 
                                    md:gap-16`}
            >
                <DescriptionComponent/>
                <WrapperWeatherComponent/>
            </section>
        </main>
    )
}

export default App
