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
      <h1 className="text-4xl font-bold text-center my-6">Password Manager</h1>
      <div className='w-full flex justify-center'>
        <button onClick={openModal} className="btn btn-primary mb-4 text-center mx-auto w-max">Add New Password</button>
      </div>
      <ModalForm isOpen={isModalOpen} onClose={closeModal} />
      <PasswordTable pairs={pairs}/>
    </div>
  );
}

export default App;
