import React, {useContext, useEffect, useRef} from 'react';
import {useYMaps} from "@pbe/react-yandex-maps";
import {useTypesSelector} from "../hooks/useTypesSelector";

const SuggestView = () => {
    const yMap = useTypesSelector((store) => store.yMap.yMap);

    const yMaps: any = useYMaps(['SuggestView', 'geocode']);
    const inputRef = useRef<HTMLInputElement>(null);

    function GoToAddress(address: string){  //Перемещает карту на координаты адреса
        const geocoder = yMaps.geocode(address);
        geocoder.then((res: any) => {
                const coordinates = res.geoObjects.get(0).geometry.getCoordinates();
                yMap.panTo(coordinates, {useMapMargin: true, duration: 1000}).then(() => {

                });
            }
        );
    }

    useEffect(() => {
        if(yMaps) {
            const suggestView: any = new yMaps.SuggestView('suggest_view');
            suggestView.events.add("select", (e: any) => {
                const address: string = e.get("item").value;
                GoToAddress(address);
            });
        }
    }, [yMaps, yMap])

    return (
        <div className="w-50 d-flex" role="search">
            <input ref={inputRef} id={'suggest_view'} className="form-control me-2" type="search" placeholder="Место..." aria-label="Search"/>
            <button className="btn btn-dark" type="button" onClick={() => {
                const address: string = inputRef.current?.value || "";
                GoToAddress(address);
            }
            }>Искать!</button>
        </div>
    );
};

export default SuggestView;