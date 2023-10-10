// hooks/useViaCEP.js

import { useState } from "react";

const useViaCEP = () => {
  const [addressData, setAddressData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAddress = async (cep) => {
    setLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setError("CEP não encontrado.");
        setAddressData(null);
      } else {
        setError(null);
        setAddressData(data);
      }
    } catch (err) {
      setError("Erro ao buscar CEP.");
      setAddressData(null);
    } finally {
      setLoading(false);
    }
  };

  return { fetchAddress, addressData, loading, error };
};

export default useViaCEP;
