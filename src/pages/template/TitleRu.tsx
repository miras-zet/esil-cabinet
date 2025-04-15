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

export function TitleRu() {

    const data = JSON.parse(localStorage.getItem('data'));
    const [titleData, setTitleData] = useState<TitleResponse>();
    moment.locale('ru');
    useEffect(() => {
        DocsService.getTitleDataRu().then((response) => {
            setTitleData(response.data);
        });
    }, []);

    const generatePdf = () => {
        // currentApplicantFIO must be set in localstorage on page load
        const report = document.getElementById('title');
        var opt = {
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            filename: `Титульный_лист_Рус_${localStorage.getItem('currentApplicantFIO')}.pdf`,
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
                    <p style={{ marginLeft: '33%' }}>Учреждение «Esil University»</p>
                    <br />
                    {/* 3,4,8,19,20,25,30 */}
                    Образовательная программа: &nbsp;<u>{titleData?.specialization_code} {titleData?.specialization}</u><br />
                    <p style={{ textAlign: 'right' }}>
                        Обучение: &nbsp;<u>{[3,4,8,19,20,25,30].includes(titleData?.studyformID) ? <b>Очное с использованием ДОТ</b>:<b>Очное</b>}</u><br />
                        Курс: _______<br />
                    </p>
                    {titleData?.grant_type==-4 ? <div>Грант</div>:<div>Коммерческий</div>}<br />
                    <p style={{ marginLeft: '20%', fontSize: '21pt' }}>Личное дело обучающегося №_____</p><br />
                    Фамилия: &nbsp;<u>{titleData?.lastname}</u><br />
                    Имя: &nbsp;<u>{titleData?.firstname}</u><br />
                    Отчество: &nbsp;<u>{titleData?.patronymic}</u><br />
                    <table style={{ width: '100%', marginLeft:'-0.4%' }}>
                        <tr>
                            <td>Год поступления:</td>
                            <td>{moment(Date.now()).format("YYYY")} ж.</td>
                        </tr>
                        <tr>
                            <td>Заведено:</td>
                            <td>{moment(Date.now()).format("YYYY")} ж.</td>
                        </tr>
                        <tr>
                            <td>Закончено:</td>
                            <td>20__ ж.</td>
                        </tr>
                        <tr>
                            <td>Передано в архив:</td>
                            <td>20__ ж.</td>
                        </tr>
                    </table>
                    ИИН &nbsp;<u>{titleData?.iin}</u><br /><br />
                    Уд № &nbsp;<u>{titleData?.id_card}</u><br />
                    Адрес проживания &nbsp;<u>{titleData?.living_address}</u><br />	
                    Адрес прописки &nbsp;<u>{titleData?.registration_address}</u><br />	
                    Телефон &nbsp;<u>{titleData?.phone}</u><br /><br />
                    <p style={{ marginLeft: '45%' }}>Астана </p>
                    Технический секретарь приемной комиссии: <u>{data.lastname + ' ' + data.name + ' ' + data.middlename}</u>
                </div>
            </div>
        </>
    )
}
