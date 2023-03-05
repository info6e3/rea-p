import React, {FC} from 'react';
import CarouselFlat from "./CarouselFlat";
import bookingService from "../services/BookingService";

interface BookingOrderCardProps {
    order: any,
    className?: string,
    role: string
}

const BookingOrderCard: FC<BookingOrderCardProps> = ({order, className = '', role}) => {
    console.log(order)
    return (
        <div className={className}>
            <div
                className={`border booking-order-card border rounded p-2 rounded`}>
                <table className='w-100 fw-bolder'>
                    <tbody>
                    <tr>
                        <td>{order.flat.type}</td>
                        <td><a className='flat-link' href={`/flat/${order.flat.id}`}>{order.flat.title}</a></td>
                    </tr>
                    <tr>
                        <td>Период</td>
                        <td>
                            <div>c {(order.day_start).slice(0, 10)} по {(order.day_end).slice(0, 10)}</div>
                        </td>
                    </tr>
                    <tr className={`${order.accept === 2 ? 'bg-warning' : order.accept === 1 ? 'bg-success' : order.accept === 0 ? 'bg-danger' : null}`}>
                        <td>Статус</td>
                        <td>
                            {order.accept === 2 ? 'Ожидает' : order.accept === 1 ? 'Принято' : order.accept === 0 ? 'Отказ' : null}
                        </td>
                    </tr>
                    </tbody>
                </table>
                {
                    (() => {
                        if (order.accept === 2) {

                            if (role === 'OWNER') {
                                return <div className='d-flex justify-content-between'>
                                    <button className='btn btn-dark' onClick={() => {
                                        bookingService.changeBookingStatus(order.id, true).then(status => {
                                            if(status) alert('Принято')
                                        })
                                    }}>Принять
                                    </button>
                                    <button className='btn btn-dark' onClick={() => {
                                        bookingService.changeBookingStatus(order.id, false).then(status => {
                                            if(status) alert('Отказано')
                                        })
                                    }}>Отказать
                                    </button>
                                </div>;
                            } else if (role === 'USER') {
                                return <button className='btn btn-dark' onClick={() => {
                                    bookingService.changeBookingStatus(order.id, false).then(status => {
                                        if(status) alert('Отозвано')
                                    })
                                }}>Отозвать</button>;
                            }
                        }
                    })()
                }
            </div>
        </div>
    );
};

export default BookingOrderCard;