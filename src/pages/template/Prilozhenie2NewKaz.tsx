import { CertResponse } from "../../models/response/CertResponse"
import moment from "moment";
import QRCode from "react-qr-code";
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';

export function Prilozhenie2NewKaz(certificat:CertResponse)  {
  
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
      const user = JSON.parse(localStorage.getItem('data'));
      const iin = user.username;
      alert(JSON.stringify(certificat));
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
        Қазақстан Республикасы<br/>
Еңбек және халықты<br/>
әлеуметтік қорғау министрі<br/>
2024 жылғы 30 желтоқсандағы<br/>
№ 509 бұйрығына<br/>
3-қосымша<br/><br/>
 	Асыраушысынан айырылу<br/>
жағдайы бойынша мемлекеттік<br/>
әлеуметтік жәрдемақы мөлшерін<br/>
есептеу (айқындау), оны<br/>
тағайындау, төлеу, тоқтата тұру,<br/>
қайта есептеу, қайта бастау,<br/>
тоқтату және тағайындау<br/>
(тағайындаудан бас тарту)<br/>
туралы шешімді қайта қарау<br/>
қағидаларына<br/>
2-қосымша<br/>
Нысан
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
						<h3>АНЫҚТАМА</h3>
						<p>Азамат <b>{certificat?.lastname} {certificat?.name} {certificat?.middlename}, {moment(certificat?.birth_date).format("DD.MM.YYYY")}ж.т., ЖСН {iin}</b> ол iс жүзiнде <u><b>Ахмет Жұбанов 7 көшесіндегі "Esil University" мекемесінің</b></u><br/> 
                        <b>{certificat?.course_number}</b> курсының <b>{certificat?.specialization_code} - {certificat?.specialization_name_kz}</b> оқушысы болып табылады,
            <br/>Топтың, литердің атауы, топ коды: <b>{localStorage.getItem('groupname')}</b>
            <br/>Оқыту түрі: {!certificat?.study_form_name_ru.includes('ДОТ')? 'күндізгі':'күндізгі (қашықтан оқытуға ауыстыру)'} <br/> 
            Анықтама 2024/2025 оқу жылына жарамды.<br/>
						Анықтама талап ету орыны бойынша ұсыну үшiн берiлдi.<br/>
            Білім беру ұйымындағы оқу мерзiмi {certificat?.course_count} жылғы оқу кезеңi {moment(certificat?.start_date).format("DD.MM.YYYY")} -нан (-нен) 30.06.{2025+certificat!.course_count-certificat!.course_number} дейiн.<br/>
						Ескертпе: анықтама өтініш беру кезінде жарамды.
						</p>
					</div>
				</div>
			    {/* <div style={{marginBottom: 30, textAlign: "left"}}> 
					Документ подписан:
				</div> */}
				<div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0 10%"}}>
					<div> 
						<b>Білім беру ұйымының басшысы</b>
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
