//import { CertResponse } from "../../models/response/CertResponse"
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import { Link } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import DocsService from '../../services/DocsService';
// import { FaGear } from "react-icons/fa6";

//export function AnketaRu(certificat:CertResponse)  {
export function DormCard() {
    // const [certid] = useState<number>(id);
    // const [certificat, setCertificat] = useState<CertResponse>();
    const [roomnumber, setRoomNumber] = useState<string>('_____');
    useEffect(() => {
        DocsService.getRoomNumber(localStorage.getItem('viewinguseriin')).then((response) => {
            setRoomNumber(response.data);
        });
    }, [])
    if (!localStorage.getItem('carddata') || !localStorage.getItem('parentsdata')) window.location.href = window.location.protocol + '//' + window.location.host + '/';
    const data = JSON.parse(localStorage.getItem('carddata'));
    const extradata = JSON.parse(localStorage.getItem('parentsdata'));

    const generatePdf = () => {
        const report = document.getElementById('anketa');
        var opt = {
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2.5 },
            filename: `Личная карточка_${data.FIO}.pdf`,
            jsPDF: { orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };
        html2pdf().set(opt).from(report).save()
    };



    return (
        <><div id='documentNavbar'><Link to="/"><button id="documentNavbarButton">Назад</button></Link> &nbsp;
            <button id="documentNavbarButton" onClick={generatePdf}>Скачать&nbsp;&nbsp;<FaDownload /> &nbsp;</button>
            {/* &nbsp;&nbsp;<Link to="/applicants"><button id="documentNavbarButton"><FaGear /></button></Link> */}
        </div>
            <div id="anketa">
                <div id="anketaPadding">
                    <br />
                    <h2 style={{ textAlign: 'center' }}>Личная карточка</h2>
                    <div style={{textAlign:'right',fontSize:18}}>Комната № {roomnumber!='0'?roomnumber:'_____'} </div><br/><br/>
                    <table style={{ marginLeft:'25%',width: '70%', borderCollapse: 'collapse', fontSize: '19px', textAlign:'left'}}>
                        <tbody>         
                            <tr>
                                <td><b>ФИО</b></td>
                                <td style={{ borderBottom: '1px solid black' }}>{data.FIO}</td>
                            </tr>
                            <tr>
                                <td><b>Дата рождения</b></td>
                                <td style={{ borderBottom: '1px solid black' }}>{data.BirthDate}</td>
                            </tr>
                            <tr>
                                <td><b>Факультет</b></td>
                                <td style={{ borderBottom: '1px solid black' }}>{data.Faculty}</td>
                            </tr>
                            <tr>
                                <td><b>Специальность</b></td>
                                <td style={{ borderBottom: '1px solid black' }}>{data.Specialization}</td>
                            </tr>
                            <tr>
                                <td><b>Курс, группа, язык обучения</b></td>
                                <td style={{ borderBottom: '1px solid black' }}>
                                    {data.Course} курс, {data.Group}, {data.StudyLanguage}
                                </td>
                            </tr>
                            <tr>
                                <td><b>№ удостоверения (паспорта)</b></td>
                                <td style={{ borderBottom: '1px solid black' }}>{data.Icnumber}</td>
                            </tr>
                            <tr>
                                <td><b>Когда, кем выдан</b></td>
                                <td style={{ borderBottom: '1px solid black' }}>
                                    {data.Icdepartment}, {data.Icdate}
                                </td>
                            </tr>
                            <tr>
                                <td><b>ИИН</b></td>
                                <td style={{ borderBottom: '1px solid black' }}>{data.IIN}</td>
                            </tr>
                            <tr>
                                <td><b>Номер телефона</b></td>
                                <td style={{ borderBottom: '1px solid black' }}>{data.PhoneNumber}</td>
                            </tr>
                            <tr>
                                <td><b>Дополнительный</b></td>
                                <td style={{ borderBottom: '1px solid black' }}>{data.ExtraNumber}</td>
                            </tr>
                        </tbody>
                    </table><br /><br />
                    <div style={{ marginLeft: '70px' }}>
                        <table id='anketaTable' style={{ fontSize: 18, border: 'solid 1px', width: '90%' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <th>&nbsp;Данные</th>
                                <th>&nbsp;Отец</th>
                                <th>&nbsp;Мать</th>
                            </thead>
                            <tbody style={{ textAlign: 'left' }}>
                                <tr id='anketaTr'>
                                    <td id='anketaTd'>&nbsp;ФИО</td>
                                    <td id='anketaTd'>{extradata.FIOM}</td>
                                    <td id='anketaTd'>{extradata.FIOF}</td>
                                </tr>
                                <tr id='anketaTr'>
                                    <td id='anketaTd'>&nbsp;Дата рождения</td>
                                    <td id='anketaTd'>{extradata.DOBM}</td>
                                    <td id='anketaTd'>{extradata.DOBF}</td>
                                </tr>
                                <tr id='anketaTr'>
                                    <td id='anketaTd'>&nbsp;Адрес проживания</td>
                                    <td id='anketaTd'>{extradata.AddressM}</td>
                                    <td id='anketaTd'>{extradata.AddressF}</td>
                                </tr>
                                <tr id='anketaTr'>
                                    <td id='anketaTd'>&nbsp;Место работы</td>
                                    <td id='anketaTd'>{extradata.WorkplaceM}</td>
                                    <td id='anketaTd'>{extradata.WorkplaceF}</td>
                                </tr>
                                <tr id='anketaTr'>
                                    <td id='anketaTd'>&nbsp;Должность</td>
                                    <td id='anketaTd'>{extradata.JobPositionM}</td>
                                    <td id='anketaTd'>{extradata.JobPositionF}</td>
                                </tr>
                                <tr id='anketaTr'>
                                    <td id='anketaTd'>&nbsp;Номер сот. телефона</td>
                                    <td id='anketaTd'>{extradata.PhoneNumberM}</td>
                                    <td id='anketaTd'>{extradata.PhoneNumberF}</td>
                                </tr>
                                <tr id='anketaTr'>
                                    <td id='anketaTd'>&nbsp;Дом. телефон</td>
                                    <td id='anketaTd'>{extradata.HomeNumberM}</td>
                                    <td id='anketaTd'>{extradata.HomeNumberF}</td>
                                </tr>
                                <tr id='anketaTr'>
                                    <td id='anketaTd'>&nbsp;Раб. телефон</td>
                                    <td id='anketaTd'>{extradata.WorkNumberM}</td>
                                    <td id='anketaTd'>{extradata.WorkNumberF}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

