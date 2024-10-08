export const savePassword = (service: string, password: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        localStorage.setItem(service, password);
        resolve();
      } else {
        reject(new Error("Failed to save password."));
      }
    }, 1000);
  });
};