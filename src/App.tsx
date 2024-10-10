import React, { useEffect, useState } from 'react';
import ModalForm from './components/ModalForm';
import PasswordTable from './components/PasswordTable';
import { PasswordPair } from './types';
import { deletePassword } from './services/api';
import InputSearch from './components/InputSearch';

function App() {
	const [isModalOpen, setModalOpen] = useState(false);
	const [pairs, setPairs] = useState<PasswordPair[]>([]);

	const [filteredPairs, setFilteredPairs] = useState<PasswordPair[]>([]);
	const [searchTerm, setSearchTerm] = useState('');

	const loadPasswords = (): PasswordPair[] => {
		return Object.entries(localStorage).map(([key, value]) => {
			return {
				service: key,
				password: value,
			};
		});
	};

	const updateTable = () => {
		const loadedPasswords = loadPasswords();
		setPairs(loadedPasswords);
		setFilteredPairs(loadedPasswords);
	};

	useEffect(() => {
		updateTable();
	}, []);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const search = event.target.value.toLowerCase();
		setSearchTerm(search);

		const filtered = pairs.filter((pair) =>
			pair.service.toLowerCase().includes(search),
		);
		setFilteredPairs(filtered);
	};

	const openModal = () => setModalOpen(true);
	const closeModal = () => {
		updateTable();
		setModalOpen(false);
	};

	const onDelete = (service: string) => {
		deletePassword(service);
		setPairs(pairs.filter((pair) => pair.service !== service));
		setFilteredPairs(filteredPairs.filter((pair) => pair.service !== service));
	};

	return (
		<div className="App">
			<header className="flex justify-between con p-4 w-full border border-indigo-600">
				<h1 className="text-4xl font-bold">Менеджер паролей</h1>
				<button onClick={openModal} className="border border-indigo-600 p-2">
					Добавить пароль
				</button>
			</header>
			{pairs.length > 0 ? (
				<>
					<InputSearch searchTerm={searchTerm} onChange={handleSearch} />
					<PasswordTable pairs={filteredPairs} onDelete={onDelete} />
				</>
			) : (
				<div className="text-center mt-3">Нет паролей, добавьте первый</div>
			)}

			{isModalOpen && <ModalForm isOpen={isModalOpen} onClose={closeModal} />}
		</div>
	);
}

export default App;
