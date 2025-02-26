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

const PictureUpload: FC = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [message, setMessage] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [opacity, setOpacity] = useState<number>(0);
  const [buttonsdisabled, setButtonsDisabled] = useState<boolean>(false);
  const [messagecolor, setMessageColor] = useState<string>("red");
  // const [ fileInfos, setFileInfos ] = useState<Array<IFile>>([]);
  const { store } = useContext(Context);
  let eligibility = localStorage.getItem('eligibility');
  localStorage.setItem('showcheckmark', 'false');
  useEffect(() => {
    eligibility = localStorage.getItem('eligibility');
    UploadService.checkPhotoUploadEligibility().then((response) => {
      localStorage.setItem('eligibility', response.data);
    });

    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, []);
  const capture = useCallback(() => {
    setRemainingTime(3);
    setIsCapturing(true);
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(interval);
        }
        return prevTime - 1;
      });
    }, 1000);
    setTimeout(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      setIsCapturing(false);
    }, 3000);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };
  const dataURLtoFile = (dataUrl: string, filename: string): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        if (ctx) {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(img, 0, 0);
        }
        const mirroredDataUrl = canvas.toDataURL();
        const arr = mirroredDataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const file = new File([u8arr], filename, { type: mime });
        resolve(file);
      };
      img.onerror = (err) => reject(err);
    });
  };

  const upload = async () => {
    if (!imgSrc) return;
    const file = dataURLtoFile(imgSrc, 'photo.png');
    UploadService.uploadPhoto(await file, 'png')
      .then((response) => {
        setMessage(response.data.message);
        if (response.data.message === "Фото было загружено") {
          setMessageColor("#2ecc71");   
          setButtonsDisabled(true);
          setOpacity(1);
          alert('Фото успешно загружено');
          window.location.href = window.location.protocol + '//' + window.location.host + '/';
        } else {
          setMessageColor("red");
        }
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

  if (role === 'plt_student' || role === 'plt_tutor' || role === 'cit' || role === 'plt_employee' || role=='plt_foreign_student') {
    if (eligibility == 'true') {
      return (<div>
        <Link to="/"><button className="backbutton" style={{}}><TiArrowBack style={{ verticalAlign: 'middle' }} /> Вернуться назад</button></Link><br /><br />
        {imgSrc ? (
          <img src={imgSrc} alt="webcam" />
        ) : (<div className="webcam-container">
          <img src="allow_camera.png" alt="Разрешите доступ к камере" className="background-image" />
          <Webcam
            className="webcam-element"
            height={480}
            width={640}
            ref={webcamRef}
            mirrored={true}
            screenshotFormat="image/png"
            screenshotQuality={1}
          />
          {remainingTime != 0 ? <div className="countdown-overlay">{remainingTime}</div> : ''}
          <div className="green-tick-overlay" style={{ opacity: opacity }}><img src='green-check-mark.png' /></div>
        </div>
        )}
        {message ? (
          <h3 style={{ color: messagecolor }}>{message}</h3>
        ) : <h3></h3>}
        {!buttonsdisabled ? imgSrc ? (
          <div><br /><button id='graybutton' disabled={buttonsdisabled} onClick={retake}><IoCameraReverse /> Сфотографировать заново</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className='greenbutton' onClick={() => upload()}>Отправить фото</button></div>
        ) : (
          <div><button className='greenbutton' style={{ width: '250px', height: '50px', fontSize: '15pt' }} disabled={buttonsdisabled || isCapturing} onClick={capture}><FaCamera />&nbsp; Сделать фото</button></div>
        ) : <div><br /><button style={{ width: '250px', height: '50px' }} id='graybutton' onClick={() => store.logout()}>Выйти</button></div>}
        <br />
        <div className="row">
          <p>Страница запросит у браузера разрешение на использование камеры (обычно в левом верхнем углу), нажмите "Разрешить". Если изображение не появляется после разрешения, перезагрузите страницу</p>
          <p>Убедитесь, что Ваше лицо расположено прямо, видно крупным планом на изображении, без головного убора, наушников, прочих аксессуаров. После нажатия кнопки "Сфотографировать" запустится таймер 3 секунды. Фото можно переснять</p>
        </div>
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
