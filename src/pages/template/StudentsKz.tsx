import { CertResponse } from "../../models/response/CertResponse"
import moment from "moment";
import QRCode from "react-qr-code";
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';



export function StudentsKz(certificat:CertResponse)  {
    // const [certid] = useState<number>(id);
    // const [certificat, setCertificat] = useState<CertResponse>();
    

    // useEffect(() => {
    //     //const certid = localStorage.getItem('certificat'); 
    //     console.log(certid);
    //     fetch(`${API_URL}/cert/${certid}`).then((response) => response.json()).then((data:CertResponse)=>setCertificat(data));
        
    //   },[]);      
      const qrcodeValue = `${window.location.protocol + '//' + window.location.host}/certificate/student/${certificat.id}`; 
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
						<h3>Анықтама</h3>
						<p>Азамат (ша) <b><u>{certificat?.lastname} {certificat?.name} {certificat?.middlename}</u></b>, {moment(certificat?.birth_date).format("DD.MM.YYYY")} ж.т., "Esil University" мекемесінің <b><u>{certificat?.specialization_code} - {certificat?.specialization_name_kz} {certificat?.course_number}</u></b> курс студенті болып табылады,
                        (мемлекеттік лицензия № KZ08LAA00032358, берілген күні 01.04.2022 жыл, мерзім шектеусіз).<br/> 
                        <br/>
                        Оқыту нысаны: <b><u>{!certificat?.study_form_name_ru.includes('ДОТ')?'күндізгі':'күндізгі (қашықтан оқытуға ауыстыру)'}</u></b><br/>                         
                        {certificat.grant_type === -4 && <><b><u>Мемлекеттік грант</u></b> / Ақылы негізде / Әкімшілік гранты<br/></>}
                        {certificat.grant_type === -7 && <>Мемлекеттік грант / <b><u>Ақылы негізде</u></b> / Әкімшілік гранты<br/></>}
						Анықтама 2024/2025 оқу жылына жарамды.<br/>						
						Оқу орнында оқу мерзімі – {certificat?.course_count} жыл.<br/>
						Оқу кезеңі  {moment(certificat?.start_date).format("DD.MM.YYYY")} жылдан 30.06.{2025+certificat!.course_count-certificat!.course_number} жылға дейін.<br/>
                        </p>
					</div>
				</div>
                <div style={{ marginBottom: 30, textAlign: "left" }}>
                        Құжатқа қол қойылды
                    </div>
				<div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0 10%"}}>
					{/* <div style={{textAlign:'left', marginLeft:'-12.5%'}}> 
						Білім алушыларға қызмет көрсету<br />
                        және тіркеу орталығының бас маманы
					</div> */}
					{/* <div>
						<b>Аблкасенова С.Г.</b>
					</div> */}
				</div>
				{/* <div style={{float:"left", fontSize:14, marginTop:30, textAlign:"left"}}>
					<p>8 (7172) 72-54-07 (вн 143)</p>
				</div> */}
			</div>           

    </div>
    </>
  )
}