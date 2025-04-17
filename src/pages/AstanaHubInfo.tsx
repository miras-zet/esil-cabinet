import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import InfoService from '../services/InfoService';
import IAstanaHubInfoSpecific from '../models/IAstanaHubInfoSpecific';
import { exportHtmlTableToExcel } from '../models/exportHtmlTableToExcel';
import moment from 'moment';


const AstanaHubInfo: FC = () => {
    const { store } = useContext(Context);
    const [info0, setInfo0] = useState<String>("");
    const [info, setInfo] = useState<String>("");
    const [info2, setInfo2] = useState<String>("");

    const [FPNInfo, setFPNInfo] = useState<Array<IAstanaHubInfoSpecific>>([]);
    const [FBUInfo, setFBUInfo] = useState<Array<IAstanaHubInfoSpecific>>([]);

    moment.locale('ru');

    useEffect(() => {
        InfoService.getAstanaHubInfo().then((response) => {
            setInfo0(response.data.message);
            setInfo(response.data.message1);
            setInfo2(response.data.message2);
        });
        InfoService.getAstanaHubInfoSpecific('ФПН').then((response) => {
            setFPNInfo(response.data)
        });
        InfoService.getAstanaHubInfoSpecific('ФБУ').then((response) => {
            setFBUInfo(response.data)
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
    const handleExport = (tableid) => {
        exportHtmlTableToExcel(tableid, `Кафедра ${tableid} студенты не сдавшие курс ${moment(Date.now()).format("LL")}`, [80,80,80,90,65,75],[]);
      };
    const FBUList = FBUInfo.map((element) =>
        <tr key={element.lastname} style={{ textAlign: 'center' }}>
            <td>{element.lastname}</td>
            <td>{element.firstname}</td>
            <td>{element.patronymic}</td>
            <td>{element.cafedra}</td>
            <td>{element.course}</td>
            <td>{element.group}</td>
        </tr>
    );
    const FPNList = FPNInfo.map((element) =>
        <tr key={element.lastname} style={{ textAlign: 'center' }}>
            <td>{element.lastname}</td>
            <td>{element.firstname}</td>
            <td>{element.patronymic}</td>
            <td>{element.cafedra}</td>
            <td>{element.course}</td>
            <td>{element.group}</td>
        </tr>
    );
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'plt_tutor') {
                    return <div style={{ textAlign: 'left', width: '1200px' }}>
                        <KPINavbar />
                        <br /><br /><br /><br /><br /><br /><br />
                        <Link to={"/"}><button className="navbarbutton"><TiArrowBack style={{ verticalAlign: 'middle' }} /> Вернуться назад</button></Link> <br />
                        <p>{info0}</p>
                        <p>{info}</p>
                        <p>{info2}</p>
                        <button className='navbarbutton' onClick={()=>handleExport('ФПН')}>Экспорт ФПН</button>&ensp;
                        <button className='navbarbutton' onClick={()=>handleExport('ФБУ')}>Экспорт ФБУ</button><br/><br/>
                        <table hidden id="ФПН">
                            <tr>
                                <th>Фамилия</th>
                                <th>Имя</th>
                                <th>Отчество</th>
                                <th>Кафедра</th>
                                <th>Курс</th>
                                <th>Группа</th>
                            </tr>
                            {FBUList}
                        </table>
                        <table hidden id="ФБУ">
                            <tr>
                                <th>Фамилия</th>
                                <th>Имя</th>
                                <th>Отчество</th>
                                <th>Кафедра</th>
                                <th>Курс</th>
                                <th>Группа</th>
                            </tr>
                            {FPNList}
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

export default observer(AstanaHubInfo)