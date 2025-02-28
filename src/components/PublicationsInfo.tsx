import { FC, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import IPublicationsInfo from "../models/IPublicationsInfo";
import DocsService from "../services/DocsService";
import { FcCheckmark } from "react-icons/fc";
import { RxCross1 } from "react-icons/rx";

const PublicationsInfo: FC = () => {
  const [info, setInfo] = useState<Array<IPublicationsInfo>>([]);
  const [academicStatus, setAcademicStatus] = useState<string>('');

  useEffect(() => {
    DocsService.getTutorPubsInfo().then((response) => {
      setInfo(response.data);
    });
    DocsService.getTutorAcademicStatus().then((response) => {
      setAcademicStatus(response.data);
    });

  }, []);
  const refDBMap = {
    1: "Scopus",
    2: "Web of Science",
    3: "КОКСНВО МНВО РК",
    4: "РИНЦ (не засчитывается)",
  };

  const academicStatusMap = {
    0: "Без звания",
    1: "Без звания",
    2: "Доцент",
    3: "Профессор",
    4: "Ассоциированный профессор (доцент)",
    5: "Профессор (по новой квалификации)",
  };

  const getRequirementText = (academicStatus, requirement) => {
    const today = new Date();
    const current_year = today.getFullYear()
    if (requirement == 1) switch (academicStatus) {
      case 0: case 1: case 2: case 4:
        return `Наличие не менее 5 (пяти) публикаций за последние 3 года (с ${current_year - 3} года включительно)`;
      case 3: case 5:
        return `Наличие не менее 7 (семи) публикаций за последние 3 года (с ${current_year - 3} года включительно)`;
    }
    if (requirement == 2) switch (academicStatus) {
      case 0: case 1:
        return `Из этих публикаций: не менее 1 (одной) из списка КОКСНВО, и/или Scopus, и/или Web of Science`;
      case 2: case 4:
        return `Из этих публикаций: не менее 3 (трёх) из списка КОКСНВО, и/или Scopus, и/или Web of Science`;
      case 3: case 5:
        return `Из этих публикаций: не менее 5 (пяти) из списка КОКСНВО, и/или Scopus, и/или Web of Science, и/или монографии`;
    }
    return '';
  };

  const getRequirementIcon = (academicStatus, requirement, publicationsInfo) => {
    const countNonZeroRefDBID = publicationsInfo.filter(item => Number(item.refDBID) !== 0).length;
    const countMonographs = publicationsInfo.filter(item => item.pubtype == 'Научные монографии').length;
    //alert(`countNonZeroRefDBID: ${countNonZeroRefDBID}, countMonographs: ${countMonographs}`);
    if (requirement == 1) switch (academicStatus) {
      case 0: case 1: case 2: case 4:
        return publicationsInfo.length >= 5
      case 3: case 5:
        return publicationsInfo.length >= 7
    }
    if (requirement == 2) switch (academicStatus) {
      case 0: case 1:
        return countNonZeroRefDBID + countMonographs >= 1;
      case 2: case 4:
        return countNonZeroRefDBID + countMonographs >= 3;
      case 3: case 5:
        return countNonZeroRefDBID + countMonographs >= 5;
    }
    return '';
  };

  const countOvercompletion = (academicStatus, publicationsInfo) => {
    const countNonZeroRefDBID = publicationsInfo.filter(item => Number(item.refDBID) !== 0).length;
    const countMonographs = publicationsInfo.filter(item => item.pubtype == 'Научные монографии').length;
    switch (academicStatus) {
      case 0: case 1:
        {
          if (publicationsInfo.length >=10 && countNonZeroRefDBID >= 2) return 2;
          if (publicationsInfo.length >=5 && countNonZeroRefDBID >=1) return 1;
          else return 0;
        }
      case 2: case 4:
        {
          if (publicationsInfo.length >=10 && countNonZeroRefDBID >= 6) return 2;
          if (publicationsInfo.length >=5 && countNonZeroRefDBID >=3) return 1;
          else return 0;
        }
      case 3: case 5:
        {
          if (publicationsInfo.length >=14 && countNonZeroRefDBID+countMonographs >= 10) return 2;
          if (publicationsInfo.length >=7 && countNonZeroRefDBID+countMonographs >=5) return 1;
          else return 0;
        }
    }
  }

  const datalist = info.map((element, index) => {
    return <tr key={element.pubID}>
      <td id="table-divider-stats" style={{ textAlign: 'center' }}>{index + 1}</td>
      <td id="table-divider-stats" style={{ textAlign: 'left', maxWidth: '600px' }}>{element.theme}</td>
      <td id="table-divider-stats" style={{ textAlign: 'center' }}>{element.pubtype}</td>
      <td id="table-divider-stats" style={{ textAlign: 'center' }}>{element.edition_year}</td>
      <td id="table-divider-stats" style={{ textAlign: 'center' }}>{refDBMap[element.refDBID] || " - "}</td>
    </tr>
  });

  return (
    <div><br/>
      <h3>Прогресс выполнения критерия "Публикация статей"</h3>
      <h4>Ваш академический статус: <i>{academicStatusMap[academicStatus]}</i></h4>
      <h4>Условия выполнения критерия для Вашей академической степени:</h4>
      1. {getRequirementText(academicStatus, 1)} &emsp; {getRequirementIcon(academicStatus, 1, info) ? <b style={{ color: 'green' }}>Выполнено &nbsp;<FcCheckmark /></b>: <b style={{ color: 'red' }} >Не выполнено &nbsp;<RxCross1/></b>}<br /><br />
      2. {getRequirementText(academicStatus, 2)} &emsp; {getRequirementIcon(academicStatus, 2, info) ? <b style={{ color: 'green' }}>Выполнено &nbsp;<FcCheckmark /></b>: <b style={{ color: 'red' }} >Не выполнено &nbsp;<RxCross1/></b>}<br />
      <br/>
      {countOvercompletion(academicStatus, info) == 0 ? 
      <h4>Балл не зачислен, так как не выполнены критерии выше</h4>:''
      }
      {countOvercompletion(academicStatus, info) == 1 ? 
      <h4>За выполненные условия начислен <u>1</u> балл</h4>:''
      }
      {countOvercompletion(academicStatus, info) == 2 ? 
      <h4>За перевыполнение условий начислено <u>2</u> балла (максимум)</h4>:''
      }
      {datalist.length > 0 ?
        <div>
          <h4>Ваши статьи (за последние 3 года):</h4>
          <table style={{ fontSize: '12pt', paddingLeft: '15px' }}>
            <tbody>
              <tr><br /></tr>
              <tr>
                <th id="table-divider-stats-header"><br />&nbsp;№<br />&nbsp;</th>
                <th id="table-divider-stats-header"><br />&nbsp;Наименование статьи<br />&nbsp;</th>
                <th id="table-divider-stats-header"><br />&nbsp;Тип статьи<br />&nbsp;</th>
                <th id="table-divider-stats-header"><br />&nbsp;Год издания<br />&nbsp;</th>
                <th id="table-divider-stats-header"><br />&nbsp;Индексация<br />&nbsp;</th>
                <th>&nbsp;&nbsp;</th>
              </tr>
              {datalist}
              <tr>
                <td><br /></td>
              </tr>
            </tbody>
          </table>
        </div> :
        <div><h3>Не найдено статей в Platonus</h3></div>
      }


    </div>)
};

export default observer(PublicationsInfo);