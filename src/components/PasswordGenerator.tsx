import React, { Dispatch, SetStateAction, useState } from 'react';
import { CaseVariants, generatePassword, PasswordOptions } from '../utils/passwordGenerator';
import Toggler from './Toggler';
import InputNumber from './InputNumber';
import LetterCasePicker from './LetterCasePicker';

interface PasswordGeneratorProps {
    setPassword: Dispatch<SetStateAction<string>>
}

const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({setPassword}) => {
    const [passwordLength, setPasswordLength] = useState(1)
    const [includeLetters, setIncludeLetters] = useState(false)
    const [includeNumbers, setIncludeNumbers] = useState(false)
    const [includeSymbols, setIncludeSymbols] = useState(false)
    const [letterCase, setLetterCase] = useState<CaseVariants>(CaseVariants.random)
    const [customChars, setCustomChars] = useState('')

    const onGeneratePassword = () => {
        const options: PasswordOptions = {
          length: passwordLength,
          useLetters: includeLetters,
          useNumbers: includeNumbers,
          useSpecialChars: includeSymbols,
          letterCase: letterCase,
          customChars: customChars
        }
        const minLength = customChars.length === 0 ? +includeLetters + +includeNumbers + +includeSymbols : customChars.length
        if (passwordLength < minLength) {
          alert(`Минимальная длина пароля с заданными параметрами: ${minLength}`)
          return
        }
        const password = generatePassword(options)
        setPassword(password)
      }
  return (
    <div>
        <div className='flex flex-col gap-2 border border-indigo-600 p-2'>
            <InputNumber value={passwordLength} onSetState={setPasswordLength}/>
            <Toggler isChecked={includeLetters} onChange={setIncludeLetters}>Использовать буквы</Toggler>
            <Toggler isChecked={includeNumbers} onChange={setIncludeNumbers}>Использовать цифры</Toggler>
            <Toggler isChecked={includeSymbols} onChange={setIncludeSymbols}>Использовать символы</Toggler>
            <LetterCasePicker value={letterCase} onChange={setLetterCase}/>
            <input
            type="text"
            value={customChars}
            onChange={e => setCustomChars(e.target.value)}
            placeholder="Использовать свои символы"
            className="border-b border-indigo-600"
          />
          <div className="flex justify-between items-center">
            <button onClick={onGeneratePassword} type='button' className="border border-indigo-600 p-1" >Сгенерировать пароль</button>
          </div>
        </div>
        
    </div>
    
  );

};

export default PasswordGenerator;
