import { NavLink } from "react-router-dom"
import DummyBoard from "../components/DummyBoard"
import '../index.css'


const LandingPage = () => {
    return (
        <div className=" h-screen w-screen  flex justify-center pt-10 gap-12">

            <div className="" >
                <DummyBoard />
            </div>
 
            <div className=" flex flex-col  text-5xl font-bold h-[75%] gap-7 items-center pt-30">

                <div className="text-white flex flex-col items-center ">

                    <div>Play Chess</div>
                    <div>for Free</div>
                    <div> on the #2 Site!!</div>
                    
                </div>

                <nav>
                    <NavLink to={'/game'}

                    >

                        <button className="rounded-lg shadow-2xl px-3 py-2 text-3xl  text-white bg-lime-600 w-fit">
                            Play Online
                        </button>

                    </NavLink>
                </nav>
            </div>
        </div>
    )
}

export default LandingPage