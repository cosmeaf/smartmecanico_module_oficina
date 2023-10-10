import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { ReactComponent as Logo } from "../../image/logo.svg";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Required"),
});

const Recovery = () => {
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <Logo className="mx-auto w-32 mb-4 mt-10" />
      <h1 className="text-2xl font-semibold mb-6">Bem Vindo de volta</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              className="w-full p-2 border rounded"
              type="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 mt-2 text-sm">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Send
          </button>
        </form>
        <div className="flex justify-between mt-4">
          <Link to="/login" className="text-green-500 hover:underline">
            Sign In
          </Link>
          <Link to="/register" className="text-green-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
