import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import '../App.css';
import UploadService from '../services/UploadService';
import IFile from '../models/IFile';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import IPltData from '../models/IPltData';


const KPIAdminViewUser:FC = () => {  
      
    const [message, setMessage] = useState<string>("");
    const [fileInfos, setFileInfos] = useState<Array<IFile>>([]);
    const {store} = useContext(Context);  
    const [pltData, setPltData] = useState<Array<IPltData>>([]);
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
        UploadService.getPlatonusDataForUser().then((response) => {
          setPltData(response.data);
      }); 
      }
      const pltDataTable = pltData.map((element)=>
      <div>
        <p>Кол-во международных статей: <b>{element.international_count}</b></p>
        <p>Кол-во статей ККСОН: <b>{element.kkson_count}</b></p>
        <p>Кол-во статей Scopus: <b>{element.scopus_count}</b></p>
        <p>Кол-во статей Web of Science: <b>{element.wos_count}</b></p>
        <p>Кол-во монографий: <b>{element.monograph_count}</b></p>
        <p>Кол-во участий в научно-исследовательских работах (исполнитель): <b>{element.nirs_count}</b></p>
        <p>Кол-во участий в научно-исследовательских работах (руководитель): <b>{element.nirs_count_manager}</b></p>
        <p>Кол-во патентов: <b>{element.tia_count}</b></p>
        <p>Индекс Хирша (Scopus): <b>{element.h_index_scopus}</b></p>
        <p>Индекс Хирша (Web of Science): <b>{element.h_index_wos}</b></p>
      </div>
    );
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
    <td> +{element.name!='Набор абитуриентов' ? element.primaryscore: (element.primaryscore*parseInt(element.extradata1)<=50? element.primaryscore*parseInt(element.extradata1):50)}</td>
    <td>&nbsp;&nbsp;<button onClick={() => featureNotReadyNotif}>Скачать</button> | <button onClick={() => deleteF(element.filename)}>Удалить</button></td>
  </tr>
);

  if (!store.isAuth) {
    return (
        <div>
            <LoginForm/>            
        </div>
    );
  } 
  const redirectDecider = () => {
    if(localStorage.getItem('currentlyviewing')==='topten') {
      window.location.href=window.location.protocol + '//' + window.location.host +'/kpitopten';
    }
    else if (localStorage.getItem('currentlyviewing')==='cafedratutors'){
      window.location.href=window.location.protocol + '//' + window.location.host +'/kpiadmin';
    }
  }

  return ( <div>
    {(() => {
       const role = localStorage.getItem('role');
       if(role==='plt_kpiadmin') return <div>
        <button onClick={redirectDecider}>Вернуться назад</button>
        <br/><br/>
        <div className="card mt-3" onLoad={getfiles}>
            <div>{message}</div>
            <div className="card-header"><h3>Список загруженных документов</h3></div>
            <h4><div>({localStorage.getItem('fio_view')})</div><br/></h4>
            {listFilesItems.length>0 ? (<div className="card mt-3">
            <table style={{textAlign: "center"}}><tbody>
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
            </div>):''}
            <br></br>
            {pltDataTable.length>0 ? (<div className="card mt-3">
            <div className="card-header"><h3>Публикации в Platonus</h3></div>
            <center>{pltDataTable}</center>
          </div>):''}
          </div>
        </div>
        else{
          return <div><button onClick={() => store.logout()}>Назад</button>  
          <h4>Нет доступа к странице</h4></div>
        }
      } )()}
  </div>);
}

export default observer(KPIAdminViewUser)

