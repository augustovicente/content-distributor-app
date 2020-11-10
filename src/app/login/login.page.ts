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
    public _login: boolean = false;

    public user: any;
    public pwd: any;

    constructor(
        public servidor: Servidor,
        private router: Router
    ) {}

    ngAfterViewInit(){
        if (localStorage.getItem("token")) this.router.navigateByUrl("/tabs");
    }

    async login(login: string, senha: string)
    {
        if(login == 'demo' && senha == 'demo123')
            this._login = true;
        else
            alert('Erro no login')
    }

    public showHide(): void {
        this.showPassword = !this.showPassword;
    }
}