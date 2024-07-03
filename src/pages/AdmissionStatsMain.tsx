import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import DocsService from '../services/DocsService';
import IAdmissionStatsMain from '../models/IAdmissionStatsMain';

const AdmissionStatsMain: FC = () => {
    // const navigate = useNavigate();
    const [applicantStats, setApplicantStats] = useState<Array<IAdmissionStatsMain>>([]);
    useEffect(() => {
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
    //const d = new Date();
    //let current_year = d.getFullYear();
    const admissionStats = applicantStats.map((element) =>
        <tr key={element.specialization}>
            <td id="table-divider-stats" style={{textAlign:'left'}}>{element.specialization}</td>
            <td id="table-divider-stats">{element.sf1_sl1}</td>
            <td id="table-divider-stats">{element.sf1_sl2}</td>
            <td id="table-divider-stats">{element.sf3_sl1}</td>
            <td id="table-divider-stats">{element.sf3_sl2}</td>
            <td id="table-divider-stats">{element.sf4_sl1}</td>
            <td id="table-divider-stats">{element.sf4_sl2}</td>
            <td id="table-divider-stats">{element.sf5_sl1}</td>
            <td id="table-divider-stats">{element.sf5_sl2}</td>
            <td id="table-divider-stats">{element.sf6_sl1}</td>
            <td id="table-divider-stats">{element.sf6_sl2}</td>
            <td id="table-divider-stats">{element.sf7_sl1}</td>
            <td id="table-divider-stats">{element.sf7_sl2}</td>
            <td id="table-divider-stats">{element.sf8_sl1}</td>
            <td id="table-divider-stats">{element.sf8_sl2}</td>
            <td id="table-divider-stats">{element.sf12_sl1}</td>
            <td id="table-divider-stats">{element.sf12_sl2}</td>
            <td id="table-divider-stats">{element.sf13_sl1}</td>
            <td id="table-divider-stats">{element.sf13_sl2}</td>
            <td id="table-divider-stats">{element.sf14_sl1}</td>
            <td id="table-divider-stats">{element.sf14_sl2}</td>
            <td id="table-divider-stats">{element.sf15_sl1}</td>
            <td id="table-divider-stats">{element.sf15_sl2}</td>
            <td id="table-divider-stats">{element.sf17_sl1}</td>
            <td id="table-divider-stats">{element.sf17_sl2}</td>
            <td id="table-divider-stats">{element.sf18_sl1}</td>
            <td id="table-divider-stats">{element.sf18_sl2}</td>
            <td id="table-divider-stats">{element.sf19_sl1}</td>
            <td id="table-divider-stats">{element.sf19_sl2}</td>
            <td id="table-divider-stats">{element.sf20_sl1}</td>
            <td id="table-divider-stats">{element.sf20_sl2}</td>
            <td id="table-divider-stats">{element.sf21_sl1}</td>
            <td id="table-divider-stats">{element.sf21_sl2}</td>
            <td id="table-divider-stats">{element.sf23_sl1}</td>
            <td id="table-divider-stats">{element.sf23_sl2}</td>
            <td id="table-divider-stats">{element.sf24_sl1}</td>
            <td id="table-divider-stats">{element.sf24_sl2}</td>
            <td id="table-divider-stats">{element.sf25_sl1}</td>
            <td id="table-divider-stats">{element.sf25_sl2}</td>
            <td id="table-divider-stats">{element.sf26_sl1}</td>
            <td id="table-divider-stats">{element.sf26_sl2}</td>
            <td id="table-divider-stats">{element.sf27_sl1}</td>
            <td id="table-divider-stats">{element.sf27_sl2}</td>
            <td id="table-divider-stats">{element.sf28_sl1}</td>
            <td id="table-divider-stats">{element.sf28_sl2}</td>
            <td id="table-divider-stats">{element.sf29_sl1}</td>
            <td id="table-divider-stats">{element.sf29_sl2}</td>
            <td id="table-divider-stats">{element.sf30_sl1}</td>
            <td id="table-divider-stats">{element.sf30_sl2}</td>
            <td id="table-divider-stats">{element.sf31_sl1}</td>
            <td id="table-divider-stats">{element.sf31_sl2}</td>
            <td id="table-divider-stats">{element.sf32_sl1}</td>
            <td id="table-divider-stats">{element.sf32_sl2}</td>
            <td id="table-divider-stats">{element.sf33_sl1}</td>
            <td id="table-divider-stats">{element.sf33_sl2}</td>
            <td id="table-divider-stats">{element.sf34_sl1}</td>
            <td id="table-divider-stats">{element.sf34_sl2}</td>
            <td id="table-divider-stats">{element.sf35_sl1}</td>
            <td id="table-divider-stats">{element.sf35_sl2}</td>
            <td id="table-divider-stats">{element.sf36_sl1}</td>
            <td id="table-divider-stats">{element.sf36_sl2}</td>
            <td id="table-divider-stats">{element.sf37_sl1}</td>
            <td id="table-divider-stats">{element.sf37_sl2}</td>
            <td id="table-divider-stats">{element.sf38_sl1}</td>
            <td id="table-divider-stats">{element.sf38_sl2}</td>
            <td id="table-divider-stats">-</td>
            <td id="table-divider-stats">-</td>
            <td id="table-divider-stats">-</td>
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
                        <h2 style={{ marginLeft: '-24%'}}>Статистика по абитуриентам</h2>
                        <table id='opaqueTable' style={{ marginLeft: '-27%', paddingLeft: '15px', width: '107%' }}>
                            <tbody><tr>
                                <th style={{textAlign:'center'}}><br/><br/>ОП</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;Очное (ср.школы)<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;ДОТ на базе высшего<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;Сокращенный ДОТ (очная) на базе колледжа<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;Очное на базе Колледжа<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;Заочная на базе высшего образования<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;Магистратура<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;ДОТ (очное) 3 г.<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;Магистратура 1 г.<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;Вечерняя 2 г.<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;Заочная на базе колледжа (2,5 г.)<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;научно-педагогическое<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;профильное<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;очная 5 лет<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;ДОТ 4 г.<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;ДОТ (заочное) 3 г.<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;Докторантура<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;Профильное 1,5 г.<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;Очное на базе Высшего<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;научно-педагогическое ДОТ<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;Очное 4 г. на базе Колледжа<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;магистр делового администрирования<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;доктор делового администрирования<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;Очное на базе Колледжа (2 г. обуч)<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;ДОТ (очное) 2 г. на базе колледжа<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;очное ( ср.школы) 3 г.<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;заочное на базе колледжа 3 г.<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;заочное 5 лет<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;очное 4 г.<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;заочное 2 г. на базе высшего<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;заочное 3 г.<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;очное 3 г.<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats"><br />&nbsp;заочное 5 лет<br />&nbsp;</th>
                                <th colSpan={2} id="table-divider-stats">Итого</th>
                                <th rowSpan={2} id="table-divider-stats">Всего</th>
                            </tr>
                            <tr>
                                <th></th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th> 
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th> 
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th> 
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th> 
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th> 
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th> 
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th> 
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th> 
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>
                                <th id="table-divider-stats">(р.o.)</th>   
                                <th id="table-divider-stats">(к.o.)</th>    
                                <th id="table-divider-stats">(Очная)</th>   
                                <th id="table-divider-stats">(ДОТ)</th>
                            </tr>
                            {admissionStats}
                            <tr>
                                <td id="table-divider-stats" style={{textAlign:'left', fontWeight:'bold'}}>Всего</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                                <td id="table-divider-stats">-</td>
                            </tr>
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