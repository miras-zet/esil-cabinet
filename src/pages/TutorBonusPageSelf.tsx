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
import api from '../http-common';
import config from "../http/config.json";
import { FaDownload } from 'react-icons/fa';
import UploadService from '../services/UploadService';
import InfoService from '../services/InfoService';
import { IoMdCheckmark } from 'react-icons/io';
import { RxCross2 } from "react-icons/rx";


const TutorBonusPageSelf: FC = () => {

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
        UploadService.uploadBonusFileSelf(selectedFiles?.[0], filetype)
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

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
        CafedraService.getTutorBonusDataSelf().then((response) => {
            setTutorInfo(response.data);
        });
        CafedraService.getTutorBonusDataProforientationSelf().then((response) => {
            (document.getElementById("proforientation") as HTMLInputElement).value = response.data;
            localStorage.setItem('student_count', response.data);
        });
        CafedraService.getTutorBonusDataLiteratureSelf().then((response) => {
            setLiteraturePoints(response.data);
        });
        CafedraService.getTutorBonusDataPublicationsSelf().then((response) => {
            setPubPoints(response.data);
        });
        CafedraService.getTutorBonusDataMoodleSelf().then((response) => {
            setMoodlePercentage(response.data);
        });
        CafedraService.getTutorBonusDataMoodleVideoSelf().then((response) => {
            setMoodleVideoPercentage(response.data);
        });
        InfoService.getBonusPointsSelf().then((response) => {
            setBonusPoints(response.data);
            if (typeof (response.data) != 'number') location.reload();
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

    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                const data = JSON.parse(localStorage.getItem('data'));
                let FIO = '';
                if (data) FIO = data.lastname + ' ' + data.name + ' ' + data.middlename;
                if (role == 'plt_tutor') {
                    return <div>
                        <KPINavbar />
                        <br /><br /><br /><br /><br /><br /><br /><Link to={"/"}><button className="navbarbutton"><TiArrowBack style={{ verticalAlign: 'middle' }} /> Вернуться назад</button></Link> <br /><br />
                        <div className=''>
                            <h2>{FIO}</h2>
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
                                                                        <button className='graybutton' style={{width:'40px',height:'40px'}} onClick={() => handleFileDownload(tutorInfo[0]?.auditorium_percentage_fileid, tutorInfo[0]?.auditorium_percentage_filename)}><FaDownload style={{width:'20px',height:'20px', position:'absolute',marginLeft:'-10px',marginTop:'-10px'}}/></button><br/>
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
                                                                        <RxCross2 />
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
                                                                        <RxCross2 />
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
                                                                <td id="table-divider-stats-left">Разрабока нового курса</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.course_development_fileid == 0 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <RxCross2 />
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
                                                                <td id="table-divider-stats-left">Наличие сертификатов по читаемым дисциплинам по требованиям (72 часа, по 3 года)</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.certificates_fileid == 0 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <RxCross2 />
                                                                        <br /><br />
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        Подтверждено <IoMdCheckmark />
                                                                        <br /><br />
                                                                    </div>}
                                                                </td>
                                                            </tr>
                                                            {/* <tr>
                                                                <td id="table-divider-stats-left">Наличие сертификатов по читаемым дисциплинам по требованиям (72 часа, по 3 года)</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.certificates_fileid != 0 ? tutorInfo[0]?.certificates_fileid < 0?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br/>
                                                                        <button className='graybutton' style={{width:'40px',height:'40px'}} onClick={() => handleFileDownload(tutorInfo[0]?.certificates_fileid, tutorInfo[0]?.certificates_filename)}><FaDownload style={{width:'20px',height:'20px', position:'absolute',marginLeft:'-10px',marginTop:'-10px'}}/></button><br/>
                                                                        Ожидает подтверждения
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
                                                                        <RxCross2 />
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
                                                            <td id="table-divider-stats-left" style={{zIndex:0, pointerEvents:'none',position:'absolute', height:'415-px', width:'448px'}}><br/>Портал дистанционного обучения<br/><br/></td>
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
                                                                        <br />
                                                                        {moodlePercentage < 100 ? <><Link to={"/moodleinfo"} style={{zIndex:100}}><button className="navbarbutton">Помощь</button></Link> <br /></> : ''}
                                                                        <br />
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
                                                                <div style={{marginLeft:'46px'}}>
                                                                    <td id="table-divider-stats-left" width={'350px'} style={{paddingLeft:'20px'}}><br /><Link to={"/videorecordhelp"} style={{zIndex:100}}><button className="navbarbutton">Инструкция для записи видеолекций</button></Link><br /><br />
                                                                    </td>
                                                                </div>
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
                                                                        <RxCross2 />
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
                                                                        <RxCross2 />
                                                                        <br />
                                                                        <Link to={"/publicationsinfo"}><button className="navbarbutton">Помощь</button></Link> <br />
                                                                        <br />
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        Подтверждено {pubPoints}x <IoMdCheckmark />
                                                                        <br />
                                                                        <Link to={"/publicationsinfo"}><button className="navbarbutton">Помощь</button></Link> <br />
                                                                        <br />
                                                                    </div>}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td id="table-divider-stats-left">Подготовка заявок на гранты (1 раз в 2 года)</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.grants_fileid == 0 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <RxCross2 />
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
                                                                        <RxCross2 />
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
                                                                        <RxCross2 />
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
                                                                <td id="table-divider-stats-left">Участие в мероприятиях воспитательного характера</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.disciplinary_event_fileid == 0 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <RxCross2 />
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
                                                <tr><div id='homepagePanel'>
                                                    <h3>Общественная деятельность</h3>
                                                    <table style={{ fontSize: '12pt', paddingLeft: '15px' }}>
                                                        <tbody>
                                                            <tr>
                                                                <td id="table-divider-stats-left">Сотрудничество с работодателями</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.employer_cooperation_fileid != 0 ? tutorInfo[0]?.employer_cooperation_fileid < 0 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <button className='backbutton' style={{ width: '40px', height: '40px' }} onClick={() => handleFileDownload(tutorInfo[0]?.employer_cooperation_fileid, tutorInfo[0]?.employer_cooperation_filename)}><FaDownload style={{ width: '20px', height: '20px', position: 'absolute', marginLeft: '-10px', marginTop: '-10px' }} /></button><br />
                                                                        Ожидает подтверждения
                                                                        <br /><br />
                                                                    </div> :
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        Подтверждено <IoMdCheckmark />
                                                                        <br /><br />
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
                                                                        <RxCross2 />
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
                                                                <td id="table-divider-stats-left">Своевременное выполнение поручений руководства</td>
                                                                <td id="table-divider-stats">{tutorInfo[0]?.task_completion_fileid == 0 ?
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        <br />
                                                                        <RxCross2 />
                                                                        <br /><br />
                                                                    </div> : tutorInfo[0]?.task_completion_fileid == -1 ?
                                                                        <div style={{ whiteSpace: 'nowrap' }}>
                                                                            <br />
                                                                            <b style={{color:'red'}}>- 1</b>
                                                                            <br /><br />
                                                                        </div> :
                                                                        <div style={{ whiteSpace: 'nowrap' }}>
                                                                            <br />
                                                                            Подтверждено <IoMdCheckmark />
                                                                            <br /><br />
                                                                        </div>
                                                                }
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td id="table-divider-stats-left">Профориентационная работа</td>
                                                                <td id="table-divider-stats"><br />
                                                                    <i style={{ whiteSpace: 'nowrap' }}>Приведено студентов:&nbsp;<input type='text' style={{ width: '28px' }} id='proforientation' disabled={true} className='btnNeutral' placeholder='Кол-во абитуриентов'></input></i>
                                                                    <br /><br />
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

export default observer(TutorBonusPageSelf)