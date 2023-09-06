import { CertResponse } from "../../models/response/CertResponse"
import moment from "moment";
import QRCode from "react-qr-code";
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';

export function Prilozhenie2(certificat:CertResponse)  {
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
        html2pdf().from(report).save()
      };
      
  return (
    <>
    <div><button onClick={generatePdf}> save PDF</button></div>
    
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
        <div className="shapka" >
				<p>
                Приложение 2<br/>
                к Правилам исчисления<br/>
                (определения) размеров, назначения,<br/>
                выплаты, приостановления,<br/>
                перерасчета, возобновления,<br/>
                прекращения и пересмотра решения<br/>
                о назначении (отказе<br/>
                в назначении) государственного<br/>
                социального пособия по случаю потери кормильца<br/>

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
					<div className="bodytext">
						<h3>СПРАВКА</h3>
						<p>Дан(а) гражданину(ке) <b>{certificat?.lastname} {certificat?.name} {certificat?.middlename}  
                        , {moment(certificat?.birth_date).format("DD.MM.YYYY")} г.р. </b> в том, что он(а) действительно является  обучающим(ей)ся в <u><b> Учреждения "Esil University"</b> <b>лицензия № KZ08LAA00032358  от 01.04. 2022 г., без ограничения</b></u><br/> 
                        <b>{certificat?.course_number}</b> курса специальность/ОП <b>{certificat?.specialization_code} - "{certificat?.specialization_name_ru}" </b>,
						<br/>Форма обучения: {certificat?.study_form_name_ru} <br/> 
						Справка действительна на 2023/2024 учебный год.<br/>
						Справка выдана для предъявления в 
						<br/>отделение Государственной корпорации.<br/>
						Срок обучения в учебном заведении {certificat?.course_count} года.<br/>
						Период обучения с {moment(certificat?.start_date).format("DD.MM.YYYY")} года по 30.06.{2024+certificat!.course_count-certificat!.course_number} года. <br/>
						Примечание: справка действительна 1 год. В случаях отчисления обучающегося из учебного заведения или перевода на заочную форму обучения, руководитель учебного заведения извещает отделение Государственной корпорации по месту жительства получателя пособия.
						
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
				<div style={{float:"left", fontSize:14, marginTop:30, textAlign:"left"}}>
					<p>Исп: Аблкасенова С.Г.</p>
					<p>Тел:8-(7172)72-54-07</p>
				</div>
			</div>           

    </div>
    
    
    </>
  )
}
