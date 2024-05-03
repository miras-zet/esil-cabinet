import { CertResponse } from "../../models/response/CertResponse"
import moment from "moment";
import QRCode from "react-qr-code";
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';



export function Students(certificat:CertResponse)  {
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
                        , {moment(certificat?.birth_date).format("DD.MM.YYYY")} г.р. </b> в том, что он (а) действительно обучающим(ей)ся на <b>{certificat?.course_number}</b> курсе, образовательной программе  <b>{certificat?.specialization_code} - "{certificat?.specialization_name_ru}"</b>,
                        <u><b> Учреждение "Esil University"</b> <b>лицензия № KZ08LAA00032358  от 01.04. 2022 г., без ограничения</b></u><br/> 
                        <br/>Факультет {certificat?.dekanat_ru}  
						<br/>Форма обучения: {certificat?.study_form_name_ru} <br/>                         
                        {certificat.grant_type === -4 && <><b>Государственный грант</b> / На платной основе / Грант Акимата<br/></>}
                        {certificat.grant_type === -7 && <>Государственный грант / <b>На платной основе </b>/ Грант Акимата<br/></>}
						Справка действительна на 2023/2024 учебный год.<br/>						
						Срок обучения в учебном заведении {certificat?.course_count} года.<br/>
						Период обучения с {moment(certificat?.start_date).format("DD.MM.YYYY")} года по 30.06.{2024+certificat!.course_count-certificat!.course_number} года. <br/>
						Справка выдана для предъявления по месту требования.
						</p>
					</div>
				</div>
			    <div style={{marginBottom: 30, textAlign: "left"}}> 
					Документ подписан:
				</div>
				<div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0 10%"}}>
					<div> 
						<b>Главный специалист ЦРиОО</b>
					</div>
					<div>
						<b>Аблкасенова С.Г.</b>
					</div>
				</div>
				<div style={{float:"left", fontSize:14, marginTop:30, textAlign:"left"}}>
					<p>+7 7172 725407 </p>
				</div>
			</div>           

    </div>
    </>
  )
}