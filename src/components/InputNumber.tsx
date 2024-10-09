import React, { Dispatch, FC, SetStateAction } from 'react';

interface InputNumberProps {
	value: number;
	onSetState: Dispatch<SetStateAction<number>>;
}

const InputNumber: FC<InputNumberProps> = ({ value, onSetState }) => {
	return (
		<form>
			<div className="relative flex items-center max-w-[11rem]">
				<button
					onClick={() => (value > 1 ? onSetState((prev) => (prev -= 1)) : null)}
					type="button"
					className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
				>
					<svg
						className="w-3 h-3 text-gray-900"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 18 2"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M1 1h16"
						/>
					</svg>
				</button>
				<input
					type="text"
					className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full "
					value={value}
					required
				/>
				<button
					onClick={() => onSetState((prev) => (prev += 1))}
					type="button"
					className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
				>
					<svg
						className="w-3 h-3 text-gray-900"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 18 18"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 1v16M1 9h16"
						/>
					</svg>
				</button>
				<p className="ms-3 text-sm font-medium text-gray-900">Длина</p>
			</div>
		</form>
	);
};

export default InputNumber;
