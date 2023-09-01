import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { CertResponse } from '../models/response/CertResponse';
import { API_URL } from '../http';
import { useParams } from 'react-router-dom';






const certificatePage:FC = () => {    
  const [certificate, setCertificate] = useState<CertResponse>({} as CertResponse);
  const [reason, setReason] = useState();
  const {id} = useParams();  

  
  useEffect(() => {   
    //console.log(id);
    fetch(`${API_URL}/cert/${id}`).then((response) => response.json()).then((data:CertResponse)=>setCertificate(data)).catch((reason)=>setReason(reason));
    //console.log(reason);
  },[])

  if(reason){
    return <div>Сертификат не найдет</div>
  }
  return (
    <div>
        <div>
            <p>ФИО обучающегося {certificate.lastname} {certificate.name} {certificate.middlename}</p>
            <p>Образовательая программа {certificate.specialization_code} {certificate.specialization_name_ru}</p>
            <p>Кафедра {certificate.cafedra_ru} </p>
            <p>Факультет {certificate.dekanat_ru} </p>
            <p>Форма обучения {certificate.study_form_name_ru} </p>
            <p>Курс {certificate.course_number} </p>
            <p>{certificate.course_count} года обучения</p>
        </div>
    </div>
  );
}

export default observer(certificatePage)