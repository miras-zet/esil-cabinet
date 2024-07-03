import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import DocsService from '../services/DocsService';
import IAdmissionStats from '../models/IAdmissionStats';

const AdmissionStats: FC = () => {
    // const navigate = useNavigate();
    const [applicantStats, setApplicantStats] = useState<Array<IAdmissionStats>>([]);
    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('data'));
        DocsService.getAdmissionStats().then((response) => {
            setApplicantStats(response.data);
        }).catch((err) => {
            console.log(err);
            setApplicantStats([]);
        });

    }, [])
    // useEffect(()=>{
    //   setModal(modals)
    // },[])
    //alert(date);
    const date_seconds = Math.floor(Date.now() / 1000)
    const d = new Date();
    let current_year = d.getFullYear();
    const admissionStats = applicantStats.map((element) =>
        <tr key={element.StudyFormName}>
            <td id="table-divider-stats">{element.StudyFormName}</td>
            {date_seconds>Math.floor(new Date(`${current_year}.06.07`).getTime() / 1000)? <td id="table-divider-stats">{element.june7}</td>   :<td id="table-divider-stats"></td>}
            {date_seconds>Math.floor(new Date(`${current_year}.06.07`).getTime() / 1000)? <td id="table-divider-stats">{element.june14}</td>  :<td id="table-divider-stats"></td>}
            {date_seconds>Math.floor(new Date(`${current_year}.06.14`).getTime() / 1000)? <td id="table-divider-stats">{element.june21}</td>  :<td id="table-divider-stats"></td>}
            {date_seconds>Math.floor(new Date(`${current_year}.06.21`).getTime() / 1000)? <td id="table-divider-stats">{element.june28}</td>  :<td id="table-divider-stats"></td>}
            {date_seconds>Math.floor(new Date(`${current_year}.06.28`).getTime() / 1000)? <td id="table-divider-stats">{element.july5}</td>   :<td id="table-divider-stats"></td>}
            {date_seconds>Math.floor(new Date(`${current_year}.07.05`).getTime() / 1000)? <td id="table-divider-stats">{element.july12}</td>  :<td id="table-divider-stats"></td>}
            {date_seconds>Math.floor(new Date(`${current_year}.07.12`).getTime() / 1000)? <td id="table-divider-stats">{element.july19}</td>  :<td id="table-divider-stats"></td>}
            {date_seconds>Math.floor(new Date(`${current_year}.07.19`).getTime() / 1000)? <td id="table-divider-stats">{element.july26}</td>  :<td id="table-divider-stats"></td>}
            {date_seconds>Math.floor(new Date(`${current_year}.07.26`).getTime() / 1000)? <td id="table-divider-stats">{element.august2}</td> :<td id="table-divider-stats"></td>}
            {date_seconds>Math.floor(new Date(`${current_year}.08.02`).getTime() / 1000)? <td id="table-divider-stats">{element.august9}</td> :<td id="table-divider-stats"></td>}
            {date_seconds>Math.floor(new Date(`${current_year}.08.09`).getTime() / 1000)? <td id="table-divider-stats">{element.august16}</td>:<td id="table-divider-stats"></td>}
            {date_seconds>Math.floor(new Date(`${current_year}.08.16`).getTime() / 1000)? <td id="table-divider-stats">{element.august23}</td>:<td id="table-divider-stats"></td>}
            {date_seconds>Math.floor(new Date(`${current_year}.08.23`).getTime() / 1000)? <td id="table-divider-stats">{element.august30}</td>:<td id="table-divider-stats"></td>}
            <td></td>
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
                        <h2 style={{ marginLeft: '-24%'}}>Статистика по абитуриентам (еженедельная)</h2>
                        <table id='opaqueTable' style={{ marginLeft: '-27%', paddingLeft: '15px', width: '107%' }}>
                            <tbody><tr>
                                <th><br />&nbsp;&nbsp;Форма обучения<br />&nbsp;</th>
                                <th><br />&nbsp;07.06.{current_year}<br />&nbsp;</th>   
                                <th><br />&nbsp;14.06.{current_year}<br />&nbsp;</th>  
                                <th><br />&nbsp;21.06.{current_year}<br />&nbsp;</th>  
                                <th><br />&nbsp;28.06.{current_year}<br />&nbsp;</th>  
                                <th><br />&nbsp;05.07.{current_year}<br />&nbsp;</th>   
                                <th><br />&nbsp;12.07.{current_year}<br />&nbsp;</th>  
                                <th><br />&nbsp;19.07.{current_year}<br />&nbsp;</th>  
                                <th><br />&nbsp;26.07.{current_year}<br />&nbsp;</th>  
                                <th><br />&nbsp;02.08.{current_year}<br />&nbsp;</th> 
                                <th><br />&nbsp;09.08.{current_year}<br />&nbsp;</th> 
                                <th><br />&nbsp;16.08.{current_year}<br />&nbsp;</th>
                                <th><br />&nbsp;23.08.{current_year}<br />&nbsp;</th>
                                <th><br />&nbsp;30.08.{current_year}<br />&nbsp;</th>
                                <th>&nbsp;</th>
                            </tr>
                            {admissionStats}
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>   
                
            })()}

        </div>
    );
}

export default observer(AdmissionStats)