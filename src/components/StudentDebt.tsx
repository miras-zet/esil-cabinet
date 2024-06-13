import { FC, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import UploadService from "../services/UploadService";
import IDebtData from "../models/IDebtData";

const StudentDebt: FC = () => {
  const [debtData, setDebtData] = useState<Array<IDebtData>>([]);
  let [margin, setMargin] = useState<string>('-35%');

  useEffect(() => {
    setMargin('-35%');
    if(window.innerWidth<940) setMargin('0%');
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
  <div><table><tbody>
    <tr>
      <td style={{maxWidth:'350px', textAlign:'left'}}>
      <br/>
    {debtItem}<br/>
    <i style={{fontSize:'9.5pt'}}>Подробности необходимо уточнить в бухгалтерии университета. Информация НЕ обновляется моментально после оплаты.</i>
      </td>
      <td style={{width:'255px'}}></td>
      <td><br/>
      <img style={{marginTop:margin}} src="kaspi_qr.png" alt='https://kaspi.kz/pay/Universities-v2?region_id=19&subservice_id=8221&started_from=?region_id=57&subservice_id=18241&started_from=instruction_qr' width={380} />
      </td>
      {/* if window.innerWidth < 940 {marginTop:'-0%'} else {marginTop:'-35%'} */}
    </tr>
    </tbody>
  </table>
 
  </div>);
  else {
    return (<p>Долги по оплате учёбы не найдены.</p>);
  }
};

export default observer(StudentDebt);