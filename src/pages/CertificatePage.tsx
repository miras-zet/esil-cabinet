import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { CertResponse } from '../models/response/CertResponse';
import { API_URL } from '../http';
import { Prilozhenie2 } from './tamplate/Prilozhenie2';
import { Prilozhenie6 } from './tamplate/Prilozhenie6';
import { Prilozhenie4 } from './tamplate/Prilozhenie4';
import { Students } from './tamplate/Students';
import { Prilozhenie31 } from './tamplate/Prilozhenie31';
import { Prilozhenie29 } from './tamplate/Prilozhenie29';
import { StudentsEn } from './tamplate/StudentsEn';






const certificatePage:FC = () => {  
  //const certid = localStorage.getItem('certificat');   

  //const data = fetch(`${API_URL}/cert/${certid}`).then((response) => response.json()).then((data:CertResponse)=>setCertificate(data));
  //const {store} = useContext(Context);
  const [certificate, setCertificate] = useState<CertResponse>({} as CertResponse);
  //const [certid, setCertid] = useState<number>(store.certificat.id);
  //const [certificat, setcertificat] = useState([]);

  function back() {
    window.location.href="/";
  }
  useEffect(() => {
    const certid = localStorage.getItem('certificat'); 
    // console.log(certid);
    //fetch(`${API_URL}/cert/${certid}`).then((response) => response.json()).then((data:CertResponse)=>setCertificate(data));
    
    const fetch_data = async () => {
      //console.log(`${API_URL}/cert/${certid}`);
      const resp = await fetch(`${API_URL}/cert/${certid}`);
      setCertificate(await resp.json());
    };
    
    fetch_data();
  },[]);

  if(!certificate.cert_type){
    return <div>Loading ...</div>
  }

  return (
    <div>
      <button onClick={back}>Назад</button>
        {(() => {
        switch(certificate.cert_type) {
            case 1:
              return  Prilozhenie2(certificate);
            case 2:
              return  Prilozhenie4(certificate);
            case 3:
              return  Prilozhenie6(certificate);
            case 4:
              return  Prilozhenie29(certificate);
            case 5:
              return  Prilozhenie31(certificate);
            case 6:
              if (certificate.language === 'en')
                return  StudentsEn(certificate);
              else 
                return  Students(certificate);
          default:
            return  Students(certificate);
        }
      } )()}
    </div>
  );
}

export default observer(certificatePage)