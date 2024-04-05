//import { CertResponse } from "../../models/response/CertResponse"
import { useEffect, useState } from 'react';
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import DocsService from '../../services/DocsService';
import { InventoryResponse } from '../../models/response/InventoryResponse';
import moment from 'moment';
import 'moment/dist/locale/ru';
import { Link } from 'react-router-dom';

//export function AnketaRu(certificat:CertResponse)  {
export function InventoryReceiptRu() {
    // const [certid] = useState<number>(id);
    // const [certificat, setCertificat] = useState<CertResponse>();
    const data = JSON.parse(localStorage.getItem('data'));
    const [inventoryData, setInventoryData] = useState<InventoryResponse>();
    moment.locale('ru');
    useEffect(() => {
        DocsService.getInventoryData().then((response) => {
          setInventoryData(response.data);
        });
      }, []);   

    const generatePdf = () => {
        // currentApplicantFIO must be set in localstorage on page load
        const report = document.getElementById('inventoryReceipt');
        var opt = {
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            filename: `Опись_Расписка_Рус_${localStorage.getItem('currentApplicantFIO')}.pdf`,
            jsPDF: { orientation: 'landscape' }
        };
        html2pdf().set(opt).from(report).save()
    };

    return (
        <>
            <div><Link to="/applicants"><button>Назад</button></Link>
                <button onClick={generatePdf}>Скачать</button></div>
            <div id="inventoryReceipt">
                <div id="inventoryReceiptPadding">
                    <div id="inventoryReceiptBody">
                        <div id="inventoryReceiptTable">
                            <table style={{ width: '100%' }}>
                                <tr>
                                    <td colSpan={3} id="IRTableHeader"><div style={{ fontSize: '13pt'}}>Учреждение «Esil University»</div><br /><div style={{ fontSize: '20pt' }}>ОПИСЬ</div></td>
                                    <td colSpan={3} id="IRTableHeader"><div style={{ fontSize: '13pt'}}>Учреждение «Esil University»</div><br /><div style={{ fontSize: '20pt' }}>РАСПИСКА</div></td>
                                </tr>
                                <tr>
                                    <td colSpan={3} id="IRTableHeader" style={{marginLeft:'20%', fontSize: '12pt'}}>{inventoryData?.lastname+' '+inventoryData?.firstname}<br/>{inventoryData?.patronymic}<br />&nbsp;</td>
                                    <td colSpan={3} id="IRTableHeader" style={{marginLeft:'20%', fontSize: '12pt'}}>{inventoryData?.lastname+' '+inventoryData?.firstname}<br/>{inventoryData?.patronymic}<br />&nbsp;</td>
                                </tr>
                            </table>
                            <table style={{ borderCollapse: 'collapse' }}>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">1</td>
                                    <td id="IRTableText">Заявление</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">1</td>
                                    <td id="IRTableText">Заявление</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">2</td>
                                    <td id="IRTableText">Аттестат или диплом об образовании с приложением (подлинник и копия) или диплом об окончании ТиПО (подлинник и копия) <br />№ {inventoryData?.certificate_serial!=''?inventoryData?.certificate_serial:'_______________'} {inventoryData?.certificate_number!=''?inventoryData?.certificate_number:'_________'} от {moment(inventoryData?.certificate_date).format("LL")} </td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">2</td>
                                    <td id="IRTableText">Аттестат или диплом об образовании с приложением (подлинник и копия) или диплом об окончании ТиПО (подлинник и копия) <br />№ {inventoryData?.certificate_serial!=''?inventoryData?.certificate_serial:'_______________'} {inventoryData?.certificate_number!=''?inventoryData?.certificate_number:'_________'} от {moment(inventoryData?.certificate_date).format("LL")} </td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">3</td>
                                    <td id="IRTableText">Сертификат о прохождении тестирования № {inventoryData?.exam_cert? inventoryData?.exam_cert:'________________'} <br/> от {moment(inventoryData?.exam_cert_date).format("LL")} </td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">3</td>
                                    <td id="IRTableText">Сертификат о прохождении тестирования № {inventoryData?.exam_cert? inventoryData?.exam_cert:'________________'} <br/> от {moment(inventoryData?.exam_cert_date).format("LL")} </td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">4</td>
                                    <td id="IRTableText">Фотографии 3 х 4 - 6 шт.</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">4</td>
                                    <td id="IRTableText">Фотографии 3 х 4 - 6 шт.</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">5</td>
                                    <td id="IRTableText">Копия удостоверения личности</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">5</td>
                                    <td id="IRTableText">Копия удостоверения личности</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">6</td>
                                    <td id="IRTableText">Медицинская справка формы 075-У, снимок флюорографии</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">6</td>
                                    <td id="IRTableText">Медицинская справка формы 075-У, снимок флюорографии</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">7</td>
                                    <td id="IRTableText">Медицинская справка о прививках (форма 063) для очного отделения (копия)</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">7</td>
                                    <td id="IRTableText">Медицинская справка о прививках (форма 063) для очного отделения (копия)</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">8</td>
                                    <td id="IRTableText">Документы, подтверждающие льготы</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">8</td>
                                    <td id="IRTableText">Документы, подтверждающие льготы</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">9</td>
                                    <td id="IRTableText">Копия приписного удостоверение о приписке к призывному участку или военного билета(для дневной формы обучения, копия)</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">9</td>
                                    <td id="IRTableText">Копия приписного удостоверение о приписке к призывному участку или военного билета(для дневной формы обучения, копия)</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">10</td>
                                    <td id="IRTableText">Свидетельство о государственном образовательном гранте</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">10</td>
                                    <td id="IRTableText">Свидетельство о государственном образовательном гранте</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">11</td>
                                    <td id="IRTableText">Договор<br />Доп. соглашение</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">11</td>
                                    <td id="IRTableText">Договор<br />Доп. соглашение</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">12</td>
                                    <td id="IRTableText">Копия квитанции об оплате</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">12</td>
                                    <td id="IRTableText">Копия квитанции об оплате</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <br />
                                <tr id="IRTableFooter">
                                    <td colSpan={2}>{moment(Date.now()).format("LL")} <br />Технический секретарь приемной комиссии {data.lastname + ' ' + data.name + ' ' + data.middlename}</td>
                                    <td></td>
                                    <td colSpan={2}>{moment(Date.now()).format("LL")} <br />Технический секретарь приемной комиссии {data.lastname + ' ' + data.name + ' ' + data.middlename}</td>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
