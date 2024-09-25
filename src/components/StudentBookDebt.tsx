import { FC, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import moment from "moment";
import IBookTransfer from "../models/IBookTransfer";
import BookService from "../services/BookService";
import { TiTick } from "react-icons/ti";

const StudentBookDebt: FC = () => {
  const [dueData, setDueData] = useState<Array<IBookTransfer>>([]);
  //let [margin, setMargin] = useState<string>('-35%');

  useEffect(() => {
    //setMargin('-35%');
    //if(window.innerWidth<940) setMargin('0%');
    BookService.getDueBookForUser().then((response) => {
      setDueData(response.data);
    });
    // UploadService.getDebtData().then((response) => {
    //   setDebtData(response.data);
    // });


  }, []);

  const booklist = dueData.map((element) => {
    return <tr key={element.id}>
      <td id="table-divider-stats">{element.bookname}</td>
      <td id="table-divider-stats">{moment(element.DateCreated).format("DD.MM.YYYY HH:mm")}</td>
    </tr>
  });

  if (dueData.length > 0) return (
    <div>
      <h4>Текущие долги по книгам:</h4>
      <table style={{ fontSize: '12pt', paddingLeft: '15px'}}>
      <tbody>
        <tr><br /></tr>
        <tr>
          <th id="table-divider-stats-header"><br />&nbsp;Название книги<br />&nbsp;</th>
          <th id="table-divider-stats-header"><br />&nbsp;Дата выдачи<br />&nbsp;</th>
          <th>&nbsp;&nbsp;</th>
        </tr>
        {booklist}
        <tr>
          <td><br /></td>
        </tr>
      </tbody>
    </table>

    </div>);
  else {
    return (<p>Долги по библиотеке не найдены. <TiTick style={{color:'green'}}/></p>);
  }
};

export default observer(StudentBookDebt);