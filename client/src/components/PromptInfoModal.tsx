import { useEffect, useRef } from "react";

export default function PromptInfoModal({setShowPromptInfo}: {setShowPromptInfo: any}) {

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const modal = document.getElementById("promptInfoModal");

            // Check if the click is outside the modal
            if (modal && !modal.contains(event.target as Node)) {
                setShowPromptInfo(false);
            }
        };

        // Add event listener when the component mounts
        document.addEventListener("mousedown", handleOutsideClick);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [setShowPromptInfo]);

    return (
        <div className="w-full h-full fixed top-0 left-0 z-40 darker-blurred-container cursor-pointer">
        <div id="promptInfoModal" className="text-zinc-300 flex justify-center items-center absolute left-[25%] top-[25%] w-1/2 flex-col gap-8 rounded-2xl z-50 p-10">
            <h1 className="text-[2rem]">About Prompting <strong>sheetz</strong></h1>
            <p className="text-[1rem] text-center">
                To get the most out of your results, use specific keywords in this section. For example, if I make paintings that I want to sell to small mueseums in Brooklyn, NY, I need to reach out to some mueseums. 
                <br/>
                <br/>
                With <strong>sheetz</strong> this process has never been easier. Simply specify what you want: "Small art mueseums in Brooklyn, New York that showcase paintings", and wha la! That's all the prompting you need to do for 
                our application to begin searching for the best results for you.
            </p>
        </div>
        </div>
    );
}
