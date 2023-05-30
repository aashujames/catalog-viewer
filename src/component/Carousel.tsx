import { useEffect, useState } from "react";
import { ImageData } from "../App";
import "./carousel.css";

type Props = {
    imageData: ImageData[];
};

const Carousel = ({ imageData }: Props) => {
    const [isSelected, setIsSelected] = useState<ImageData>(imageData[0]);

    const handleClick = (image: ImageData) => {
        setIsSelected(image);
    };

    useEffect(() => {
        setIsSelected(imageData[0]);
    }, [imageData]);

    return (
        <div className="main-container">
            <div className="top-container">
                <img src={isSelected?.urls.regular} className="top-image" />
            </div>
            <div className="bottom-container">
                {imageData.map((image) => (
                    <div onClick={() => handleClick(image)} key={image.id}>
                        <img
                            src={image.urls.regular}
                            alt={`Image ${image.id}`}
                            className="image"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
