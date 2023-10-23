import { useAuth } from "../context/AuthContext";
import BASE_URL from "./baseUrl";

const getHeaders = () => {
  const token = localStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

const smartFetch = async (url, options = {}) => {
  options.headers = {
    ...options.headers,
    ...getHeaders(),
  };

  const response = await fetch(url, options);

  if (response.status === 401) {
    const { signOut } = useAuth();
    signOut();
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  return response;
};

const api = {
  // VERIFY TOKEN
  tokenVerify: async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/verify/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      if (response.ok) {
        return { status: true, data };
      } else {
        return { status: false, data };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  },

  // REFRESH TOKEN
  tokenRefresh: async (refresh) => {
    try {
      const response = await fetch(`${BASE_URL}/refresh/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ refresh }),
      });

      const data = await response.json();
      if (response.ok) {
        return { status: true, data };
      } else {
        return { status: false, data };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  },

  // SIGN IN
  signIn: async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/login/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
      });

      const responseBody = await response.text();
      const data = JSON.parse(responseBody);

      if (response.ok) {
        return { status: true, data };
      } else {
        return { status: false, data };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  },

  // SIGN UP
  signUp: async (email, first_name, last_name, password, passconf) => {
    try {
      const response = await fetch(`${BASE_URL}/register/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          email,
          first_name,
          last_name,
          password,
          passconf,
        }),
      });

      const responseBody = await response.text();
      const data = JSON.parse(responseBody);
      if (response.ok) {
        return { status: true, data };
      } else {
        return { status: false, data };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  },

  // RECOVERY PASSWORD
  recoveryPassword: async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/password-recovery/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email }),
      });

      const responseBody = await response.text();
      const data = JSON.parse(responseBody);

      if (response.ok) {
        return { status: true, data };
      } else {
        return { status: false, data };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  },

  // RECOVERY PASSWORD
  otpValidation: async (otp) => {
    try {
      const response = await fetch(`${BASE_URL}/otp-validation/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ otp }),
      });

      const responseBody = await response.text();
      const data = JSON.parse(responseBody);

      if (response.ok) {
        return { status: true, data };
      } else {
        return { status: false, data };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  },

  // SIGN UP
  changePassword: async (password, passconf, token) => {
    try {
      const response = await fetch(`${BASE_URL}/password-reset/${token}/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ password, passconf }),
      });

      const data = await response.json();

      if (response.ok) {
        return { status: true, data };
      } else {
        return { status: false, data };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  },

  // GET USER
  getUser: async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await response.json();
      if (response.ok) {
        return { status: true, data };
      } else {
        return { status: false, data };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  },

  // GET USER BY ID
  getUserById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}/`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await response.json();
      if (response.ok) {
        return { status: true, data };
      } else {
        return { status: false, data };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  },

  // GET USER
  getUserByIdAllData: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}/all_data/`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await response.json();

      if (response.ok) {
        return { status: true, data };
      } else {
        return { status: false, data };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  },

  // POST USER
  postUser: async (email, first_name, last_name, phone_number) => {
    try {
      const response = await fetch(`${BASE_URL}/users/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, first_name, last_name, phone_number }),
      });

      const data = await response.json();
      if (response.ok) {
        return { status: true, data };
      } else {
        return { status: false, data };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  },

  // PUT USER
  putUser: async (email, first_name, last_name, phone_number, birthday) => {
    try {
      const response = await fetch(`${BASE_URL}/user/`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({
          email,
          first_name,
          last_name,
          phone_number,
          birthday: birthday || null,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        return { status: true, data };
      } else {
        return { status: false, data };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  },

  // PATCH USER
  patchUser: async (id, email, first_name, last_name, phone_number) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}/`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ email, first_name, last_name, phone_number }),
      });

      const data = await response.json();
      if (response.ok) {
        return { status: true, data };
      } else {
        return { status: false, data };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  },

  // REGISTER USER
  registerUser: async (requestData) => {
    try {
      const response = await fetch(`${BASE_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();

      if (response.ok && response.status === 201) {
        return { status: true, data };
      } else {
        const errorMessages = Object.values(data).flat().join(" ");
        return { status: false, message: errorMessages };
      }
    } catch (error) {
      return { status: false, message: "Ocorreu um erro inesperado." };
    }
  },

  // ADDRESS POST
  addressPost: async (
    user,
    cep,
    logradouro,
    complemento,
    bairro,
    localidade,
    uf
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/addresses/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          user,
          cep,
          logradouro,
          complemento,
          bairro,
          localidade,
          uf,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        return { status: true, data };
      } else {
        if (
          data.error &&
          data.error === "Given token not valid for any token type"
        ) {
          localStorage.removeItem("access_token");
        }
        throw new Error(data.error);
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  // ADDRESS GET
  getAddress: async () => {
    try {
      const response = await smartFetch(`${BASE_URL}/addresses/`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await response.json();
      if (response.ok) {
        return { status: true, data };
      } else {
        return { status: false, data };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  },
  // ADDRESS GET BY ID
  getAddressById: async (id) => {
    try {
      const response = await smartFetch(`${BASE_URL}/addresses/${id}`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await response.json();
      if (response.ok) {
        return { status: true, data };
      } else {
        return { status: false, data };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  },
  // ADDRESS PATCH
  addressPatch: async (
    id,
    cep,
    logradouro,
    complemento,
    bairro,
    localidade,
    uf
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/addresses/${id}/`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({
          cep,
          logradouro,
          complemento,
          bairro,
          localidade,
          uf,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        return { status: true, data };
      } else {
        if (
          data.error &&
          data.error === "Given token not valid for any token type"
        ) {
          localStorage.removeItem("access_token");
        }
        throw new Error(data.error);
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  // VEHICLE POST
  vehiclePost: async (brand, model, fuel, year, odometer, plate, user) => {
    try {
      const response = await fetch(`${BASE_URL}/vehicles/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          brand,
          model,
          fuel,
          year,
          odometer,
          plate,
          user,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        return { status: true, data };
      } else {
        if (
          data.error &&
          data.error === "Given token not valid for any token type"
        ) {
          localStorage.removeItem("access_token");
        }
        throw new Error(data.error);
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  vehicleGet: async () => {
    try {
      const response = await fetch(`${BASE_URL}/vehicles/`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await response.json();
      if (response.ok) {
        return { status: true, data };
      } else {
        throw new Error(data.message || "Erro no tokenVerify");
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  },

  // GET SERVICES
  servieGet: async () => {
    try {
      const response = await fetch(`${BASE_URL}/service/`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await response.json();
      if (response.ok) {
        return { status: true, data };
      } else {
        return { status: false, data };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  },

  // GET APPOINTMENT
  appointmentGet: async () => {
    try {
      const response = await fetch(`${BASE_URL}/appointment/`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await response.json();
      if (response.ok) {
        return { status: true, data };
      } else {
        return { status: false, data };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  },
};

export default api;
