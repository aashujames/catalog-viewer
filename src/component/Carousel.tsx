import { useEffect, useState } from "react";
import { ImageData } from "../App";
import "./carousel.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

type Props = {
    imageData: ImageData[];
};

const Carousel = ({ imageData }: Props) => {
    const [isSelected, setIsSelected] = useState<ImageData>(imageData[0]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleClick = (updatedIndex: number) => {
        setIsSelected(imageData[updatedIndex]);
        setSelectedIndex(updatedIndex);
    };

    useEffect(() => {
        setIsSelected(imageData[0]);
    }, [imageData]);

    const handleLeftImageChange = () => {
        let updatedIndex = selectedIndex - 1;
        if (updatedIndex < 0) {
            updatedIndex = imageData.length - 1;
        }
        handleClick(updatedIndex);
    };

    const handleRightImageChange = () => {
        let updatedIndex = selectedIndex + 1;
        if (updatedIndex >= imageData.length) {
            updatedIndex = 0;
        }
        handleClick(updatedIndex);
    };

    console.log(selectedIndex);

    return (
        <div className="main-container">
            <div className="top-container">
                <img src={isSelected?.urls.regular} className="top-image" />
            </div>
            <div className="bottom-container">
                <div className="arrow-back" onClick={handleLeftImageChange}>
                    <ArrowBackIosIcon />
                </div>
                {imageData.map((image, index) => (
                    <div onClick={() => handleClick(index)} key={image.id}>
                        <img
                            src={image.urls.regular}
                            alt={`Image ${image.id}`}
                            className="image"
                        />
                    </div>
                ))}
                <div className="arrow-right" onClick={handleRightImageChange}>
                    <ArrowForwardIosIcon />
                </div>
                <div>
                    <button></button>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
