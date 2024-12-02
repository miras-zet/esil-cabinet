import { FC, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import UploadService from "../services/UploadService";
import IDebtData from "../models/IDebtData";
import IExcelUploadDate from "../models/IExcelUploadDate";
import moment from "moment";
import { TiTick } from "react-icons/ti";

const StudentDebt: FC = () => {
  const [debtData, setDebtData] = useState<Array<IDebtData>>([]);
  const [excelDate, setExcelDate] = useState<Array<IExcelUploadDate>>([]);

  useEffect(() => {
    UploadService.getExcelDate().then((response) => {
      setExcelDate(response.data);
    });
    UploadService.getDebtData().then((response) => {
      setDebtData(response.data);
    });
    

  }, []);

  const debtItem = debtData.map((element) =>
    <div key={element.iin}>
      <p>Ваш долг по оплате за образовательные услуги составляет <b style={{color:'red', fontSize:'14pt'}}>{element.debt}</b> тенге.</p> <br/>
      {/* Информация актуальна на {element.excelDate} */}
      {element.overall!='undefined'? <div>Общая сумма за курс: <b>{element.overall}</b> тенге. <br/>Уже оплачено: <b>{parseInt(element.overall)-parseInt(element.debt)}</b> тенге.</div>:''}
    </div>
  );
  
  const excelDateData = excelDate.map((element) =>
  <div key={element.upload_date}>
    Актуально на {moment(element.upload_date).format("DD.MM.YYYY HH:mm")}.
  </div>
);

  if (debtItem.length > 0) return ( 
  <div><table><tbody>
    <tr>
      <td style={{maxWidth:'350px', textAlign:'left', fontSize:'12pt'}}>
      {debtItem}<br/>
      {excelDateData}<br/>
      </td>
      <td style={{width:'50px'}}></td>
      <td><br/>
      <img style={{}} src="kaspi_qr_mini.png" alt='https://kaspi.kz/pay/Universities-v2?region_id=19&subservice_id=8221&started_from=?region_id=57&subservice_id=18241&started_from=instruction_qr' width={280} />
      <center><a href='https://kaspi.kz/pay/_gate?action=service_with_subservice&service_id=2766&subservice_id=8221&region_id=19'><button style={{backgroundColor:'#FF2B2C'}}>Перейти в Kaspi</button></a></center><br/>
      </td>
      {/* if window.innerWidth < 940 {marginTop:'-0%'} else {marginTop:'-35%'} */}
    </tr>
    </tbody>
    
  </table>
  <i>После оплаты задолженности актуальная сумма будет видна на следующий рабочий день после 14:00.</i><br/>
      По всем возникающим вопросам можно обратиться к эдвайзерам, либо по следующим номерам:<br/>
      <b>Деканат факультета прикладных наук</b> - +7 7172 725406 (вн. 202)<br/>
      <b>Деканат факультет бизнеса и управления</b> - + 7 7172 725405 (вн. 153)<br/>
      <b>Офис регистратура</b> - +7 7172 725407, +7 7172 725410, +7 707 372-57-77
  </div>);
  else {
    return (<p>Долги по оплате учёбы не найдены. <TiTick style={{color:'green'}}/><br/>{excelDateData}</p>);
  }
};

export default observer(StudentDebt);