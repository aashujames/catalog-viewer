import React, { useEffect, useState } from "react";
import "./App.css";
import Carousel from "./component/Carousel";

export type ImageData = {
    id: string;
    urls: {
        regular: string;
    };
};

const App: React.FC = () => {
    const [imageData, setImageData] = useState<ImageData[]>([]);

    const fetchImageData = async () => {
        const response = await fetch(
            `https://api.unsplash.com/photos/random?count=5&client_id=300-RlCoeK44MTP9xHOimlkG3C-4uN1EI9czkXJ8LOE`
        );
        const data = await response.json();
        setImageData(data);
    };
    useEffect(() => {
        fetchImageData();
    }, []);

    return (
        <div className="App">
            <Carousel imageData={imageData} />
        </div>
    );
};

export default App;
