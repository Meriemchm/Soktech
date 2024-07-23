import React,{useRef} from 'react';

const About=({scrollPage})=> {
    return (
        <div className='About' ref= {scrollPage}>
            <div className="about-container">
         
                    <div className="first-image">
                <img src="about5.jpg" alt="" />
                </div>
              
                <div className="about-text">
                    <h1>A propos de nous</h1>
                    <p>Notre plateforme est un outil efficace pour vous aider à mettre en avant vos probleme et à déployer vos services en ligne.</p>
                </div>
            </div>
            
        </div>
    );
}

export default About;