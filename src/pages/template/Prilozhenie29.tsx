import { CertResponse } from "../../models/response/CertResponse"
import moment from "moment";
import QRCode from "react-qr-code";
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';


export function Prilozhenie29(certificat:CertResponse)  {
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
          html2canvas: { scale: 3 },
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
        <div className="shapka">
				<p><center>
                Приложение 29<br/>
                к Правилам назначения<br/>
                и осуществления выплаты<br/>
                государственного пособия<br/>
                на рождение, пособия по уходу,<br/>
                пособия многодетным семьям,<br/>
                пособия награжденной матери <br/>
                </center></p>
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
						<p>Дана гражданину <b>{certificat?.lastname} {certificat?.name} {certificat?.middlename}  
                        &nbsp;{moment(certificat?.birth_date).format("DD.MM.YYYY")} г.р. </b><br/>в том, что он(а) действительно является обучающимся 
                        &nbsp;<u><b>Учреждение "Esil University"</b></u><br/> 
                        <b><u>{certificat?.course_number}</u></b> курса
						<br/><u>{!certificat?.study_form_name_ru.includes('ДОТ')? 'очная':'очная с переводом на ДОТ'}</u> форма обучения<br/> 
						Справка действительна на 2024/2025 учебный год.<br/><br/>
						Справка выдана для предъявления в
						<br/>отделение Государственной корпорации.<br/><br/>
						Срок обучения в учебном заведении {certificat?.course_count} год,<br/>
						период обучения с {moment(certificat?.start_date).format("DD.MM.YYYY")} года по 30.06.{2025+certificat!.course_count-certificat!.course_number} года<br/><br/>
						Примечание: справка действительна 1 год.
            <br/>В случаях отчисления обучающегося из учебного заведения или перевода на заочную форму обучения, руководитель учебного заведения извещает отделение Государственной корпорации по месту жительства получателя пособия. 
						</p>
					</div>
				</div>
			    <div style={{marginBottom: 20, textAlign: "left"}}> 
					Место печати учебного заведения<br/>
          Руководитель учебного заведения<br/>
				</div>
				<div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0 10%"}}>
					<div> 
						<b>Ректор</b>
					</div>
					<div>
						<b>Таубаев А.А.</b>
					</div>
				</div>
				<div style={{float:"left", fontSize:14, marginTop:20, textAlign:"left"}}>
					<p>Исп: Аблкасенова С.Г.</p>
					<p>Тел:8-(7172)72-54-07</p>
				</div>
			</div>           

    </div>
    </>
  )
}