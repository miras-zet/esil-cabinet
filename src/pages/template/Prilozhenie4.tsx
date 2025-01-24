import { CertResponse } from "../../models/response/CertResponse"
import moment from "moment";
import QRCode from "react-qr-code";
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';


export function Prilozhenie4(certificat:CertResponse)  {
    // const [certid] = useState<number>(id);
    // const [certificat, setCertificat] = useState<CertResponse>();
    

    // useEffect(() => {
    //     //const certid = localStorage.getItem('certificat'); 
    //     console.log(certid);
    //     fetch(`${API_URL}/cert/${certid}`).then((response) => response.json()).then((data:CertResponse)=>setCertificat(data));
        
    //   },[]);      
      const qrcodeValue = `${window.location.host}/certificate/student/${certificat.id}`; 
      const generatePdf = () => {
        const report = document.getElementById('report');
        var opt = {
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2.5 },
          jsPDF: { orientation: 'portrait' },
      };
        html2pdf().set(opt).from(report).save()
      };

  return (
    <>
    
    <div><button className='navbarbutton' onClick={generatePdf}> save PDF</button></div>
    
    <div id="report">
        <div style={{float: "left", display: "flex",justifyContent: "flex-start"}}>{certificat?.id} / {moment(certificat?.created).format("DD.MM.YYYY")}</div>
        {/* <div style={
            {display: "flex",
            justifyContent: "flex-start",
            position: "absolute",
            top: 40,
            width: 200}
        }> */}
         <div className="qr">   
            <QRCode value={qrcodeValue} />
        </div>
        <div className="shapka-small" >
				<p>
                Приложение 4<br/>
                к Правилам исчисления<br/>
                (определения) <br/>
                размеров, назначения, <br/>
                осуществления, приостановления, <br/>
                перерасчета, возобновления,<br/>
                прекращения и пересмотра <br/>
                решения о назначении <br/>
                (отказе в назначении) <br/>
                социальной выплаты по <br/>
                случаю потери кормильца<br/>
<br/>

                </p>
			</div>
			
            <div style={{
                display: "flex", 
                justifyContent: "center", 
                flexDirection: "column"
                }}>
				<div style={{
                        display: "flex", 
                        justifyContent: "center", 
                        flexDirection: "column", 
                        marginBottom: 70
                    }}>
					<div className="bodytext-small">
						<h3>СПРАВКА</h3>
						<p>Дан(а) гражданину(ке) <b>{certificat?.lastname} {certificat?.name} {certificat?.middlename}  
                        , {moment(certificat?.birth_date).format("DD.MM.YYYY")} г.р. </b> в том, что он(а) действительно является  обучающим(ей)ся в <u><b> Учреждения "Esil University"</b> <b>лицензия № KZ08LAA00032358  от 01.04. 2022 г., без ограничения</b></u><br/> 
                        <b>{certificat?.course_number}</b> класса/курса, форма обучения: {!certificat?.study_form_name_ru.includes('ДОТ')? 'очная':'очная с переводом на ДОТ'}<br/> 
						Справка действительна на 2024/2025 учебный год.<br/>
						Справка выдана для предъявления в центр обслуживания населения <br/>отделение Государственной корпорации.<br/>
						Срок обучения в организации образования {certificat?.course_count} лет,<br/>
						период обучения с {moment(certificat?.start_date).format("DD.MM.YYYY")} года по 30.06.{2025+certificat!.course_count-certificat!.course_number} года. <br/>
						Примечание: справка действительна 1 год. <br/>В случаях отчисления обучающегося из организации образования или перевода на
заочную форму обучения, руководитель организации образования извещает отделение
Государственной корпорации по местожительству получателя социальной выплаты.
						</p>
					</div>
				</div>
			    <div style={{marginBottom: 30, textAlign: "left"}}> 
					Документ подписан:
				</div>
				<div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0 10%"}}>
					<div> 
						<b>Ректор</b>
					</div>
					<div>
						<b>Таубаев А.А.</b>
					</div>
				</div>
				{/* <div style={{float:"left", fontSize:14, marginTop:30, textAlign:"left"}}>
					<p>Исп: Аблкасенова С.Г.</p>
					<p>Тел:8-(7172)72-54-07</p>
				</div> */}
			</div>           

    </div>
    </>
  )
}