import React, {Dispatch, FC, useEffect, useRef, useState} from 'react';
import {Clusterer, Map, Placemark, useYMaps} from "@pbe/react-yandex-maps";
import house_fill from "../icons/house-fill.svg";
import {useDispatch} from "react-redux";
import {IFlat} from "../models/IFlat";
import FlatService from "../services/FlatService";
import {FlatBalloonContent, FlatBalloonLayout} from "./FlatBalloonLayout";
import {YMapAction} from "../models/store/YMapStore";

interface OfferMapProps {
    flats: IFlat[],
    setFlats: React.Dispatch<React.SetStateAction<IFlat[]>>,
    yMapRef: any
}

const OfferMap: FC<OfferMapProps> = ({flats, setFlats, yMapRef}) => {
    const dispatch: Dispatch<YMapAction> = useDispatch();
    const yMaps: any = useYMaps(['templateLayoutFactory', 'Placemark']);

    //const yMapRef = useRef();
    async function refreshPoints() {
        const map: any = yMapRef.current;
        const flats = await FlatService.getNearestFlats(map.getCenter(), 10);
        if (flats) {
            setFlats(flats);
        }
    }

    // get yMaps api and start Init
    useEffect(() => {
        if (yMaps) {
            Init();
            const map: any = yMapRef.current;
            refreshPoints();
            //events
            map.events.add('boundschange', () => {
                //console.log(map.getCenter())
                refreshPoints();
            })
        }
    }, [yMaps])

    function Init() {
        dispatch({type: 'SET-yMap', state: {yMap: yMapRef.current}})
    }

    return (
        <Map instanceRef={yMapRef}
             className={"map-container"}
             defaultState={{
                 center: [56.74006, 37.22523],
                 margin: [0, 0, 0, 0],
                 zoom: 8,
                 controls: [],
             }}>
            <Clusterer
                options={{
                    preset: "islands#invertedBlackClusterIcons",
                    gridSize: 128
                }}>
                {flats.map((flat) =>
                    <Placemark key={flat.id} geometry={flat.coordinates}
                               properties={{
                                   balloonContentBody: FlatBalloonContent(flat),
                                   hintContent: flat.title,
                                   iconContent: `<div class="icon-content rounded border">${flat.price}</div>`
                               }}

                               options={{
                                   iconLayout: 'default#imageWithContent',
                                   iconImageHref: house_fill,
                                   iconImageSize: [40, 40],
                                   iconImageOffset: [-40 / 2, -40 / 2],
                                   iconContentOffset: [40 / 2, 40 / 2],
                                   balloonLayout: FlatBalloonLayout(yMaps),
                                   balloonShadow: true,
                                   balloonPanelMaxMapArea: 0
                               }}/>)}
            </Clusterer>
        </Map>
    );
};

export default OfferMap;