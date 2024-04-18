//import { useEffect, useState } from 'react';
import '../Certificate.css'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
//import DocsService from '../../services/DocsService';
//import moment from 'moment';
import { Link } from 'react-router-dom';
//import { ContractResponse } from '../../models/response/ContractResponse';
import { FaDownload } from 'react-icons/fa';

//export function AnketaRu(certificat:CertResponse)  {
export function ContractKz() {
  // const [certid] = useState<number>(id);
  // const [certificat, setCertificat] = useState<CertResponse>();
  //   const [contractData, setContractData] = useState<ContractResponse>();

  //   useEffect(() => {
  //     DocsService.getContractDataRu().then((response) => {
  //       setContractData(response.data);
  //     });
  //   }, []);


  const generatePdf = () => {
    const report = document.getElementById('contract');
    var opt = {
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2.5 },
      filename: `Договор_Каз_${localStorage.getItem('currentApplicantFIO')}.pdf`,
      jsPDF: { orientation: 'landscape' }
    };
    html2pdf().set(opt).from(report).save()
  };
  // const data = JSON.parse(localStorage.getItem('data'));


  return (
    <><div id='documentNavbar'><Link to="/applicants"><button id="documentNavbarButton">Назад</button></Link> &nbsp;
    <button id="documentNavbarButton" onClick={generatePdf}>Скачать&nbsp;&nbsp;<FaDownload/></button></div>
      <div id="contract">
        <div id="contractPadding"></div>
      </div>
    </>
  )
}

