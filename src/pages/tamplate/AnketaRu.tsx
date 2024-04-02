//import { CertResponse } from "../../models/response/CertResponse"
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';

//export function AnketaRu(certificat:CertResponse)  {
export function AnketaRu() {
  // const [certid] = useState<number>(id);
  // const [certificat, setCertificat] = useState<CertResponse>();


  // useEffect(() => {
  //     //const certid = localStorage.getItem('certificat'); 
  //     console.log(certid);
  //     fetch(`${API_URL}/cert/${certid}`).then((response) => response.json()).then((data:CertResponse)=>setCertificat(data));

  //   },[]);      

  const generatePdf = () => {
    // currentApplicantFIO must be set in localstorage on page load
    localStorage.setItem('currentApplicantFIO', 'Есенжолов Ж.А.')
    const report = document.getElementById('anketa');
    var opt = {
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      filename: `Анкета_Рус_${localStorage.getItem('currentApplicantFIO')}.pdf`,
      jsPDF: { orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    html2pdf().set(opt).from(report).save()
  };
  const anketaValuesRu = [
    ['Фамилия', 'certificate.lastname'],
    ['Имя', '...'],
    ['Отчество', '...'],
    ['Год рождения', '...'],
    ['ИИН', '...'],
    ['Номер уд.', '...'],
    ['Дата выдачи', '...'],
    ['Срок действия', '...'],
    ['Орган выдачи', '...'],
    ['Пол', '...'],
    ['Место рождения', '...'],
    ['Адрес проживания', '...'],
    ['Адрес прописки', '...'],
    ['Место проживания КАТО', '...'],
    ['Место регистрации КАТО', '...'],
    ['Место рождения КАТО', '...'],
    ['Номер телефона', '...'],
    ['Дом. номер телефона', '...'],
    ['Телефон родителей', '...'],
    ['Эл. почта', '...'],
    ['Национальность', '...'],
    ['Гражданство', '...'],
    ['Образовательная программа', '...'],
    ['Форма обучения', '...'],
    ['Академическая степень', '...'],
    ['Образование', '...'],
    ['Язык обучения', '...'],
    ['Зачислить по результатам', '...'],
    ['Баллы ЕНТ', '...'],
    ['В число студентов', '...'],
    ['Учебное заведение', '...'],
    ['Место окончания учебного заведения', '...'],
    ['Нуждаетесь ли Вы в общежитии', '...'],
    ['Какие языки изучал', '...'],
    ['Льготы', '...'],
    ['Условник', '...'],
    ['Инклюзив', '...'],
    ['ГРАНТ', '...'],
    ['Оплаченная сумма', '...'],
    ['Источник информации', '...'],
    ['Принял(-а)', '...']
  ];

  const anketaMap = anketaValuesRu.map((element) => {
    const [a1, b1] = element;
    return <tr id="anketaTr">
      <td id="anketaTd">{a1}</td>
      <td id="anketaTd">{b1}</td>
    </tr>;
  }
  );
  return (
    <>
      <div><button onClick={generatePdf}>save PDF</button></div>
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
