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

  // GET USER
  getUser: async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        return { status: true, data };
      } else {
        throw new Error(data.message || "Erro no tokenVerify");
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  },

  // POST USER
  postUser: async (username, email, first_name, last_name) => {
    try {
      const response = await fetch(`${BASE_URL}/user/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ username, email, first_name, last_name }),
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

  // PUT USER
  putUser: async (username, email, first_name, last_name) => {
    try {
      const response = await fetch(`${BASE_URL}/user/`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ username, email, first_name, last_name }),
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

  // PATCH USER
  patchUser: async (username, email, first_name, last_name) => {
    try {
      const response = await fetch(`${BASE_URL}/user/`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ username, email, first_name, last_name }),
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
};

export default api;
