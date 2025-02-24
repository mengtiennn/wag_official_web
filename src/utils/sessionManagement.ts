
export class Session {

    static getSessionLang(): string {
        return sessionStorage.getItem('locale');
    }
    static setSessionLang(lang: string) {
        sessionStorage.setItem('locale', lang);
    }

}