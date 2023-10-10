import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../services/api";
import Alert from "../../components/Alert";
import ButtonBack from "../../components/buttons/ButtonBack";
import { BsPersonAdd, BsSkipBackwardFill } from "react-icons/bs";
import SmartButton from "../../components/buttons/SmartButton";

const fetchViaCEP = async (cep) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (!data.erro) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching CEP:", error);
    return null;
  }
};

const Address = () => {
  const navigate = useNavigate();

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
      user: Yup.string()
        .email("E-mail inválido")
        .required("Campo usuário é obrigatório"),
      cep: Yup.string()
        .length(8, "O CEP deve ter 8 caracteres")
        .required("Campo CEP é obrigatório"),
      logradouro: Yup.string().required("Campo Logradouro é obrigatório"),
      complemento: Yup.string().required("Campo Complemento é obrigatório"),
      bairro: Yup.string().required("Campo Bairro é obrigatório"),
      localidade: Yup.string().required("Campo Localidade é obrigatório"),
      uf: Yup.string()
        .length(2, "UF precisa ter exatamente 2 caracteres")
        .required("Campo UF é obrigatório"),
    }),
    onSubmit: async (values) => {
      const { user, cep, logradouro, complemento, bairro, localidade, uf } =
        values;

      const result = await api.addressPost(
        user,
        cep,
        logradouro,
        complemento,
        bairro,
        localidade,
        uf
      );
      if (result.status) {
        Alert.showSuccess("Endereço adicionado com sucesso!");
        formik.resetForm();
      } else {
        Alert.showError(result.message);
      }
    },
  });

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Lista de Endereços</h1>
        <div className="flex gap-2">
          <SmartButton
            variant="btnPrimary"
            icon={BsSkipBackwardFill}
            title="Dashboard"
            onClick={() => navigate("/dashboard")}
          />
          <SmartButton
            variant="btnInfo"
            icon={BsPersonAdd}
            title="Novo"
            onClick={() => navigate("/dashboard/user-register")}
          />
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md my-2 p-4">
        <h2 className="text-xl font-semibold mb-4">Address</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="user">
                Usuário:
              </label>
              <input
                className="border rounded w-full py-2 px-3"
                type="text"
                id="user"
                name="user"
                onChange={formik.handleChange}
                value={formik.values.user}
              />
              {formik.touched.user && formik.errors.user && (
                <div className="text-red-600">{formik.errors.user}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="cep">
                CEP:
              </label>
              <input
                className="border rounded w-full py-2 px-3"
                type="text"
                id="cep"
                name="cep"
                onChange={formik.handleChange}
                onBlur={async (e) => {
                  const cepValue = e.target.value;
                  if (cepValue && cepValue.length === 8) {
                    const data = await fetchViaCEP(cepValue);
                    if (data) {
                      formik.setFieldValue("logradouro", data.logradouro);
                      formik.setFieldValue("bairro", data.bairro);
                      formik.setFieldValue("localidade", data.localidade);
                      formik.setFieldValue("uf", data.uf);
                    }
                  }
                }}
                value={formik.values.cep}
              />
              {formik.touched.cep && formik.errors.cep && (
                <div className="text-red-600">{formik.errors.cep}</div>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="logradouro"
              >
                Logradouro:
              </label>
              <input
                className="border rounded w-full py-2 px-3"
                type="text"
                id="logradouro"
                name="logradouro"
                onChange={formik.handleChange}
                value={formik.values.logradouro}
              />
              {formik.touched.logradouro && formik.errors.logradouro && (
                <div className="text-red-600">{formik.errors.logradouro}</div>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="complemento"
              >
                Complemento:
              </label>
              <input
                className="border rounded w-full py-2 px-3"
                type="text"
                id="complemento"
                name="complemento"
                onChange={formik.handleChange}
                value={formik.values.complemento}
              />
              {formik.touched.complemento && formik.errors.complemento && (
                <div className="text-red-600">{formik.errors.complemento}</div>
              )}
            </div>
            <div className="form-group mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="bairro">
                Bairro:
              </label>
              <input
                className="border rounded w-full py-2 px-3"
                type="text"
                id="bairro"
                name="bairro"
                onChange={formik.handleChange}
                value={formik.values.bairro}
              />
              {formik.touched.bairro && formik.errors.bairro && (
                <div className="text-red-600">{formik.errors.bairro}</div>
              )}
            </div>
            <div className="form-group mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="localidade"
              >
                Localidade:
              </label>
              <input
                className="border rounded w-full py-2 px-3"
                type="text"
                id="localidade"
                name="localidade"
                onChange={formik.handleChange}
                value={formik.values.localidade}
              />
              {formik.touched.localidade && formik.errors.localidade && (
                <div className="text-red-600">{formik.errors.localidade}</div>
              )}
            </div>
            <div className="form-group mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="uf">
                UF:
              </label>
              <input
                className="border rounded w-full py-2 px-3"
                type="text"
                id="uf"
                name="uf"
                onChange={formik.handleChange}
                value={formik.values.uf}
              />
              {formik.touched.uf && formik.errors.uf && (
                <div className="text-red-600">{formik.errors.uf}</div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white rounded px-4 py-2 mb-10"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Address;
