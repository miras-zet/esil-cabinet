import { FC, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import UploadService from "../services/UploadService";
import IDebtData from "../models/IDebtData";

const StudentDebt: FC = () => {
  const [debtData, setDebtData] = useState<Array<IDebtData>>([]);

  useEffect(() => {
    UploadService.getDebtData().then((response) => {
      setDebtData(response.data);
    });
  }, []);

  const debtItem = debtData.map((element) =>
    <div key={element.iin}>
      <p>Ваш долг по оплате за образовательные услуги составляет <b style={{color:'red'}}>{element.debt}</b> тенге.</p> 
      {element.overall!='undefined'? <div>Общая сумма за курс: <b>{element.overall}</b> тенге. <br/>Уже оплачено: <b>{parseInt(element.overall)-parseInt(element.debt)}</b> тенге.</div>:''}
    </div>
  );


  if (debtItem.length > 0) return ( 
  <div>
    <br/>
    {debtItem}
    <i style={{fontSize:'10pt'}}>Подробности необходимо уточнить в бухгалтерии университета. Информация НЕ обновляется моментально после оплаты.</i>
    <br/>
    <img style={{marginLeft:'700px'}} src="kaspi_qr.png" width={400} />
    
  </div>);
  else {
    return (<p>Долги по оплате учёбы не найдены.</p>);
  }
};

export default observer(StudentDebt);