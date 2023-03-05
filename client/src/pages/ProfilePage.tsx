import React, {useEffect, useState} from 'react';
import person_circle from "../icons/person-circle.svg";
import userService from "../services/UserService";
import {IUser} from "../models/IUser";
import flatService from "../services/FlatService";
import {IFlat} from "../models/IFlat";
import FlatCard from "../components/FlatCard";
import bookingService from "../services/BookingService";
import BookingOrderCard from "../components/BookingOrderCard";

const ProfilePage = () => {
    const [user, setUser] = useState<IUser>();
    const [flats, setFlats] = useState<IFlat[]>();
    const [orders, setOrders] = useState<any>();
    const [section, setSection] = useState<any>(0);

    useEffect(() => {
        userService.getUser().then((user) => {
            setUser(user)
        })
    }, [])

    useEffect(() => {
        if (user?.role === 'OWNER') {
            flatService.getFlatsByOwner().then((flats) => {
                if (flats) setFlats(flats);
            })
            bookingService.getBookingListForOwner().then((bookingList) => {
                if (bookingList) setOrders(bookingList);
            })
        } else if (user?.role === 'USER') {
            bookingService.getBookingListForUser().then((bookingList) => {
                if (bookingList) setOrders(bookingList);
            })
        }
    }, [user])

    return (
        <div className='profile-page container py-2'>
            <div>
                <h2>Добро пожаловать, {user?.name}!</h2>
                <div className='profile-nav d-flex'>
                    <button className={`btn btn-light col border ${section === 0 ? 'selected' : ''}`}
                            onClick={() => setSection(0)}>Профиль
                    </button>
                    <button className={`btn btn-light col border ${section === 1 ? 'selected' : ''}`}
                            onClick={() => setSection(1)}>Заявки
                    </button>
                    {

                        user?.role === 'OWNER' ?
                            <button className={`btn btn-light col border ${section === 2 ? 'selected' : ''}`}
                                    onClick={() => setSection(2)}>Объекты</button>
                            : null
                    }

                </div>
                <div className='content border bg-light p-3'>
                    {
                        section === 0 ?
                            <div className='profile'>
                                <table className='w-100'>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <img className="profile-photo mb-2" src={person_circle} alt={"Профиль"}/>
                                        </td>
                                        <td>
                                            <div>{user?.name}</div>
                                            <div>{user?.surname}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Почта</td>
                                        <td>{user?.email}</td>
                                    </tr>
                                    <tr>
                                        <td>День рождения</td>
                                        <td>{user?.birth_date}</td>
                                    </tr>
                                    <tr>
                                        <td>Дата регистрации</td>
                                        <td>{user?.registration_date?.slice(0, 11)}</td>
                                    </tr>
                                    <tr>
                                        <td>Обо мне</td>
                                        <td>{user?.description}</td>
                                    </tr>
                                    <tr>
                                        <td>Статус</td>
                                        <td>{user?.role}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            : null
                    }
                    {
                        section === 1 ?
                            user?.role === 'OWNER' ?
                                <div className='orders'>
                                    {
                                        orders.map((order: any) =>
                                            <BookingOrderCard key={order.id} order={order} role={user?.role}/>

                                        )
                                    }
                                </div>
                                :
                                user?.role === 'USER' ?
                                    <div className='orders'>
                                        {
                                            orders.map((order: any) =>
                                                <BookingOrderCard key={order.id} order={order} role={user?.role}/>
                                            )
                                        }
                                    </div>
                                    :
                                    null
                            : null
                    }
                    {
                        section === 2 ?
                            <div className='objects'>
                                {
                                    flats?.map((flat: any) =>
                                        <FlatCard key={flat.id} flat={flat} prefix={'Object'} className={"p-1 d-inline-block col-4"}/>
                                    )
                                }
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;