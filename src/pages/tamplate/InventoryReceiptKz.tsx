//import { CertResponse } from "../../models/response/CertResponse"
import { useEffect, useState } from 'react';
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import DocsService from '../../services/DocsService';
import { InventoryResponse } from '../../models/response/InventoryResponse';
import moment from 'moment';
import 'moment/dist/locale/kk';
import { Link } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';

//export function AnketaRu(certificat:CertResponse)  {
export function InventoryReceiptKz() {
    // const [certid] = useState<number>(id);
    // const [certificat, setCertificat] = useState<CertResponse>();
    const data = JSON.parse(localStorage.getItem('data'));
    const [inventoryData, setInventoryData] = useState<InventoryResponse>();
    moment.locale('kk');
    useEffect(() => {
        DocsService.getInventoryDataKz().then((response) => {
            setInventoryData(response.data);
        });
    }, []);

    const generatePdf = () => {
        // currentApplicantFIO must be set in localstorage on page load
        const report = document.getElementById('inventoryReceipt');
        var opt = {
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            filename: `Опись_Расписка_Каз_${localStorage.getItem('currentApplicantFIO')}.pdf`,
            jsPDF: { orientation: 'landscape' }
        };
        html2pdf().set(opt).from(report).save()
    };

    return (
        <>
            <div id='documentNavbar'><Link to="/applicants"><button id="documentNavbarButton">Назад</button></Link> &nbsp;
      <button id="documentNavbarButton" onClick={generatePdf}>Скачать&nbsp;&nbsp;<FaDownload/></button></div>
            <div id="inventoryReceipt">
                <div id="inventoryReceiptPadding">
                    <div id="inventoryReceiptBody">
                        <div id="inventoryReceiptTable">
                            <table>
                                <tr>
                                    <td id="IRTableHeader" style={{width:'28%'}}><div style={{ fontSize: '13pt' }}>«Esil University» мекемесі</div><br /><div style={{ fontSize: '20pt' }}>ЖЕКЕ ІС-ҚҰЖАТТАРЫНЫҢ ТІЗІМІ</div></td>
                                    <td id="IRTableHeader" style={{width:'28%'}}><div style={{ fontSize: '13pt' }}>«Esil University» мекемесі</div><br /><div style={{ fontSize: '20pt' }}>ҚОЛХАТ</div></td>
                                </tr>
                                <tr>
                                    <td id="IRTableHeader" style={{ fontSize: '12pt' }}>{inventoryData?.lastname + ' ' + inventoryData?.firstname}<br />{inventoryData?.patronymic}<br />&nbsp;</td>
                                    <td id="IRTableHeader" style={{ fontSize: '12pt' }}>{inventoryData?.lastname + ' ' + inventoryData?.firstname}<br />{inventoryData?.patronymic}<br />&nbsp;</td>
                                </tr>
                            </table>
                            <table style={{ borderCollapse: 'collapse' }}>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">1</td>
                                    <td id="IRTableText">Өтініш</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">1</td>
                                    <td id="IRTableText">Өтініш</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">2</td>
                                    <td id="IRTableText">Білім туралы аттестат немесе диплом (түпнұсқа жəне көшірме) қосымшасымен бірге және немесе диплом ТКББ (түпнұсқа жəне көшірме) № {inventoryData?.certificate_serial != '' ? inventoryData?.certificate_serial : inventoryData?.alternative_certificate_serial ? inventoryData?.alternative_certificate_serial:'____________'} {inventoryData?.certificate_number != '' ? inventoryData?.certificate_number : inventoryData?.alternative_certificate_number ? inventoryData?.alternative_certificate_number:''} {inventoryData?.alternative_certificate_date!='' ? moment(inventoryData?.alternative_certificate_date).format("LL") :  moment(inventoryData?.certificate_date).format("LL")} ж.</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">2</td>
                                    <td id="IRTableText">Білім туралы аттестат немесе диплом (түпнұсқа жəне көшірме) қосымшасымен бірге және немесе диплом ТКББ (түпнұсқа жəне көшірме) № {inventoryData?.certificate_serial != '' ? inventoryData?.certificate_serial : inventoryData?.alternative_certificate_serial ? inventoryData?.alternative_certificate_serial:'____________'} {inventoryData?.certificate_number != '' ? inventoryData?.certificate_number : inventoryData?.alternative_certificate_number ? inventoryData?.alternative_certificate_number:''} {inventoryData?.alternative_certificate_date!='' ? moment(inventoryData?.alternative_certificate_date).format("LL") :  moment(inventoryData?.certificate_date).format("LL")} ж.</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">3</td>
                                    <td id="IRTableText">Тестілеу туралы сертификаты № {inventoryData?.exam_cert ? inventoryData?.exam_cert : '_____________________'} <br /> {moment(inventoryData?.exam_cert_date).format("LL")} ж.</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">3</td>
                                    <td id="IRTableText">Тестілеу туралы сертификаты № {inventoryData?.exam_cert ? inventoryData?.exam_cert : '_____________________'} <br /> {moment(inventoryData?.exam_cert_date).format("LL")} ж.</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">4</td>
                                    <td id="IRTableText">3х4 көлеміндегі 6 фото сурет</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">4</td>
                                    <td id="IRTableText">3х4 көлеміндегі 6 фото сурет</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">5</td>
                                    <td id="IRTableText">Жеке куəлігінің көшірмесі</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">5</td>
                                    <td id="IRTableText">Жеке куəлігінің көшірмесі</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">6</td>
                                    <td id="IRTableText">№075-У нысанындағы медициналық анықтама, флюорография фотосуреті</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">6</td>
                                    <td id="IRTableText">№075-У нысанындағы медициналық анықтама, флюорография фотосуреті</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">7</td>
                                    <td id="IRTableText">№063 нысанындағы медициналық анықтама көшірмесі <br />(күндізгі бөлімге түсушілер үшін)</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">7</td>
                                    <td id="IRTableText">№063 нысанындағы медициналық анықтама көшірмесі <br />(күндізгі бөлімге түсушілер үшін)</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">8</td>
                                    <td id="IRTableText">Женілдіктерді растайтын құжаттар</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">8</td>
                                    <td id="IRTableText">Женілдіктерді растайтын құжаттар</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">9</td>
                                    <td id="IRTableText">Əскерге шақыру учаскесіне тіркеу туралы куəлік немесе əскери билет көшірмесі <br />(күндізгі бөлімге түсушілер үшін)</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">9</td>
                                    <td id="IRTableText">Əскерге шақыру учаскесіне тіркеу туралы куəлік немесе əскери билет көшірмесі <br />(күндізгі бөлімге түсушілер үшін)</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">10</td>
                                    <td id="IRTableText">Мемлекеттік білім беру гранты туралы куəлік</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">10</td>
                                    <td id="IRTableText">Мемлекеттік білім беру гранты туралы куəлік</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">11</td>
                                    <td id="IRTableText">Келісім шарт <br />Қосымша келісім шарт</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">11</td>
                                    <td id="IRTableText">Келісім шарт <br />Қосымша келісім шарт</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">12</td>
                                    <td id="IRTableText">Оқу ақысы төленгені туралы түбіртектің көшірмесі</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">12</td>
                                    <td id="IRTableText">Оқу ақысы төленгені туралы түбіртектің көшірмесі</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <br />
                                <tr id="IRTableFooter">
                                    <td colSpan={2}>{moment(Date.now()).format("LL")} ж.<br />Қабылдау комиссиясының техникалық хатшысы {data.lastname + ' ' + data.name + ' ' + data.middlename}</td>
                                    <td></td>
                                    <td colSpan={2}>{moment(Date.now()).format("LL")} ж.<br />Қабылдау комиссиясының техникалық хатшысы {data.lastname + ' ' + data.name + ' ' + data.middlename}</td>
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
