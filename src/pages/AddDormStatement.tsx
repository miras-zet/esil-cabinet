import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import DocsService from '../services/DocsService';
import IStatementData from '../models/IStatementData';
import UploadService from '../services/UploadService';
import IDormRequest from '../models/IDormRequest';
//import DocsService from '../services/DocsService';

const AddDormStatement: FC = () => {
    const { store } = useContext(Context);
    const [message, setMessage] = useState<string>("");
    const [messagecolor, setMessageColor] = useState<string>("red");
    const [userData, setUserData] = useState<IStatementData>();
    const [dormData, setDormData] = useState<Array<IDormRequest>>([]);
    const loadvalues = () => {
        (document.getElementById("inputFaculty") as HTMLInputElement).value = userData?.faculty;
        (document.getElementById("inputFIO") as HTMLInputElement).value = userData?.fio;
        (document.getElementById("inputPhoneNumber") as HTMLInputElement).value = userData?.phonenumber;
    }
    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
        localStorage.removeItem('statementdata');
        localStorage.removeItem('carddata');
        localStorage.removeItem('cardparentsdata');
        DocsService.getDataForStatement(localStorage.getItem('user_id')).then((response) => {
            setUserData(response.data);
        });
        UploadService.getDormRequestForUser().then((response) => {
            setDormData(response.data);
        });
        setTimeout(function () {
            document.getElementById('toClick').click();
            console.log('clicked');
          }, 400)
    }, [])
    useEffect(() => {
        if (dormData.length > 0) {
            window.location.href = window.location.protocol + '//' + window.location.host + '/';
        }
    }, [dormData]);
    // useEffect(()=>{
    // setModal(modals)
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
    const next = () => {
        const Faculty = (document.getElementById("inputFaculty") as HTMLInputElement).value;
        const FIO = (document.getElementById("inputFIO") as HTMLInputElement).value;
        const PhoneNumber = (document.getElementById("inputPhoneNumber") as HTMLInputElement).value;
        const ParentNumber = (document.getElementById("inputParentNumber") as HTMLInputElement).value;
        const Location = (document.getElementById("inputLocation") as HTMLInputElement).value;
        if (Faculty=='' || FIO =='' || PhoneNumber ==''|| ParentNumber ==''|| Location ==''){
            setMessage('Не все поля заполнены');
            setMessageColor('red');
            return;
        }
        setMessage('');
        localStorage.setItem('statementdata',JSON.stringify({
            "Faculty":Faculty,
            "FIO":FIO,
            "PhoneNumber":PhoneNumber,
            "ParentNumber":ParentNumber,
            "Location":Location
        }));
        window.location.href = window.location.protocol + '//' + window.location.host + '/dormdocscontinue';
    }
    const goBack = () => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/';
    }
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'plt_student') {
                    return <div style={{ textAlign: 'left', width: '1200px' }}>
                        <button id='toClick' style={{visibility:'hidden'}} onLoad={()=>alert('a')} onClick={() => loadvalues()}>загрузить</button>
                        <KPINavbar />
                        <br /><br /><br /><br /><br /><br />
                        <button onClick={() => goBack()} className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться назад</button><br /><br />
                        <br />
                        <h2>Заявление</h2>
                        <h3>Заполните поля, проверьте правильность:</h3>
                        <table >
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Название факультета</td>
                                <td style={{width:'50px'}}></td>
                                <td><input id="inputFaculty" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Название факультета'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>ФИО</td>
                                <td style={{width:'50px'}}></td>
                                <td><input id="inputFIO" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='ФИО полностью'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Контактный телефон</td>
                                <td style={{width:'50px'}}></td>
                                <td><input id="inputPhoneNumber" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Телефон'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Контактный телефон родителей</td>
                                <td style={{width:'50px'}}></td>
                                <td><input id="inputParentNumber" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Телефон родителей'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Область, город, район, село</td>
                                <td style={{width:'50px'}}></td>
                                <td><input id="inputLocation" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Местонахождение'></input></td>
                            </tr>
                        </table>
                        <button className="navbarbutton" onClick={() => next()}>Далее</button><br />
                        <div style={{ color: messagecolor, fontWeight: 'bold' }}>{message}</div>
                    </div>
                }
                else {
                    return <Navigate to="/" />
                }
            })()}

        </div>
    );
}

export default observer(AddDormStatement)