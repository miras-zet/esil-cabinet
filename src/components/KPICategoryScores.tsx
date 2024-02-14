import {FC, useState, useEffect} from "react";
import { observer } from "mobx-react-lite";
import ICategoryScore from "../models/ICategoryScore";
import UploadService from "../services/UploadService";

const KPICategoryScores: FC = () => {
    const [categoryScores, setCategoryScores] = useState<Array<ICategoryScore>>([]);

    useEffect(() => {
        UploadService.getCategoryScores()
        .then(
          (response) => {
            return setCategoryScores(response.data);
          }
        )  
    },[])

    const listCategoryItems = categoryScores.map((element) =>  
      <tr key={element.counter}>
          <td>{element.category}</td> 
          <td>&nbsp;&nbsp;+{element.scoresum}</td> 
      </tr>
    );
    if(listCategoryItems.length>0)return (
    <div> 
        <table>
                <tbody>
                  <tr>
                    <th>Категория</th>
                    <th>&nbsp;&nbsp;Баллы</th>
                  </tr>
                  {listCategoryItems}
                </tbody>
              </table>
    </div>);
    else{
        return;
    }
};

export default observer(KPICategoryScores);