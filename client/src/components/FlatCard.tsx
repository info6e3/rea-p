import React, {FC} from 'react';
import CarouselFlat from "./CarouselFlat";
import {IFlat} from "../models/IFlat";

interface FlatCardProps {
    flat: IFlat,
    prefix: string,
    className?: string
}

const FlatCard: FC<FlatCardProps> = ({flat, className = '', prefix}) => {
    return (
        <div className={className}>
            <div className={"flat-card border rounded"}>
                <CarouselFlat flat={flat} prefix={prefix}/>
                <a className="flat-link fw-light text-nowrap mx-2 overflow-hidden"
                   href={`/flat/${flat.id}`} target="_blank">
                    <div className="flat-title fw-bolder">{flat.title}</div>
                    <div className="mx-2 mb-1"><span className="fw-bolder">{flat.price}₽</span> ночь</div>
                </a>
            </div>
        </div>
    );
};

export default FlatCard;