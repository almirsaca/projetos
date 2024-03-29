import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { 
	Conversao,
	ConversaoResponse 
} from '../models';

@Injectable()
export class ConversorService {

  //private readonly BASE_URL = "http://api.fixer.io/latest";
  //private readonly BASE_URL = "http://data.fixer.io/api/latest?access_key=eba7130a5b2d720ce43eb5fcddd47cc3";
  private readonly BASE_URL = "https://api.apilayer.com/fixer/latest";

  // Response
  // {"success":false,"error":{"code":101,"type":"invalid_access_key","info":"You have not supplied a valid API Access Key. [Technical Support: support@apilayer.com]"}}
  //
  // 

  constructor(private http: HttpClient) {}

  /**
   * Realiza a chamada para a API de conversão de moedas.
   *
   * @param Conversao conversao
   * @return Observable<ConversaoResponse>
   */
  converter(conversao: Conversao): Observable<any> {
  	let params = `?base=${conversao.moedaDe}&symbols=${conversao.moedaPara}`;
  	return this.http
      //.get(this.BASE_URL + params);
      .get(this.BASE_URL + params, {headers: new HttpHeaders().set("apikey", "DkXrwJC12f993b1hY4oJSRTDBhhOsQCM")});
  }

  /**
   * Retorna a cotação para dado uma response.
   *
   * @param ConversaoResponse conversaoResponse
   * @param Conversao conversao
   * @return number
   */
  cotacaoPara(conversaoResponse: ConversaoResponse, 
		conversao: Conversao): number {
  	if (conversaoResponse === undefined || 
      conversaoResponse.rates === undefined) {
  		return 0;
  	}
 
  	return conversaoResponse.rates[conversao.moedaPara];
  }

  /**
   * Retorna a cotação de dado uma response.
   *
   * @param ConversaoResponse conversaoResponse
   * @param Conversao conversao
   * @return string
   */
  cotacaoDe(conversaoResponse: ConversaoResponse, 
		conversao: Conversao): string {
  	if (conversaoResponse === undefined ||
      conversaoResponse.rates === undefined) {
  		return '0';
  	}

  	return (1 / conversaoResponse.rates[conversao.moedaPara])
  		.toFixed(4);
  }

  /**
   * Retorna a data da cotação dado uma response.
   *
   * @param ConversaoResponse conversaoResponse
   * @return string
   */
  dataCotacao(conversaoResponse: ConversaoResponse): string {
    if (conversaoResponse === undefined ||
      conversaoResponse.date === undefined) {
      return '';
    }

    return conversaoResponse.date;
  }

}
