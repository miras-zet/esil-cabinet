import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import BookService from '../services/BookService';
import ILibraryUserData from '../models/ILibraryUserData';

const TransferBook: FC = () => {
    const { store } = useContext(Context);
    const [userdata, setUserData] = useState<Array<ILibraryUserData>>([]);
    const [message, setMessage] = useState<string>("");
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
    const bookname_original = localStorage.getItem('transferringBookName');
    let bookname = '';
    for (let i = 0; i < 25; i++) {
        if (bookname_original[i] != undefined) bookname = bookname + bookname_original[i];
    }
    if (bookname.length > 24) bookname = bookname + '...';

    if (!store.isAuth) {
        return (
            <div>
                <LoginForm />
            </div>
        );
    }
    const findUser = () => {
        const iin = (document.getElementById("inputIIN") as HTMLInputElement).value;
        if (iin != '') {
            //const bookid = localStorage.getItem('transferringbookid');
            BookService.findUser(iin)
                .then((response) => {
                    setUserData(response.data);
                    if (response.data.length == 0) {
                        setMessage('Пользователь не найден');
                        setMessageColor("red");
                    }
                    else{
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
    const transfer = () => {
        const iin = userdata[0]?.iin;
        if (iin != '') {
            const bookid = localStorage.getItem('transferringbookid');
            BookService.transferBook(iin, bookid)
                .then((response) => {
                    setMessage(response.data.message);
                    if (response.data.message.indexOf('успешно') !== -1) {
                        setMessageColor("#2ecc71");
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
    const goBack = () => {
        let prevpage = localStorage.getItem('prevLibrarianPage');
        switch (prevpage) {
            case 'search': window.location.href = window.location.protocol + '//' + window.location.host + '/searchbook';
                break;
            case 'pages': window.location.href = window.location.protocol + '//' + window.location.host + '/physicalbooksPages';
                break;
            default: window.location.href = window.location.protocol + '//' + window.location.host + '/';
        }
    }
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'librarian') {
                    return <div style={{ textAlign: 'left', width: '1200px' }}>
                        <KPINavbar />
                        <br /><br /><br />
                        
                        <table style={{ width: '110%' }}>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td style={{width:'20%'}}>
                                    <br/><br/><br/>
                                    <button onClick={() => goBack()} className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться назад</button> <br /><br />
                                        <br />
                                        <h3>Впишите ИИН студента/преподавателя, которому выдаётся книга "{bookname}"</h3>
                                        <input id="inputIIN" className='btnNeutral' style={{ width: '300px' }} type="text" maxLength={12} placeholder='Введите ИИН'></input><br /><br />
                                        <button className="navbarbutton" onClick={() => findUser()}>Найти</button><br /><br />
                                        <div style={{ color: messagecolor, fontWeight: 'bold' }}>{message}</div>
                                    </td>
                                    <td style={{width:'10%'}}></td>
                                    <td style={{width:'30%'}}>
                                        <br/>
                                        {userdata.length>0?<div id='opaqueTable'>
                                            <div style={{padding:'8% 8% 8% 8%', fontWeight:'normal'}}>
                                                <h4>Карточка {userdata[0]?.extradata?'студента':'преподавателя'}</h4>
                                                <p>ФИО: <u>{userdata[0]?.lastname} {userdata[0]?.firstname} {userdata[0]?.patronymic}</u></p>
                                                <p>{userdata[0]?.extradata?'Специальность':'Кафедра'}: <u>{userdata[0]?.specialization}</u></p>
                                                {userdata[0]?.extradata?<p>Форма обучения: <u>{userdata[0]?.extradata}</u></p>:''}
                                                {userdata[0]?.extradata?<p>Группа: <u>{userdata[0]?.extradata2}</u></p>:<p>Факультет: <u>{userdata[0]?.extradata2}</u></p>}
                                                <p>Номер: <u>{userdata[0]?.phone.length>0?userdata[0]?.phone:' --- '}</u></p>
                                                <p>Статус: <u>{userdata[0]?.extradata?
                                                <>{userdata[0]?.status==1?'Учится':'Выпускник/отчислен'}</>
                                                :
                                                <>{userdata[0]?.status==1?'Уволен':'Работает'}</>
                                                }</u></p>
                                                {buttonPressed == 'false' ? <button className="navbarbutton" onClick={() => transfer()}>Выдать книгу</button> : <button disabled id="backbutton">Выполнено</button>}
                                            </div>
                                        </div>:''}
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

export default observer(TransferBook)