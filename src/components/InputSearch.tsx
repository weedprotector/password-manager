import React, { FC } from 'react';

interface InputSearchProps {
	searchTerm: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSearch: FC<InputSearchProps> = ({ searchTerm, onChange }) => {
	return (
		<div className="w-2/3 mx-auto mt-4">
			<input
				type="text"
				value={searchTerm}
				onChange={onChange}
				placeholder="Поиск по сервисам"
				className="border border-indigo-600 p-2 w-full"
			/>
		</div>
	);
};

export default InputSearch;
