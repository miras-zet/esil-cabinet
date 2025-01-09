import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import InfoService from '../services/InfoService';
import IAttendanceData from '../models/IAttendanceData';
import moment from 'moment';

const AttendanceRecordStudent: FC = () => {
    const { store } = useContext(Context);
    const [attendanceData, setAttendanceData] = useState<Array<IAttendanceData>>([]);

    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
        InfoService.getAttendanceInfo().then((response) => {
            setAttendanceData(response.data);
        });
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }

    }, [])


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
    function getWeekDayName(dateString) {
        const date = new Date(dateString);
        const weekdays = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
        return weekdays[date.getDay()];
    }
    const attendanceList = attendanceData.map((element,index) => {
        return <tr>
            <td id="table-divider-stats">{index+1}</td>
            <td id="table-divider-stats">{moment(element.date).format("DD.MM.YYYY")}</td>
            <td id="table-divider-stats">{getWeekDayName(element.date)}</td>
            <td id="table-divider-stats">{element.checkin.slice(0, -3)}</td>
            <td id="table-divider-stats">{element.checkout.slice(0, -3)}</td>
        </tr>
    });
    return <div style={{ textAlign: 'center', width: '1000px', marginTop: '10%' }}>
        <KPINavbar />
        <br /><br /><br /><br />
        <h3>Информация по посещениям занятий</h3>
        <h4>Обновляется ежемесячно</h4>
        <Link to={"/"}><button className='backbutton'>Вернуться назад</button></Link> <br /><br />
        <br />
        <table id='opaqueTable' style={{paddingLeft: '15px', width: '80%',marginLeft:'11%'}}>
            <tr>
                <th style={{ textAlign: 'center' }}><br />№<br />&nbsp;</th>
                <th style={{ textAlign: 'center' }}><br />Дата<br />&nbsp;</th>
                <th style={{ textAlign: 'center' }}><br />День недели<br />&nbsp;</th>
                <th style={{ textAlign: 'center' }}><br />Время входа<br />&nbsp;</th>
                <th style={{ textAlign: 'center' }}><br />Время выхода<br />&nbsp;</th>
                <th>&nbsp;</th>
            </tr>
            {attendanceList}
            <tr>
                <td>&nbsp;</td>
            </tr>
        </table>
    </div>
}

export default observer(AttendanceRecordStudent)