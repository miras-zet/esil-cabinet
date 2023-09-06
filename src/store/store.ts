import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import {AuthResponse} from "../models/response/AuthResponse";
import CertService from "../services/CertService";
import { IUser } from "../models/IUser";
import { CertResponse } from "../models/response/CertResponse";

export default class Store { 
    user = {} as IUser; 
    certificat = {} as CertResponse;     
    isLoading = false;
    isAuth = false;  
      
   
    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }
    
    
    // setAuth() {
    //     this.isAuth();
    // }

    setUser(user: AuthResponse) {
         this.user = user;
    }

    setcertificate(certificate: CertResponse){
        this.certificat = certificate;
    }
    // isAuth():boolean {
    //     return localStorage.getItem('token') !==  null && localStorage.getItem('token') !==  undefined;
    // }
    
    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(username: string, password: string) {
        try {
            const response = await AuthService.login(username, password);
            // console.log(response);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user_id',""+response.data.id);
            localStorage.setItem('data',response.request.response);

            this.setAuth(true);
            //this.isAuth();
            const user = JSON.parse(localStorage.getItem('data')!);
            if (user) {
                this.setUser(user);
            }
        } catch (e:any) {
            console.log(e.response?.data?.message);                      
        }
    }
    async logout() {
        try {
           // const response = await AuthService.logout();
            // localStorage.removeItem('token');
            // localStorage.removeItem('user_id');
            // localStorage.removeItem('data');
            // localStorage.removeItem('certificat');
            localStorage.clear();
            this.setAuth(false);
        } catch (e:any) {
            console.log(e.response?.data?.message);
        }
    }
    async checkAuth() {
        this.setLoading(true);
        try {
            const response = localStorage.getItem('token') !==  null && localStorage.getItem('token') !==  undefined;
            if (response) {
                this.setAuth(true);
            };
            const user = JSON.parse(localStorage.getItem('data')!);
            if (user) {
                this.setUser(user);
            }
        } catch (e:any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
    async prepareCert(value:number) {
        try {
            const response = await CertService.prepareCert(localStorage.getItem('token')!, parseInt(localStorage.getItem('user_id')!), value,'ru');
            this.certificat = response.data;
            //console.log(response);
            localStorage.setItem('certificat', ''+response.data.id);
        } catch (e:any) {
            console.log(e.response?.data?.message);
        }
    }

    async getCert() {
        try {
            const response = await CertService.getCert(parseInt(localStorage.getItem('user_id')!),localStorage.getItem('token')!);
            console.log(response);
        } catch (e:any) {
            console.log(e.response?.data?.message);
        }
    }
}