import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
//import { useNavigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
//import { Tooltip } from 'react-tooltip';
import INotificationData from '../models/INotificationData';
import NotificationService from '../services/NotificationService';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { MdOutlineNotificationImportant } from 'react-icons/md';

const NotificationsList: FC = () => {
    const { store } = useContext(Context);
    //const navigate = useNavigate();
    const [notifications, setNotificationsData] = useState<Array<INotificationData>>([]);

    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
        NotificationService.getNotifications().then((response) => {
            setNotificationsData(response.data);
        }).catch((err) => {
            console.log(err);
            setNotificationsData([]);
        });
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }

    }, [])

    const markAsRead = (notif_id) => {
        NotificationService.markAsRead(notif_id).then(() => {
            location.reload();
        }).catch((err) => {
            console.log(err);
            //setNotificationsData([]);
        });
    }
    // const redirectDorms = (id, lastname, firstname) => {
    //     if (confirm(`Вы уверены, что хотите подать заявку на общежитие для ${lastname} ${firstname}?`)) {
    //         UploadService.createDormRequestForUserSelected(id).then(() => {
    //             location.reload();
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     }
    // }

    const notificationList = notifications.map((element, index) => {
        return element.viewed == 0 ? <div style={{alignItems:'center'}}><br />
            <div key={index} style={{ alignItems: 'center', width: '93%', height: '10%', padding: '20px 20px 20px 20px', backgroundColor: '#dbdbdb', borderRadius: '20px' }}>
                <h3>{element.notification_name}</h3>
                {element.isimportant==1? <b style={{color:'red'}}>Важное уведомление <MdOutlineNotificationImportant /><br/></b>:''}
                {element.ispersonal == 1 ? <>Отправитель: <b>{element.lastname} {element.name}</b><br /></> : <></>}

                {element.ispersonal == 1 ? <>Текст сообщения: "{element.message}"<br /></> : <>{element.message}</>}<br /><br />
                Дата уведомления: {moment(element.date_sent).format("DD.MM.YYYY")}<br /><br />
                <button className='greenbutton' onClick={() => markAsRead(element.id)}>Прочитано</button>
            </div>
        </div> : <></>
    }
    );

    const notificationListRead = notifications.map((element, index) => {
        return element.viewed == 1 ? <div><br />
            <div key={index} style={{ alignItems: 'center', width: '93%', height: '10%', padding: '20px 20px 20px 20px', backgroundColor: '#dbdbdb', borderRadius: '20px' }}>
                <h3>{element.notification_name}</h3>
                {element.ispersonal == 1 ? <>Отправитель: <b>{element.lastname} {element.name}</b><br /></> : <></>}

                {element.ispersonal == 1 ? <>Текст сообщения: "{element.message}"<br /></> : <>{element.message}</>}<br /><br />
                Прочитано: {moment(element.date_viewed).format("DD.MM.YYYY")}<br /><br />
            </div>

        </div> : <></>
    }
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

    // const redirect = (id: number, lastname: string, lang: string, type: string) => {
    //     localStorage.setItem('applicant_user_id', id + '');
    //     localStorage.setItem('currentApplicantFIO', lastname);
    //     navigate(`/${type}${lang}`);
    // }
    return (
        <div>
            {(() => {
                //const role = localStorage.getItem('role');
                return <div style={{ textAlign: 'left', width: '1200px', marginTop: '10%', marginLeft:'15%' }}>
                    <KPINavbar />
                    <br /><br /><br /><br />
                    <Link to={"/"}><button className='backbutton'>Вернуться назад</button></Link> <br /><br />
                    <h2>Список уведомлений</h2>

                    <br />
                    {notificationList.length > 0 ?
                        <div>
                            <div id='opaqueTable' style={{ marginLeft: '-1.3%', paddingLeft: '15px', width: '70%' }}>
                                {notificationList}<br />
                            </div>
                            <br /><br /><br />
                            <h3>Прочитанные уведомления</h3>
                            <div id='opaqueTable' style={{ marginLeft: '-1.3%', paddingLeft: '15px', width: '70%' }}>
                                {notificationListRead}<br />
                            </div>
                        </div> : <h3>Уведомлений нет</h3>
                    }

                </div>
            })()}

        </div>
    );
}

export default observer(NotificationsList)