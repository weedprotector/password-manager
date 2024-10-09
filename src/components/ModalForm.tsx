import React, { useState } from 'react';
import { savePassword } from '../services/api';
import PasswordGenerator from './PasswordGenerator';
import useLoadingState from '../hooks/useLoading';
import Loader from './Loader';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const ModalForm: React.FC<Props> = ({ isOpen, onClose }) => {
	const [service, setService] = useState('');
	const [password, setPassword] = useState('');

	const { loading, startLoading, stopLoading } = useLoadingState();

	const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (service.length !== 0 && password.length !== 0) {
			startLoading();
			try {
				await savePassword(service, password);
				alert('Пароль сохранен');
				onClose();
			} catch (e: any) {
				alert(e.message);
			} finally {
				setService('');
				setPassword('');
				stopLoading();
			}
		}
	};

	return (
		<div
			className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-300`}
			onClick={closeModal}
		>
			<div
				className={`bg-white p-8 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
				onClick={(e) => e.stopPropagation()}
			>
				<form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
					<input
						type="text"
						value={service}
						onChange={(e) => setService(e.target.value)}
						placeholder="Сервис"
						className="border-b border-indigo-600"
					/>
					<input
						type="text"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Пароль"
						className="border-b border-indigo-600"
					/>
					<div className="flex items-center gap-3">
						<button type="submit" className="border border-indigo-600 p-1">
							Сохранить
						</button>
						{loading && <Loader />}
					</div>
				</form>
				<PasswordGenerator setPassword={setPassword} />
			</div>
		</div>
	);
};

export default ModalForm;
