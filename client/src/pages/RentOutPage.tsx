import React, {useEffect, useRef, useState} from 'react';
import {useTypesSelector} from "../hooks/useTypesSelector";
import RentOutMap from "../components/RentOutMap";
import {useYMaps} from "@pbe/react-yandex-maps";
import FlatService from "../services/FlatService";
import loginForm from "../components/LoginForm";

const RentOutPage = () => {
    const yMapRef: any = useRef();
    const yMaps: any = useYMaps(['SuggestView', 'geocode']);
    const inputRef: any = useRef<HTMLInputElement>(null);
    const [address, setAddress] = useState<any>();
    const [coords, setCoords] = useState<any>();
    let photos: File[] = [];

    useEffect(() => {
        if (yMaps) {
            const suggestView: any = new yMaps.SuggestView('InputAddress');
            suggestView.events.add("select", (e: any) => {
                const suggestAddress: string = e.get("item").value;
                setAddress(suggestAddress)
                GoToAddress(suggestAddress);
            });
        }
    }, [yMaps])

    //Изменение инпута при изменении адреса по клику на карту
    useEffect(() => {
        if (address) {
            inputRef.current.value = address;
        }
    }, [address])

    function GoToAddress(address: string) {  //Перемещает карту на координаты адреса
        const geocoder = yMaps.geocode(address);
        geocoder.then((res: any) => {
                const coordinates = res.geoObjects.get(0).geometry.getCoordinates();
                yMapRef.current.panTo(coordinates, {useMapMargin: true, duration: 1000}).then(() => {

                });
            }
        );
    }

    function checkFilled(formData: any) {
        if (!formData.get('address')) return false;
        if (!formData.get('title')) return false;
        if (!formData.get('type')) return false;
        if (!formData.get('price')) return false;
        if (!formData.get('description')) return false;
        if (!formData.get('photo_0')) return false;

        return true;
    }

    async function postFlat() {
        const formElement: any = document.getElementById('form')
        const formData = new FormData(formElement)
        formData.append(`coordinates`, coords)
        if (photos?.length > 0) {
            photos.forEach((photo, index) => {
                formData.append(`photo_${index}`, photo)
            })
        }
        if (checkFilled(formData)) {
            FlatService.postFlat(formData).then((flat) => {
                if (flat) alert('Добавлено!');
            })
        } else {
            alert('Заполнены не все поля.')
        }
    }

    function setPhotos(e: React.ChangeEvent<HTMLInputElement>): void {
        const input: HTMLInputElement = e.target;
        photos = Array.from(input.files ?? []);
    }

    return (
        <div className={'rent-out-page container py-2'}>
            <h2>Сдать жильё</h2>
            <div className='d-flex'>
                <div className="col p-2">
                    <RentOutMap yMapRef={yMapRef} address={address} setAddress={setAddress}
                                setCoords={setCoords}></RentOutMap>
                </div>
                <form className="col p-2" id={'form'}>
                    <div className="row h-100">
                        <div className="mb-3">
                            <label htmlFor="InputAddress" className="form-label">Адрес</label>
                            <input name="address" ref={inputRef} type="input" className="form-control"
                                   id="InputAddress"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="InputTitle" className="form-label">Название</label>
                            <input name="title" type="input" className="form-control" id="InputTitle"/>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="InputType" className="form-label">Тип жилья:</label>
                                    <select name="type" id="InputType" className="form-control">
                                        <option>Квартира</option>
                                        <option>Апартаменты</option>
                                        <option>Комната</option>
                                        <option>Номер</option>
                                        <option>Дом</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="InputPrice" className="form-label">Цена за ночь</label>
                                    <input name="price" type="number" className="form-control" id="InputPrice"/>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="InputPhotos" className="form-label">Фото</label>
                            <input type="file" onChange={setPhotos} multiple={true} className="form-control"
                                   id="InputPhotos"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="InputDescription" className="form-label">Описание</label>
                            <textarea name="description" className="form-control" id="InputDescription"/>
                        </div>
                        <div className="mb-3 d-flex justify-content-between">
                            <button type="button" className="btn btn-warning">Сдать позже</button>
                            <button type="button" className="btn btn-warning" onClick={postFlat}>Сдать</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RentOutPage;