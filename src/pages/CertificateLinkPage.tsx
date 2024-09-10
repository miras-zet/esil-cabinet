import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { CertResponse } from '../models/response/CertResponse';
import { API_URL } from '../http';
import { Prilozhenie2 } from './tamplate/Prilozhenie2';
//import { Prilozhenie6 } from './tamplate/Prilozhenie6';
import { Prilozhenie4 } from './tamplate/Prilozhenie4';
import { Students } from './tamplate/Students';
//import { Prilozhenie31 } from './tamplate/Prilozhenie31';
import { Prilozhenie29 } from './tamplate/Prilozhenie29';
import { useParams } from 'react-router-dom';
import { StudentsEn } from './tamplate/StudentsEn';
import { StudentsKz } from './tamplate/StudentsKz';
import { Prilozhenie29Kz } from './tamplate/Prilozhenie29Kz';






const certificateLinkPage:FC = () => {   
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
        {(() => {
        switch(certificate.cert_type) {
            case 1:
              return  Prilozhenie2(certificate);
            case 2:
              return  Prilozhenie4(certificate);
            // case 3:
            //   return  Prilozhenie6(certificate);
            case 3:
              if (certificate.language === 'en')
                  return  Prilozhenie29(certificate);
                else if (certificate.language === 'kz')
                  return Prilozhenie29Kz(certificate);
                else
                  return Prilozhenie29(certificate);
            // case 5:
            //   return  Prilozhenie31(certificate);
              case 4:
                if (certificate.language === 'en')
                  return  StudentsEn(certificate);
                else if (certificate.language === 'kz')
                  return StudentsKz(certificate);
                else
                  return Students(certificate);
          default:
            return  Students(certificate);
        }
      } )()}
    </div>
  );
}

export default observer(certificateLinkPage)