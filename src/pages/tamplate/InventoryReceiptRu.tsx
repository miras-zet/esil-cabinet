//import { CertResponse } from "../../models/response/CertResponse"
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';

//export function AnketaRu(certificat:CertResponse)  {
export function InventoryReceiptRu() {
    // const [certid] = useState<number>(id);
    // const [certificat, setCertificat] = useState<CertResponse>();


    // useEffect(() => {
    //     //const certid = localStorage.getItem('certificat'); 
    //     console.log(certid);
    //     fetch(`${API_URL}/cert/${certid}`).then((response) => response.json()).then((data:CertResponse)=>setCertificat(data));

    //   },[]);      

    const generatePdf = () => {
        // currentApplicantFIO must be set in localstorage on page load
        localStorage.setItem('currentApplicantFIO', 'Есенжолов Ж.А.')
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
            <div><button onClick={generatePdf}>save PDF</button></div>
            <div id="inventoryReceipt">
                <div id="inventoryReceiptPadding">
                    <div id="inventoryReceiptBody">
                        <div id="inventoryReceiptTable">
                            <table style={{ width: '100%' }}>
                                <tr>
                                    <td colSpan={3} id="IRTableHeader"><div style={{ fontSize: '13pt' }}>Учреждение «Esil University»</div><br /><div style={{ fontSize: '20pt' }}>ОПИСЬ</div></td>
                                    <td colSpan={3} id="IRTableHeader"><div style={{ fontSize: '13pt' }}>Учреждение «Esil University»</div><br /><div style={{ fontSize: '20pt' }}>РАСПИСКА</div></td>
                                </tr>
                                <tr>
                                    <td colSpan={3} id="IRTableHeader">____________________________________________________<br />&nbsp;</td>
                                    <td colSpan={3} id="IRTableHeader">____________________________________________________<br />&nbsp;</td>
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
                                    <td id="IRTableText">Аттестат или диплом об образовании с приложением (подлинник и копия) или диплом об окончании ТиПО (подлинник и копия) <br />№ ___________________ от «___»________ 20___г.</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">2</td>
                                    <td id="IRTableText">Аттестат или диплом об образовании с приложением (подлинник и копия) или диплом об окончании ТиПО (подлинник и копия) <br />№ ___________________ от «___»________ 20___г.</td>
                                    <td id="IRTableBlank"></td>
                                </tr>
                                <tr id="IRTableTR">
                                    <td id="IRTableNumber">3</td>
                                    <td id="IRTableText">Сертификат о прохождении тестирования № ____________   от «___»________ 20___г.</td>
                                    <td id="IRTableBlank"></td>
                                    <td id="IRTableNumber">3</td>
                                    <td id="IRTableText">Сертификат о прохождении тестирования № ____________   от «___» _______ 20___г.</td>
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
                                    <td colSpan={2}>«___» ____________20__г.<br />Технический секретарь приемной комиссии ________________</td>
                                    <td></td>
                                    <td colSpan={2}>«___» ____________20__г.<br />Технический секретарь приемной комиссии ________________</td>
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
