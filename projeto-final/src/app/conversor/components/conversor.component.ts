import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Moeda, Conversao, ConversaoResponse } from '../models';
import { MoedaService, ConversorService } from '../services';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent implements OnInit {

  moedas: Moeda[];
  conversao: Conversao;
  possuiErro: boolean;
  conversaoResponse: ConversaoResponse;
  mensagemErro: string;

  @ViewChild("conversaoForm", { static: true }) conversaoForm: NgForm;

  constructor(
    private moedaService: MoedaService,
    private conversorService: ConversorService) {}

  ngOnInit() {
  	this.moedas = this.moedaService.listarTodas();
  	this.init();
  }

  /**
   * Efetua a chamada para a conversão dos valores.
   *
   * @return void
   */
  init(): void {
  	this.conversao = new Conversao('USD', 'BRL' , null);
  	this.possuiErro = false;
    this.mensagemErro = "";
  }

  /**
   * Efetua a chamada para a conversão dos valores.
   *
   * @return void
   */
  converter(): void {
  	if (this.conversaoForm.form.valid) {
      this.possuiErro = false;
      this.mensagemErro = "";
      this.conversorService
        .converter(this.conversao)
  	  	.subscribe({
  		    next: (r) => { 
            this.conversaoResponse = r; 
            console.info(`Response conversorService - ${JSON.stringify(r)}`); 
          },
          error: (e) => {
            this.possuiErro = true; 
            this.mensagemErro = e.message ; console.error(e); 
          },
          complete: () => console.info('complete conversorService!') 
        });
  	}
  }
}
