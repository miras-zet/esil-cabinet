import { FC, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import moment from "moment";
import IDormRequest from "../models/IDormRequest";
import UploadService from "../services/UploadService";
import { FaHouse } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";

const StudentDormRequest: FC = () => {
  const [dormData, setDormData] = useState<Array<IDormRequest>>([]);
  useEffect(() => {
    UploadService.getDormRequestForUser().then((response) => {
      setDormData(response.data);
    });

  }, []);

  const dormRequest = () => {
    window.location.href = window.location.protocol + '//' + window.location.host + '/dormdocs';
  }

  const deleteRequest = () => {
    if (confirm('Вы уверены, что хотите удалить заявку?')) {
      UploadService.deleteDormRequestForUser().then(() => {
        location.reload();
      });
    }
  }
  const openStatement = (data) => {
    localStorage.setItem('statementdata',data);
    window.location.href = window.location.protocol + '//' + window.location.host + '/viewdormstatement';
  }
  const openCard = (data,extradata) => {
    localStorage.setItem('viewinguseriin',JSON.parse(localStorage.getItem('data')).username);
    localStorage.setItem('carddata',data);
    localStorage.setItem('parentsdata',extradata);
    window.location.href = window.location.protocol + '//' + window.location.host + '/viewdormcard';
  }
  const openAgreement = () => {
    localStorage.setItem('viewinguseriin',JSON.parse(localStorage.getItem('data')).username);
    window.location.href = window.location.protocol + '//' + window.location.host + '/viewdormagreement';
  }
  const updateDocs = () =>{
    window.location.href = window.location.protocol + '//' + window.location.host + '/dormdocs';
  }
  const dormDataList = dormData.map((element) => {
    return <tr key={element.id}>
      <td id="table-divider-stats">{moment(element.datecreated).format("DD.MM.YYYY")}</td>
      <td id="table-divider-stats">{element.approved == '1' ? <>Одобрено</> : <>В обработке</>}</td>
      <td id="table-divider-stats">{element.approved == '1' ? <></> : <><button className='redbutton' onClick={() => deleteRequest()}>Удалить заявку</button></>}<br/>
      {element.statementdata != null ?
      <div><br/>
        <button className='navbarbutton' onClick={() => openStatement(element.statementdata)}>Заявление</button>
        <br/>
        <button className='navbarbutton' onClick={() => openCard(element.carddata, element.parentsdata)}>Карточка</button>
        <br/>
        <button className='navbarbutton' onClick={() => openAgreement()}>Договор</button>
      </div>:<div>
      <button className='navbarbutton' onClick={() => updateDocs()}>Заполнить документы</button>
      </div>  
      }
      </td>
    </tr>
  });

  if (dormData.length > 0) return (
    <div>
      Заявка на общежитие подана <TiTick style={{color:'green'}}/><br/>
      <table id='opaqueTable' style={{ fontSize: '12pt', paddingLeft: '15px', width: '100%' }}>
        <tbody>
          <tr><br /></tr>
          <tr>
            <th id="table-divider-stats-header"><br />&nbsp;Дата заявки<br />&nbsp;</th>
            <th id="table-divider-stats-header"><br />&nbsp;Статус<br />&nbsp;</th>
            <th id="table-divider-stats-header"><br />&nbsp;Действия<br />&nbsp;</th>
            <th>&nbsp;&nbsp;</th>
          </tr>
          {dormDataList}
          <tr>
            <td><br /></td>
          </tr>
        </tbody>
      </table>

    </div>);
  else {
    return (<p><button className='navbarbutton' onClick={() => dormRequest()}><FaHouse style={{fontSize:'10pt'}}/> Подать заявку на заселение</button></p>);
  }
};

export default observer(StudentDormRequest);