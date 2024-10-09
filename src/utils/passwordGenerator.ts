export enum CaseVariants {
  lower = 'lower',
  upper = 'upper',
  random = 'random'
}

export interface PasswordOptions {
    length: number;
    useLetters: boolean;
    useNumbers: boolean;
    useSpecialChars: boolean;
    letterCase: CaseVariants;
    customChars?: string;
}

export function generatePassword(options: PasswordOptions): string {
    const { length, useLetters, useNumbers, useSpecialChars, letterCase, customChars } = options;

    if (customChars && customChars.length > 0) {
      let result = '';
      const allChars = customChars.split(''); 
      result = allChars.join('');
      const remainingLength = length - allChars.length;
      result += Array.from({ length: remainingLength }, () => sample(customChars)).join('');
      return shuffle(result);
  }

    let characters = '';
    const guaranteedCharacters = [];
  
    if (useLetters) {
      const letters = 'abcdefghijklmnopqrstuvwxyz';
      if (letterCase === 'upper') {
        characters += letters.toUpperCase();
        guaranteedCharacters.push(sample(letters.toUpperCase()));
      } else if (letterCase === 'lower') {
        characters += letters;
        guaranteedCharacters.push(sample(letters));
      } else if (letterCase === 'random') {
        characters += letters + letters.toUpperCase();
        guaranteedCharacters.push(sample(letters + letters.toUpperCase()));
      }
    }
    if (useNumbers) {
      const numbers = '0123456789';
      characters += numbers;
      guaranteedCharacters.push(sample(numbers));
    }
    if (useSpecialChars) {
      const specials = '!@#$%^&*()_+=-[]{}|;:",.<>?';
      characters += specials;
      guaranteedCharacters.push(sample(specials));
    }
  
    const remainingLength = length - guaranteedCharacters.length;
    const randomCharacters = Array.from({ length: remainingLength }, () => sample(characters)).join('');
    const result = shuffle(guaranteedCharacters.join('') + randomCharacters);
  
    return result;
  }
  
  function sample(array: string) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  function shuffle(string: string) {
    const array = string.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
  }
  