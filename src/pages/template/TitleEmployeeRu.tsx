//import { CertResponse } from "../../models/response/CertResponse"
import { useEffect, useState } from 'react';
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import moment from 'moment';
import 'moment/dist/locale/ru';
import { Link } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
import { EmployeeTitleResponse } from '../../models/response/EmployeeTitleResponse';

export function TitleEmployeeRu() {

    const [titleData, setTitleData] = useState<EmployeeTitleResponse>();
    moment.locale('ru');
    useEffect(() => {
        setTitleData(JSON.parse(localStorage.getItem('employeeData')));
    }, []);

    const generatePdf = () => {
        // currentApplicantFIO must be set in localstorage on page load
        const report = document.getElementById('title');
        var opt = {
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            filename: `Титульный_лист_${localStorage.getItem('currentEmployeeFIO')}.pdf`,
            jsPDF: { orientation: 'portrait' }
        };
        html2pdf().set(opt).from(report).save()
    };

    return (
        <><div id='documentNavbar'><Link to="/applicants"><button id="documentNavbarButton">Назад</button></Link> &nbsp;
            <button id="documentNavbarButton" onClick={generatePdf}>Скачать&nbsp;&nbsp;<FaDownload /></button></div>
            <div id="title">
                <div id="titlePadding">
                    <p style={{ marginLeft: '33%' }}>Учреждение «Esil University»</p>
                    <br />
                    Кафедра/структурное подразделение: &nbsp;<u>{titleData?.dep}</u><br /><br />
                    Должность:<br />
                    {titleData?.workstatus=='штатник' ? <div><u>Штатник</u>/совместитель</div>:''}
                    {titleData?.workstatus=='совместитель' ? <div><u>Штатник</u>/совместитель</div>:''}
                    {titleData?.workstatus=='-------' ? <div>Штатник/совместитель</div>:''}
                    <br /><br />
                    Ученая/академическая степень: &nbsp;{titleData?.academic!=''&&titleData?.academic!='null'?titleData?.academic:''}<br />
                    Образование: ___________<br />
                    <p style={{ marginLeft: '25%', fontSize: '21pt' }}>Личное дело №_____</p><br />
                    Фамилия: &nbsp;<u>{titleData?.lastname}</u><br />
                    Имя: &nbsp;<u>{titleData?.firstname}</u><br />
                    Отчество: &nbsp;<u>{titleData?.patronymic}</u><br />
                    <table style={{ width: '100%', marginLeft:'-0.4%' }}>
                        <tr>
                            <td>Год поступления:</td>
                            <td>20__ г.</td>
                        </tr>
                        <tr>
                            <td>Заведено:</td>
                            <td>20__ г.</td>
                        </tr>
                        <tr>
                            <td>Закончено:</td>
                            <td>20__ г.</td>
                        </tr>
                        <tr>
                            <td>Передано в архив:</td>
                            <td>20__ г.</td>
                        </tr>
                    </table>
                    ИИН &nbsp;<u>{titleData?.iin}</u><br /><br />
                    Уд № &nbsp;<u>{titleData?.icnumber}</u><br />
                    Адрес проживания &nbsp;<u>{titleData?.living_adress}</u><br />	
                    Адрес прописки &nbsp;<u>{titleData?.registration_adress}</u><br />	
                    Телефон &nbsp;<u>{titleData?.phone}</u><br /><br />
                    <p style={{ marginLeft: '45%' }}>Астана {moment(Date.now()).format("YYYY")}г.</p>
                </div>
            </div>
        </>
    )
}
