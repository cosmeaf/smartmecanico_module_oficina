import React, { useEffect, useState } from "react";
import { FaCar, FaMotorcycle, FaTruck } from "react-icons/fa";
import ButtonBack from "../../components/buttons/ButtonBack";
import api from "../../services/api";
import Alert from "../../components/Alert";

const FIPE_API = "https://parallelum.com.br/fipe/api/v2";

const VehicleAdd = () => {
  const [selectedType, setSelectedType] = useState("");
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brandName, setBrandName] = useState("");

  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [modelName, setModelName] = useState("");

  const [selectedYear, setSelectedYear] = useState("");
  const [yearName, setYearName] = useState("");
  const [fuelName, setFuelName] = useState("");

  const [years, setYears] = useState([]);
  const [price, setPrice] = useState("");
  const [odometer, setOdometer] = useState("");
  const [plate, setPlate] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleTypeChange = (type) => {
    setSelectedType(type);
    getBrand(type);
  };

  const getBrand = async (type) => {
    try {
      const response = await fetch(`${FIPE_API}/${type}/brands`);
      if (response.ok) {
        const data = await response.json();
        setBrands(data);
      } else {
        console.error("Erro ao buscar marcas.");
      }
    } catch (error) {
      console.error("Erro ao buscar marcas:", error);
    }
  };

  const getModels = async (brand) => {
    try {
      const response = await fetch(
        `${FIPE_API}/${selectedType}/brands/${brand}/models`
      );
      if (response.ok) {
        const data = await response.json();
        setModels(data);
      } else {
        console.error("Erro ao buscar modelos.");
      }
    } catch (error) {
      console.error("Erro ao buscar modelos:", error);
    }
  };

  const getYears = async (model) => {
    try {
      const response = await fetch(
        `${FIPE_API}/${selectedType}/brands/${selectedBrand}/models/${model}/years`
      );
      if (response.ok) {
        const data = await response.json();
        setYears(data);
      } else {
        console.error("Erro ao buscar anos.");
      }
    } catch (error) {
      console.error("Erro ao buscar anos:", error);
    }
  };

  const getPrice = async (type, brand, model, years) => {
    try {
      const response = await fetch(
        `${FIPE_API}/${type}/brands/${brand}/models/${model}/years/${years}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPrice(data);
      } else {
        console.error("Erro ao buscar preço.");
      }
    } catch (error) {
      console.error("Erro ao buscar preço:", error);
    }
  };

  useEffect(() => {
    if (selectedBrand) {
      getModels(selectedBrand);
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedModel) {
      getYears(selectedModel);
    }
  }, [selectedModel]);

  useEffect(() => {
    if (selectedYear) {
      getPrice(selectedType, selectedBrand, selectedModel, selectedYear);
    }
  }, [selectedYear]);

  const validateForm = () => {
    let newErrors = {};

    if (!selectedBrand) {
      newErrors.brand = "Marca é obrigatória.";
    }

    if (!selectedModel) {
      newErrors.models = "Modelo é obrigatório.";
    }

    if (!selectedYear) {
      newErrors.years = "Ano é obrigatório.";
    }

    if (!odometer || odometer <= 0) {
      newErrors.odometer = "Hodômetro inválido.";
    }

    if (!plate || plate.length < 7) {
      newErrors.plate = "Placa inválida.";
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Email inválido.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedYear("");
    setOdometer("");
    setPlate("");
    setEmail("");
    setBrandName("");
    setModelName("");
    setYearName("");
    setFuelName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData(e.target);
      const odometer = formData.get("odometer");
      const plate = formData.get("plate");
      const email = formData.get("email");
      try {
        const result = await api.vehiclePost(
          brandName,
          modelName,
          fuelName,
          yearName,
          odometer,
          plate,
          email
        );

        if (result.status) {
          Alert.showSuccess("Veículo adicionado com sucesso!");
          clearForm();
        } else {
          Alert.showError(result.message);
        }
      } catch (error) {
        console.error("Erro ao enviar dados:", error);
        Alert.showError("Erro ao adicionar o veículo.");
      }
    } else {
      console.error("Formulário possui erros!");
      Alert.showError(
        "Por favor, corrija os erros no formulário antes de enviar."
      );
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Lista de Veículos</h1>
        <ButtonBack />
      </div>
      <div className="bg-white shadow-md rounded-md my-2 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-2 rounded-md shadow-md">
          <h1 className="text-lg mb-4 font-semibold">
            Selecione o tipo de veículo:
          </h1>
          {/* Radio Button */}
          <div className="flex justify-around items-center mb-5">
            <label className="radio-label flex gap-2">
              <input
                type="radio"
                name="vehicleType"
                value="cars"
                checked={selectedType === "cars"}
                onChange={() => handleTypeChange("cars")}
              />
              <FaCar className="radio-icon" size={25} />
            </label>
            <label className="radio-label flex gap-2">
              <input
                type="radio"
                name="vehicleType"
                value="motorcycles"
                checked={selectedType === "motorcycles"}
                onChange={() => handleTypeChange("motorcycles")}
              />
              <FaMotorcycle className="radio-icon" size={25} />
            </label>
            <label className="radio-label flex gap-2">
              <input
                type="radio"
                name="vehicleType"
                value="trucks"
                checked={selectedType === "trucks"}
                onChange={() => handleTypeChange("trucks")}
              />
              <FaTruck className="radio-icon" size={25} />
            </label>
          </div>
          {/* Form Data */}
          <form method="POST" onSubmit={handleSubmit}>
            {/* Brand */}
            <div>
              <label
                htmlFor="brand"
                className="block mb-2 font-bold text-sm text-gray-900 dark:text-white"
              >
                Marca:
              </label>
              <select
                id="brand"
                name="brand"
                value={selectedBrand}
                onChange={(e) => {
                  const selectedBrand = brands.find(
                    (brand) => brand.code === e.target.value
                  );
                  if (selectedBrand) {
                    setSelectedBrand(e.target.value);
                    setBrandName(selectedBrand.name);
                  }
                }}
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option value="">Selecione uma marca</option>
                {brands.map((brand) => (
                  <option key={brand.code} value={brand.code}>
                    {brand.name}
                  </option>
                ))}
              </select>
              {errors.brand && (
                <p className="text-sm text-red-500 mt-1">{errors.brand}</p>
              )}
            </div>
            {/* Model */}
            <div>
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
              >
                Modelo:
              </label>
              <select
                id="models"
                name="models"
                value={selectedModel}
                onChange={(e) => {
                  const selectedModel = models.find(
                    (model) => model.code === e.target.value
                  );
                  if (selectedModel) {
                    setSelectedModel(e.target.value);
                    setModelName(selectedModel.name);
                  }
                }}
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option value="">Selecione um Modelo</option>
                {models.map((models) => (
                  <option key={models.code} value={models.code}>
                    {models.name}
                  </option>
                ))}
              </select>
              {errors.models && (
                <p className="text-sm text-red-500 mt-1">{errors.models}</p>
              )}
            </div>
            {/* Year */}
            <div>
              <label
                htmlFor="years"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
              >
                Ano:
              </label>
              <select
                id="years"
                name="years"
                value={selectedYear}
                onChange={(e) => {
                  const selectedYearData = years.find(
                    (year) => year.code === e.target.value
                  );
                  if (selectedYearData) {
                    const [yearPart, fuelPart] =
                      selectedYearData.name.split(" ");
                    setSelectedYear(e.target.value);
                    setFuelName(fuelPart);
                    setYearName(yearPart);
                  }
                }}
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option value="">Selecione um Ano</option>
                {years.map((years) => (
                  <option key={years.code} value={years.code}>
                    {years.name}
                  </option>
                ))}
              </select>
              {errors.years && (
                <p className="text-sm text-red-500 mt-1">{errors.years}</p>
              )}
            </div>
            {/* Hodometro */}
            <div className="mb-6">
              <label
                htmlFor="odometer"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Hodometro:
              </label>
              <input
                type="text"
                id="odometer"
                name="odometer"
                value={odometer}
                onChange={(e) => setOdometer(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="130259"
                required
              />
              {errors.odometer && (
                <p className="text-sm text-red-500 mt-1">{errors.odometer}</p>
              )}
            </div>
            {/* Plate */}
            <div className="mb-6">
              <label
                htmlFor="plate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Placa:
              </label>
              <input
                type="text"
                id="plate"
                name="plate"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="LQV1965"
                required
              />
              {errors.plate && (
                <p className="text-sm text-red-500 mt-1">{errors.plate}</p>
              )}
            </div>
            {/* User */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="john.doe@company.com"
                required
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
            <button
              type="submit"
              className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
            >
              Salvar
            </button>
          </form>
        </div>
        {/* Second Column */}
        <div className="bg-gray-100 p-4 rounded-md shadow-lg">
          <h1 className="text-lg mb-4 font-semibold text-gray-700 border-b pb-2">
            Dados Tabela Fipe:
          </h1>
          <div className="mt-4 space-y-2">
            {price.brand && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Marca:</span>
                <span className="text-gray-800">{price.brand}</span>
              </div>
            )}
            {price.model && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Modelo:</span>
                <span className="text-gray-800">{price.model}</span>
              </div>
            )}
            {price.fuel && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Combustível:</span>
                <span className="text-gray-800">{price.fuel}</span>
              </div>
            )}
            {price.year && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">
                  Ano do Modelo:
                </span>
                <span className="text-gray-800">{price.year}</span>
              </div>
            )}
            {price.price && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Preço:</span>
                <span className="text-gray-800">{price.price}</span>
              </div>
            )}
            {price.referenceMonth && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">
                  Mês de Referência:
                </span>
                <span className="text-gray-800">{price.referenceMonth}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleAdd;
