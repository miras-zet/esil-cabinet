import api from "../http-common";
import {AxiosResponse} from 'axios';
import { CertResponse } from "../models/response/CertResponse";


export default class CertService {
    static async prepareCert(token: string, user_id: number,cert_type: number,language:string): Promise<AxiosResponse<CertResponse>> {
        return api.post<CertResponse>('/cert/prepare',{token, user_id,cert_type,language})
    }   
    static async getCert(user_id:number,token:string){
        return api.get<CertResponse>(`/cert/list/${user_id}?token=${token}`);
    } 
}