import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { CertResponse } from '../models/response/CertResponse';
import { API_URL } from '../http';
import { useParams } from 'react-router-dom';






const certificatePage:FC = () => {    
  const [certificate, setCertificate] = useState<CertResponse>({} as CertResponse);
  const [reason, setReason] = useState();
  const {id} = useParams();  
  const typeCert = [        
    "Приложение 2 к Правилам исчисления (определения) размеров, назначения, выплаты, приостановления, перерасчета, возобновления, прекращения и пересмотра решения о назначении (отказе в назначении) государственного социального пособия по случаю потери кормильца" ,
    "Приложение 4 к Правилам исчисления (определения) размеров, назначения, осуществления, приостановления, перерасчета, возобновления, прекращения и пересмотра решения о назначении (отказе в назначении) социальной выплаты по случаю потери кормильца" ,
    "Приложение 6 к Правилам назначения, предоставления государственной базовой пенсионной выплаты за счет бюджетных средств, а также назначения и осуществления пенсионных выплат по возрасту, государственных социальных пособий по инвалидности по случаю потери кормильца, государственных специальных пособий" , 
    "Приложение 29 К Правилам назначения, и осуществления выплаты государственного пособия на рождение, пособия по уходу, пособия многодетным семьям, пособия награжденной матери" ,
    "Приложение 31 к Правилам исчисления (определения), размеров социальных выплат, назначения, перерасчета, приостановления, возобновления, прекращения и осуществления социальных выплат из Государственного фонда социального страхования и их осуществления" ,
    "По месту требования" 
  ];

  
  useEffect(() => {   
    //console.log(id);
    fetch(`${API_URL}/cert/${id}`).then((response) => response.json()).then((data:CertResponse)=>setCertificate(data)).catch((reason)=>setReason(reason));
    //console.log(reason);
  },[])

  if(reason){
    return <div>Сертификат не найден</div>
  }
  return (
    <div>
        <div>
            <img src="./logo_new.png" width={300} /> 
            <h1>Учреждения "Esil University"</h1>
            <p>{typeCert[certificate.cert_type-1]}</p>
            <p>ФИО обучающегося:  <u>  {certificate.lastname} {certificate.name} {certificate.middlename}   </u> </p>
            <p>Образовательая программа:  <u> {certificate.specialization_code} {certificate.specialization_name_ru}</u></p>
            <p>Кафедра:   <u> {certificate.cafedra_ru}</u> </p>
            <p>Факультет:  <u> {certificate.dekanat_ru}</u> </p>
            <p>Форма обучения:  <u> {certificate.study_form_name_ru}</u>   </p>
            <p>Курс: {certificate.course_number} </p>
            <p>{certificate.course_count} года обучения</p>
            
        </div>
    </div>
  );
}

export default observer(certificatePage)