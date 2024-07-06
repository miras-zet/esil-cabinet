import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import DocsService from '../services/DocsService';
import IAdmissionStatsMain from '../models/IAdmissionStatsMain';

const AdmissionStatsMain: FC = () => {
    // const navigate = useNavigate();
    const [applicantStats, setApplicantStats] = useState<Array<IAdmissionStatsMain>>([]);
    let [margin, setMargin] = useState<string>('-23%');
    useEffect(() => {
        setMargin('-23%');
        if(window.innerWidth<940) setMargin('0%');
        // const user = JSON.parse(localStorage.getItem('data'));
        DocsService.getAdmissionStatsMain().then((response) => {
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
    const d = new Date();
    let current_year = d.getFullYear();
    const admissionStats = applicantStats.map((element) =>
        <tr key={element.specialization}>
            <td id="table-divider-stats-header" style={{textAlign:'left'}}>{element.specialization}</td>
            <td id="table-divider-stats">{element.sf1_sl1 }</td>
            <td id="table-divider-stats">{element.sf1_sl2 }</td>
            <td id="table-divider-stats">{element.sf3_sl1 }</td>
            <td id="table-divider-stats">{element.sf3_sl2 }</td>
            <td id="table-divider-stats">{element.sf4_sl1 }</td>
            <td id="table-divider-stats">{element.sf4_sl2 }</td>
            <td id="table-divider-stats">{element.sf5_sl1 }</td>
            <td id="table-divider-stats">{element.sf5_sl2 }</td>
            <td id="table-divider-stats">{element.sf8_sl1 }</td>
            <td id="table-divider-stats">{element.sf8_sl2 }</td>
            <td id="table-divider-stats">{element.sf15_sl1}</td>
            <td id="table-divider-stats">{element.sf15_sl2}</td>
            <td id="table-divider-stats">{element.sf17_sl1}</td>
            <td id="table-divider-stats">{element.sf17_sl2}</td>
            <td id="table-divider-stats">{element.sf24_sl1}</td>
            <td id="table-divider-stats">{element.sf24_sl2}</td>
            <td id="table-divider-stats">{element.sf29_sl1}</td>
            <td id="table-divider-stats">{element.sf29_sl2}</td>
            <td id="table-divider-stats">{element.sf30_sl1}</td>
            <td id="table-divider-stats">{element.sf30_sl2}</td>
            <td id="table-divider-stats">{element.sf31_sl1}</td>
            <td id="table-divider-stats">{element.sf31_sl2}</td>
            <td id="table-divider-stats" style={{fontWeight:'bold'}}>{element.sf_fulltime}</td>
            <td id="table-divider-stats" style={{fontWeight:'bold'}}>{element.sf_dl}</td>
            <td id="table-divider-stats" style={{fontWeight:'bold'}}>{element.sf_overall}</td>
            <td></td>
        </tr>
    );
    //const lastelem = applicantStats[applicantStats.length];
    //alert(applicantStats[applicantStats.length]);
    //const miniheader1 = lastelem.sf1_sl1+lastelem.sf1_sl2;
    //const miniheader2 = lastelem.sf5_sl1+lastelem.sf5_sl2;
    //const miniheader3 = lastelem.sf24_sl1+lastelem.sf24_sl2;
    const admissionStatsMini = applicantStats.map((element) =>
    <div key={element.specialization}>
        {element.specialization=='Всего'? <div>
        <b>Количество абитуриентов по ОП:</b>
        <br/>На базе школы: {parseInt(element.sf1_sl1+'')+parseInt(element.sf1_sl2+'')}<br/>
        На базе колледжа: {parseInt(element.sf5_sl1+'')+parseInt(element.sf5_sl2+'')}<br/>
        На базе высшего: {parseInt(element.sf24_sl1+'')+parseInt(element.sf24_sl2+'')}<br/></div>:''}
        </div>
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
                        <h2 style={{ marginLeft: margin}}>Статистика по абитуриентам ({current_year}-{current_year+1} учебный год)</h2>
                        <br/>
                        <div id="table-divider-stats-header" style={{marginLeft: margin,textAlign:'left',paddingLeft:'4%',height:'100%',width:'40%'}}><br/>{admissionStatsMini}<br/></div>
                        <br/>
                        <table id='opaqueTable' style={{ fontSize:'8pt', marginLeft: margin, paddingLeft: '15px', width: '107%' }}>
                            <tbody>
                                <tr><br/></tr>
                                <tr>
                                <th rowSpan={2} id="table-divider-stats-header" style={{textAlign:'center'}}><br/><br/>ОП<br/><br/></th>
                                {/* 1,3,4,5,8,15,17,21,23,24,29,30,31 */}
                                <th colSpan={2} id="table-divider-stats-header"><br />&nbsp;Очное (ср.школы)<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats-header"><br />&nbsp;ДОТ на базе высшего<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats-header"><br />&nbsp;Сокращенный ДОТ (очная) на базе колледжа<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats-header"><br />&nbsp;Очное на базе Колледжа<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats-header"><br />&nbsp;ДОТ (очное) 3 г.<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats-header"><br />&nbsp;Научно-педагогическое<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats-header"><br />&nbsp;Профильное<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats-header"><br />&nbsp;Очное на базе Высшего<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats-header"><br />&nbsp;Очное на базе Колледжа (2 г. обуч)<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats-header"><br />&nbsp;ДОТ (очное) 2 г. на базе колледжа<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats-header"><br />&nbsp;Очное (ср.школы) 3 г.<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats-header">&nbsp;&nbsp;Итого</th>
                                <th rowSpan={2} id="table-divider-stats-header">&nbsp;&nbsp;Всего</th>
                            </tr>
                            <tr>
                                
                                <th id="table-divider-stats-header">(р.o.)</th>   
                                <th id="table-divider-stats-header">(к.o.)</th>
                                <th id="table-divider-stats-header">(р.o.)</th>   
                                <th id="table-divider-stats-header">(к.o.)</th>
                                <th id="table-divider-stats-header">(р.o.)</th>   
                                <th id="table-divider-stats-header">(к.o.)</th>
                                <th id="table-divider-stats-header">(р.o.)</th>   
                                <th id="table-divider-stats-header">(к.o.)</th>
                                <th id="table-divider-stats-header">(р.o.)</th>   
                                <th id="table-divider-stats-header">(к.o.)</th>
                                <th id="table-divider-stats-header">(р.o.)</th>   
                                <th id="table-divider-stats-header">(к.o.)</th>
                                <th id="table-divider-stats-header">(р.o.)</th>   
                                <th id="table-divider-stats-header">(к.o.)</th>
                                <th id="table-divider-stats-header">(р.o.)</th>   
                                <th id="table-divider-stats-header">(к.o.)</th>
                                <th id="table-divider-stats-header">(р.o.)</th>   
                                <th id="table-divider-stats-header">(к.o.)</th>
                                <th id="table-divider-stats-header">(р.o.)</th>   
                                <th id="table-divider-stats-header">(к.o.)</th>
                                <th id="table-divider-stats-header">(р.o.)</th>   
                                <th id="table-divider-stats-header">(к.o.)</th>
                                <th id="table-divider-stats-header">(Очная)</th>   
                                <th id="table-divider-stats-header">(ДОТ)</th>
                            </tr>
                            {admissionStats}
                            <tr>
                                <td><br/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>   
                
            })()}

        </div>
    );
}

export default observer(AdmissionStatsMain)