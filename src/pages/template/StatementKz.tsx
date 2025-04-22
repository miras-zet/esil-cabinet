//import { CertResponse } from "../../models/response/CertResponse"
import { useEffect, useState } from 'react';
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import DocsService from '../../services/DocsService';
import moment from 'moment';
import 'moment/dist/locale/ru';
import { Link } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
import { StatementResponse } from '../../models/response/StatementResponse';

export function StatementKz() {

    const data = JSON.parse(localStorage.getItem('data'));
    const [statementData, setStatementData] = useState<StatementResponse>();
    moment.locale('ru');
    useEffect(() => {
        DocsService.getStatementDataRu().then((response) => {
            setStatementData(response.data);
        });
    }, []);

    const generatePdf = () => {
        // currentApplicantFIO must be set in localstorage on page load
        const report = document.getElementById('title');
        var opt = {
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            filename: `Заявление_Каз_${localStorage.getItem('currentApplicantFIO')}.pdf`,
            jsPDF: { orientation: 'portrait' }
        };
        html2pdf().set(opt).from(report).save()
    };

    return (
        <><div id='documentNavbar'><Link to="/applicants"><button id="documentNavbarButton">Назад</button></Link> &nbsp;
            <button id="documentNavbarButton" onClick={generatePdf}>Скачать&nbsp;&nbsp;<FaDownload /></button></div>
            <div id="title">
                <div id="titlePadding">
                    
                </div>
            </div>
        </>
    )
}
