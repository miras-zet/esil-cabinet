import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import CafedraService from '../services/CafedraService';
import ITutorInfoForManager from '../models/ITutorInfoForManager';
import config from "../http/config.json";
import { FaDownload } from 'react-icons/fa';
import UploadService from '../services/UploadService';
import InfoService from '../services/InfoService';
import api from '../http-common';
import { IoMdCheckmark } from 'react-icons/io';
import { RxCross2 } from "react-icons/rx";

const TutorBonusPage: FC = () => {

    const { store } = useContext(Context);
    // const [user, setUser] = useState([]);  
    //const {modal, open} = useContext(ModalContext); 
    const [tutorInfo, setTutorInfo] = useState<Array<ITutorInfoForManager>>([]);
    const [bonusPoints, setBonusPoints] = useState<number>(0);
    const [pubPoints, setPubPoints] = useState<number>(0);
    const [literaturePoints, setLiteraturePoints] = useState<number>(0);
    const [moodlePercentage, setMoodlePercentage] = useState<number>(-1);
    const [moodleVideoPercentage, setMoodleVideoPercentage] = useState<number>(-1);
    const [premiere, setPremiere] = useState<string>('');
    const [currentFile, setCurrentFile] = useState<File>();

    const selectFile = (event: React.ChangeEvent<HTMLInputElement>, filetype: string) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        setCurrentFile(selectedFiles?.[0]);
        UploadService.uploadBonusFile(selectedFiles?.[0], filetype)
            .then((response) => {
                alert(response.data.message);
                location.reload()
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert("Ошибка загрузки");
                }
                setCurrentFile(undefined);
            });
    };
    // const handleStudentCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = event.target.value;
    //     localStorage.setItem("student_count", value);
    //   };

    // const updateProforientation = () => {
    //     if(localStorage.getItem('student_count')==='' || (document.getElementById("proforientation") as HTMLInputElement).value=='0') {alert('Напишите количество приведенных студентов')}
    //     else{
    //     UploadService.updateProforientation()
    //         .then((response) => {
    //             alert(response.data.message);
    //             location.reload()
    //         })
    //         .catch((err) => {
    //             if (err.response && err.response.data && err.response.data.message) {
    //                 alert(err.response.data.message);
    //             } else {
    //                 alert("Ошибка загрузки");
    //             }
    //             setCurrentFile(undefined);
    //         });
    //     }
    // }
    /*const selectFileProforientation = (event: React.ChangeEvent<HTMLInputElement>, filetype: string) => {
        if(localStorage.getItem('student_count')==='' || (document.getElementById("proforientation") as HTMLInputElement).value=='0') {alert('Напишите количество приведенных студентов')}
        else{const { files } = event.target;
        const selectedFiles = files as FileList;
        setCurrentFile(selectedFiles?.[0]);
        UploadService.uploadBonusFileProforientation(selectedFiles?.[0], filetype)
            .then((response) => {
                alert(response.data.message);
                location.reload()
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert("Ошибка загрузки");
                }
                setCurrentFile(undefined);
            });
        }
    };*/
    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
        // if (user) {
        //   setUser(user);
        // }
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
        CafedraService.getTutorBonusData().then((response) => {
            setTutorInfo(response.data);
        });
        CafedraService.getTutorBonusDataLiterature().then((response) => {
            setLiteraturePoints(response.data);
        });
        CafedraService.getTutorBonusDataPublications().then((response) => {
            setPubPoints(response.data);
        });
        CafedraService.getTutorBonusDataMoodle().then((response) => {
            setMoodlePercentage(response.data);
        }); 
        CafedraService.getTutorBonusDataMoodleVideo().then((response) => {
            setMoodleVideoPercentage(response.data);
        });
        CafedraService.getTutorBonusDataProforientation().then((response) => {
            (document.getElementById("proforientation") as HTMLInputElement).value=response.data;

            localStorage.setItem('student_count',response.data);
        });
        InfoService.getBonusPoints().then((response) => {
            setBonusPoints(response.data);
            if (typeof(response.data) != 'number') location.reload();
            if (response.data >= 0 && response.data <= 5) {
                setPremiere('Низкий');
            }
            else if (response.data >= 6 && response.data <= 11) {
                setPremiere('Средний');
            }
            else if (response.data >= 12) {
                setPremiere('Высокий');
            }
        });
        
    }, [])

    // useEffect(()=>{
    //   setModal(modals)
    // },[])

    if (!store.isAuth) {
        return (
            <div>
                <LoginForm />
            </div>
        );
    }
    // function redirect() {
    //     // localStorage.setItem('categoryid',id);
    //     // window.location.href=window.location.protocol + '//' + window.location.host +'/kpiupload';
    //     // return;
    // }

    // const debug = () =>{
    //     alert(tutorInfo[0]?.auditorium_percentage_fileid);
    // }
    const handleFileDownload = async (fileId: number, filename: string) => {
        let failsafe = fileId;
        if (fileId < 0) failsafe = fileId * (-1);
        try {
            const response = await api.get(`${config.API_URL}/upload/downloadbonusfile/${failsafe}`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
            alert('Ошибка загрузки файла.');
        }
    };
    const confirmCategory = (category) => {
        CafedraService.confirmTutorCategory(category).then(() => {
            location.reload();
        });
    }
    const subtractCategory = (category) => {
        CafedraService.subtractTutorCategory(category).then(() => {
            location.reload();
        });
    }
    const denyCategory = (category) => {
        CafedraService.removeTutorCategory(category).then(() => {
            location.reload();
        });
    }
    const confirmFile = (category) => {
        CafedraService.confirmTutorFile(category).then(() => {
            location.reload();
        });
    }
    const denyFile = (category) => {
        CafedraService.denyTutorFile(category).then(() => {
            location.reload();
        });
    }
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'plt_tutor') { 
                    return <div>
                        <KPINavbar />
                        <br /><br /><br /><br /><br /><br /><br /><Link to={parseInt(localStorage.getItem('cafedramanager')) > 0 ? "/cafedramanagement":"/"}><button className="navbarbutton"><TiArrowBack style={{ verticalAlign: 'middle' }} /> Вернуться назад</button></Link> <br /><br />
                        <div className=''>
                            <h2>{localStorage.getItem('viewinguserfio')}</h2>
                            <h3>Баллов: {bonusPoints}</h3>
                            <h4>Коэффициент трудового участия: {premiere}</h4>
                            <table style={{ textAlign: 'left' }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <table>
                                                <tr><div id='homepagePanel'>
                                                    <h3>Учебная деятельность</h3>
                                                    <table style={{ fontSize: '12pt', paddingLeft: '15px' }}>
                                                        <tbody>
                                                            {/* <tr>
                                                                <td id="table-divider-stats-left">Аудиторная нагрузка (выше 60%)</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.auditorium_percentage_fileid != 0 ? tutorInfo[0]?.auditorium_percentage_fileid < 0?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br/>
                                                                        <button className='backbutton' style={{width:'40px',height:'40px'}} onClick={() => handleFileDownload(tutorInfo[0]?.auditorium_percentage_fileid, tutorInfo[0]?.auditorium_percentage_filename)}><FaDownload style={{width:'20px',height:'20px', position:'absolute',marginLeft:'-10px',marginTop:'-10px'}}/></button><br/>
                                                                        <button className='greenbutton' style={{width:'25px',height:'25px'}} onClick={()=> confirmFile('auditorium_percentage')}><IoMdCheckmark style={{width:'16px',height:'16px', position:'absolute',marginLeft:'-8px',marginTop:'-8px'}}/></button>
                                                                        <button className='redbutton' style={{width:'25px',height:'25px'}} onClick={()=> denyFile('auditorium_percentage')}><RxCross2 style={{width:'16px',height:'16px', position:'absolute',marginLeft:'-8px',marginTop:'-8px'}}/></button>
                                                                        <br/><br/>
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                    <br/>
                                                                    Подтверждено <IoMdCheckmark/>
                                                                    <br/><br/>
                                                                </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}><label className="btnNeutral" style={{ backgroundColor: 'silver', color: 'black', border: 'none' }} >
                                                                        {currentFile ? `Загрузка...` : 'Выбрать файл...'}
                                                                        <input type="file" hidden onChange={(event) => selectFile(event, "auditorium_percentage")} style={{ backgroundColor: 'silver', color: 'DimGray' }} />
                                                                    </label></div>}
                                                                </td>
                                                            </tr> */}
                                                            <tr>
                                                                <td id="table-divider-stats-left">Аудиторная нагрузка (выше 60%)</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.auditorium_percentage_fileid == 0 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <RxCross2/>
                                                                        <br /><br />
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        Подтверждено <IoMdCheckmark />
                                                                        <br /><br />
                                                                    </div>}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td id="table-divider-stats-left">Готовность УМКД</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.umkd_fileid == 0 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <button className='backbutton' style={{ width: '25px', height: '25px' }} onClick={() => confirmCategory('umkd')}><IoMdCheckmark style={{ width: '16px', height: '16px', position: 'absolute', marginLeft: '-8px', marginTop: '-8px' }} /></button>
                                                                        <br /><br />
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        Подтверждено <IoMdCheckmark />
                                                                        <br/>
                                                                        <button className='backbutton' onClick={() => denyCategory('umkd')}>Удалить</button>
                                                                        <br /><br />
                                                                    </div>}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td id="table-divider-stats-left">Разработка нового курса (за последний год)</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.course_development_fileid == 0 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <button className='backbutton' style={{ width: '25px', height: '25px' }} onClick={() => confirmCategory('course_development')}><IoMdCheckmark style={{ width: '16px', height: '16px', position: 'absolute', marginLeft: '-8px', marginTop: '-8px' }} /></button>
                                                                        <br /><br />
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        Подтверждено <IoMdCheckmark />
                                                                        <br/>
                                                                        <button className='backbutton' onClick={() => denyCategory('course_development')}>Удалить</button>
                                                                        <br /><br />
                                                                    </div>}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td id="table-divider-stats-left">Наличие сертификатов по читаемым дисциплинам по требованиям (72 часа, по 3 года)</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.certificates_fileid == 0 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <button className='backbutton' style={{ width: '25px', height: '25px' }} onClick={() => confirmCategory('certificates')}><IoMdCheckmark style={{ width: '16px', height: '16px', position: 'absolute', marginLeft: '-8px', marginTop: '-8px' }} /></button>
                                                                        <br /><br />
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        Подтверждено <IoMdCheckmark />
                                                                        <br/>
                                                                        <button className='backbutton' onClick={() => denyCategory('certificates')}>Удалить</button>
                                                                        <br /><br />
                                                                    </div>}
                                                                </td>
                                                            </tr>
                                                            {/* <tr>
                                                                <td id="table-divider-stats-left">Наличие сертификатов по читаемым дисциплинам по требованиям (72 часа, по 3 года)</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.certificates_fileid != 0 ? tutorInfo[0]?.certificates_fileid < 0?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br/>
                                                                        <button className='backbutton' style={{width:'40px',height:'40px'}} onClick={() => handleFileDownload(tutorInfo[0]?.certificates_fileid, tutorInfo[0]?.certificates_filename)}><FaDownload style={{width:'20px',height:'20px', position:'absolute',marginLeft:'-10px',marginTop:'-10px'}}/></button><br/>
                                                                        <button className='greenbutton' style={{width:'25px',height:'25px'}} onClick={()=> confirmFile('certificates')}><IoMdCheckmark style={{width:'16px',height:'16px', position:'absolute',marginLeft:'-8px',marginTop:'-8px'}}/></button>
                                                                        <button className='redbutton' style={{width:'25px',height:'25px'}} onClick={()=> denyFile('certificates')}><RxCross2 style={{width:'16px',height:'16px', position:'absolute',marginLeft:'-8px',marginTop:'-8px'}}/></button>
                                                                        <br/><br/>
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                    <br/>
                                                                    Подтверждено <IoMdCheckmark/>
                                                                    <br/><br/>
                                                                </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}><label className="btnNeutral" style={{ backgroundColor: 'silver', color: 'black', border: 'none' }} >
                                                                        {currentFile ? `Загрузка...` : 'Выбрать файл...'}
                                                                        <input type="file" hidden onChange={(event) => selectFile(event, "certificates")} style={{ backgroundColor: 'silver', color: 'DimGray' }} />
                                                                    </label></div>}
                                                                </td>
                                                            </tr> */}
                                                            <tr>
                                                                <td id="table-divider-stats-left">Разработка и подготовка учебной и учебно-методической литературы (за 5 лет)</td>
                                                                <td id="table-divider-stats">{literaturePoints == 0 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <RxCross2/>
                                                                        <br /><br />
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        Подтверждено {literaturePoints}x <IoMdCheckmark />
                                                                        <br /><br />
                                                                    </div>}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                            <td id="table-divider-stats-left" style={{zIndex:0, pointerEvents:'none',position:'absolute', height:'300px', width:'448px'}}><br/>Портал дистанционного обучения<br/><br/></td>
                                                            </tr>
                                                            <tr><br/><br/><br/></tr>
                                                            <tr>
                                                                <div style={{marginLeft:'46px'}}><td id="table-divider-stats-left"><br/>Наполнение курсов файлами и тестами<br/><br/></td></div>
                                                                <td id="table-divider-stats">{moodlePercentage == -1 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <RxCross2 />
                                                                        <br /><br />
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        {moodlePercentage}%
                                                                        <br /><br />
                                                                    </div>}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <div style={{marginLeft:'46px'}}><td id="table-divider-stats-left"><br/>Наполнение курсов видеолекциями<br/><br/></td></div>
                                                                <td id="table-divider-stats">{moodleVideoPercentage == -1 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <RxCross2 />
                                                                        <br /><br />
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        {moodleVideoPercentage}%
                                                                        <br /> <br /> 
                                                                    </div>}             
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td><br /></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div><br /></tr>
                                                <tr><div id='homepagePanel'>
                                                    <h3>Научная деятельность</h3>
                                                    <table style={{ fontSize: '12pt', paddingLeft: '15px' }}>
                                                        <tbody>
                                                            <tr>
                                                                <td id="table-divider-stats-left">Участие в научных мероприятиях университета</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.science_event_fileid == 0 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <RxCross2/>
                                                                        <br /><br />
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        Подтверждено <IoMdCheckmark />
                                                                        <br /><br />
                                                                    </div>}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td id="table-divider-stats-left">Публикация статей / монографий (за 3 года)</td>
                                                                <td id="table-divider-stats">{pubPoints == 0 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <RxCross2/>
                                                                        <br /><br />
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        Подтверждено {pubPoints}x <IoMdCheckmark />
                                                                        <br /><br />
                                                                    </div>}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td id="table-divider-stats-left">Подготовка заявок на гранты (1 раз в 2 года)</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.grants_fileid == 0 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <RxCross2/>
                                                                        <br /><br />
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        Подтверждено <IoMdCheckmark />
                                                                        <br /><br />
                                                                    </div>}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td id="table-divider-stats-left">Руководство НИРС за последние 2 года</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.nirs_fileid == 0 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <RxCross2/>
                                                                        <br /><br />
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        Подтверждено <IoMdCheckmark />
                                                                        <br /><br />
                                                                    </div>}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><br /></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div><br /></tr>
                                                <tr></tr>
                                            </table>
                                        </td>
                                        <td style={{ width: '15px' }}></td>
                                        <td>
                                            <table>
                                                <tr><div id='homepagePanel'>
                                                    <h3>Воспитательная деятельность</h3>
                                                    <table style={{ fontSize: '12pt', paddingLeft: '15px' }}>
                                                        <tbody>
                                                            <tr>
                                                                <td id="table-divider-stats-left">Кураторство / эдвайзерство</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.is_adviser_fileid == 0 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <button className='backbutton' style={{ width: '25px', height: '25px' }} onClick={() => confirmCategory('is_adviser')}><IoMdCheckmark style={{ width: '16px', height: '16px', position: 'absolute', marginLeft: '-8px', marginTop: '-8px' }} /></button>
                                                                        <br /><br />
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        Подтверждено <IoMdCheckmark />
                                                                        <br/>
                                                                        <button className='backbutton' onClick={() => denyCategory('is_adviser')}>Удалить</button>
                                                                        <br /><br />
                                                                    </div>}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td id="table-divider-stats-left">Участие в мероприятиях воспитательного характера</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.disciplinary_event_fileid == 0 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <button className='backbutton' style={{ width: '25px', height: '25px' }} onClick={() => confirmCategory('disciplinary_event')}><IoMdCheckmark style={{ width: '16px', height: '16px', position: 'absolute', marginLeft: '-8px', marginTop: '-8px' }} /></button>
                                                                        <br /><br />
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        Подтверждено <IoMdCheckmark />
                                                                        <br/>
                                                                        <button className='backbutton' onClick={() => denyCategory('disciplinary_event')}>Удалить</button>
                                                                        <br /><br />
                                                                    </div>}
                                                                </td>
                                                            </tr>    
                                                            <tr>
                                                                <td><br /></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div><br /></tr>
                                                <tr><div id='homepagePanel'>
                                                    <h3>Общественная деятельность</h3>
                                                    <table style={{ fontSize: '12pt', paddingLeft: '15px' }}>
                                                        <tbody>
                                                        <tr>
                                                                <td id="table-divider-stats-left">Сотрудничество с работодателями</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.employer_cooperation_fileid != 0 ? tutorInfo[0]?.employer_cooperation_fileid < 0?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br/>
                                                                        <button className='backbutton' style={{width:'40px',height:'40px'}} onClick={() => handleFileDownload(tutorInfo[0]?.employer_cooperation_fileid, tutorInfo[0]?.employer_cooperation_filename)}><FaDownload style={{width:'20px',height:'20px', position:'absolute',marginLeft:'-10px',marginTop:'-10px'}}/></button><br/>
                                                                        <button className='greenbutton' style={{width:'25px',height:'25px'}} onClick={()=> confirmFile('employer_cooperation')}><IoMdCheckmark style={{width:'16px',height:'16px', position:'absolute',marginLeft:'-8px',marginTop:'-8px'}}/></button>
                                                                        <button className='redbutton' style={{width:'25px',height:'25px'}} onClick={()=> denyFile('employer_cooperation')}><RxCross2 style={{width:'16px',height:'16px', position:'absolute',marginLeft:'-8px',marginTop:'-8px'}}/></button>
                                                                        <br/><br/>
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                    <br/>
                                                                    Подтверждено <IoMdCheckmark/>
                                                                    <br/><br/>
                                                                </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}><label className="btnNeutral" style={{ backgroundColor: 'silver', color: 'black', border: 'none' }} >
                                                                        {currentFile ? `Загрузка...` : 'Выбрать файл...'}
                                                                        <input type="file" hidden onChange={(event) => selectFile(event, "employer_cooperation")} style={{ backgroundColor: 'silver', color: 'DimGray' }} />
                                                                    </label></div>}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td id="table-divider-stats-left">Участие в работе коллегиальных органов университета; Участие в составе комиссии, рабочих групп и др.</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.commission_participation_fileid == 0 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <button className='backbutton' style={{ width: '25px', height: '25px' }} onClick={() => confirmCategory('commission_participation')}><IoMdCheckmark style={{ width: '16px', height: '16px', position: 'absolute', marginLeft: '-8px', marginTop: '-8px' }} /></button>
                                                                        <br /><br />
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        Подтверждено <IoMdCheckmark />
                                                                        <br/>
                                                                        <button className='backbutton' onClick={() => denyCategory('commission_participation')}>Удалить</button>
                                                                        <br /><br />
                                                                    </div>}
                                                                </td>
                                                            </tr>  
                                                            <tr>
                                                                <td id="table-divider-stats-left">Своевременное выполнение поручений руководства</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.task_completion_fileid == 0 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <button className='backbutton' style={{ width: '50px', height: '50px'}} onClick={() => subtractCategory('task_completion')}>-1</button>&ensp;
                                                                        <button className='backbutton' style={{ width: '50px', height: '50px'}} onClick={() => confirmCategory('task_completion')}>+1</button>
                                                                        <br /><br />
                                                                    </div> : tutorInfo[0]?.task_completion_fileid == -1 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                    <br />
                                                                        <button className='backbutton' style={{ width: '50px', height: '50px', backgroundColor:'red', color:'white'}} onClick={() => denyCategory('task_completion')}>-1</button>&ensp;
                                                                        <button className='backbutton' style={{ width: '50px', height: '50px'}} onClick={() => confirmCategory('task_completion')}>+1</button>
                                                                        <br /><br />
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                    <br />
                                                                        <button className='backbutton'   style={{ width: '50px', height: '50px'}} onClick={() => subtractCategory('task_completion')}>-1</button>&ensp;
                                                                        <button className='navbarbutton' style={{ width: '50px', height: '50px'}} onClick={() => denyCategory('task_completion')}>+1</button>
                                                                        <br /><br />
                                                                    </div>}
                                                                </td>
                                                            </tr>  
                                                            <tr>
                                                                <td id="table-divider-stats-left">Профориентационная работа</td>
                                                                <td id="table-divider-stats"><br />
                                                                    <i style={{whiteSpace:'nowrap'}}>Приведено студентов:&nbsp;<input type='text' style={{width:'28px'}} id='proforientation' disabled={true} className='btnNeutral' placeholder='Кол-во абитуриентов'></input></i>
                                                                    <br/><br/>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><br /></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div><br /></tr>
                                                <tr></tr>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
                else {
                    return <Navigate to="/" />
                }
            })()}

        </div>
    );
}

export default observer(TutorBonusPage)