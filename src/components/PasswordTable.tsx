import React, { FC } from 'react';
import { PasswordPair } from '../types';
import copyImg from '../assets/copyImg.png';
import trashImg from '../assets/trashImg.png';

interface PasswordTableProps {
	pairs: PasswordPair[];
	onDelete: (service: string) => void;
}

const PasswordTable: FC<PasswordTableProps> = ({ pairs, onDelete }) => {
	const handleCopy = (password: string) => {
		navigator.clipboard
			.writeText(password)
			.then(() => {
				alert('Пароль скопирован в буфер обмена');
			})
			.catch((err) => {
				console.error('Ошибка копирования: ', err);
			});
	};

	const body = pairs.map((pair) => (
		<tr key={pair.service}>
			<td className="border border-indigo-600">{pair.service}</td>
			<td className="border border-indigo-600 flex justify-between">
				<span className="truncate w-full">{pair.password}</span>
				<div className="flex flex-row">
					<p
						onClick={() => handleCopy(pair.password)}
						className="cursor-pointer"
					>
						<img src={copyImg} alt="copy" className="w-7" />
					</p>
					<p onClick={() => onDelete(pair.service)} className="cursor-pointer">
						<img src={trashImg} alt="delete" className="w-7" />
					</p>
				</div>
			</td>
		</tr>
	));

	return (
		<table className="border-collapse border border-indigo-600 w-2/3 mx-auto mt-5">
			<thead>
				<tr>
					<th className="border border-indigo-600 w-1/2">Сервис</th>
					<th className="border border-indigo-600 w-1/2">Пароль</th>
				</tr>
			</thead>
			<tbody>{body}</tbody>
		</table>
	);
};

export default PasswordTable;
