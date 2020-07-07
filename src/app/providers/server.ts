import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class Servidor
{
    constructor
    (
        public http: HttpClient
	) { }
	// -- prod
	private SITE: string = 'https://carolborghesi.com.br/app_borghesi/ws.php';
    get_api_url()
    {
        return this.SITE;
	}
    get_headers()
	{
        return { 
			'Content-Type':'application/json', 
			'Accept': 'application/json',
			'Access-Control-Allow-Origin': '*' 
		};
    }
    // função que envia o request ao servidor
	envia_post(dados_request, diretorio)
    {
        var obj = this.get_headers();
        let headers = new HttpHeaders(obj);
		// criando a promise da função
		return this.http.post(this.get_api_url() + diretorio, dados_request, { headers });
	}
	envia_get(diretorio)
	{
		var obj = this.get_headers();
        let headers = new HttpHeaders(obj);
		// criando a promise da função
		return this.http.get(this.get_api_url() + diretorio, { headers });
	}
}