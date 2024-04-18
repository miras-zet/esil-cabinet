import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import DocsService from '../services/DocsService';
import IApplicantStats from '../models/IApplicantStats';

const AdmissionStats: FC = () => {
    const { store } = useContext(Context);
    // const navigate = useNavigate();
    const [applicantStats, setApplicantStats] = useState<Array<IApplicantStats>>([]);

    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
        DocsService.getApplicantStats().then((response) => {
            setApplicantStats(response.data);
        }).catch((err) => {
            console.log(err);
            setApplicantStats([]);
        });
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }

    }, [])

    // useEffect(()=>{
    //   setModal(modals)
    // },[])

    const admissionStats = applicantStats.map((element) =>
        <tr>
            <td id="table-divider-stats">{element.specialization}</td>
            <td id="table-divider-stats">{element.study_form}</td>
            <td id="table-divider-stats" style={{textAlign:'center'}}>{element.count}</td>
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

    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                const user = JSON.parse(localStorage.getItem('data'));
                if (role == 'admissionstats') {
                    return <div style={{ textAlign: 'left', width: '900px', marginTop: '10%' }}>
                        <KPINavbar />
                        <br /><br /><br /><br />
                        <h3>Добро пожаловать, {user.lastname + ' ' + user.name + ' ' + user.middlename}</h3><br />
                        <h2>Статистика по абитуриентам</h2>
                        <table id='opaqueTable' style={{ marginLeft: '-1.3%', paddingLeft: '15px', width: '107%' }}>
                            <tr>
                                <th><br />&nbsp;&nbsp;&nbsp;Специальность<br />&nbsp;</th>
                                <th><br />&nbsp;&nbsp;Форма обучения<br />&nbsp;</th>
                                <th><br />&nbsp;&nbsp;Количество<br />&nbsp;</th>
                                <th>&nbsp;</th>
                            </tr>
                            {admissionStats}
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

export default observer(AdmissionStats)