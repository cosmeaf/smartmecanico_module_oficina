// hooks/useRegisterAddress.js

import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../services/api";
import Alert from "../components/Alert";

const useRegisterAddress = () => {
  const formik = useFormik({
    initialValues: {
      user: "",
      cep: "",
      logradouro: "",
      complemento: "",
      bairro: "",
      localidade: "",
      uf: "",
    },
    validationSchema: Yup.object({
      user: Yup.string().required("Campo Usuário é Obrigatório"),
      cep: Yup.string().required("Campo CEP é obrigatório"),
      logradouro: Yup.string().required("Campo Logradouro é obrigatório"),
      bairro: Yup.string().required("Campo Bairro é obrigatório"),
      localidade: Yup.string().required("Campo Localidade é obrigatório"),
      uf: Yup.string()
        .length(2, "UF precisa ter exatamente 2 caracteres")
        .required("Campo UF é obrigatório"),
    }),
    onSubmit: async (values) => {
      const requestData = {
        user: values.user,
        cep: values.cep,
        logradouro: values.logradouro,
        complemento: values.complemento,
        bairro: values.bairro,
        localidade: values.localidade,
        uf: values.uf,
      };
      console.log(requestData);

      const result = await api.addressPost(requestData);

      if (result.success) {
        Alert.showSuccess("Endereço adicionado com sucesso!");
        formik.resetForm();
      } else {
        Alert.showError(result.message);
        formik.resetForm();
      }
    },
  });

  return formik;
};

export default useRegisterAddress;
