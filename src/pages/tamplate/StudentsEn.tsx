import { CertResponse } from "../../models/response/CertResponse"
import moment from "moment";
import QRCode from "react-qr-code";
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';



export function StudentsEn(certificat:CertResponse)  {
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
						<h3>REFERENCE</h3>
						<p>This reference is given to  <b>{certificat?.lastname} {certificat?.name}</b> , date of birth {moment(certificat?.birth_date).format("DD.MM.YYYY")} to confirm that he(she) is a  <b>{certificat?.course_number}</b> year student of the specialty   <b>{certificat?.specialization_code} - "{certificat?.specialization_name_en}" </b>,
                        <u><b> «Esil University» State license № KZ08LAA00032358, date of issue 01.04.2022 (without time limitation)</b></u><br/> 
                        <br/>{certificat?.study_form_name_en} <br/>                         
                        {certificat.grant_type === -4 && <><b>State grant</b> / On a paid basis <br/></>}
                        {certificat.grant_type === -7 && <>State grant / <b>On a paid basis </b><br/></>}
						Present reference is valid for  2024/2025 academic year.<br/>						
						The term of study at the university is – {certificat?.course_count} years.<br/>
						Duration of study  {moment(certificat?.start_date).format("DD.MM.YYYY")} - 30.06.{2024+certificat!.course_count-certificat!.course_number}. <br/>
                        The certificate was issued for presentation at the place of claim.
                        </p>
					</div>
				</div>
			    <div style={{marginBottom: 30, textAlign: "left"}}> 
                    P.P.:
				</div>
				<div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0 10%"}}>
					<div> 
						<b>Chief Specialist of the Registration <br />
and Student Service Department
</b>
					</div>
					<div>
						<b>S. Ablkasenova</b>
					</div>
				</div>
				<div style={{float:"left", fontSize:14, marginTop:30, textAlign:"left"}}>
					<p>8 (7172) 72-54-07 (internal 143)</p>
				</div>
			</div>           

    </div>
    </>
  )
}