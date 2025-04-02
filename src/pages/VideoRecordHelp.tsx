import { FC, useContext, useEffect } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import '../App.css';
import KPINavbar from '../components/KPINavbar';
import { TiArrowBack } from 'react-icons/ti';
import api from '../http-common';
import configFile from "../http/config.json";
import { FaDownload } from 'react-icons/fa';


const TutorPublicationsInfoContainer: FC = () => {
    const { store } = useContext(Context);
    
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

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

    async function handleFileDownload(argument:string){
        let response;
        let extension = '';
        /*
        const params = {
        cafedraid: localStorage.getItem('cafedramanager'),
    }
    return api.get(`/management/getcourseradocscafedra`,{params});
        */
        try {
            switch(argument){
                case 'ustanovka': {
                    extension = 'pptx';
                    response = await api.get(`${configFile.API_URL}/upload/downloadrecording/${argument}`, {
                        responseType: 'blob',
                    });
                    
                } break;
                case 'zapis': {
                    extension = 'pptx';
                    response = await api.get(`${configFile.API_URL}/upload/downloadrecording/${argument}`, {
                        responseType: 'blob',
                    });
                } break;
                case 'icecream': {
                    extension = 'zip';
                    response = await api.get(`${configFile.API_URL}/upload/downloadrecording/${argument}`, {
                        responseType: 'blob',
                    });
                } break;
                case 'shablon': {
                    extension = 'potx';
                    response = await api.get(`${configFile.API_URL}/upload/downloadrecording/${argument}`, {
                        responseType: 'blob',
                    });
                } break;
                case 'logo': {
                    extension = 'png';
                    response = await api.get(`${configFile.API_URL}/upload/downloadrecording/${argument}`, {
                        responseType: 'blob',
                    });   
                } break;
                default:{
                    alert('err');
                }
            }
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${argument}.${extension}`);
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        } catch (error) {
          console.error('Error downloading file:', error);
          alert('Ошибка загрузки файла.');
        }
      };
   
    return (
        <div>
            {(() => {
                const role = localStorage.getItem('role');
                if (role == 'plt_tutor') {
                    return <div style={{ textAlign: 'left', width: '1200px' }}>
                        <KPINavbar />
                        <br /><br /><br /><br /><br /><br /><br />
                        <Link to={"/ktu"}><button className="navbarbutton"><TiArrowBack style={{ verticalAlign: 'middle' }} /> Вернуться назад</button></Link> <br />
                        <h4>Инструкция по установке IceCream: <button className='backbutton' style={{ width: '40px', height: '40px' }} onClick={() => handleFileDownload('ustanovka')}><FaDownload style={{ width: '20px', height: '20px', position: 'absolute', marginLeft: '-10px', marginTop: '-10px' }} /></button></h4>         
                        <h4>Инструкция по записи видеолекций: <button className='backbutton' style={{ width: '40px', height: '40px' }} onClick={() => handleFileDownload('zapis')}><FaDownload style={{ width: '20px', height: '20px', position: 'absolute', marginLeft: '-10px', marginTop: '-10px' }} /></button></h4>     
                        <h4>Скачать программу: <button className='backbutton' style={{ width: '40px', height: '40px' }} onClick={() => handleFileDownload('icecream')}><FaDownload style={{ width: '20px', height: '20px', position: 'absolute', marginLeft: '-10px', marginTop: '-10px' }} /></button></h4>     
                        <h4>Скачать шаблон презентации: <button className='backbutton' style={{ width: '40px', height: '40px' }} onClick={() => handleFileDownload('shablon')}><FaDownload style={{ width: '20px', height: '20px', position: 'absolute', marginLeft: '-10px', marginTop: '-10px' }} /></button></h4>     
                        <h4>Скачать логотип университета: <button className='backbutton' style={{ width: '40px', height: '40px' }} onClick={() => handleFileDownload('logo')}><FaDownload style={{ width: '20px', height: '20px', position: 'absolute', marginLeft: '-10px', marginTop: '-10px' }} /></button></h4>     
                        <br/>
                        <h4><a target='_blank' href='https://drive.google.com/file/d/1RaUX58QWjdBhZq47AEi4xfzh7IzHHBJc/view?usp=drive_link'>Ссылка на видеоинструкцию №1</a></h4>
                        <h4><a target='_blank' href='https://drive.google.com/file/d/1fcSYvgs2eRfjorTZbpZxiA8RQlQhozIR/view?usp=drive_link'>Ссылка на видеоинструкцию №2</a></h4>
                    </div>
                }
                else {
                    return <Navigate to="/" />
                }
            })()}

        </div>
    );
}

export default observer(TutorPublicationsInfoContainer)