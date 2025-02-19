//import { CertResponse } from "../../models/response/CertResponse"
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import { Link } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
// import { FaGear } from "react-icons/fa6";

//export function AnketaRu(certificat:CertResponse)  {
export function DormStatement() {
    
    if (!localStorage.getItem('statementdata')) window.location.href = window.location.protocol + '//' + window.location.host + '/';
    const data = JSON.parse(localStorage.getItem('statementdata'));

    const generatePdf = () => {
        const report = document.getElementById('anketa');
        var opt = {
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2.5 },
            filename: `Заявление_${data.FIO}.pdf`,
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
                    <div style={{ textAlign: 'right', fontSize: 19 }}>
                        <div style={{ fontWeight: 'bold' }}>Ректору "Esil University"<br />
                            Профессору, д.э.н.<br />
                            А. А. Таубаеву</div><br />
                        {data.Faculty}<br />
                        ФИО: {data.FIO}<br />
                        Тел.: {data.PhoneNumber}<br />
                        Тел. родителей: {data.ParentNumber}<br />
                        Область, город, район, село: {data.Location}
                    </div><br /><br /><br />
                    <h2 style={{ textAlign: 'center' }}>Заявление</h2>
                    <div style={{ textAlign: 'justify', fontSize: 19 }}>
                        Прошу Вас выделить мне место в Доме Студентов. С правилами проживания в Доме Студентов, пожарной безопасности и внутреннего распорядка ознакомлен(-а) и обязуюсь соблюдать.
                    </div><br /><br /><br />
                    <div style={{ textAlign: 'right', fontSize: 19 }}>
                        Подпись заявителя _________<br />
                        «____»__________20___г.<br />
                    </div>
                </div>
            </div>
        </>
    )
}

