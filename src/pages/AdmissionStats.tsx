import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import DocsService from '../services/DocsService';
import IApplicantStats from '../models/IApplicantStats';

const AdmissionStats: FC = () => {
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

    return (
        <div>
            {(() => {
                //const role = localStorage.getItem('role');
                //const user = JSON.parse(localStorage.getItem('data'));
                
                    return <div style={{ textAlign: 'left', width: '900px', marginTop: '10%' }}>
                        <KPINavbar />
                        <br /><br /><br /><br />
                        {/* <h3>Добро пожаловать, {user.lastname + ' ' + user.name + ' ' + user.middlename}</h3><br /> */}
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
                
            })()}

        </div>
    );
}

export default observer(AdmissionStats)