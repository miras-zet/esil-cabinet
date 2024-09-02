import { FC, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import moment from "moment";
import IDormRequest from "../models/IDormRequest";
import UploadService from "../services/UploadService";

const StudentDormRequest: FC = () => {
  const [dormData, setDormData] = useState<Array<IDormRequest>>([]);
  useEffect(() => {
    UploadService.getDormRequestForUser().then((response) => {
      setDormData(response.data);
    });

  }, []);

  const dormRequest = () => {
    if (confirm('Вы уверены, что хотите подать заявление?')) {
      UploadService.createDormRequestForUser().then(() => {
        location.reload();
      });
    }
  }

  const deleteRequest = () => {
    if (confirm('Вы уверены, что хотите удалить заявление?')) {
      UploadService.deleteDormRequestForUser().then(() => {
        location.reload();
      });
    }
  }

  const dormDataList = dormData.map((element) => {
    return <tr key={element.id}>
      <td id="table-divider-stats">{moment(element.datecreated).format("DD.MM.YYYY")}</td>
      <td id="table-divider-stats">{element.approved == '1' ? <>Одобрено</> : <>В обработке</>}</td>
      <td id="table-divider-stats">{element.approved == '1' ? <></> : <><button className='navbarbutton' onClick={() => deleteRequest()}>Удалить заявление</button></>}</td>
    </tr>
  });

  if (dormData.length > 0) return (
    <div>
      <h4>Заявка на общежитие</h4>
      <table id='opaqueTable' style={{ fontSize: '12pt', paddingLeft: '15px', width: '107%' }}>
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
    return (<p><br /><button className='navbarbutton' onClick={() => dormRequest()}>Подать заявление на общежитие</button></p>);
  }
};

export default observer(StudentDormRequest);