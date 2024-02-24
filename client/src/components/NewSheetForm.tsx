import React, { useState, useEffect } from 'react';

export default function NewSheetForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [disableFirstNext, setDisableFirstNext] = useState(true);
    const [disableSecondNext, setDisableSecondNext] = useState(true);
    const [disableThirdNext, setDisableThirdNext] = useState(true);

    const [formData, setFormData] = useState({
        sheetName: '',
        rows: 0,
        prompt: '',
        columns: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
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


    return (
        <form className='flex justify-center flex-col items-start gap-2' onSubmit={handleSubmit}>
        {currentStep === 1 && (
            <div className='flex flex-col gap-2 w-full'>
                <label className='text-gray-700'>Sheet Title (must be longer than 5 characters)</label>
                <input
                type='text'
                placeholder='Ex. EdTech Companies Sheet'
                className='p-2 rounded-md w-full'
                value={formData.sheetName}
                onChange={(e) => {
                    setDisableFirstNext(e.target.value.length <= 5) 
                    setFormData({ ...formData, sheetName: e.target.value })
                }}
                required
                />
                {!disableFirstNext && (
                    <button
                    className='bg-brandColor text-white p-2 rounded-md w-full'
                    onClick={nextStep}
                    >
                        Next
                    </button>
                )}
            </div>
        )}
        {currentStep === 2 && (
            <div className='flex flex-col gap-2 w-full'>
                <label className='text-gray-700'>Sheet Rows / Number of Results</label>
                <input
                type='number'
                placeholder='Number of Rows'
                className='p-2 rounded-md w-full'
                value={formData.rows}
                onChange={(e) => {
                    let value = parseInt(e.target.value);
                    setFormData({ ...formData, rows: value < 0 ? 0 : value })
                    setDisableSecondNext(e.target.value.length === 0 || value === 0);
                }}
                required
                />
                {!disableSecondNext && (
                    <button
                    className='bg-brandColor text-white p-2 rounded-md w-full'
                    onClick={nextStep}
                    >
                        Next
                    </button>
                )}
            </div>
        )}
        {currentStep === 3 && (
            <div className='flex flex-col gap-2 w-full'>
                <label className='text-gray-700'>Sheet Features (comma separated)</label>
                <input
                    type='text'
                    placeholder='Ex. Name, URL, Description, etc.'
                    className='p-2 rounded-md w-full'
                    value={formData.columns}
                    onChange={(e) => {
                        setDisableThirdNext(e.target.value.length === 0);
                        setFormData({ ...formData, columns: e.target.value })
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
      {currentStep > 1 && (
            <button className='bg-gray-300 text-gray-700 p-2 rounded-md w-full' onClick={previousStep}>
            Previous
            </button>
        )}
        </form>
    );
    }
