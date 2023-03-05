import React, {FC, useEffect, useRef, useState} from 'react';
import {IFlat} from "../models/IFlat";
import CarouselFlat from "./CarouselFlat";
import FlatCard from "./FlatCard";

interface offerProps {
    flats: IFlat[],
    setFlats: React.Dispatch<React.SetStateAction<IFlat[]>>,
    instanceRef: any
}

const OfferPanel: FC<offerProps> = ({flats, setFlats, instanceRef}) => {
    return (
        <div className={'offer-panel'}>
            <div className="hide-container">
                <button className="btn btn-dark border m-2" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                    Show
                </button>
            </div>
            <div ref={instanceRef} className="offcanvas offcanvas-start position-fixed show" data-bs-scroll="true"
                 data-bs-backdrop="false"
                 id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header ms-2 pb-1">
                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel"><span
                        className="fw-bolder">{flats.length} </span>
                        {
                            (() => {
                                const price = String(flats.length);
                                const lastNumber = Number(price[price.length - 1]);
                                let string = ''
                                if (flats.length > 1) {
                                    const preLastNumber = Number(price[price.length - 2]);
                                    if (preLastNumber === 1) {
                                        return "предложений";
                                    }
                                }
                                string = lastNumber === 1 ? "предложение" :
                                    lastNumber < 5 ? "предложения" : "предложений"
                                return string;
                            })()
                        }
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="container px-0">
                        {
                            flats.map((flat, index) => {
                                    return <FlatCard key={flat.id} flat={flat} prefix={'Offer'} className={"p-1 d-inline-block col-sm-6 col-md-4"}/>
                                }
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};
export default OfferPanel;