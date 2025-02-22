import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { CertResponse } from '../models/response/CertResponse';
import { API_URL } from '../http';
import { Prilozhenie2 } from './template/Prilozhenie2';
//import { Prilozhenie6 } from './tamplate/Prilozhenie6';
import { Prilozhenie4 } from './template/Prilozhenie4';
import { Students } from './template/Students';
//import { Prilozhenie31 } from './tamplate/Prilozhenie31';
import { Prilozhenie29 } from './template/Prilozhenie29';
import { Prilozhenie2New } from './template/Prilozhenie2New';
import { Prilozhenie2NewKaz } from './template/Prilozhenie2NewKaz';
import { Prilozhenie29CertifEn } from './template/Prilozhenie29CertifEn';
import { Prilozhenie29CertifKz } from './template/Prilozhenie29CertifKz';
import { Prilozhenie29Certif } from './template/Prilozhenie29Certif';
import { useParams } from 'react-router-dom';
import { StudentsEn } from './template/StudentsEn';
import { StudentsKz } from './template/StudentsKz';
import { Prilozhenie29Kz } from './template/Prilozhenie29Kz';






const certificateLinkPage: FC = () => {
  const [certificate, setCertificate] = useState<CertResponse>({} as CertResponse);
  const [reason, setReason] = useState();
  const { id } = useParams();


  useEffect(() => {
    //console.log(id);
    fetch(`${API_URL}/cert/${id}`).then((response) => response.json()).then((data: CertResponse) => setCertificate(data)).catch((reason) => setReason(reason));
    //console.log(reason);
  }, [])

  if (reason) {
    return <div>Сертификат не найден</div>
  }

  return (
    <div>
      {(() => {
        switch (certificate.cert_type) {
          case 1:
            return Prilozhenie2(certificate);
          case 2:
            return Prilozhenie4(certificate);
          // case 3:
          //   return  Prilozhenie6(certificate);
          case 3:
            if (certificate.language === 'en')
              return Prilozhenie29(certificate);
            else if (certificate.language === 'kz')
              return Prilozhenie29Kz(certificate);
            else
              return Prilozhenie29(certificate);
          // case 5:
          //   return  Prilozhenie31(certificate);
          case 4:
            if (certificate.language === 'en')
              return Prilozhenie29CertifEn(certificate);
            else if (certificate.language === 'kz')
              return Prilozhenie29CertifKz(certificate);
            else
              return Prilozhenie29Certif(certificate);
          case 5:
            if (certificate.language === 'en')
              return StudentsEn(certificate);
            else if (certificate.language === 'kz')
              return StudentsKz(certificate);
            else
              return Students(certificate);
          case 6:
            if (certificate.language === 'en')
              return Prilozhenie2New(certificate);
            else if (certificate.language === 'kz')
              return Prilozhenie2NewKaz(certificate);
            else
              return Prilozhenie2New(certificate);
          default:
            return Students(certificate);
        }
      })()}
    </div>
  );
}

export default observer(certificateLinkPage)