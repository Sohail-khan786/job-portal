export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPassword = (password) => password.length >= 8;

export const isEmpty = (value) => {
  if(!value) return true;

  return false
};


export const haveCommonElement = (arr1, arr2) => {
  const set1 = new Set(arr1);

  for (const elem of arr2) {
    if (set1.has(elem)) {
      return true;
    }
  }

  return false;
}

