import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { BsSave2Fill } from "react-icons/bs";
import { SmartForm, SmartInput } from "../../components/forms";
import { FaCar, FaMotorcycle, FaTruck } from "react-icons/fa";
import SmartButton from "../../components/buttons/SmartButton";
import { showMessage } from "../../components/Notification";
import api from "../../services/api";

const FIPE_API = "https://parallelum.com.br/fipe/api/v2";

const VehicleAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [selectedType, setSelectedType] = useState("");
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brandId, setBrandId] = useState("");
  const [brandName, setBrandName] = useState("");

  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [modelId, setModelId] = useState("");
  const [modelName, setModelName] = useState("");

  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [yearId, setYearId] = useState("");
  const [yearName, setYearName] = useState("");
  const [fuelName, setFuelName] = useState("");

  const [price, setPrice] = useState("");
  const [odometer, setOdometer] = useState("");
  const [plate, setPlate] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await api.getUser();
      const userOption = response.data.map((user) => ({
        value: user.id,
        label: user.email,
      }));
      setUsers(userOption);
    };
    fetchUsers();
  }, [selectedUser]);

  useEffect(() => {
    if (selectedType) {
      getBrands(selectedType);
    }
  }, [selectedType]);

  useEffect(() => {
    if (selectedType && selectedBrand) {
      getModels(selectedType, brandId);
    }
  }, [selectedType, selectedBrand]);

  useEffect(() => {
    if (selectedType && selectedBrand && selectedModel) {
      getYears(selectedType, brandId, modelId);
    }
  }, [selectedBrand, selectedModel]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedYear("");
    getBrands(type);
  };

  const getBrands = async (type) => {
    try {
      const response = await fetch(`${FIPE_API}/${type}/brands`);
      if (response.ok) {
        const data = await response.json();
        const brandOption = data.map((brand) => ({
          value: brand.code,
          label: brand.name,
        }));
        setBrands(brandOption);
      } else {
        console.error("Erro ao buscar marcas.");
      }
    } catch (error) {
      console.error("Erro ao buscar marcas:", error);
    }
  };

  const getModels = async (type, brandId) => {
    const brandID = brandId.value;
    try {
      const response = await fetch(
        `${FIPE_API}/${type}/brands/${brandID}/models`
      );
      if (response.ok) {
        const data = await response.json();
        const modelOption = data.map((model) => ({
          value: model.code,
          label: model.name,
        }));
        setModels(modelOption);
      } else {
        console.error("Erro ao buscar marcas.");
      }
    } catch (error) {
      console.error("Erro ao buscar marcas:", error);
    }
  };

  const getYears = async (type, brandId, modelId) => {
    const brandID = brandId.value;
    const modelID = modelId.value;
    try {
      const response = await fetch(
        `${FIPE_API}/${type}/brands/${brandID}/models/${modelID}/years`
      );
      if (response.ok) {
        const data = await response.json();
        const yearOption = data.map((year) => ({
          value: year.code,
          label: year.name,
        }));
        setYears(yearOption);
      } else {
        console.error("Erro ao buscar marcas.");
      }
    } catch (error) {
      console.error("Erro ao buscar marcas:", error);
    }
  };

  const getPrice = async (type, brandId, modelId, yearId) => {
    const brandID = brandId.value;
    const modelID = modelId.value;
    const yearID = yearId.value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const brandName =
      selectedBrand && selectedBrand.label ? selectedBrand.label : null;
    const modelName = selectedModel.label ? selectedModel.label : null;
    const fuel = fuelName;
    const year = yearName;
    const odometer = form.odometer.value;
    const plate = form.plate.value;
    const user = selectedUser && selectedUser.label ? selectedUser.label : null;

    if (!brandName || !modelName || !fuel || !year || !plate || !user) {
      showMessage({
        status: "warning",
        message: "Por favor, preencha todos os campos obrigatórios.",
      });
      return;
    }

    try {
      const response = await api.vehiclePost(
        brandName,
        modelName,
        fuel,
        year,
        odometer,
        plate,
        user
      );
      if (response.status) {
        navigate("/dashboard/vehicle", {
          replace: true,
          state: { from: location },
        });
        showMessage({
          status: "success",
          message: "Veículo Cadastrado com Sucesso",
        });
      } else {
        showMessage({
          status: "error",
          message: `${response.data.plate}`,
        });
      }
    } catch (error) {
      showMessage({ status: "error", message: error.message });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Cadastro de Veículo</h1>
      </div>

      <div className="bg-white shadow-md rounded-md my-2 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-100 rounded-md shadow-md">
          <div className="flex justify-around items-center p-4">
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
          {/* FORM */}
          <SmartForm onSubmit={handleSubmit}>
            <Select
              placeholder="Selecione uma Cliente"
              value={selectedUser}
              onChange={(userOption) => setSelectedUser(userOption)}
              options={users}
              isSearchable={true}
              className="p-4"
            />
            <Select
              placeholder="Selecione uma Marca..."
              value={selectedBrand}
              onChange={(brandOption) => {
                setSelectedBrand(brandOption);
                setBrandId(brandOption);
                setBrandName(brandOption.label);
                setSelectedModel("");
                setSelectedYear("");
              }}
              options={brands}
              isSearchable={true}
              className="p-4"
            />

            <Select
              placeholder="Selecione uma Modelo..."
              value={selectedModel}
              onChange={(modelOption) => {
                setSelectedModel(modelOption);
                setModelId(modelOption);
                setSelectedYear("");
              }}
              options={models}
              isSearchable={true}
              className="p-4"
            />

            <Select
              placeholder="Selecione uma Ano..."
              value={selectedYear}
              onChange={(yearOption) => {
                setSelectedYear(yearOption);
                setYearId(yearOption);
                const [year, fuel] = yearOption.label.split(" ");
                setYearName(year);
                setFuelName(fuel);
              }}
              options={years}
              isSearchable={true}
              className="p-4"
            />
            <div className="px-4 mb-4">
              <SmartInput name="odometer" placeholder="Hodomêtro" />
              <SmartInput name="plate" placeholder="Placa" />
              <SmartButton
                type="submit"
                variant="btnPrimary"
                icon={BsSave2Fill}
                title="Salvar"
              />
            </div>
          </SmartForm>
        </div>
      </div>
    </div>
  );
};

export default VehicleAdd;
