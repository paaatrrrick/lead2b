import { useEffect, useState } from "react";

export default function Steps({currentStep}: {currentStep: number}) {

    const [step, setStep] = useState<number>(0);

    useEffect(() => {
        setStep(currentStep);
    }, [currentStep]);

    return (
        <div className="flex flex-col justify-center items-start w-full gap-2 text-zinc-300 text-[1.2rem]">
            Step {step + 1} of 4
            <div className="flex justify-start items-center w-full gap-4">
            {Array.from({length: 4}, (_, i) => (
                <div key={i} className={`w-1/4 h-4 rounded-full ${step === i ? 'bg-brandColor' : 'bg-zinc-400'}`}></div>
            ))}
            </div>
        </div>
    );
}
