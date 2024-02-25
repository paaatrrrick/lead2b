import constants from '@/helpers/constants';
import { getAuthToken } from '@/helpers/firebase';
import React, { useState } from 'react';
import { Sheet } from '@/types/sheet';
import Steps from './Steps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

interface NewSheetFormProps {
    setSheets: (sheets: Sheet[]) => void;
    setView: (view: string) => void;
    sheets: Sheet[];
}

export default function NewSheetForm({ setSheets, setView, sheets }: NewSheetFormProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [disableFirstNext, setDisableFirstNext] = useState(true);
    const [disableSecondNext, setDisableSecondNext] = useState(true);
    const [disableThirdNext, setDisableThirdNext] = useState(true);
    const [currHeader, setCurrHeader] = useState('');

    const [formData, setFormData] = useState({
        prompt: '', 
        headers: [],
        name: '',
        rows: 0,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newFormData = { ...formData };
        //@ts-ignore
        newFormData['columns'] = newFormData['columns'].split(',').map((item: string) => item.trim());
        console.log(newFormData);
        const token = await getAuthToken();
        const res = await fetch(`${constants.serverUrl}${constants.endpoints.createSheet}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newFormData),
        });
        if (!res.ok) return;
        const data = await res.json();
        setSheets([{ id: data._id, name: newFormData.name }, ...sheets]);
        setView(data._id);
    };

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    }

    const previousStep = () => {
        setCurrentStep(currentStep - 1);
    }

    const handleEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (currentStep < 4) {
                nextStep();
            } else {
                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>); // Explicitly cast the event type
            }
        }
    };

    const addHeader = () => {
        setFormData({ ...formData, headers: [...formData.headers] });
        setCurrHeader('');
    }


    return (
        <form className='flex justify-between flex-col items-center gap-2 w-full h-full z-50 shadow-2xl rounded-xl p-10 bg-[#08050F] shadow-[#321b3c] drop-shadow-2xl' onSubmit={handleSubmit}>
                <Steps currentStep={currentStep-1} />
                {currentStep > 1 && (
                    <button className='text-brandColor text-md rounded-md w-full gap-2 flex justify-start items-center' onClick={previousStep}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                        <p>Back</p>
                    </button>
                )}
                {currentStep === 1 && (
                <div className='flex flex-col gap-10 w-full items-start justify-center w-full h-full mt-20'>
                    <div className='flex flex-col justify-center items-start gap-2 w-full'>
                        <p className='text-zinc-500 text-md'>SHEET PROMPT</p>
                        <h2 className="text-lg text-zinc-400 font-semibold">What are you searching for?</h2>
                    </div>
                    <div className='flex flex-col gap-5 w-full h-full'>
                        <input
                        type='text'
                        placeholder='Ex. EdTech Companies In California'
                        className='p-2 rounded-md w-full focus:border-brandColor focus:outline-none focus:ring-0 h-12'
                        value={formData.prompt}
                        onChange={(e) => {
                            setDisableFirstNext(e.target.value.length <= 5) 
                            setFormData({ ...formData, prompt: e.target.value })
                        }}
                        required
                        />
                        <button
                        className={`${disableFirstNext ? 'bg-[#231b3c] cursor-not-allowed' : 'bg-brandColor text-zinc-200 hover:bg-brandHoverColor transition duration-400'} text-zinc-500 p-2 rounded-md w-full h-12`}
                        onClick={nextStep}
                        disabled={disableFirstNext}
                        >
                            Next
                        </button>
                    </div>
                </div>
                )}
                {currentStep === 2 && (
                    <div className='flex flex-col gap-10 w-full items-start justify-center w-full h-full mt-20'>
                    <div className='flex flex-col justify-center items-start gap-2 w-full'>
                        <p className='text-zinc-500 text-md'>SHEET HEADERS</p>
                        <h2 className="text-lg text-zinc-400 font-semibold">What features are you searching for?</h2>
                        <p className='text-zinc-500 text-md italic'>*Note URL/Links are automatically provided</p>
                    </div>
                    <div className='flex flex-col gap-5 w-full h-full'>
                        <input
                        type='text'
                        placeholder='Ex. EdTech Companies In California'
                        className='p-2 rounded-md w-full focus:border-brandColor focus:outline-none focus:ring-0 h-12'
                        value={currHeader}
                        onChange={(e) => {
                            setDisableFirstNext(e.target.value.length === 0) 
                            setCurrHeader(e.target.value)
                        }}
                        required
                        />
                        <button
                        className={'bg-brandColor text-zinc-200 hover:bg-brandHoverColor transition duration-400 text-zinc-500 p-2 rounded-md w-full h-12'}
                        onClick={addHeader}
                        >
                            Add
                        </button>
                        <button
                        className={`${disableSecondNext ? 'bg-[#231b3c] cursor-not-allowed' : 'bg-brandColor text-zinc-200 hover:bg-brandHoverColor transition duration-400'} text-zinc-500 p-2 rounded-md w-full h-12`}
                        onClick={nextStep}
                        disabled={disableSecondNext}
                        >
                            Next
                        </button>
                    </div>
                </div>
                )}
                {currentStep === 3 && (
                    <div className='flex flex-col gap-2 w-full'>
                        <label className='text-gray-700'>Sheet Features (comma separated)</label>
                        <input
                            type='text'
                            placeholder='Ex. Name, URL, Description, etc.'
                            className='p-2 rounded-md w-full'
                            value={currHeader}
                            onChange={(e) => {
                                setDisableThirdNext(e.target.value.length === 0);
                                setCurrHeader(e.target.value);
                            }}
                            required
                        />
                        {!disableThirdNext && (
                            <button
                            className='bg-brandColor text-white p-2 rounded-md w-full'
                            onClick={nextStep}
                            >
                                Next
                            </button>
                        )}
                    </div>
                )}

                {currentStep === 4 && (
                <div className='flex flex-col gap-2 w-full'>
                    <label className='text-gray-700'>Additional Sheet Prompts (optional)</label>
                    <textarea
                    placeholder='Prompt'
                    className='p-2 rounded-md w-full max-h-[200px]'
                    value={formData.prompt}
                    onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                    onKeyDown={handleEnterPress}
                    />
                    <button type='submit' className='bg-brandColor text-white p-2 rounded-md w-full'>
                        Create
                    </button>
                </div>
            )}
        </form>
    );
    }
