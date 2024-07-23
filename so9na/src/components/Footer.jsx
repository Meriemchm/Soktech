import React,{useRef} from "react";
import { Link } from "react-router-dom";

const footer = ({scrollPage}) => {
    const scrollToDestination = () => {
        scrollPage.current.scrollIntoView({ behavior: 'smooth' });
      };
      const openEmailClient = () => {
        const mailtoLink = 'mailto:';
        window.location.href = mailtoLink;
      };
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-col">
                    <h4>Entreprise</h4>
                    <ul>
                        <li className="navbar-link" onClick={scrollToDestination}>
                           
                                {" "}
                                A propos
                           
                        </li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Aide</h4>
                    <ul>
                        <li className="navbar-link">
                            
                                {" "}
                                FAQ
                         
                        </li>
                        <li className="navbar-link" onClick={openEmailClient}>
                           
                                Contactez nous
                          
                        </li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Suit nous</h4>
                    <div className="social-links">
                        <Link to="/" className="social-link">
                            <i class="fab fa-facebook-f"></i>
                        </Link>
                        <Link to="/" className="social-link">
                            {" "}
                            <i class="fab fa-twitter"></i>
                        </Link>
                        <Link to="/" className="social-link">
                            <i class="fab fa-instagram"></i>
                        </Link>
                    </div>
                </div>
                <div className="footer-col">
                    <h4>Plus</h4>
                    <ul> <li className="navbar-link" >
                    <i class="fa fa-globe" /> Francais
                        </li> </ul>
                </div>
            </div>
        </footer>
    );
};

export default footer;
