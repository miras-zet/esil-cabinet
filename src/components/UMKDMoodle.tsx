import {FC, useState, useEffect} from "react";
import { observer } from "mobx-react-lite";
import UploadService from "../services/UploadService";
import IMoodlePercentage from "../models/IMoodlePercentage";

const UMKDMoodle: FC = () => {
    const [moodleData, setMoodleData] = useState<Array<IMoodlePercentage>>([]);

    useEffect(() => {
        UploadService.getUMKDMoodle()
        .then(
          (response) => {
            return setMoodleData(response.data);
          }
        )  
    },[])

    const listCategoryItems = moodleData.map((element) =>  
      <div key={element.umkd_mdl_completion}>
          {(element.umkd_mdl_completion!=50? 
          <div>
            Заполненность портала ДОТ: {element.umkd_mdl_completion}%, {(element.umkd_mdl_completion>50)? 
            `добавлено +${Math.round(15/50*element.umkd_mdl_completion-15)} баллов`
            :
            `отнято -${Math.round(15/50*element.umkd_mdl_completion-15)} баллов`}
          </div>
          :
          <div>
            
          </div>)}  
          
      </div>
    );
    if(listCategoryItems.length>0)return (
    <div><br></br> 
        {listCategoryItems}
    </div>);
    else{
        return;
    }
};

export default observer(UMKDMoodle);