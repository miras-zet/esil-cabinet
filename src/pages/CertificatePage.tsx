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
import { StudentsEn } from './template/StudentsEn';
import { StudentsKz } from './template/StudentsKz';
import { Prilozhenie29Kz } from './template/Prilozhenie29Kz';
import { Prilozhenie29CertifEn } from './template/Prilozhenie29CertifEn';
import { Prilozhenie29CertifKz } from './template/Prilozhenie29CertifKz';
import { Prilozhenie29Certif } from './template/Prilozhenie29Certif';
import { Prilozhenie2New } from './template/Prilozhenie2New';
import { Prilozhenie2NewKaz } from './template/Prilozhenie2NewKaz';
import InfoService from '../services/InfoService';





const certificatePage: FC = () => {
  //const certid = localStorage.getItem('certificat');   

  //const data = fetch(`${API_URL}/cert/${certid}`).then((response) => response.json()).then((data:CertResponse)=>setCertificate(data));
  //const {store} = useContext(Context);
  const [certificate, setCertificate] = useState<CertResponse>({} as CertResponse);
  //const [certid, setCertid] = useState<number>(store.certificat.id);
  //const [certificat, setcertificat] = useState([]);

  function back() {
    window.location.href = "/";
  }
  useEffect(() => {
    const certid = localStorage.getItem('certificat');
    // console.log(certid);
    //fetch(`${API_URL}/cert/${certid}`).then((response) => response.json()).then((data:CertResponse)=>setCertificate(data));
    
    InfoService.getExtraDataForCertificate().then((response) => {
      //setExtradata(response.data);
      localStorage.setItem('groupname',response.data);
      //localStorage.setItem('groupname',extradata);
  }).catch((err) => {
      console.log(err);
  });
    const fetch_data = async () => {
      //console.log(`${API_URL}/cert/${certid}`);
      const resp = await fetch(`${API_URL}/cert/${certid}`);
      setCertificate(await resp.json());
    };

    fetch_data();
  }, []);

  if (!certificate.cert_type) {
    return <div>Loading ...</div>
  }

  return (
    <div>
      <button className='navbarbutton' onClick={back}>Назад</button><br />
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

export default observer(certificatePage)