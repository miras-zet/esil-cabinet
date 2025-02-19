import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import DocsService from '../services/DocsService';
import UploadService from '../services/UploadService';
import IDormRequest from '../models/IDormRequest';



const AddDormCardParents: FC = () => {
    const { store } = useContext(Context);
    const [dormData, setDormData] = useState<Array<IDormRequest>>([]);
    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
        localStorage.removeItem('cardparentsdata');
        UploadService.getDormRequestForUser().then((response) => {
            setDormData(response.data);
        });
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
        const variables = ["FIO","DOB","Address","Workplace","JobPosition","PhoneNumber","HomeNumber","WorkNumber"];
        const genders = ["M","F"];
        let parentsdata: Record<string, string> = {};
        for (const variable of variables) {
            for (const gender of genders) {
                const key = `${variable}${gender}`;
                parentsdata[key] = (document.getElementById(`input${key}`) as HTMLInputElement)?.value || "";
            }
        }
        localStorage.setItem('cardparentsdata', JSON.stringify(parentsdata));
        DocsService.createDormDocs().then(() => {
            localStorage.removeItem('statementdata');
            localStorage.removeItem('carddata');
            localStorage.removeItem('cardparentsdata');   
        });
        UploadService.createDormRequestForUser().then(() => {
            alert('Данные отправлены');
            window.location.href = window.location.protocol + '//' + window.location.host + '/';
        });
    }
    const goBack = () => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/';
    }
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'plt_student' && localStorage.getItem('statementdata') != '' && localStorage.getItem('carddata') != '') {
                    return <div style={{ textAlign: 'left', width: '1200px' }}>
                        <KPINavbar />
                        <br /><br /><br /><br /><br /><br />
                        <button onClick={() => goBack()} className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться на главную</button><br /><br />
                        <br />
                        <h2>Информация о родителях</h2>
                        <h3>Заполните поля:</h3>
                        <table>
                            <thead style={{textAlign:'center', fontWeight:'bold'}}>
                                <td>Данные</td>
                                <td>Отец</td>
                                <td>Мать</td>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><br/></td>
                                </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>ФИО</td>
                                <td><input id="inputFIOM" className='btnNeutral' style={{ width: '250px' }} type="text" placeholder='ФИО отца полностью'></input></td>
                                <td><input id="inputFIOF" className='btnNeutral' style={{ width: '250px' }} type="text" placeholder='ФИО матери полностью'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Дата рождения</td>
                                <td><input id="inputDOBM" className='btnNeutral' style={{ width: '250px' }} type="text" placeholder='Дата рождения отца'></input></td>
                                <td><input id="inputDOBF" className='btnNeutral' style={{ width: '250px' }} type="text" placeholder='Дата рождения матери'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Адрес проживания</td>
                                <td><input id="inputAddressM" className='btnNeutral' style={{ width: '250px' }} type="text" placeholder='Адрес проживания отца'></input></td>
                                <td><input id="inputAddressF" className='btnNeutral' style={{ width: '250px' }} type="text" placeholder='Адрес проживания матери'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Место работы</td>
                                <td><input id="inputWorkplaceM" className='btnNeutral' style={{ width: '250px' }} type="text" placeholder='Место работы отца'></input></td>
                                <td><input id="inputWorkplaceF" className='btnNeutral' style={{ width: '250px' }} type="text" placeholder='Место работы матери'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Должность</td>
                                <td><input id="inputJobPositionM" className='btnNeutral' style={{ width: '250px' }} type="text" placeholder='Должность отца'></input></td>
                                <td><input id="inputJobPositionF" className='btnNeutral' style={{ width: '250px' }} type="text" placeholder='Должность матери'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Номер сот. телеф.</td>
                                <td><input id="inputPhoneNumberM" className='btnNeutral' style={{ width: '250px' }} type="text" placeholder='Сотовый телефон отца'></input></td>
                                <td><input id="inputPhoneNumberF" className='btnNeutral' style={{ width: '250px' }} type="text" placeholder='Сотовый телефон матери'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Домашний телефон</td>
                                <td><input id="inputHomeNumberM" className='btnNeutral' style={{ width: '250px' }} type="text" placeholder='Домашний телефон отца'></input></td>
                                <td><input id="inputHomeNumberF" className='btnNeutral' style={{ width: '250px' }} type="text" placeholder='Домашний телефон матери'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Рабочий телефон</td>
                                <td><input id="inputWorkNumberM" className='btnNeutral' style={{ width: '250px' }} type="text" placeholder='Рабочий телефон отца'></input></td>
                                <td><input id="inputWorkNumberF" className='btnNeutral' style={{ width: '250px' }} type="text" placeholder='Рабочий телефон матери'></input></td>
                            </tr>
                            </tbody>
                        </table>
                        <br/>
                        <button className="navbarbutton" onClick={() => next()}>Отправить заявку</button><br />
                    </div>
                }
                else {
                    return <Navigate to="/" />
                }
            })()}

        </div>
    );
}

export default observer(AddDormCardParents)