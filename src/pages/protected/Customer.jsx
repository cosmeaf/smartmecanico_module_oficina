import React, { useState, useEffect } from "react"; // Adicione useEffect aqui
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import usersData from "../../data/userData.json";
import TopTable from "../../components/tables/TopTable";

const User = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [rowCount, setRowCount] = useState(10);

  useEffect(() => {
    const results = Object.values(usersData[0]).filter((user) =>
      Object.values(user.userData).some(
        (item) =>
          typeof item === "string" &&
          item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(results);
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="bg-white min-h-screen p-2 border rounded-md shadow-2xl">
      <TopTable
        onAddClicked={() => {}}
        handleSearchChange={handleSearchChange}
        handleRowCountChange={(e) => setRowCount(Number(e.target.value))}
        searchTerm={searchTerm}
      />
      <table className="min-w-full bg-white  overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Birthday</th>
            <th className="p-2">Contact</th>
            <th className="p-2" colSpan={2}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.slice(0, rowCount).map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border p-2">
                {user.userData.first_name} {user.userData.last_name}
              </td>
              <td className="border p-2">{user.userData.email}</td>
              <td className="border p-2">{user.userData.birthday}</td>
              <td className="border p-2">{user.userData.phone_number}</td>
              <td className="border p-2">
                <div className="flex justify-around items-center">
                  <AiOutlineEdit
                    size={25}
                    className="cursor-pointer"
                    onClick={() => {}}
                  />
                  <AiOutlineEye
                    className="cursor-pointer"
                    onClick={() => {}}
                    size={25}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>Pagination 1, 2, 3</tfoot>
      </table>
    </div>
  );
};

export default User;
