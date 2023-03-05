import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import FlatService from "../services/FlatService";
import {IFlat} from "../models/IFlat";
import CarouselFlat from "../components/CarouselFlat";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {DesktopDateRangePicker} from '@mui/x-date-pickers-pro/DesktopDateRangePicker';
import {LocalizationProvider} from '@mui/x-date-pickers-pro';
import {AdapterDayjs} from '@mui/x-date-pickers-pro/AdapterDayjs';
import BookingService from "../services/BookingService";
import {IBooking} from "../models/IBooking";
import {IBookingOrder} from "../models/IBookingOrder";


const FlatPage = () => {
    const {id} = useParams<string>();
    const [flat, setFlat] = useState<IFlat>();
    const [dates, setDates] = useState<Date[]>();
    const carouselRef = useRef();

    //const [value, setValue] = React.useState<DateRange<Dayjs>>([null, null]);
    const [value, setValue] = React.useState<any>([null, null]);


    useEffect(() => {
        FlatService.getFlatById(Number(id)).then((flat) => {
            setFlat(flat)
        })
        BookingService.getBookingDates(Number(id)).then((dates) => {
            setDates(dates)
        })
    }, [])

    function Booking() {
        const bookingOrder: IBookingOrder = {
            flat_id: Number(id),
            day_start: value[0].format('YYYY-MM-DD'),
            day_end: value[1].format('YYYY-MM-DD')
        }
        BookingService.postBooking(bookingOrder).then((booking) => {
            if (booking?.user_id) {
                alert('Забронировано');
            }
        })
    }

    function DateFilter(day: any, position: string) {
        const currentDate: any = day['$d'];
        if (currentDate < Date.now()) {
            return true;
        }
        if (dates) {
            for (let i = 0; i < dates.length; i++) {
                let date: any = dates[i];
                if (currentDate >= new Date(date.day_start) && currentDate <= new Date(date.day_end)) {
                    return true;
                }
            }
        }
        return false;
    }

    return (<div className={'flat-page container py-2'}>
            {
                flat ?
                    <div>
                        <h2>{flat?.title}</h2>
                        <CarouselFlat className={'border rounded-top'} flat={flat}
                                      prefix={'FlatPage'} instanceRef={carouselRef}
                                      sideBar={true}
                        />
                        <div className="mt-4 d-flex">
                            <div className="col-8 px-2">
                                <p>{flat.description}</p>
                            </div>
                            <div className="align-self-start booking container border rounded shadow col-4 p-3">
                                <div className="mb-4"><span className="fw-bolder">{flat.price}₽</span> ночь</div>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                    localeText={{start: 'Прибытие', end: 'Выезд'}}
                                >
                                    <DesktopDateRangePicker
                                        shouldDisableDate={DateFilter}
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(startProps, endProps) => (
                                            <React.Fragment>
                                                <TextField {...startProps} />
                                                <Box sx={{mx: 2}}/>
                                                <TextField {...endProps} />
                                            </React.Fragment>
                                        )}
                                    />
                                </LocalizationProvider>
                                <button className="btn btn-dark w-100 mt-4 mb-1" type="button"
                                        onClick={Booking}>Забронировать
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    );
};

export default FlatPage;