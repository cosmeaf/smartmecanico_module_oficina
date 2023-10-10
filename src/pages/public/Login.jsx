import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { ReactComponent as Logo } from "../../image/logo.svg";
import { showMessage } from "../../components/Notification";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Required"),
});

const Login = () => {
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "cosme.alex@gmail.com",
      password: "qweasd32",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const status = await signIn(values.email, values.password);
      if (status) {
        navigate("/dashboard", { replace: true, state: { from: location } });
        showMessage({
          status: "success",
          message: "Login bem-sucedido!",
        });
      } else {
        showMessage({
          status: "error",
          message: "Falha no login. Tente novamente.",
        });
      }
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

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              className="w-full p-2 border rounded"
              type="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 mt-2 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between mt-4">
          <Link to="/recovery" className="text-green-500 hover:underline">
            Forgot Password?
          </Link>
          <Link to="/register" className="text-green-500 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
