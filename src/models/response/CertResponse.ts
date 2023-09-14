export interface CertResponse {
    token: string; 
    user_id: number;
    cert_type: number;
    language: string;
    birth_date: string;
    cafedra_kz: string;
    cafedra_ru: string;
    cafedra_en: string;
    course_count: number;
    course_number: number;
    created: string;
    dekanat_kz: string;
    dekanat_ru: string;
    dekanat_en: string;
    grant_type: number;
    id: number;
    iin: string;
    lastname: string;
    middlename: string;
    name: string;
    requested_by: number;
    specialization_code: string;
    specialization_name_kz: string;
    specialization_name_ru: string;
    specialization_name_en: string;
    start_date: Date;
    study_form_id: number;
    study_form_name_kz: string;
    study_form_name_ru: string;
    study_form_name_en: string;
    
}