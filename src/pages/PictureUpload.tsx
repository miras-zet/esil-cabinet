import { FC, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import '../App.css';
import UploadService from '../services/UploadService';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import KPINavbar from '../components/KPINavbar';
import { FaCamera } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import Webcam from 'react-webcam';
import { IoCameraReverse } from "react-icons/io5";

//import axios from 'axios';
//import config from "../http/config.json";

const PictureUpload: FC = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [message, setMessage] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [buttonsdisabled, setButtonsDisabled] = useState<boolean>(false);
  const [messagecolor, setMessageColor] = useState<string>("red");
  // const [ fileInfos, setFileInfos ] = useState<Array<IFile>>([]);
  const { store } = useContext(Context);

  useEffect(() => {
    UploadService.checkPhotoUploadEligibility().then((response) => {
      localStorage.setItem('eligibility',response.data);
    });
    
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, []);
  //if(!localStorage.getItem('eligibility')) window.location.reload();
  const capture = useCallback(() => {
    setRemainingTime(5);
    setIsCapturing(true);
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(interval); // Clear interval when time reaches 0
        }
        return prevTime - 1;
      });
    }, 1000);
    setTimeout(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      setIsCapturing(false);
    }, 5000);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };
  const dataURLtoFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const upload = () => {
    if (!imgSrc) return;
    const file = dataURLtoFile(imgSrc, 'photo.png');
    UploadService.uploadPhoto(file, 'png')
      .then((response) => {
        setMessage(response.data.message);
        if (response.data.message === "Фото было загружено") {
          setMessageColor("#2ecc71");
          setButtonsDisabled(true); 
        } else {
          setMessageColor("red");
        }
        return UploadService.getFiles();
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Ошибка загрузки");
        }
      });
  };



  if (store.isLoading) {
    return <div>Loading ...</div>
  }



  if (!store.isAuth) {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
  const role = localStorage.getItem('role');
  const eligibility = localStorage.getItem('eligibility');
  if (role === 'plt_student' || role === 'plt_tutor' || role === 'cit') {
    if (eligibility=='true') {
      return (<div>
        <KPINavbar />
        <br /><br /><br /><br /><br /><br />
        <Link to="/"><button className="backbutton"><TiArrowBack style={{ verticalAlign: 'middle' }} /> Вернуться назад</button></Link>
        <div className="row"><br />
          <p>Страница запросит у браузера разрешение на использование камеры (обычно в левом верхнем углу), нажмите "Разрешить"</p>
          <p>Если изображение не появляется после разрешения, перезагрузите страницу</p>
          <p>Убедитесь, что Ваше лицо расположено прямо, видно крупным планом на изображении, без головного убора, наушников, прочих аксессуаров</p>
          <p>После нажатия кнопки "Сфотографировать" запустится таймер 5 секунд. Фото можно переснять</p>
        </div>
        {imgSrc ? (
          <img src={imgSrc} alt="webcam" />
        ) : (<div style={{ alignItems: 'center', alignContent: 'center', textAlign: 'center' }}><center><h1 style={{ textAlign: 'center', position: 'absolute', fontSize: '100pt', color: 'white', marginLeft: '490px', WebkitTextStrokeColor:'black', WebkitTextStrokeWidth:'2px' }}>{remainingTime != 0 ? remainingTime : ''}</h1></center>
          <Webcam
            height={500}
            width={500}
            ref={webcamRef}
            screenshotFormat="image/png"
            screenshotQuality={1}

          /></div>
        )}{!buttonsdisabled ? imgSrc ? (
          <div><br /><button id='graybutton' disabled={buttonsdisabled} onClick={retake}><IoCameraReverse /> Сфотографировать заново</button>&nbsp;<button className='greenbutton' onClick={() => upload()}>Отправить фото</button></div>
        ) : (
          <div><button className='greenbutton' disabled={buttonsdisabled || isCapturing} onClick={capture}><FaCamera />&nbsp; Сделать фото</button></div>
        ) : <div><br /><button style={{ width: '250px', height: '50px' }} id='graybutton' onClick={() => store.logout()}>Выйти</button></div>}
        { }
        <br />
        {message && (
          <h4 style={{ color: messagecolor }}>{message}</h4>
        )}
        <br /><br />
      </div>)
    }
    else {
      return (<div>
        <KPINavbar />
        <br /><br /><br /><br /><br /><br />
        <Link to="/"><button className="backbutton"><TiArrowBack style={{ verticalAlign: 'middle' }} /> Вернуться назад</button></Link>
        <div className="row"><br />
          <h3>Ваше фото уже есть в системе</h3>
          <h4>Обратитесь в IT отдел, если нужно удалить фото</h4>
        </div>

      </div>)
    }
  }
  else {
    return <Navigate to="/" />
  }

}

export default observer(PictureUpload)

