import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import './Certificate.css'
import KPINavbar from '../components/KPINavbar';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import CafedraService from '../services/CafedraService';
import ICourseraDocsList from '../models/ICourseraDocsList';


const CourseraDocsList: FC = () => {
    const { store } = useContext(Context);
    //const navigate = useNavigate();
    const [data, setData] = useState<Array<ICourseraDocsList>>([]);
    const [approvedHidden, setApprovedHidden] = useState<boolean>(false);
    useEffect(() => {
        if (localStorage.getItem('editMode') == 'true') localStorage.setItem('editMode', 'false');
        if (localStorage.getItem('approvedHidden') == 'true') setApprovedHidden(true);
        CafedraService.getCourseraDocsByCafedra().then((response) => {
            setData(response.data);
        }).catch((err) => {
            console.log(err);
            setData([]);
        });
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }

    }, [])

    // useEffect(()=>{
    //   setModal(modals)
    // },[])

    const switchButton = () => {
        if (approvedHidden) {
            setApprovedHidden(false)
            localStorage.setItem('approvedHidden', 'false');
        }
        else {
            setApprovedHidden(true);
            localStorage.setItem('approvedHidden', 'true');
        }

    }

    // const displayMessageApproved = (fio, datecreated, datemodified, ishostel, roomnumber) => {
    //     let dormtype = ''
    //     if (ishostel == 0) { dormtype = 'Собственное общежитие'; }
    //     else {
    //         dormtype = 'Хостел';
    //     }
    //     alert(`${fio} \nЗаявка создана: ${moment(datecreated).format("DD.MM.YYYY")} \nЗаявка принята: ${moment(datemodified).format("DD.MM.YYYY")} \nВид общежития: ${dormtype} \nНомер комнаты: ${roomnumber}`);
    // }

    // const displayMessageDenied = (fio, datecreated, datemodified, notification_message) => {
    //     alert(`${fio} \nЗаявка создана: ${moment(datecreated).format("DD.MM.YYYY")} \nЗаявка отклонена: ${moment(datemodified).format("DD.MM.YYYY")} \nПричина: ${notification_message}`);
    // }

    // const showBenefits = (fio, benefits) => {
    //     alert(`Льгота у ${fio}: \n${benefits}`);
    // }

    // const redirectDocs = (type,data,extradata,iin) =>{
    //     switch(type){
    //         case 'statement': {
    //             localStorage.setItem('statementdata',data);
    //             window.location.href = window.location.protocol + '//' + window.location.host + '/viewdormstatement';
    //         } break;
    //         case 'card': {
    //             localStorage.setItem('viewinguseriin',iin)
    //             localStorage.setItem('carddata',data);
    //             localStorage.setItem('parentsdata',extradata);
    //             window.location.href = window.location.protocol + '//' + window.location.host + '/viewdormcard';
    //         } break;
    //         case 'agreement': {
    //             localStorage.setItem('viewinguseriin',iin)
    //             window.location.href = window.location.protocol + '//' + window.location.host + '/viewdormagreement';
    //         } break;
    //     }
    // }
    const dataList = data.map((element, index) =>
        (element.confirmed != 1 || !approvedHidden) ? <tr key={element.id} style={{ textAlign: 'center' }}>
            <td style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>{index + 1}&nbsp;&nbsp;&nbsp;</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>{element.fio}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{element.filepath}</td>
            {/* <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{element.link}</td> */}
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{element.confirmed}</td>  
        </tr> : <></>
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

    // const redirect = (iin: any, fio: string) => {
    //     localStorage.setItem('dormType', 'empty');
    //     localStorage.setItem('dormIIN', iin);
    //     localStorage.setItem('dormFIO', fio);
    //     open();
    // }

    // const redirectEdit = (iin: any, fio: string, ishostel: string, dormMessage: string, dormRoomNumber: string) => {
    //     let dormType;
    //     if (ishostel == '0') dormType = 'dorm'
    //     else dormType = 'hostel';
    //     localStorage.setItem('dormIIN', iin);
    //     localStorage.setItem('dormFIO', fio);
    //     localStorage.setItem('dormType', dormType);
    //     localStorage.setItem('dormMessage', dormMessage);
    //     localStorage.setItem('dormRoomNumber', dormRoomNumber);
    //     localStorage.setItem('editMode', 'true');
    //     open();
    // }
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'plt_tutor') {
                    return <div style={{ textAlign: 'left', width: '1200px', marginTop: '10%' }}>
                        <KPINavbar />
                        <br /><br /><br /><br />
                        <Link to={"/"}><button className='navbarbutton'>Вернуться назад</button></Link><br />
                        <h2>Список загруженных сертификатов Coursera</h2>
                        <h3>{dataList.length} файлов</h3>
                        <br />
                        {approvedHidden ?
                            <button className='backbutton' onClick={() => switchButton()}><FaRegEye /> Показать принятые</button>
                            :
                            <button className='backbutton' onClick={() => switchButton()}><FaRegEyeSlash /> Скрыть принятые</button>
                        }
                        <br /><br />
                        <table id='opaqueTable' style={{ marginLeft: '-1.3%', paddingLeft: '15px', width: '107%' }}>
                            <tr>
                                <th style={{ textAlign: 'center' }}><br />№&nbsp;&nbsp;<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />ФИО<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Ссылка на файл<br />&nbsp;</th>
                                {/* <th style={{ textAlign: 'center' }}><br />Ссылка-подтверждение<br />&nbsp;</th> */}
                                <th style={{ textAlign: 'center' }}><br />Подтверждено<br />&nbsp;</th>
                                <th>&nbsp;</th>
                            </tr>
                            {dataList}
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
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

export default observer(CourseraDocsList)