export const savePassword = (
	service: string,
	password: string,
): Promise<void> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.random() > 0.5) {
				localStorage.setItem(service, password);
				resolve();
			} else {
				reject(new Error('Ошибка при отправлении пароля'));
			}
		}, 1000);
	});
};

export const deletePassword = (service: string) => {
	localStorage.removeItem(service);
};
