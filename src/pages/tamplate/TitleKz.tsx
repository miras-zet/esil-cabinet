//import { CertResponse } from "../../models/response/CertResponse"
import { useEffect, useState } from 'react';
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import DocsService from '../../services/DocsService';
import moment from 'moment';
import 'moment/dist/locale/ru';
import { Link } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
import { TitleResponse } from '../../models/response/TitleResponse';

export function TitleKz() {

    const data = JSON.parse(localStorage.getItem('data'));
    const [titleData, setTitleData] = useState<TitleResponse>();
    moment.locale('ru');
    useEffect(() => {
        DocsService.getTitleDataKz().then((response) => {
            setTitleData(response.data);
        });
    }, []);

    const generatePdf = () => {
        // currentApplicantFIO must be set in localstorage on page load
        const report = document.getElementById('title');
        var opt = {
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            filename: `Титульный_лист_Каз_${localStorage.getItem('currentApplicantFIO')}.pdf`,
            jsPDF: { orientation: 'portrait' }
        };
        html2pdf().set(opt).from(report).save()
    };

    return (
        <><div id='documentNavbar'><Link to="/applicants"><button id="documentNavbarButton">Назад</button></Link> &nbsp;
            <button id="documentNavbarButton" onClick={generatePdf}>Скачать&nbsp;&nbsp;<FaDownload /></button></div>
            <div id="title">
                <div id="titlePadding">
                    Индекс 010005<br />
                    Индекс дело 09-01-09
                    <p style={{ marginLeft: '33%' }}>«Esil University» мекемесі</p>
                    <br />
                    Білім беру бағдарламасы: &nbsp;<u>{titleData?.specialization_code} {titleData?.specialization}</u><br />
                    <p style={{ textAlign:'right' }}>
                        Оқыту: &nbsp;<u>{[3,4,8,19,20,25,30].includes(titleData?.studyformID) ? <b>Күндізгі (ҚОТ)</b>:<b>Күндізгі</b>}</u><br />
                        Курс: _______<br />
                    </p>
                    {titleData?.grant_type==-7 ? <div>Ақылы</div>:<div>Грант</div>}<br />
                    <p style={{ marginLeft: '14%', fontSize: '21pt' }}>Білім алушының жеке іс-қағазы №_____</p><br />
                    Тегі: &nbsp;<u>{titleData?.lastname}</u><br />
                    Аты: &nbsp;<u>{titleData?.firstname}</u><br />
                    Əкесінің аты: &nbsp;<u>{titleData?.patronymic}</u><br />
                    <table style={{ width: '100%', marginLeft:'-0.4%' }}>
                        <tr>
                            <td>Оқуға түскен жылы:</td>
                            <td>{moment(Date.now()).format("YYYY")} ж.</td>
                        </tr>
                        <tr>
                            <td>Басталды:</td>
                            <td>{moment(Date.now()).format("YYYY")} ж.</td>
                        </tr>
                        <tr>
                            <td>Аяқталды:</td>
                            <td>20__ ж.</td>
                        </tr>
                        <tr>
                            <td>Мұрағатқа тапсырылды:</td>
                            <td>20__ ж.</td>
                        </tr>
                    </table>
                    ЖСН &nbsp;<u>{titleData?.iin}</u><br /><br />
                    ЖК № &nbsp;<u>{titleData?.id_card}</u><br />
                    Тұрғылықты мекен жайы &nbsp;<u>{titleData?.living_address}</u><br />	
                    Тіркелген мекен жайы &nbsp;<u>{titleData?.registration_address}</u><br />	
                    Телефон &nbsp;<u>{titleData?.phone}</u><br /><br />
                    <p style={{ marginLeft: '45%' }}>Астана </p>
                    Қабылдау комиссиясының техникалық хатшысы: <u>{data.lastname + ' ' + data.name + ' ' + data.middlename}</u>
                </div>
            </div>
        </>
    )
}
