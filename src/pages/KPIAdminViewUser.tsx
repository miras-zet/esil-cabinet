import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import '../App.css';
import UploadService from '../services/UploadService';
import IFile from '../models/IFile';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import moment from 'moment';


const KPIAdminViewUser:FC = () => {  
      
    const [message, setMessage] = useState<string>("");
    const [fileInfos, setFileInfos] = useState<Array<IFile>>([]);
    const {store} = useContext(Context);  
    
      // const download = async (filename: string) => {
      //   UploadService.downloadFile(filename)
      //     .then((response) => {
      //       setMessage(response.data.message);
      //       return UploadService.getFiles();
      //     })
      //     .then((files) => {
      //       setFileInfos(files.data);
      //     })
      //     .catch((err) => {
      //       if (err.response && err.response.data && err.response.data.message) {
      //         setMessage(err.response.data.message);
      //       } else {
      //         setMessage("Ошибка загрузки");
      //       }
      //     });
      //     return 'done';
      // };
      const deleteF = async (filename: string) => {
        if(confirm('Вы уверены, что хотите удалить файл?')){
        UploadService.deleteFile(filename, localStorage.getItem('user_id_view'))
          .then((response) => {
            setMessage(response.data.message);
            return UploadService.getFilesForUser();
          })
          .then((files) => {
            setFileInfos(files.data);
          })
          .catch((err) => {
            if (err.response && err.response.data && err.response.data.message) {
              setMessage(err.response.data.message);
            } else {
              setMessage("Ошибка удаления");
            }
          });
        }

      };
      const getfiles = () =>{
        UploadService.getFilesForUser().then((response) => {
            setFileInfos(response.data);
        }); 

      }
 useEffect(() => {
    if (localStorage.getItem('token')){
      store.checkAuth()
    }
    getfiles();
  },[]);

  if (store.isLoading){
    return <div>Loading ...</div>
  }
  const featureNotReadyNotif =() =>{
    alert('Функция в разработке');
  }
  const listFilesItems = fileInfos.map((element) =>  
    <tr key={element.id}>
        <td>{element.name}</td> 
        <td>{moment(element.upload_date).format("DD.MM.YYYY")}</td>
        <td>{element.extradata1}</td> 
        <td> +{element.primaryscore}</td>
        <td>&nbsp;&nbsp;<button onClick={() =>featureNotReadyNotif}>Скачать</button> | <button onClick={() =>deleteF(element.filename)}>Удалить</button></td>
    </tr>
  );

  if (!store.isAuth) {
    return (
        <div>
            <LoginForm/>            
        </div>
    );
  } 
  

  return ( <div>
    {(() => {
        //getfiles();
    return <div>
        <Link to="/kpiadmin"><input className="btn btn-success btn-sm" type="button" value="Вернуться назад"></input></Link>
        <br/><br/>
        <div className="card mt-3" onLoad={getfiles}>
            <div>{message}</div>
            <h3><div>Список загруженных документов</div><br/></h3>
            <h4><div>({localStorage.getItem('fio_view')})</div><br/></h4>
            <center><table style={{textAlign: "center"}}><tbody>
              <tr>
                  <th>Показатель</th>
                  <th>Дата загрузки</th>
                  <th>&nbsp;&nbsp;Информация</th>
                  <th>&nbsp;&nbsp;Баллы</th>
                  <th>&nbsp;&nbsp;Действия</th>
              </tr>
              {listFilesItems}

            </tbody>
            </table>
            <br></br>
            В этой таблице НЕ отображаются данные из Platonus.
            </center>
          </div>
        </div>
      } )()}
  </div>);
}

export default observer(KPIAdminViewUser)

