import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import './Certificate.css'
import KPINavbar from '../components/KPINavbar';
//import { Tooltip } from 'react-tooltip';
import UploadService from '../services/UploadService';
import IDormRequestList from '../models/IDormRequestList';
import moment from 'moment';
import ModalDorm from '../components/ModalDorm';
import { ModalContext } from '../http/ModalContext';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';


const DormList: FC = () => {
    const { store } = useContext(Context);
    const { modal, open } = useContext(ModalContext);
    //const navigate = useNavigate();
    const [dormRequests, setDormRequestsData] = useState<Array<IDormRequestList>>([]);
    const [approvedHidden, setApprovedHidden] = useState<boolean>(false);
    useEffect(() => {
        if(localStorage.getItem('editMode')=='true') localStorage.setItem('editMode','false');
        if(localStorage.getItem('approvedHidden')=='true') setApprovedHidden(true);
        // const user = JSON.parse(localStorage.getItem('data'));
        UploadService.getDormRequestsData().then((response) => {
            setDormRequestsData(response.data);
        }).catch((err) => {
            console.log(err);
            setDormRequestsData([]);
        });
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }

    }, [])

    // useEffect(()=>{
    //   setModal(modals)
    // },[])

    const switchButton = () =>{     
        if(approvedHidden) {
            setApprovedHidden(false)
            localStorage.setItem('approvedHidden','false');
        }
        else{
            setApprovedHidden(true);
            localStorage.setItem('approvedHidden','true');
        }
        
    }

    const displayMessageApproved = (fio,datecreated,datemodified,ishostel,roomnumber) => {
        let dormtype=''
        if (ishostel==0) {dormtype='Собственное общежитие';}
        else{
            dormtype='Хостел';
        }
        alert(`${fio} \nЗаявка создана: ${moment(datecreated).format("DD.MM.YYYY")} \nЗаявка принята: ${moment(datemodified).format("DD.MM.YYYY")} \nВид общежития: ${dormtype} \nНомер комнаты: ${roomnumber}`);
    }

    const displayMessageDenied = (fio,datecreated,datemodified,notification_message) => {
        alert(`${fio} \nЗаявка создана: ${moment(datecreated).format("DD.MM.YYYY")} \nЗаявка отклонена: ${moment(datemodified).format("DD.MM.YYYY")} \nПричина: ${notification_message}`);
    }

    const showBenefits = (fio,benefits) =>{
        alert(`Льгота у ${fio}: \n${benefits}`);
    }
    const dormRequestsList = dormRequests.map((element, index) =>
        (element.approved!='1' || !approvedHidden) ? <tr key={element.id} style={{ textAlign: 'center' }}>
            <td style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>{index + 1}&nbsp;&nbsp;&nbsp;</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>{element.lastname} {element.firstname} {element.patronymic}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{element.specialization}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{element.study_form}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{element.iin}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{element.phone}</td>
            {
            element.grant_type == '-7' ?
            <><td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>Платное обучение</td></>
            :
            <><td id="table-divider" style={{ backgroundColor:'#e39d81', verticalAlign: 'middle', fontSize: '13pt' }}>Грант</td></>
            }
            {element.benefits!='Без квоты' ?
            <><td id="table-divider" style={{ verticalAlign: 'middle',backgroundColor:'#e39d81', fontSize: '13pt' }}><button style={{backgroundColor:'#e39d81', color:'black'}} onClick={()=>showBenefits(element.lastname+' '+element.firstname,element.benefits)}>Льготы</button></td></>
            :
            <><td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>Нет льгот</td></>
            }
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{moment(element.datecreated).format("DD.MM.YYYY")}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                {
                    element.approved == '1' ?
                    <>
                    <br/>Принято<br/><br/><button style={{backgroundColor:'#088c64'}} onClick={()=>displayMessageApproved(element.lastname+' '+element.firstname+' '+element.patronymic, element.datecreated,element.datemodified,element.ishostel,element.roomnumber)}>Детали</button>
                    <br/><br/><button style={{backgroundColor:'#088c64'}} onClick={()=>redirectEdit(element.iin, element.lastname+' '+element.firstname+' '+element.patronymic, element.ishostel,element.notification_message,element.roomnumber)}>Редактировать</button>
                    </>:
                    element.approved == '0' ?
                    <>
                    <br/><button className='graybutton' onClick={() => redirect(element.iin, element.lastname+' '+element.firstname)}>Действия</button>&nbsp;
                    {/* <button onClick={open}>Принять</button>&nbsp; */}
                    </>
                    :
                    <>
                    <b style={{color:'red'}}>Отклонено</b>
                    <br/><button style={{backgroundColor: 'crimson'}} onClick={()=>displayMessageDenied(element.lastname+' '+element.firstname+' '+element.patronymic, element.datecreated,element.datemodified,element.notification_message)}>Причина</button>
                    </>
                }
                
            </td>
        </tr>:<></>
    );
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

    const redirect = (iin: any, fio:string) => {
        localStorage.setItem('dormType', 'empty');
        localStorage.setItem('dormIIN', iin);
        localStorage.setItem('dormFIO', fio);
        open();
    }

    const redirectEdit = (iin: any, fio:string, ishostel:string, dormMessage:string, dormRoomNumber:string) => {
        let dormType;
        if(ishostel=='0')dormType='dorm'
        else dormType='hostel';
        localStorage.setItem('dormIIN', iin);
        localStorage.setItem('dormFIO', fio);
        localStorage.setItem('dormType', dormType);
        localStorage.setItem('dormMessage', dormMessage);
        localStorage.setItem('dormRoomNumber', dormRoomNumber);
        localStorage.setItem('editMode','true');
        open();
    }
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                let grammar_corrected='';
                switch (dormRequestsList.length % 10){
                    case 1: grammar_corrected='заявка'; break;
                    case 2: grammar_corrected='заявки'; break;
                    case 3: grammar_corrected='заявки'; break;
                    case 4: grammar_corrected='заявки'; break;
                    default: grammar_corrected='заявок';
                }
                if (role == 'admissionadmin') {
                    return <div style={{ textAlign: 'left', width: '1200px', marginTop: '10%' }}>
                        <KPINavbar />
                        <br /><br /><br /><br />
                        <Link to={"/applicants"}><button className='navbarbutton'>Вернуться назад</button></Link><br />
                        <h2>Список заявок на общежитие</h2>
                        <h3>{dormRequestsList.length} {grammar_corrected}</h3>
                        <br />
                        {approvedHidden?
                        <button className='graybutton' onClick={()=>switchButton()}><FaRegEye/> Показать принятые</button>
                        :
                        <button className='graybutton' onClick={()=>switchButton()}><FaRegEyeSlash /> Скрыть принятые</button>
                        }
                        <br /><br />
                        <table id='opaqueTable' style={{ marginLeft: '-1.3%', paddingLeft: '15px', width: '107%' }}>
                            <tr>
                                <th style={{ textAlign: 'center' }}><br />№&nbsp;&nbsp;<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />ФИО<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Специальность<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Форма обучения<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />ИИН<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Номер телефона<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Оплата<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Льготы<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Дата заявки<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Статус заявки<br />&nbsp;</th>
                                <th>&nbsp;</th>
                            </tr>
                            {dormRequestsList}
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                        </table>
                        {modal && <ModalDorm />}
                    </div>
                }
                else {
                    return <Navigate to="/" />
                }
            })()}

        </div>
    );
}

export default observer(DormList)