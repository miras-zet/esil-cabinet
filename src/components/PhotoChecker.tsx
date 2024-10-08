import { FC, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import UploadService from "../services/UploadService";
import { Link } from "react-router-dom";
import { LuScanFace } from "react-icons/lu";
import { TiTick } from "react-icons/ti";
import config from "../http/version.json";

export const buildVer = config.buildVer;
const PhotoChecker: FC = () => {
  const [eligibility, setEligibility] = useState<string>('');

  useEffect(() => {
    UploadService.checkPhotoUploadEligibility().then((response) => {
      setEligibility(response.data);
      localStorage.setItem('eligibility',response.data);
    });
  }, []);
  const role = localStorage.getItem('role');
  if(role=='plt_tutor'){
    if(config.allowTutorPhotos=='true'){
      if (eligibility=='true' || localStorage.getItem('eligibility')=='true') return (
        <Link to="/takephoto"><button className='navbarbutton'><LuScanFace style={{ verticalAlign: 'middle' }} /> Сфотографироваться</button></Link> 
        );
      else if (eligibility=='false' || localStorage.getItem('eligibility')=='false') {
        return (<>
        Фотография загружена. <TiTick style={{color:'green'}}/></>
        );
      }
    }
  }
  else if (role=='plt_student' || role=='plt_foreign_student'){
    if(config.allowStudentPhotos=='true'){
      if (eligibility=='true' || localStorage.getItem('eligibility')=='true') return (
        <Link to="/takephoto"><button className='navbarbutton'><LuScanFace style={{ verticalAlign: 'middle' }} /> Сфотографироваться</button></Link> 
        );
      else if (eligibility=='false' || localStorage.getItem('eligibility')=='false') {
        return (<>
        Фотография загружена. <TiTick style={{color:'green'}}/></>
        );
      }
    }
    else{
      return (<>
        Функция временно недоступна.</>
      );
    }
  }
  else if (role=='plt_employee'){
    if(config.allowEmployeePhotos=='true'){
      if (eligibility=='true' || localStorage.getItem('eligibility')=='true') return (
        <Link to="/takephoto"><button className='navbarbutton'><LuScanFace style={{ verticalAlign: 'middle' }} /> Сфотографироваться</button></Link> 
        );
      else if (eligibility=='false' || localStorage.getItem('eligibility')=='false') {
        return (<>
        Фотография загружена. <TiTick style={{color:'green'}}/></>
        );
      }
    }
    else{
      return (<>
        Функция временно недоступна.</>
      );
    }
  }
};

export default observer(PhotoChecker);