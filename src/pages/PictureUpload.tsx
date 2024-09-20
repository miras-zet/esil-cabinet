import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import '../App.css';
import UploadService from '../services/UploadService';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import KPINavbar from '../components/KPINavbar';
import { FaUpload } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
//import axios from 'axios';
//import config from "../http/config.json";

const PictureUpload: FC = () => {
  const [currentFile, setCurrentFile] = useState<File>();
  const [message, setMessage] = useState<string>("");
  const [messagecolor, setMessageColor] = useState<string>("red");
  // const [ fileInfos, setFileInfos ] = useState<Array<IFile>>([]);
  const { store } = useContext(Context);

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setCurrentFile(selectedFiles?.[0]);
  };
  const upload = () => {
    
      //document.getElementById('extradatainput').value='';
      if (!currentFile) return;
      UploadService.uploadPhoto(currentFile)
        .then((response) => {
          setMessage(response.data.message);
          if (response.data.message === "Фото было загружено") {
            setMessageColor("#2ecc71");
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
          setCurrentFile(undefined);
        });
  };
  // const handleFileDownload = async (fileId: number, filename: string) => {
  //   try {
  //     const response = await axios.get(`${config.API_URL}/upload/download/${fileId}`, {
  //       responseType: 'blob',
  //     });
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', filename);
  //     document.body.appendChild(link);
  //     link.click();
  //     window.URL.revokeObjectURL(url);
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error('Error downloading file:', error);
  //     alert('Ошибка загрузки файла.');
  //   }
  // };
  // const deleteF = async (filename: string) => {
  //   if (confirm('Вы уверены, что хотите удалить файл?')) {
  //     UploadService.deleteFile(filename, localStorage.getItem('user_id'))
  //       .then((response) => {
  //         setMessage(response.data.message);
  //         return UploadService.getFiles();
  //       })
  //       .then((files) => {
  //         setFileInfos(files.data);
  //       })
  //       .catch((err) => {
  //         if (err.response && err.response.data && err.response.data.message) {
  //           setMessage(err.response.data.message);
  //         } else {
  //           setMessage("Ошибка удаления");
  //         }
  //       });
  //   }

  // };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
    // UploadService.getFiles().then((response) => {
    //   setFileInfos(response.data);
    // });

  }, []);

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
  if (role === 'plt_student')
    return (<div>
      <KPINavbar />
      <br /><br /><br /><br /><br /><br />
      <Link to="/"><button className="backbutton"><TiArrowBack style={{ verticalAlign: 'middle' }} /> Вернуться назад</button></Link>
      <br /><br />
      <br /><br /><br />
      <div className="row">
        <div className="col-8">
          <label className="btnNeutral" style={{ backgroundColor: 'silver', color: 'DimGray' }} >
            {currentFile ? `Выбран файл:  ${currentFile.name}` : 'Выберите файл...'}
            <input type="file" hidden onChange={selectFile} style={{ backgroundColor: 'silver', color: 'DimGray' }} />
          </label>
        </div>
        <br />
        <div className="col-4">
          <button className='navbarbutton'
            disabled={!currentFile}
            onClick={upload}>
            Отправить фото <FaUpload />
          </button>
          <br /><br />
        </div>
      </div>
      {message && (
        <div >
          <br />
          <h4 style={{ color: messagecolor }}>{message}</h4>
        </div>
      )}
      <br /><br />
    </div>)
  else {
    return <Navigate to="/" />
  }
}

export default observer(PictureUpload)

