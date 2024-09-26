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
    if (confirm('Вы уверены, что хотите подать заявку?')) {
      UploadService.createDormRequestForUser().then(() => {
        location.reload();
      });
    }
  }

  const deleteRequest = () => {
    if (confirm('Вы уверены, что хотите удалить заявку?')) {
      UploadService.deleteDormRequestForUser().then(() => {
        location.reload();
      });
    }
  }

  const dormDataList = dormData.map((element) => {
    return <tr key={element.id}>
      <td id="table-divider-stats">{moment(element.datecreated).format("DD.MM.YYYY")}</td>
      <td id="table-divider-stats">{element.approved == '1' ? <>Одобрено</> : <>В обработке</>}</td>
      <td id="table-divider-stats">{element.approved == '1' ? <></> : <><button className='navbarbutton' onClick={() => deleteRequest()}>Удалить заявку</button></>}</td>
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