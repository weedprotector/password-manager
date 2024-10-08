import React, { useState } from 'react';
import { savePassword } from '../services/api';
import { generatePassword, PasswordOptions } from '../utils/passwordGenerator';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ModalForm: React.FC<Props> = ({ isOpen, onClose }) => {
  const [service, setService] = useState('')
  const [password, setPassword] = useState('')

  const [includeLetters, setIncludeLetters] = useState(false)
  
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await savePassword(service, password)
      alert('Password saved successfully!')
      onClose();
    } catch (e: any) {
      alert(e.message)
    } finally {
      setService('')
      setPassword('')
    }
  }

  const onGeneratePassword = () => {
    const options: PasswordOptions = {
      length: 12,
      useLetters: includeLetters,
      useNumbers: true,
      useSpecialChars: true,
      letterCase: 'random',
    }
    const password = generatePassword(options)
    setPassword(password)
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-300`}
      onClick={closeModal}
    >
      <div
        className={`bg-white p-8 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        onClick={e => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={service}
            onChange={e => setService(e.target.value)}
            placeholder="Сервис"
            className="input input-bordered input-primary w-full"
          />
          <input
            type="text"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Пароль"
            className="input input-bordered input-primary w-full"
          />
          <div className="flex justify-between items-center">
            <button onClick={onGeneratePassword} type='button' className="btn btn-primary" >Сгенерировать пароль</button>
            <button type="submit" className="btn btn-primary">Сохранить</button>
          </div>
        </form>
        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" checked={includeLetters} onChange={() => setIncludeLetters(prev => !prev)}></input>
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Использовать буквы</span>
          </label>
        </div>
      </div>
    </div>
  );

};

export default ModalForm;
