import { CertResponse } from "../../models/response/CertResponse"
import moment from "moment";
import QRCode from "react-qr-code";
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';


export function Prilozhenie29CertifKz(certificat:CertResponse)  {
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
      const masters_degree_ids=[7,12,15,17,23,25];
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
        Бұйрыққа 6-қосымша/<br/>
2024 жылғы 17 маусымдағы №196<br/>
<br/>
        Бала туғанда берілетін мемлекеттік<br/>
        жәрдемақыны, бала күтіміне<br/>
        байланысты  жәрдемақыны,<br/>
        көпбалалы отбасыларға берілетін<br/>
        жәрдемақыны, наградталған анаға<br/>
        берілетін жәрдемақыны тағайындау<br/>
        және төлеуді жүзеге асыру<br/>
        қағидаларына<br/>
        29-қосымша<br/>
        Нысан<br/>
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
						<h3>АНЫҚТАМА</h3>
						<p>Азамат <b>{certificat?.lastname} {certificat?.name} {certificat?.middlename}  
                        , {moment(certificat?.birth_date).format("DD.MM.YYYY")}</b> ол iс жүзiнде<br/>
                        <u><b>"Esil University" мекемесінің (мемлекеттік лицензия № KZ08LAA00032358, берілген күні 01.04.2022 жыл, мерзім шектеусіз)</b></u><br/> 
                        <b><u>{certificat?.course_number}</u></b> курсының {masters_degree_ids.includes(certificat?.study_form_id)?<>магистранты</>:<>студентi</>} болып табылады,
						<br/>оқу нысаны <u>{!certificat?.study_form_name_kz.includes('')?'күндізгі':'күндізгі (қашықтан оқытуға ауыстыру)'}</u><br/> 
						Анықтама 2024/2025 оқу жылына жарамды.<br/><br/>
						Анықтама Мемлекеттiк корпорацияның бөлiмшесiне ұсыну үшiн берiлдi.<br/><br/>
						Оқу орнындағы оқу мерзiмi {certificat?.course_count} жыл<br/>
						оқу кезеңi {moment(certificat?.start_date).format("DD.MM.YYYY")} жылдан 30.06.{2025+certificat!.course_count-certificat!.course_number} жылға дейiн.<br/><br/>
						Ескертпе: анықтама 1 жылға жарамды.
            <br/>Білім алушы оқу орнынан шығарылған немесе сырттай оқу нысанына ауыстырылған жағдайларда, оқу орнының басшысы жәрдемақы алушының тұрғылықты жерi бойынша Мемлекеттiк корпорацияның бөлiмшесiн хабардар етедi. 
						</p>
					</div>
				</div>
			    <div style={{marginBottom: 20, textAlign: "left"}}> 
					Оқу орнының мөрi басылатын орын<br/>
          Оқу орнының басшысы
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