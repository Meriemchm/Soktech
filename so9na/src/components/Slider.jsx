import React from "react";
import Carousel from "react-multi-carousel";
import {  Imageresponsive } from "./Data";

export const SliderService = ({imageService}) => {
   
     
           
       
    
    return (
        <div className="container-slider">
            <Carousel
                showDots={true}
                responsive={Imageresponsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
            >
              <div className="Image-Slider" >
                <img src={imageService} alt="service"></img>
            </div>
            </Carousel>
        </div>
    );
}
export const SliderProject = ({imageProject})=> {
   
     
           
    
    return (
        <div className="container-slider">
            <Carousel
                showDots={true}
                responsive={Imageresponsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
            >
              <div className="Image-Slider" >
                <img src={imageProject} alt="project"/>
            </div>
            </Carousel>
        </div>
    );
}