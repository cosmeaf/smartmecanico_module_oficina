// hooks/useRegisterUser.js

import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../services/api";
import Alert from "../components/Alert";

const useRegisterUser = () => {
  const generateRandomPassword = () => {
    const length = 10;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      confirmEmail: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email inválido")
        .required("Campo Email é obrigatório"),
      confirmEmail: Yup.string()
        .oneOf([Yup.ref("email"), null], "Os emails não coincidem")
        .required("Campo Confirmar Email é obrigatório"),
    }),
    onSubmit: async (values) => {
      const randomPassword = generateRandomPassword();
      const requestData = {
        username: values.email,
        email: values.email,
        password: randomPassword,
        password2: randomPassword,
      };

      const result = await api.registerUser(requestData);

      if (result.success) {
        Alert.showSuccess("Usuário criado com sucesso!");
        formik.resetForm();
      } else {
        Alert.showError(result.message);
        formik.resetForm();
      }
    },
  });

  return formik;
};

export default useRegisterUser;
