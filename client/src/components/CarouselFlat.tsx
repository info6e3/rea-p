import React, {FC} from 'react';
import {IFlat} from "../models/IFlat";

interface CarouselProps {
    flat: IFlat,
    prefix: string,
    className?: string,
    instanceRef?: any,
    sideBar?: boolean //This only for React component. Uses states.
}

const CarouselFlat: FC<CarouselProps> = ({flat, prefix, className = '', sideBar = false}) => {
    const carouselId = `carousel-flat-${prefix}-${flat.id}`;

    function SelectImage(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
        //console.log('a')
        //const imgElement: any = e.target;
        //imgElement.setAttribute("style", "border: 8px solid red !important")
    }

    return (
        <div className={className}>
            {
                !sideBar ?
                    <div>
                        <div id={carouselId} className={`carousel slide`}>
                            <div className="carousel-indicators">
                                {
                                    flat.photos.map((photo, index) => {
                                            return !index ?
                                                <button key={index} type="button" data-bs-target={`#${carouselId}`}
                                                        data-bs-slide-to="0"
                                                        className="active" aria-current="true"
                                                        aria-label="Slide 1"></button>
                                                :
                                                <button key={index} type="button" data-bs-target={`#${carouselId}`}
                                                        data-bs-slide-to={index}
                                                        aria-label={`Slide ${index + 1}`}></button>

                                        }
                                    )
                                }
                            </div>
                            <div className="carousel-inner">
                                {
                                    flat.photos.map((photo, index) => {
                                            return !index ?
                                                <div key={index} className="carousel-item active">
                                                    <img src={photo} className="d-block w-100"
                                                         alt={`${index}`}/>
                                                </div>
                                                :
                                                <div key={index} className="carousel-item">
                                                    <img src={photo} className="d-block w-100"
                                                         alt={`${index}`}/>
                                                </div>

                                        }
                                    )
                                }
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`}
                                    data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`}
                                    data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    :
                    <div className={'d-flex'}>
                        <div id={carouselId} className={`carousel slide border rounded-top col-9`}>
                            <div className="carousel-indicators">
                                {
                                    flat.photos.map((photo, index) => {
                                            return !index ?
                                                <button key={index} type="button" data-bs-target={`#${carouselId}`}
                                                        data-bs-slide-to="0"
                                                        className="active" aria-current="true"
                                                        aria-label="Slide 1"></button>
                                                :
                                                <button key={index} type="button" data-bs-target={`#${carouselId}`}
                                                        data-bs-slide-to={index}
                                                        aria-label={`Slide ${index + 1}`}></button>

                                        }
                                    )
                                }
                            </div>
                            <div className="carousel-inner">
                                {
                                    flat.photos.map((photo, index) => {
                                            return !index ?
                                                <div key={index} className="carousel-item active">
                                                    <img src={photo} className="d-block w-100"
                                                         alt={`${index}`}/>
                                                </div>
                                                :
                                                <div key={index} className="carousel-item">
                                                    <img src={photo} className="d-block w-100"
                                                         alt={`${index}`}/>
                                                </div>

                                        }
                                    )
                                }
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`}
                                    data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`}
                                    data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className={'col-3 overflow-auto'}>
                            <div className={'hide-container'}>
                                {
                                    flat.photos.map((photo, index) =>
                                        <img src={photo} key={index} className={'w-100  border'}
                                             alt={`${index}`} onClick={(e) => SelectImage(e)}/>
                                    )
                                }
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default CarouselFlat;