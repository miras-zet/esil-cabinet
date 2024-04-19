import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import LoginForm from '../components/LoginForm';
import '../App.css';
import UploadService from '../services/UploadService';
import IFile from '../models/IFile';
import { observer } from 'mobx-react-lite';
import { Link, Navigate } from 'react-router-dom';
import moment from 'moment';
import ICategory from '../models/ICategory';
import IPltData from '../models/IPltData';
import UMKDMoodle from '../components/UMKDMoodle';
import KPINavbar from '../components/KPINavbar';
import { FaDownload, FaTrashAlt, FaUpload } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";


const KPIUpload: FC = () => {
  const [ activity, setActivity ] = useState<string>('notchosen');
  const [ info, setInfo] = useState<string>('');
  const [ currentFile, setCurrentFile ] = useState<File>();
  const [ message, setMessage ] = useState<string>("");
  const [ messagecolor, setMessageColor ] = useState<string>("red");
  const [ fileInfos, setFileInfos ] = useState<Array<IFile>>([]);
  const [ pltData, setPltData ] = useState<Array<IPltData>>([]);
  const [ categoryInfos, setCategoryInfos ] = useState<Array<ICategory>>([]);
  const { store } = useContext(Context);

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

  // const help = () => {
  //   alert('Выберите показатель из списка, затем выберите файл. Затем нажмите \"Отправить файл\". Загружаемый файл должен быть формата .pdf, размер файла не должен превышать 10 МБ.');
  // };
  const featureNotReadyNotif = () => {
    alert('Функция в разработке');
  }
  const upload = () => {
    if (activity == 'notchosen') setMessage("Выберите показатель");
    else {
      if (localStorage.getItem('categoryid') == '1' && info == '') setMessage("Введите количество студентов");
      else {
        // undecided if confirmation is necessary
        // ...
        // i decided it's necessary for people who like to spam the button
        if (confirm("Вы уверены, что хотите загрузить файл \"" + currentFile.name + "\"?") == true) {
          //document.getElementById('extradatainput').value='';
          // cant clear input field hmmmmm
          let activityid = 1;
          if (!currentFile) return;
          activityid = parseInt(activity);
          UploadService.upload(currentFile, activityid, info)
            .then((response) => {
              setMessage(response.data.message);
              if (response.data.message === "Файл был загружен") {
                setMessageColor("#2ecc71");
              } else {
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
    if (confirm('Вы уверены, что хотите удалить файл?')) {
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
        });
    }

  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
    UploadService.getFiles().then((response) => {
      setFileInfos(response.data);
    });
    UploadService.getCategories().then((response) => {
      setCategoryInfos(response.data);
    });
    UploadService.getPlatonusData().then((response) => {
      setPltData(response.data);
    });

  }, []);

  if (store.isLoading) {
    return <div>Loading ...</div>
  }

  const listFilesItems = fileInfos.map((element) =>
    <tr key={element.id}>
      <td>{element.name}</td>
      <td>{moment(element.upload_date).format("DD.MM.YYYY")}</td>
      <td>{element.extradata1}</td>
      <td> +{element.name!='Набор абитуриентов' ? element.primaryscore: (element.primaryscore*parseInt(element.extradata1)<=50? element.primaryscore*parseInt(element.extradata1):50)}</td>
      <td style={{width:'150px'}}>&nbsp;&nbsp;<button className="backbutton" onClick={() => featureNotReadyNotif}><FaDownload/></button>&nbsp;&nbsp;<button className="redbutton" onClick={() => deleteF(element.filename)}><FaTrashAlt /></button></td>
    </tr>
  );

  const listCategoryItems = categoryInfos.map((element) =>
    <option key={element.id} value={element.id}>{element.name}</option>
  );

  const pltDataTable = pltData.map((element) =>
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
  if (!store.isAuth) {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
  const role = localStorage.getItem('role');
  const categoryid = localStorage.getItem('categoryid');
  if (role === 'plt_tutor') return (<div>
    <KPINavbar/>
    <br/><br/><br/><br/><br/><br/>
    <Link to="/kpi"><button className="backbutton"><TiArrowBack style={{verticalAlign:'middle'}}/> Вернуться назад</button></Link>
    <br /><br />
    {(localStorage.getItem('categoryid') == '3') ? (<div className="card mt-3">
      <center><UMKDMoodle/></center>
    </div>) : ''}
    <br />
    <select className='btnNeutral' style={{ backgroundColor: 'silver', color: 'DimGray' }} name="categories" id="cat" onChange={event => setActivity(event.target.value)}>
      <option value="notchosen">Выберите показатель...</option>
      {listCategoryItems}
    </select>
    <br /><br /><br />
    {categoryid != '1' ?
      <div>
        Информация: название, год выдачи документа (обязательно), ...:
        <br /><input className='btnNeutral' style={{ width: '400px', fontSize: '14px', backgroundColor: 'silver', color: 'DimGray' }} id='extradatainput' type='text' onChange={event => setInfo(event.target.value)} minLength={3} maxLength={200}></input>
      </div> :
      <div>
        Количество приведенных Вами абитуриентов:
        <br /><input className='btnNeutral' style={{ width: '60px', fontSize: '14px', backgroundColor: 'silver', color: 'Black' }} id='extradatainput' type='number' onChange={event => setInfo(event.target.value)} maxLength={5}></input>
      </div>}
      {categoryid != '1' ?
      <div>
      </div> :
      <div>
        Максимальный возможный балл: +50
      </div>}
    <br /><h5>Документы должны быть не старше 5 лет</h5><br />
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
          Отправить файл <FaUpload />
        </button>
        <br /><br />
        {/* <a onClick={help} style={{ fontSize: "14px" }}>Помощь</a> */} 

      </div>
    </div>
    {message && (
      <div >
        <br />
        <h4 style={{ color: messagecolor }}>{message}</h4>
      </div>
    )}
    <br /><br />
    {listFilesItems.length > 0 ? (<div className="card mt-3">
      <div className="card-header"><h3>Список загруженных документов</h3></div><br />
      <center><table style={{ textAlign: "center" }}><tbody>
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
    </div>) : ''}
    <br /> 
    {(pltDataTable.length > 0 && localStorage.getItem('categoryid') == '2') ? (<div className="card mt-3">
      <div className="card-header"><h3>Ваши публикации в Platonus</h3></div>
      <center>{pltDataTable}</center>
    </div>) : ''}

  </div>)
  else {
    return <Navigate to="/"/>
  }
}

export default observer(KPIUpload)

