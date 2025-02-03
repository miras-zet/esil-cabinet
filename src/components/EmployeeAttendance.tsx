import { FC, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import InfoService from "../services/InfoService";
import IAttendanceData from "../models/IAttendanceData";

const EmployeeAttendance: FC = () => {
  const [attendanceData, setAttendanceData] = useState<Array<IAttendanceData>>([]);
  //let [margin, setMargin] = useState<string>('-35%');

  useEffect(() => {
    //setMargin('-35%');
    //if(window.innerWidth<940) setMargin('0%');
    InfoService.getEmployeeAttendanceInfoShort().then((response) => {
      setAttendanceData(response.data);
    });
    // UploadService.getDebtData().then((response) => {
    //   setDebtData(response.data);
    // });


  }, []);

  const attendanceList = attendanceData.map((element) => {
    return <tr>
      <td id="table-divider-stats">{element.date}</td>
      <td id="table-divider-stats">{element.checkin.slice(0, -3)}</td>
      <td id="table-divider-stats">{element.checkout.slice(0, -3)}</td>
    </tr>
  });

  if (attendanceData.length > 0) return (
    <div>
      <table style={{ fontSize: '12pt', paddingLeft: '15px'}}>
      <tbody>
        <tr><br /></tr>
        <tr>
          <th id="table-divider-stats-header"><br />&nbsp;Дата<br />&nbsp;</th>
          <th id="table-divider-stats-header"><br />&nbsp;Время входа<br />&nbsp;</th>
          <th id="table-divider-stats-header"><br />&nbsp;Время выхода<br />&nbsp;</th>
          <th>&nbsp;&nbsp;</th>
        </tr>
        {attendanceList}
        <tr>
          <td><br /></td>
        </tr>
      </tbody>
    </table>
    
    </div>);
  else {
    return (<p>Данные не найдены</p>);
  }
};

export default observer(EmployeeAttendance);