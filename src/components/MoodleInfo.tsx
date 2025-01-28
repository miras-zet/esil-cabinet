import { FC, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { TiTick } from "react-icons/ti";
import IMoodleInfo from "../models/IMoodleInfo";
import InfoService from "../services/InfoService";

const MoodleInfo: FC = () => {
  const [info, setInfo] = useState<Array<IMoodleInfo>>([]);
  //let [margin, setMargin] = useState<string>('-35%');

  useEffect(() => {
    //setMargin('-35%');
    //if(window.innerWidth<940) setMargin('0%');
    InfoService.getMoodleHelp().then((response) => {
      setInfo(response.data);
    });
    // UploadService.getDebtData().then((response) => {
    //   setDebtData(response.data);
    // });


  }, []);

  const datalist = info.map((element) => {
    return <tr key={element.subject}>
      <td id="table-divider-stats" style={{textAlign:'left'}}>{element.subject}</td>
      <td id="table-divider-stats" style={{textAlign:'left'}}>{element.filecount<18?`Не хватает ${18-element.filecount} файлов`:<><TiTick/>&nbsp;Выполнено ({element.filecount} файлов)</>}</td>
      <td id="table-divider-stats" style={{textAlign:'left'}}>{element.question_count == 0?`Тест не загружен`:<><TiTick/>&nbsp;Тест загружен</>}</td>
      <td id="table-divider-stats">{element.percentage}%</td>
      <td id="table-divider-stats"><a href={'https://'+element.link} target="_blank">Открыть</a></td>
    </tr>
  });

  if (info.length > 0) return (
    <div>
      <h4>Текущие долги по порталу ДОТ:</h4>
      <table style={{ fontSize: '12pt', paddingLeft: '15px'}}>
      <tbody>
        <tr><br /></tr>
        <tr>
          <th id="table-divider-stats-header"><br />&nbsp;Дисциплина<br />&nbsp;</th>
          <th id="table-divider-stats-header"><br />&nbsp;Кол-во файлов<br />&nbsp;</th>
          <th id="table-divider-stats-header"><br />&nbsp;Тесты<br />&nbsp;</th>
          <th id="table-divider-stats-header"><br />&nbsp;Процент заполнения<br />&nbsp;</th>
          <th id="table-divider-stats-header"><br />&nbsp;Ссылка на курс<br />&nbsp;</th>
          <th>&nbsp;&nbsp;</th>
        </tr>
        {datalist}
        <tr>
          <td><br /></td>
        </tr>
      </tbody>
    </table>

    </div>)
    
    else{
      return 'Долгов нет';
    };
};

export default observer(MoodleInfo);