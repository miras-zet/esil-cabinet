//import { useEffect, useState } from 'react';
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
//import DocsService from '../../services/DocsService';
//import moment from 'moment';
import { Link } from 'react-router-dom';
//import { ContractResponse } from '../../models/response/ContractResponse';
import { FaDownload } from 'react-icons/fa';

//export function AnketaRu(certificat:CertResponse)  {
export function ContractRu() {
    // const [certid] = useState<number>(id);
    // const [certificat, setCertificat] = useState<CertResponse>();
    // const [contractData, setContractData] = useState<ContractResponse>();

    // useEffect(() => {
    //   DocsService.getContractDataRu().then((response) => {
    //     setContractData(response.data);
    //   });
    // }, []);


    const generatePdf = () => {
        const report = document.getElementById('contract');
        var opt = {
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2.5 },
            filename: `Договор_Рус_${localStorage.getItem('currentApplicantFIO')}.pdf`,
            jsPDF: { orientation: 'landscape' }
        };
        html2pdf().set(opt).from(report).save()
    };
    // const data = JSON.parse(localStorage.getItem('data'));


    return (
        <><div id='documentNavbar'><Link to="/applicants"><button id="documentNavbarButton">Назад</button></Link> &nbsp;
        <button id="documentNavbarButton" onClick={generatePdf}>Скачать&nbsp;&nbsp;<FaDownload/></button></div>
            <div id="contract">
                <div id="contractPadding">
                    <table id="contractTable">
                        <tr id="contractTr">
                            <td id="contractTd">г. Астана                                                                                                                           «____» __________202__ г.

                                Учреждение «Esil University», именуемое в дальнейшем «Университет» и/или «организация образования», имеющий государственную лицензию на право ведения образовательной деятельности № KZ08LAA00032358 от 01 апреля 2022 года, выданную Комитетом по контролю в сфере образования и науки МОН РК, в лице Ректора Таубаева Аяпбергена Алданаевича, действующего на основании Устава, с одной стороны, и ___________________students.lastname_students.firstname_students.patronymic____________________,
                                (Фамилия, имя, отчество (при его наличии)
                                именуемый (ая) в дальнейшем «Обучающийся», ИИН: ___students.iinplt_________, удостоверение личности № _____students.icnumber____выдано _students.icdate_students.icdepartment______________ с другой стороны,
                                (дата и кем выдано)
                                и (или)_______________________________________________________________________________________,
                                (Фамилия, имя, отчество (при его наличии) физического лица или наименование юридического лица)
                                именуемый (ая) в дальнейшем "Заказчик", в лице
                                _____________________________________________________________________________________________
                                (Фамилия, имя, отчество (при его наличии) и должность руководителя юридического лица или другого уполномоченного лица),
                                действующего на основании___________________________________________________________________,
                                (реквизиты учредительных документов)
                                и в интересах ФИО ___________________________________________________________________________,
                                (Фамилия, имя, отчество (при его наличии)
                            </td>
                            <td id="contractTd">с третьей стороны, заключили настоящий договор оказания образовательных услуг (далее – Договор) о нижеследующем:

                                1. ПРЕДМЕТ ДОГОВОРА
                                1.1. Заказчик или обучающийся поручает и оплачивает, а Университет принимает на себя обязанность по организации учебного процесса для Обучающегося students.lastname students.firstname students.patronymic ,
                                (Фамилия, имя, отчество (при его наличии)
                                и предоставлению Обучающемуся возможности получения образовательных услуг в соответствии с учебными планами Университета по образовательной программе _______specializations.specializationCode specializations.nameru________________________________________________________________,
                                шифр и наименование образовательной программы
                                соответствующей государственному общеобязательному стандарту образования Республики Казахстан по форме обучения _____ studyforms.departmentID -+ departments.nameru___________________________
                                (Очная, Очная с переводом на дистанционное обучение)
                                с присвоением ему (ей) соответствующей квалификации и выдачей документа об образовании по прохождению итоговой аттестации и полной оплаты оказанных услуг.
                                1.2. Срок обучения______________studyforms.courseCount______________________________________________ .
                                1.3 По результатам набора на текущий учебный год Университет формирует академические потоки и группы по принципам достаточного  количества обучающихся, поступивших на конкретные дисциплины и/или к конкретному преподавателю, достижения необходимого уровня рентабельности групп, в соответствии с показателем, утвержденным внутренними документами Университета.
                                1.4. Подписанием настоящего Договора, в соответствии с Законом Республики Казахстан от 21 мая 2013 года № 94-V «О персональных данных и их защите», Обучающийся дает безусловное согласие Университету и третьим лицам, т.е. лицам связанным, как в настоящее время, так и в будущем, с Университетом обстоятельствами или правоотношениями по сбору, обработке и защите персональных данных Обучающегося, на сбор, обработку и трансграничную передачу, не противоречащими законодательству способами, в целях, </td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}
