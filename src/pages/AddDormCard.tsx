import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import DocsService from '../services/DocsService';
import ICardData from '../models/ICardData';
import moment from 'moment';
import UploadService from '../services/UploadService';
import IDormRequest from '../models/IDormRequest';

const AddDormCard: FC = () => {
    const { store } = useContext(Context);
    const [message, setMessage] = useState<string>("");
    const [messagecolor, setMessageColor] = useState<string>("red");
    const [userData, setUserData] = useState<ICardData>();
    const [dormData, setDormData] = useState<Array<IDormRequest>>([]);
    const loadvalues = () => {
        (document.getElementById("inputFIO") as HTMLInputElement).value = userData?.fio;
        (document.getElementById("inputDOB") as HTMLInputElement).value = moment(userData?.birthdate).format('DD.MM.YYYY') + '';
        (document.getElementById("inputFaculty") as HTMLInputElement).value = userData?.faculty;
        (document.getElementById("inputSpecialization") as HTMLInputElement).value = userData?.specialization;
        (document.getElementById("inputCourse") as HTMLInputElement).value = userData?.course;
        (document.getElementById("inputGroup") as HTMLInputElement).value = userData?.group;
        (document.getElementById("inputStudyLanguage") as HTMLInputElement).value = userData?.studylanguage;
        (document.getElementById("inputIcnumber") as HTMLInputElement).value = userData?.icnumber;
        (document.getElementById("inputIcdepartment") as HTMLInputElement).value = userData?.icdepartment;
        (document.getElementById("inputIcdate") as HTMLInputElement).value = moment(userData?.icdate).format('DD.MM.YYYY') + '';
        (document.getElementById("inputIIN") as HTMLInputElement).value = userData?.iinplt;
        (document.getElementById("inputPhoneNumber") as HTMLInputElement).value = userData?.phonenumber;
    }
    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
        localStorage.removeItem('carddata');
        localStorage.removeItem('cardparentsdata');
        UploadService.getDormRequestForUser().then((response) => {
            setDormData(response.data);
        });
        DocsService.getDataForCard(localStorage.getItem('user_id')).then((response) => {
            setUserData(response.data);
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
        const FIO = (document.getElementById("inputFIO") as HTMLInputElement).value;
        const BirthDate = (document.getElementById("inputDOB") as HTMLInputElement).value;
        const Faculty = (document.getElementById("inputFaculty") as HTMLInputElement).value;
        const Specialization = (document.getElementById("inputSpecialization") as HTMLInputElement).value;
        const Course = (document.getElementById("inputCourse") as HTMLInputElement).value;
        const Group = (document.getElementById("inputGroup") as HTMLInputElement).value;
        const StudyLanguage = (document.getElementById("inputStudyLanguage") as HTMLInputElement).value;
        const Icnumber = (document.getElementById("inputIcnumber") as HTMLInputElement).value;
        const Icdepartment = (document.getElementById("inputIcdepartment") as HTMLInputElement).value;
        const Icdate = (document.getElementById("inputIcdate") as HTMLInputElement).value;
        const IIN = (document.getElementById("inputIIN") as HTMLInputElement).value;
        const PhoneNumber = (document.getElementById("inputPhoneNumber") as HTMLInputElement).value;
        const ExtraNumber = (document.getElementById("inputExtraNumber") as HTMLInputElement).value;
        if (FIO == '' ||
            BirthDate == '' ||
            Faculty == '' ||
            Specialization == '' ||
            Course == '' ||
            Group == '' ||
            StudyLanguage == '' ||
            Icnumber == '' ||
            Icdepartment == '' ||
            Icdate == '' ||
            IIN == '' ||
            PhoneNumber == '') {
            setMessage('Не все поля заполнены');
            setMessageColor('red');
            return;
        }
        setMessage('');
        localStorage.setItem('carddata', JSON.stringify({
            "FIO": FIO,
            "BirthDate": BirthDate,
            "Faculty": Faculty,
            "Specialization": Specialization,
            "Course": Course,
            "Group": Group,
            "StudyLanguage": StudyLanguage,
            "Icnumber": Icnumber,
            "Icdepartment": Icdepartment,
            "Icdate": Icdate,
            "IIN": IIN,
            "PhoneNumber": PhoneNumber,
            "ExtraNumber": ExtraNumber != undefined ? ExtraNumber:''
        }));
        window.location.href = window.location.protocol + '//' + window.location.host + '/dormdocsparents';
        // DocsService.addStatement(Faculty, FIO, Number, ParentNumber, Location).then((response) => {
        //     setMessage(response.data.message);
        //     if (response.data.message.indexOf('успешно') !== -1) {
        //         setMessageColor("#2ecc71");
        //     } else {
        //         setMessageColor("red");
        //     }
        // })
        // .catch((err) => {
        //     if (err.response && err.response.data && err.response.data.message) {
        //         setMessage(err.response.data.message);
        //     } else {
        //         setMessage("Ошибка");
        //     }
        // });
    }
    const goBack = () => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/';
    }
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'plt_student' && localStorage.getItem('statementdata') != '') {
                    return <div style={{ textAlign: 'left', width: '1200px' }}>
                        <button id='toClick' style={{ visibility: 'hidden' }} onLoad={() => alert('a')} onClick={() => loadvalues()}>загрузить</button>
                        <KPINavbar />
                        <br /><br /><br /><br /><br /><br />
                        <button onClick={() => goBack()} className='backbutton'><TiArrowBack style={{ verticalAlign: 'middle', marginTop: '-4px' }} /> Вернуться на главную</button><br /><br />
                        <br />
                        <h2>Личная карточка</h2>
                        <h3>Заполните поля, проверьте правильность:</h3>
                        <table>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>ФИО *</td>
                                <td style={{ width: '50px' }}></td>
                                <td><input id="inputFIO" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='ФИО полностью'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Дата рождения *</td>
                                <td style={{ width: '50px' }}></td>
                                <td><input id="inputDOB" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Дата рождения'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Название факультета *</td>
                                <td style={{ width: '50px' }}></td>
                                <td><input id="inputFaculty" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Название факультета'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Специальность *</td>
                                <td style={{ width: '50px' }}></td>
                                <td><input id="inputSpecialization" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Специальность'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Курс *</td>
                                <td style={{ width: '50px' }}></td>
                                <td><input id="inputCourse" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Курс'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Группа *</td>
                                <td style={{ width: '50px' }}></td>
                                <td><input id="inputGroup" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Группа'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Язык обучения *</td>
                                <td style={{ width: '50px' }}></td>
                                <td><input id="inputStudyLanguage" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Язык обучения'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Номер удостоверения / паспорта *</td>
                                <td style={{ width: '50px' }}></td>
                                <td><input id="inputIcnumber" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Номер удостоверения'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Орган выдачи *</td>
                                <td style={{ width: '50px' }}></td>
                                <td><input id="inputIcdepartment" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Орган выдачи'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Дата выдачи *</td>
                                <td style={{ width: '50px' }}></td>
                                <td><input id="inputIcdate" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Дата выдачи'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>ИИН *</td>
                                <td style={{ width: '50px' }}></td>
                                <td><input id="inputIIN" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='ИИН'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Контактный телефон *</td>
                                <td style={{ width: '50px' }}></td>
                                <td><input id="inputPhoneNumber" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Телефон'></input></td>
                            </tr>
                            <tr>
                                <td style={{ paddingTop: '10px' }}>Дополнительный номер</td>
                                <td style={{ width: '50px' }}></td>
                                <td><input id="inputExtraNumber" className='btnNeutral' style={{ width: '300px' }} type="text" placeholder='Телефон родителей'></input></td>
                            </tr>
                        </table>
                        <h5>Обязательные поля отмечены звездочкой (*)</h5>
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

export default observer(AddDormCard)