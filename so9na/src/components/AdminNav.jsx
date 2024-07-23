import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useNavigate , useLocation } from "react-router-dom";

const AdminNav = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleOpen = () => setOpen(!open);
  // define a function to handle navigation
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="admin-nav">
        <div className="admin-nav-container">
          <h1 className="admin-nav-title">Admin</h1>
          <div className="admin-nav-items">
            <h4 onClick={() => handleNavigate("/admin")}>Principale</h4>
          </div>
        </div>
        <div className="admin-nav-container">
          <div className="admin-nav-items">
            <h4>Gerer</h4>
            <ul className="admin-nav-item">
              <li onClick={() => handleNavigate("/admin/user")}>Utilisateur</li>
              <li onClick={() => handleNavigate("/admin/category")}>Categorie</li>
              <li onClick={() => { toggleOpen();}}>Formulaire <i class="fas fa-caret-down"></i></li>
              {open && (
            <ul className="admin-nav-item">
              <li
                className={
                  location.pathname === "/admin/form/ajout"
                    ? "active"
                    : undefined
                }
              >
                <Link className="admin-nav-item-link" to="/admin/form/ajout">Ajout Formulaire Categorie Probleme</Link>
              </li>
              <li
                className={
                  location.pathname === "/admin/form/solution"
                    ? "active"
                    : undefined
                }
              >
                <Link  className="admin-nav-item-link" to="/admin/form/solution">Formulaire solution</Link>
              </li>
              <li
                className={
                  location.pathname === "/admin/form/probleme"
                    ? "active"
                    : undefined
                }
              >
                <Link  className="admin-nav-item-link" to="/admin/form/probleme">Formulaire problème</Link>
              </li>
              {/* <li
                className={
                  location.pathname === "/admin/form/interessedSolution"
                    ? "active"
                    : undefined
                }
              >
                <Link  className="admin-nav-item-link" to="/admin/form/interessedSolution">
                  Formulaire intéressé par une solution
                </Link>
              </li>
              <li
                className={
                  location.pathname === "/admin/form/interessedProbleme"
                    ? "active"
                    : undefined
                }
              >
                <Link  className="admin-nav-item-link" to="/admin/form/interessedProbleme">
                  Formulaire intéressé par un problème
                </Link>
              </li> */}
            </ul>
          )}
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default AdminNav;
