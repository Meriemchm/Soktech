import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Service from "./Service";
import { responsive } from "./Data";
import { useCategoryContext } from "../contexts/CategoryContext";
const Card = () => {
    const { categories } = useCategoryContext();
    const categoriesList = categories.map((categorie, index) => (
        <Service
            key={index}
            name={categorie.name}
            url={"http://localhost:8000/storage/categories/" + categorie.image}
        />
    ));

    return (
        <>
            <div className="card-header">
                <h1>Solution</h1>
            </div>
            <div className="Card">
                <Carousel showDots={true} responsive={responsive}>
                    {categoriesList}
                </Carousel>
            </div>
        </>
    );
};
export default Card;
