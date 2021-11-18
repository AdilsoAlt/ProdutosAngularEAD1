import { Component, OnInit } from '@angular/core';
import { Produto } from '../Produto';
import { WebService } from '../web.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {



  constructor(private web: WebService) { }
  
  listaProdutos: Produto[] | undefined;
  produto = {title:"", price:0.0, description:""};
  
  carregarProdutos(): void {
    this.web.getProdutos().subscribe(res => {
      this.listaProdutos = res;
    });
  }

  excluir(_id:any): void {
    this.web.excluirProduto(_id).subscribe(res =>{
      if(res.ok == true){
        alert("Produto excluído com sucesso");
        location.reload();
      }else{
        alert("Erro ao deletar");
      }
    });
  }

  cadastrar(){
    this.web.cadastrarProduto(this.produto).subscribe(res =>{
      if(res.ok == true) {
        alert("O cadastro foi realizado com sucesso");
        location.reload();
      }else{
        alert("O cadastro não foi realizado!");
      }
    });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }

}
