import React, {useEffect, useRef, useState} from 'react';
import OfferPanel from "../components/OfferPanel";
import OfferMap from "../components/OfferMap";
import {IFlat} from "../models/IFlat";

const StartPage = () => {
    const thisRef = useRef<HTMLDivElement>(null);
    const [flats, setFlats] = useState<IFlat[]>([]);
    const offerRef: any = useRef();
    const yMapRef: any = useRef();

    useEffect(() => {
        if(offerRef.current) {
            const resizeMap = () => {
                if(yMapRef.current) {
                    const map: any = yMapRef.current;
                    const mapContainer: any = map.container.getElement().parentElement.parentElement;
                    mapContainer.classList.toggle('map-container-small');
                    map.container.fitToViewport();
                }
            }
            offerRef.current.addEventListener("shown.bs.offcanvas", resizeMap);
            offerRef.current.addEventListener("hide.bs.offcanvas", resizeMap);
        }
    }, [offerRef])

    return (
        <div className="start-page" ref={thisRef}>
            <OfferPanel instanceRef={offerRef} flats={flats} setFlats={setFlats}/>
            <OfferMap yMapRef={yMapRef} flats={flats} setFlats={setFlats}/>
        </div>
    );
};

export default StartPage;