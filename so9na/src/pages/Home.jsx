import React, { useRef } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Presentation from "../components/Presentation";
import AboutOld from "../components/AboutOld";
const Home = () => {
    const scrollPage = useRef(null);
    return (
        <div>
           
            <Presentation />
            <Card />
            <AboutOld scrollPage={scrollPage} /> 
            <Footer scrollPage={scrollPage} />
        </div>
    );
};

export default Home;
