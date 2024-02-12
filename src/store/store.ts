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
    errors = 0;
    KPIScore = 0;
    role!: String;
      
   
    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }
    
    async setError(error: number){
        this.errors = error;
    };

    async setKPIScore(score: number){
        this.KPIScore = score;
    };
    
    // setAuth() {
    //     this.isAuth();
    // }

    setUser(user: AuthResponse) {
         this.user = user;
    }

    setRole(role: String) {
        this.role = role;
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
            localStorage.setItem('role', response.data.role_str);
            localStorage.setItem('KPIScore', response.data.KPIScore);
            localStorage.setItem('cafedraname', response.data.cafedraname);
            localStorage.setItem('cafedraid', ""+response.data.cafedraid);
            localStorage.setItem('user_id', ""+response.data.id);
            localStorage.setItem('data',response.request.response);

            this.setAuth(true);
            if(localStorage.getItem('role')=='plt_student'){
                this.setRole("plt_student");
            }
            if(localStorage.getItem('role')=='plt_tutor'){
                this.setRole("plt_tutor");
            }
            //this.isAuth();
            const user = JSON.parse(localStorage.getItem('data')!);
            if (user) {
                this.setUser(user);
            }
        } catch (e:any) {
            console.log(e.response?.data?.message);   
            this.setError(e.response?.data?.statusCode);                      
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
    async prepareCert(value:number, lang:string) {
        try {
            const response = await CertService.prepareCert(localStorage.getItem('token')!, parseInt(localStorage.getItem('user_id')!), value,lang);
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

    async getRole() {
        try {
            const response = await localStorage.getItem('role');
            console.log(response);
        } catch (e:any) {
            console.log(e.response?.data?.message);
        }
    }
    async getKPIScore() {
        try {
            const response = await localStorage.getItem('KPIScore');
            console.log(response);
        } catch (e:any) {
            console.log(e.response?.data?.message);
        }
    }
}