import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProjects from "./pages/AddProjects";
import AddService from "./pages/AddService";
import Browse from "./pages/Browse";
import BrowseDetails from "./pages/BrowseDetails";
import CardDetail from "./pages/CardDetail";
import Categorie from "./pages/Categorie";
import CreateService from "./pages/CreateService";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import AdminNav from "./components/AdminNav";
import NotFound from "./pages/NotFound";
import NotificationMobile from "./pages/NotificationMobile";
import Progression from "./pages/Progression";
import OrderService from "./pages/OrderService";
import Profil from "./pages/Profil";
import ProfilVisit from "./pages/ProfilVisit";
import ProjectList from "./components/ProjectList";
import FormulaireAdd from "./components/FormulaireAdd";
import FormulaireGet from "./components/FormulaireGet";
import CreateNotification from "./components/CreateNotification";
import ServiceList from "./components/ServiceList";
import InteressedForm from "./pages/InteressedForm";
import FormInteressedSolution from "./pages/FormInteressedSolution";
import Admin from "./pages/Admin";
import AdminUser from "./pages/AdminUser";
import AdminForm from "./pages/AdminForm";
import AdminCategory from "./pages/AdminCategory";
import AdminFormProbleme from "./pages/AdminFormProbleme";
import AdminFormSolution from "./pages/AdminFormSolution";
import AdminFormInteressedProbleme from "./pages/AdminFormInteressedProbleme";
import AdminFormInteressedSolution from "./pages/AdminFormInteressedSolution";
{/* importation de tout les composant en haut */}
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="admin" element={<AdminNav />} >
                        <Route index element={<Admin />} />
                        <Route path="user" element={<AdminUser/>}/>
                        <Route path="category" element={<AdminCategory/>}/>
                        <Route path="form/ajout" element={<AdminForm/>}/>
                        <Route path="form/probleme" element={<AdminFormProbleme/>}/>
                        <Route path="form/solution" element={<AdminFormSolution/>}/>
                        <Route path="form/interessedProbleme" element={<AdminFormInteressedProbleme/>}/>
                        <Route path="form/interessedSolution" element={<AdminFormInteressedSolution/>}/>
                        </Route>
            {/* Categorie routes */}
            <Route path="categorie" element={<Categorie />} />
            <Route path="categorie/cardDetail/:id" element={<CardDetail />} />
            <Route path="categorie/cardDetail/:id/form/:id" element={<FormInteressedSolution />} />
            <Route path="categorie/cardDetail/orderService" element={<OrderService />} />
            <Route path="categorie/profilUser/:id" element={<ProfilVisit />} />
            <Route path="browse/profilUser/:id" element={<ProfilVisit />} />
            <Route path="categorie/cardDetail/:id/profilUser/:id" element={<ProfilVisit />} />
            <Route path="browse/browseDetail/:id/profilUser/:id" element={<ProfilVisit />} />
            {/* Profil routes */}
            <Route path="profilUser" element={<Profil />} />
            <Route path="profilUser/createService" element={<CreateService />} />
            <Route path="profilUser/addService" element={<AddService />} />
            <Route path="profilUser/addProject" element={<AddProjects />} />
            <Route path="profilUser/cardDetail/:id" element={<CardDetail />} />
            <Route path="profilUser/browseDetail/:id" element={<BrowseDetails />} /> 
            {/* Other routes */}
            <Route path="notification" element={<NotificationMobile />} />
            <Route path="Progression" element={<Progression />} />
            <Route path="browse" element={<Browse />} />
            <Route path="browse/browseDetail/:id" element={<BrowseDetails />} />
            <Route path="browse/browseDetail/:id/interessedform" element={<InteressedForm/>} />
            <Route path="servicelist" element={<ServiceList />} />
            <Route path="projectlist" element={<ProjectList />} />
            <Route path="/addService" element={<AddService />} />
            <Route path="/addProject" element={<AddProjects />} />
            <Route path="/createService" element={<CreateService />}/>
            {/* routes for test */}
            <Route path="formulaireadd" element={<FormulaireAdd />} />
            <Route path="formulaireget" element={<FormulaireGet />} />
            <Route path="createnotification" element={<CreateNotification />} />
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
