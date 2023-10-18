import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../image/logo-light.svg";
import {
  BsArrowLeftShort,
  BsCalendarDate,
  BsChevronDown,
} from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { VscTools } from "react-icons/vsc";
import { FaCogs, FaSignOutAlt } from "react-icons/fa";

const Menus = [
  { title: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
  {
    title: "Clientes",
    icon: AiOutlineUser,
    submenu: true,
    submenuItems: [
      { title: "Clientes", link: "/dashboard/user" },
      {
        title: "Endereços",
        link: "/dashboard/address",
      },
      {
        title: "Veículos",
        link: "/dashboard/vehicle",
      },
    ],
  },
  { title: "Serviços", link: "/dashboard/services", icon: VscTools },
  {
    title: "Agendamentos",
    link: "/dashboard/appointment",
    icon: BsCalendarDate,
  },
  { title: "Configurações", link: "/dashboard", icon: FaCogs },
  { title: "Sair", link: "/dashboard", icon: FaSignOutAlt },
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const closeSidebarOnSmallScreens = () => {
    if (window.innerWidth < 1440) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", closeSidebarOnSmallScreens);
    closeSidebarOnSmallScreens();
    return () => {
      window.removeEventListener("resize", closeSidebarOnSmallScreens);
    };
  }, []);

  return (
    <div
      className={`bg-[#040404] text-white transition-all duration-500 ${
        open ? "shadow-lg w-72" : "w-20"
      } relative`}
    >
      <BsArrowLeftShort
        className={`bg-gray-200 text-gray-900 text-3xl rounded-md -right-3 top-20 absolute cursor-pointer transition-transform duration-500 ${
          open ? "rotate-180" : "rotate-0"
        }`}
        onClick={() => setOpen(!open)}
      />
      <div
        className={`flex justify-between items-center py-5 mt-5 duration-500 ${
          open ? "px-5" : "px-4"
        }`}
      >
        <img
          src={Logo}
          alt="Smart Mecânico"
          width={50}
          className="cursor-pointer"
        />
        <h1
          className={`whitespace-pre origin-left text-xl transition-all duration-500 ${
            !open && "opacity-0 translate-x-28 overflow-hidden "
          }`}
        >
          Smart Mecânico
        </h1>
      </div>

      <ul className="p-2">
        {Menus.map(
          ({ title, link, icon: Icon, submenu, submenuItems }, index) => (
            <li key={index}>
              <NavLink
                to={link}
                activeClassName="active"
                className="text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 transition-transform duration-300 hover:bg-gray-100 hover:text-gray-900"
              >
                <span className={`text-2xl ${open ? "px-0" : "px-3"}`}>
                  {React.createElement(Icon)}
                </span>
                <span
                  className={`whitespace-pre origin-left text-xl flex-1 transition-all duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden "
                  }`}
                >
                  {title}
                </span>
                {submenu && (
                  <BsChevronDown
                    className={`transition-transform duration-500 ${
                      submenuOpen ? "rotate-180" : ""
                    }`}
                    onClick={() => setSubmenuOpen(!submenuOpen)}
                  />
                )}
              </NavLink>

              {submenu && submenuOpen && open && (
                <ul>
                  {submenuItems.map(({ title, link }, index) => (
                    <li key={index}>
                      <NavLink
                        to={link}
                        activeClassName="active"
                        className="text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 transition-transform duration-300 hover:bg-gray-100 hover:text-gray-950"
                      >
                        {title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
