import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';

//import { Tooltip } from 'react-tooltip';
import UploadService from '../services/UploadService';
import IDormRequestList from '../models/IDormRequestList';
import moment from 'moment';

const DormList: FC = () => {
    const { store } = useContext(Context);
    //const navigate = useNavigate();
    const [dormRequests, setDormRequestsData] = useState<Array<IDormRequestList>>([]);

    useEffect(() => {
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

    const dormRequestsList = dormRequests.map((element, index) =>
        <tr key={element.id} style={{ textAlign: 'center' }}>
            <td style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>{index + 1}&nbsp;&nbsp;&nbsp;</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt', textAlign: 'center' }}>{element.lastname} {element.firstname} {element.patronymic}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{element.specialization}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{element.study_form}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{element.iin}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{element.phone}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', fontSize: '13pt' }}>{moment(element.datecreated).format("DD.MM.YYYY")}</td>
            <td id="table-divider" style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                {
                    element.approved == '1' ?
                    <>
                    Принято
                    </>:
                    <>
                    <button onClick={() => redirect(element.iin)}>Принять</button>&nbsp;
                    </>
                }
                
            </td>
        </tr>
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

    const redirect = (iin: any) => {
        UploadService.approveDormRequestForUser(iin).then(() => {
            location.reload();
          });
    }
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'admissionadmin') {
                    return <div style={{ textAlign: 'left', width: '1200px', marginTop: '10%' }}>
                        <KPINavbar />
                        <br /><br /><br /><br />
                        <Link to={"/applicants"}><button className='navbarbutton'>Вернуться назад</button></Link><br />
                        <h2>Список заявок на общежитие</h2>
                        <h4>({dormRequestsList.length} заявок)</h4>
                        <br />
                        <br />
                        <table id='opaqueTable' style={{ marginLeft: '-1.3%', paddingLeft: '15px', width: '107%' }}>
                            <tr>
                                <th style={{ textAlign: 'center' }}><br />№&nbsp;&nbsp;<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />ФИО<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Специальность<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Форма обучения<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />ИИН<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Номер телефона<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Дата заявки<br />&nbsp;</th>
                                <th style={{ textAlign: 'center' }}><br />Статус заявки<br />&nbsp;</th>
                                <th>&nbsp;</th>
                            </tr>
                            {dormRequestsList}
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

export default observer(DormList)