//import { CertResponse } from "../../models/response/CertResponse"
import { useEffect, useState } from 'react';
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import DocsService from '../../services/DocsService';
import { ApplicationResponse } from '../../models/response/ApplicationResponse';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';

//export function AnketaKz(certificat:CertResponse)  {
export function AnketaKz() {
  // const [certid] = useState<number>(id);
  // const [certificat, setCertificat] = useState<CertResponse>();
  const [applicationData, setApplicationData] = useState<ApplicationResponse>();

  useEffect(() => { 
    DocsService.getApplicationDataKz().then((response) => {
      setApplicationData(response.data);
      console.log(applicationData);
      console.log('hey');
    });
    },[]);      

  const generatePdf = () => {
    const report = document.getElementById('anketa');
    var opt = {
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2.5 },
      filename: `Анкета_Каз_${localStorage.getItem('currentApplicantFIO')}.pdf`,
      jsPDF: { orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    html2pdf().set(opt).from(report).save()
  };
  const data = JSON.parse(localStorage.getItem('data'));
  const anketaValuesRu = [
    ['Тегі', applicationData?.lastname],
    ['Аты', applicationData?.firstname],
    ['Əкесінің аты', applicationData?.patronymic],
    ['Туылған күні', moment(applicationData?.birth_date).format("DD.MM.YYYY")],
    ['ЖСН', applicationData?.iin],
    ['Жеке куəлік нөмірі', applicationData?.id_card],
    ['Берілген күні', moment(applicationData?.id_date).format("DD.MM.YYYY")],
    ['Қолданылу мерзімі', moment(applicationData?.id_thru).format("DD.MM.YYYY")],
    ['Берген орыны', applicationData?.id_dep],
    ['Жынысы', applicationData?.sex],
    ['Туған жері', applicationData?.birth_place],
    ['Тұрғылықты мекен жайы', applicationData?.living_address],
    ['Тіркелген мекен жайы', applicationData?.registration_address],
    ['ƏТОК бойынша тұрғылықты жері', applicationData?.living_place_kato],
    ['ƏТОК бойынша тіркелген жері', applicationData?.registration_place_kato],
    ['ƏТОК бойынша туған жері', applicationData?.birth_place_kato],
    ['Телефон нөмірі', applicationData?.phone1],
    ['Үй телефоны', applicationData?.phone2],
    ['Ата-анасының телефоны', '...'],
    ['Электронды пошта', applicationData?.email],
    ['Ұлты', applicationData?.nationality],
    ['Азаматтығы', applicationData?.citizenship],
    ['Білім беру бағдарламасы', applicationData?.specialization],
    ['Оқыту түрі', applicationData?.study_form],
    ['Академиялық дəрежесі', applicationData?.degree_type],
    ['Білімі', '...'],
    ['Оқыту тілі', applicationData?.study_language],
    ['Нəтижесі бойынша', '...'],
    ['ҰБТ балы', applicationData?.exam_score],
    ['Студенттер қатарына', '...'],
    ['Оқу орыны', applicationData?.edu_name],
    ['Бітірген оқу орыны', applicationData?.edu_place_name],
    ['Жатақхана қажеттілігі', (applicationData?.dorm==1? 'Иə':'Жоқ')],
    ['Меңгерген тілдері', '...'],
    ['Жеңілдіктер', '...'],
    ['Шартты', '...'],
    ['Инклюзивті', '...'],
    ['ГРАНТ', '...'],
    ['Төленген оқу ақысы', '...'],
    ['Ақпарат көзі', '...'],
    ['Қабылдаған', data.lastname+' '+data.name+' '+data.middlename]
  ];

  const anketaMap = anketaValuesRu.map((element) => {
    const [a1, b1] = element;
    return <tr id="anketaTr">
      <td style={{whiteSpace:'nowrap', overflow:'visible'}} id="anketaTd">{a1}</td>
      {(b1!='' && b1!='...' && b1!=undefined && b1!='&nbsp;' ?
        <td id="anketaTd" style={{whiteSpace:'nowrap', overflow:'hidden'}}>
          &nbsp;{b1}
        </td>
        :
        <td id="anketaTd">
          &nbsp;<div style={{height:'0px'}}><input style={{width:'95%', height:'18px', fontSize:'10.9pt',verticalAlign:'middle', marginLeft:'2px', marginTop:'-48px', overflow:'visible', outline:'none', border:'none', backgroundColor:'white', color:'black', fontFamily:'Times New Roman', fontWeight:'bold'}} type="text"></input></div>
        </td>)}
    </tr>;
  }
  );
  return (
    <>
      <div><Link to="/applicants"><button>Назад</button></Link><br style={{lineHeight:'50px'}}/>
      <button onClick={generatePdf}>Скачать&nbsp;&nbsp;<FaDownload style={{fontSize:'11.5pt', marginTop:'5px'}}/></button></div>
      <div id="anketa">
        <div id="anketaPadding">
          <b><div id="anketaHeader">Сауалнама</div>
            <div>
              <table id="anketaTable">
                {anketaMap}
              </table>
            </div>
          </b>
        </div>
      </div>
    </>
  )
}

