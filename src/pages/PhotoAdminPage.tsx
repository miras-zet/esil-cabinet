import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import AdminService from '../services/AdminService';
import IPhotoUserData from '../models/IPhotoUserData';
import moment from 'moment';
import config from "../http/version.json";

export const incorrectIINs = config.incorrectPhotoIIN;
export const noPhotoIINs = config.noPhotoIIN;

const PhotoAdminPage: FC = () => {
    const { store } = useContext(Context);
    const [userdata, setUserData] = useState<Array<IPhotoUserData>>([]);
    const [message, setMessage] = useState<string>("");
    const [foundNoPhoto, setMessage2] = useState<string>("");
    const [messagecolor, setMessageColor] = useState<string>("red");
    const [buttonPressed, setButtonPressed] = useState<string>('false');
    useEffect(() => {
        setButtonPressed('false');
        // const user = JSON.parse(localStorage.getItem('data'));
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    // useEffect(()=>{
    //   setModal(modals)
    // },[])

    if (store.isLoading) {
        return <div>Loading ...</div>
    }
    if (!store.isAuth) {
        return (
            <div>
                <LoginForm />
            </div>
        );
    }
    const findUser = () => {
        const iin = (document.getElementById("inputIIN") as HTMLInputElement).value.trim();
        if (iin != '') {
            if (noPhotoIINs.includes(iin) && iin.length == 12) {
                setMessageColor("red");
                setMessage2("Найден(а) в списке людей без фото");
            }
            else {
                setMessage2("");
            }
            //const bookid = localStorage.getItem('transferringbookid');
            AdminService.findUser(iin)
                .then((response) => {
                    setUserData(response.data);
                    if (response.data.length == 0) {
                        setMessage('Фото нет в системе');
                        setMessageColor("red");
                    }
                    else {
                        setMessage('');
                        setMessageColor("#2ecc71");
                    }
                    //setButtonPressed('true');
                })
                .catch((err) => {
                    setMessageColor("red");
                    if (err.response && err.response.data && err.response.data.message) {
                        setMessage(err.response.data.message);
                        setUserData([]);
                    } else {
                        setMessage("Ошибка");
                    }
                });
        }
        else {
            alert('Впишите ИИН');
        }
    }
    const deletePhoto = () => {
        if (confirm('Вы уверены что хотите удалить?')) {
            const id = userdata[0]?.id;
            if (id) {
                AdminService.deletePhoto(id)
                    .then((response) => {
                        setMessage(response.data.message);
                        if (response.data.message.indexOf('success') !== -1) {
                            setMessageColor("#2ecc71");
                            alert('Успешно удалена фотография');
                        } else {
                            setMessageColor("red");
                        }
                        setButtonPressed('true');
                    })
                    .catch((err) => {
                        if (err.response && err.response.data && err.response.data.message) {
                            setMessage(err.response.data.message);
                        } else {
                            setMessage("Ошибка");
                        }
                    });
            }
            else {
                alert('Впишите ИИН');
            }
        }


    }
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'photo_admin') {
                    return <div style={{ textAlign: 'left', width: '1200px' }}>
                        <KPINavbar />
                        <br /><br /><br />

                        <table style={{ width: '110%' }}>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td style={{ width: '20%' }}>
                                        <br /><br /><br />
                                        <br />
                                        <h3>Впишите ИИН пользователя для проверки статуса фото</h3>
                                        <input id="inputIIN" className='btnNeutral' style={{ width: '300px' }} type="text" maxLength={12} placeholder='Введите ИИН'></input><br /><br />
                                        <button className="navbarbutton" onClick={() => findUser()}>Найти</button><br /><br />
                                        <div style={{ color: messagecolor, fontWeight: 'bold' }}>{message}</div>
                                        <div style={{ color: messagecolor, fontWeight: 'bold' }}>{foundNoPhoto}</div>
                                    </td>
                                    <td style={{ width: '5%' }}></td>
                                    <td style={{ width: '30%' }}>
                                        <br />
                                        {userdata.length > 0 ? <div id='opaqueTable'>
                                            <div style={{ padding: '8% 8% 8% 8%', fontWeight: 'normal' }}>
                                                <h4>Информация</h4>
                                                <p>ФИО: <u>{userdata[0]?.lastname} {userdata[0]?.name} {userdata[0]?.middlename}</u></p>
                                                <p>Дата фотографии: <u>{moment(userdata[0].DateCreated).format("DD.MM.YYYY HH:mm")}</u></p>
                                                {incorrectIINs.includes(userdata[0].iin) ? <p style={{ color: 'red' }}>Найден(а) в перечне неудавшихся фото</p> : ''}
                                                {buttonPressed == 'false' ? <button className="navbarbutton" onClick={() => deletePhoto()}>Удалить фото</button> : <button disabled id="backbutton">Выполнено</button>}
                                            </div>
                                        </div> : ''}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                }
                else {
                    return <Navigate to="/" />
                }
            })()}

        </div>
    );
}

export default observer(PhotoAdminPage)