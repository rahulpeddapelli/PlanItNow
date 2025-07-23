// src/utils/validation.js

export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])([A-Z])[A-Za-z\d\S]{5,}$/;
  return regex.test(password);
};

export const validateName = (name) => name.trim().length >= 3;

export const passwordValidationMessage =
"Start with capital,6+ chars,1 letter,number & symbol."