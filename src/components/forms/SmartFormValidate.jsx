import { useState } from "react";

const SmartFormValidate = () => {
  const [errors, setErrors] = useState({});

  const validateOtp = (type, value, label) => {
    if (value.length !== 6) {
      setErrors((prev) => ({
        ...prev,
        [type]: `${label} Deve conter 6 digitos.`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [type]: null }));
    }
  };

  const validateInput = (name, value, label) => {
    if (!value || !value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [name]: `${label} não pode estar vazio.`,
      }));
      return;
    }

    if (
      name === "email" &&
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)
    ) {
      setErrors((prev) => ({ ...prev, [name]: "Email inválido." }));
      return;
    }

    if (name === "password" && value.length < 8) {
      setErrors((prev) => ({
        ...prev,
        [name]: "A senha deve ter pelo menos 8 caracteres.",
      }));
      return;
    }

    if (
      name === "passconf" &&
      value !== document.querySelector("input[name=password]").value
    ) {
      setErrors((prev) => ({
        ...prev,
        [name]: "A confirmação de senha não corresponde à senha.",
      }));
      return;
    }

    const phoneRegex = /^\+55 \(\d{2}\) 9\d{4}-\d{4}$/;
    if (name === "phone" && !phoneRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Número de telefone inválido.",
      }));
      return;
    }

    if (name === "number" && isNaN(value)) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Por favor, insira um número válido.",
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  return { errors, validateInput, validateOtp };
};

export default SmartFormValidate;
