import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { API_URL } from "../http";
import moment from "moment";
import { Link } from "react-router-dom";
import { CertResponse } from "../models/response/CertResponse";


const certificateListPage: FC = ()=>{
    const certificate_type = [        
        "Приложение 2" ,
        "Приложение 4" ,
        //"Приложение 6" , 
        "Приложение 29 (без лицензии)" ,
        "Приложение 29 (с лицензией)" ,
        //"Приложение 31" ,
        "По месту требования",
        "Приложение 2 (новое)"
      ];
   
    const [list, setList] = useState([] as Array<CertResponse>);
    const listItems = list.map((element) =>  
    <li key={element.id}> <Link to={`/list/certificate/${element.id}`}> № {element.id} от {moment(element.created).format("DD.MM.YYYY")}   {certificate_type[element.cert_type-1]}  </Link></li>
    
    );
    
    useEffect(() => {        
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user_id');
        const fetch_data = async () => {          
        const resp = await fetch(`${API_URL}/cert/list/${user}?token=${token}`);
        setList(await resp.json());
        };
        fetch_data();
      },[]);

      return(
        <>
        <div style={{textAlign:'left'}}>
          <ul>{listItems}</ul>
        </div>
        
        </>
      )
};

export default observer(certificateListPage);