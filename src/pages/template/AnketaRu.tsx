//import { CertResponse } from "../../models/response/CertResponse"
import { useEffect, useState } from 'react';
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import DocsService from '../../services/DocsService';
import { ApplicationResponse } from '../../models/response/ApplicationResponse';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
// import { FaGear } from "react-icons/fa6";

//export function AnketaRu(certificat:CertResponse)  {
export function AnketaRu() {
  // const [certid] = useState<number>(id);
  // const [certificat, setCertificat] = useState<CertResponse>();
  const [applicationData, setApplicationData] = useState<ApplicationResponse>();

  useEffect(() => {
    DocsService.getApplicationDataRu().then((response) => {
      setApplicationData(response.data);
    });
  }, []);

  
  const generatePdf = () => {
    const report = document.getElementById('anketa');
    var opt = {
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2.5 },
      filename: `Анкета_Рус_${localStorage.getItem('currentApplicantFIO')}.pdf`,
      jsPDF: { orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    html2pdf().set(opt).from(report).save()
  };
  const data = JSON.parse(localStorage.getItem('data'));
  const anketaValuesRu = [
    ['Фамилия', applicationData?.lastname],
    ['Имя', applicationData?.firstname],
    ['Отчество', applicationData?.patronymic],
    ['Год рождения', moment(applicationData?.birth_date).format("DD.MM.YYYY")],
    ['ИИН', applicationData?.iin],
    ['Номер уд.', applicationData?.id_card],
    ['Дата выдачи', moment(applicationData?.id_date).format("DD.MM.YYYY")],
    ['Срок действия', moment(applicationData?.id_thru).format("DD.MM.YYYY")],
    ['Орган выдачи', applicationData?.id_dep],
    ['Пол', applicationData?.sex],
    ['Место рождения', applicationData?.birth_place],
    ['Адрес проживания', applicationData?.living_address],
    ['Адрес прописки', applicationData?.registration_address],
    ['Место проживания КАТО', applicationData?.living_place_kato],
    ['Место регистрации КАТО', applicationData?.registration_place_kato],
    ['Место рождения КАТО', applicationData?.birth_place_kato],
    ['Номер телефона', applicationData?.phone1],
    ['Дом. номер телефона', applicationData?.phone2],
    ['Телефон родителей', '...'],
    ['Эл. почта', applicationData?.email],
    ['Национальность', applicationData?.nationality],
    ['Гражданство', applicationData?.citizenship],
    ['Образовательная программа', applicationData?.specialization],
    ['Форма обучения', applicationData?.study_form],
    ['Академическая степень', applicationData?.degree_type],
    ['Образование', '...'],
    ['Язык обучения', applicationData?.study_language],
    ['Зачислить по результатам', '...'],
    ['Баллы ЕНТ', applicationData?.exam_score],
    ['В число студентов', '...'],
    ['Учебное заведение', applicationData?.edu_name],
    ['Место окончания учебного заведения', applicationData?.edu_place_name],
    ['Нуждаетесь ли Вы в общежитии', (applicationData?.dorm != 1 ? 'Да' : 'Нет')],
    ['Какие языки изучал', '...'],
    ['Льготы', '...'],
    ['Условник', '...'],
    ['Инклюзив', '...'],
    ['ГРАНТ', '...'],
    ['Оплаченная сумма', '...'],
    ['Источник информации', '...'],
    ['Принял(-а)', data.lastname + ' ' + data.name + ' ' + data.middlename]
  ];

  const anketaMap = anketaValuesRu.map((element) => {
    const [a1, b1] = element;
    return <tr id="anketaTr">
      <td style={{ whiteSpace: 'nowrap', overflow: 'visible' }} id="anketaTd">{a1}</td>
      {(b1 != '' && b1 != '...' && b1 != undefined && b1 != '&nbsp;' ?
        <td id="anketaTd" style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
          &nbsp;{b1}
        </td>
        :
        <td id="anketaTd">
          &nbsp;&nbsp;
        </td>)}
    </tr>;
  }
  );

  return (
    <><div id='documentNavbar'><Link to="/applicants"><button id="documentNavbarButton">Назад</button></Link> &nbsp;
    <button id="documentNavbarButton" onClick={generatePdf}>Скачать&nbsp;&nbsp;<FaDownload/> &nbsp;</button>
    {/* &nbsp;&nbsp;<Link to="/applicants"><button id="documentNavbarButton"><FaGear /></button></Link> */}
    </div>
      <div id="anketa">
        <div id="anketaPadding">
          <b><div id="anketaHeader">Анкета</div>
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

