import React, {Dispatch, FC, useEffect, useState} from 'react';
import {Clusterer, Map, Placemark, useYMaps, YMaps} from "@pbe/react-yandex-maps";
import {FlatBalloonContent, FlatBalloonLayout} from "./FlatBalloonLayout";
import house_fill from "../icons/house-fill.svg";
import {IFlat} from "../models/IFlat";
import {YMapAction} from "../models/store/YMapStore";
import {useDispatch} from "react-redux";

interface RentOutMapProps {
    address: any,
    setAddress: any,
    setCoords: any,
    yMapRef: any,
}

const RentOutMap: FC<RentOutMapProps> = ({yMapRef, address, setAddress, setCoords}) => {
    const dispatch: Dispatch<YMapAction> = useDispatch();
    const yMaps: any = useYMaps(['templateLayoutFactory', 'Placemark']);
    let canAdd: boolean = true;
    let placemark: any;
    // get yMaps api and start Init
    useEffect(() => {
        if (yMaps) {
            Init();
        }
    }, [yMaps])

    function Init() {
        dispatch({type: 'SET-yMap', state: {yMap: yMapRef.current}})
        const map = yMapRef.current;
        //events
        map.events.add('click', async function (e: any) {
            if(canAdd) {
                let coords = e.get('coords');
                const [title, addr] = await getAddress(coords);
                await addPlaceMark(coords);
                setCoords(coords);
                setAddress(addr);
            }
        });
    }

    async function addPlaceMark(coords: any) {
        const map = yMapRef.current;
        const [title, addr] = await getAddress(coords);

        // Создание новой метки
        placemark = new yMaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
        map.geoObjects.removeAll();
        map.geoObjects.add(placemark);

        placemark.properties
            .set({
                // Формируем строку с данными об объекте.
                iconCaption: title,
                // В качестве контента балуна задаем строку с адресом объекта.
                balloonContent: addr
            });
    }

    //Вставка метки при изменении адреса по инпуту
    useEffect( () => {
        if(yMaps && canAdd) {
            canAdd = false;
            yMaps.geocode(address, {results: 1}).then((res: any) => {
                let firstGeoObject = res.geoObjects.get(0),
                    coords = firstGeoObject.geometry.getCoordinates();
                addPlaceMark(coords).then(() => {
                    canAdd = true;
                });
            })
        }
    }, [address])

    // Определяем адрес по координатам (обратное геокодирование).
    async function getAddress(coords: any) {
        const res = await yMaps.geocode(coords, {results: 1});
        let firstGeoObject = res.geoObjects.get(0);
        const title = [
            // Название населенного пункта или вышестоящее административно-территориальное образование.
            firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
        ].filter(Boolean).join(', ');
        const addr = firstGeoObject.getAddressLine();
        return [title, addr];
    }

    return (
        <Map instanceRef={yMapRef}
             className={"map-container border"}
             defaultState={{
                 center: [56.74006, 37.22523],
                 margin: [0, 0, 0, 0],
                 zoom: 16,
                 controls: [],
             }}>
        </Map>
    );
};

export default RentOutMap;