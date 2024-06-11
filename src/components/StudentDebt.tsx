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
    <b key={element.iin}>
      {element.debt}
    </b>
  );
  if (debtItem.length > 0) return (
    <p>Ваш долг по оплате за образовательные услуги составляет {debtItem} тенге.</p>);
  else {
    return;
  }
};

export default observer(StudentDebt);