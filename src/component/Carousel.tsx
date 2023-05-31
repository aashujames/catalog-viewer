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

    useEffect(() => {
        let intervalId: number | undefined;

        if (isPlaying) {
            intervalId = window.setInterval(() => {
                let updatedIndex = selectedIndex + 1;
                if (updatedIndex >= imageData.length) {
                    updatedIndex = 0;
                }
                handleClick(updatedIndex);
            }, 3000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isPlaying, selectedIndex, imageData]);

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

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="main-container">
            <div className="top-container">
                <div className="top-image-section">
                    <img src={isSelected?.urls.regular} className="top-image" />
                </div>
                <div className="description-section">
                    <h3>Image{selectedIndex + 1} Details</h3>
                    <p className="para">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Id corporis adipisci tempore aperiam optio mollitia
                        atque vel nihil animi facilis eaque, voluptatem error
                        reiciendis ipsam accusamus, eius ut voluptatum illo
                        iusto vitae nam et labore! In fugiat minima, et, sed at
                        quaerat non fuga cumque laborum dolorem autem totam
                        quis?
                    </p>
                </div>
            </div>
            <div className="bottom-container">
                <div
                    onClick={handleLeftImageChange}
                    className="arrow-back-section"
                >
                    <ArrowBackIosIcon className="arrow-back" />
                </div>
                {imageData.map((image, index) => (
                    <div onClick={() => handleClick(index)} key={image.id}>
                        <img
                            src={image.urls.regular}
                            alt={`Image ${image.id}`}
                            className="selected-image"
                        />
                    </div>
                ))}
                <div className="arrow-right" onClick={handleRightImageChange}>
                    <ArrowForwardIosIcon />
                </div>
                <div>
                    <button onClick={handlePlayPause}>
                        {isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
