import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import '../App.css';
import UploadService from '../services/UploadService';
import IFile from '../models/IFile';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ICategory from '../models/ICategory';


const KPIUpload:FC = () => {  
    const [activity, setActivity] = useState<string>('notchosen');
    const [info, setInfo] = useState<string>('');
    const [currentFile, setCurrentFile] = useState<File>();
    const [message, setMessage] = useState<string>("");
    const [messagecolor, setMessageColor] = useState<string>("red");
    const [fileInfos, setFileInfos] = useState<Array<IFile>>([]);
    const [categoryInfos, setCategoryInfos] = useState<Array<ICategory>>([]);
    const {store} = useContext(Context);  

    const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      const selectedFiles = files as FileList;
      setCurrentFile(selectedFiles?.[0]);
    };
    // const clearInput = () => {
    //   try{
    //     this.setState({ inputVal: "" });
    //   }
    //   catch{

    //   }
    // }
    // const onInputChange = (e) => {
    //   this.setState({ inputVal: e.target.value });
    // }
    const help = () => {
      alert('Выберите показатель из списка, нажмите \"Browse...\" и выберите файл на компьютере. Затем нажмите \"Отправить файл\". Загружаемый файл должен быть формата .pdf, размер файла не должен превышать 10 МБ.');
    };
    const featureNotReadyNotif =() =>{
      alert('Функция в разработке');
    }
    const upload = () => {
      if(activity=='notchosen') setMessage("Выберите показатель");
        else{
          // undecided if confirmation is necessary
          // ...
          // i decided it's necessary for people who like to spam the button
          if (confirm("Вы уверены, что хотите загрузить файл \""+currentFile.name+"\"?") == true) {
          //document.getElementById('extradatainput').value='';
          // cant clear input field hmmmmm
          let activityid=1;
          if (!currentFile) return;
          activityid = parseInt(activity); 
          UploadService.upload(currentFile, activityid, info)
            .then((response) => {
              setMessage(response.data.message);
              if(response.data.message==="Файл был загружен"){
                setMessageColor("#2ecc71");
              }else{
                setMessageColor("red");
              }
              return UploadService.getFiles();
            })
            .then((files) => {
              setFileInfos(files.data);
            })
            .catch((err) => {
              if (err.response && err.response.data && err.response.data.message) {
                setMessage(err.response.data.message);
              } else {
                setMessage("Ошибка загрузки");
              }
            
              setCurrentFile(undefined);
            });
        }
      }
      };
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
    
      //       setCurrentFile(undefined);
      //     });
      //     return 'done';
      // };
      const deleteF = async (filename: string) => {
        if(confirm('Вы уверены, что хотите удалить файл?')){
        UploadService.deleteFile(filename, localStorage.getItem('user_id'))
          .then((response) => {
            setMessage(response.data.message);
            return UploadService.getFiles();
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
    
            setCurrentFile(undefined);
          });
        }

      };
 useEffect(() => {
    if (localStorage.getItem('token')){
      store.checkAuth()
    }
    UploadService.getFiles().then((response) => {
        setFileInfos(response.data);
    }); 
    UploadService.getCategories().then((response) => {
        setCategoryInfos(response.data);
    });   
    
  },[]);

  if (store.isLoading){
    return <div>Loading ...</div>
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

  const listCategoryItems = categoryInfos.map((element)=>
    <option key={element.id} value={element.id}>{element.name}</option>
  );
  if (!store.isAuth) {
    return (
        <div>
            <LoginForm/>            
        </div>
    );
  } 

  return ( <div>
    <Link to="/kpi"><input className="btn btn-success btn-sm" type="button" value="Вернуться назад"></input></Link>
    <br/><br/><br/><br/><br/><br/>
    <select name="categories" id="cat" onChange={event => setActivity(event.target.value)}>
        <option value="notchosen">Выберите показатель...</option>
        {listCategoryItems}
    </select>
    <br/><br/>
    <input style={{width:'400px'}} placeholder={'Дополнительная информация (название, год выдачи, ...)'} id='extradatainput' type='text' onChange={event => setInfo(event.target.value)} minLength={3} maxLength={100}></input>
    <br/><br/>
    <div className="row">
      <div className="col-8">
        <label className="btn btn-default p-0">
          <input type="file" onChange={selectFile} />
        </label>
      </div>
        <br/>
      <div className="col-4">
        <button
          className="btn btn-success btn-sm"
          disabled={!currentFile}
          onClick={upload}>
          Отправить файл
        </button>
        <br/>
        <a onClick={help} style={{fontSize:"13px"}}>Помощь</a>
      </div>
    </div>
    {message && (
      <div >
        <br/>
        <h4 style={{color: messagecolor}}>{message}</h4>
      </div>
    )}
    <br/><br/><br/>
    <div className="card mt-3">
        <div className="card-header">Список загруженных документов</div><br/>
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
        </table></center>
      </div>
  </div>)
}

export default observer(KPIUpload)

