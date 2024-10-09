import React, { useEffect, useState } from 'react';
import ModalForm from './components/ModalForm';
import PasswordTable from './components/PasswordTable';
import { PasswordPair } from './types';

function App() {
  const [isModalOpen, setModalOpen] = useState(false)
  const [pairs, setPairs] = useState<PasswordPair[]>([])

  const loadPasswords = (): PasswordPair[] => {
    return Object.entries(localStorage).map(([key, value]): PasswordPair => {
      return {
        service: key,
        password: value
      };
    });
  };

  useEffect(() => {
    const loadedPasswords = loadPasswords()
    setPairs(loadedPasswords);
  }, [isModalOpen])

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="App">
      <header className="flex justify-between con p-4 w-full border border-indigo-600">
        <h1 className="text-4xl font-bold">Менеджер паролей</h1>
        <button onClick={openModal} className="border border-indigo-600 p-2">Добавить пароль</button>
      </header>

      <ModalForm isOpen={isModalOpen} onClose={closeModal} />
      <PasswordTable pairs={pairs}/>
    </div>
  );
}

export default App;
