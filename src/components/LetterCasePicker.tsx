import React, { Dispatch, FC, SetStateAction } from 'react'
import { CaseVariants } from '../utils/passwordGenerator'

interface LetterCasePickerProps {
    value: CaseVariants
    onChange: Dispatch<SetStateAction<CaseVariants>>
}

const LetterCasePicker: FC<LetterCasePickerProps> = ({value, onChange}) => {
    const handleClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
        const newCase = event.currentTarget.getAttribute('data-id') as CaseVariants;
        if (newCase) {
            onChange(newCase);
        }
    }

    return (
        <div className='flex flex-row gap-2'>
            <p data-id={CaseVariants.upper} onClick={handleClick} className={`cursor-pointer transition-colors duration-300 ${
                    value === CaseVariants.upper ? 'text-indigo-600' : 'text-gray-400'
                }`}>Верхний</p>
            <p data-id={CaseVariants.lower} onClick={handleClick} className={`cursor-pointer transition-colors duration-300 ${
                    value === CaseVariants.lower ? 'text-indigo-600' : 'text-gray-400'
                }`}>Нижний</p>
            <p data-id={CaseVariants.random} onClick={handleClick} className={`cursor-pointer transition-colors duration-300 ${
                    value === CaseVariants.random ? 'text-indigo-600' : 'text-gray-400'
                }`}>Рандом</p>
        </div>
    )
}

export default LetterCasePicker
