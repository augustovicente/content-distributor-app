import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Servidor } from 'src/app/providers/server';

@Component({
    selector: "app-login",
    templateUrl: "login.page.html",
    styleUrls: ["login.page.scss"],
})
export class HomePage
{
    public showPassword: boolean = false;
    // public _login: boolean = false;

    public user: any;
    public pwd: any;

    constructor(
        public servidor: Servidor,
        private router: Router,
        public http: HttpClient
    ) {
        // teste
        // this.user = "demo"
        // this.pwd = "demo123"
    }

    ngAfterViewInit(){
    }

    async login(login: string, senha: string)
    {
        var obj = this.servidor.get_headers();
        let headers = new HttpHeaders(obj);
        this.http.get('https://devborghesi-a4bb8.firebaseio.com/demo/'+login+'.json', { headers }).subscribe(() =>
        {
            if(login == 'demo' && senha == 'demo123')
                this.router.navigateByUrl("/tabs");
            else
                alert('Erro no login')
        });

    }

    public showHide(): void {
        this.showPassword = !this.showPassword;
    }
}