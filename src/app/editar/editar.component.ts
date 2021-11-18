import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../Produto';
import { WebService } from '../web.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  produto = {_id: "", title:"", price:0.0, description:""};

  constructor(private router: Router, private web : WebService, private rota: ActivatedRoute, private local: Location) { }

  ngOnInit(): void {
    this.getProduto();
  }

  getProduto(): void {
    let id = this.rota.snapshot.paramMap.get("id");
    this.web.buscarProduto(id).subscribe(res =>{
      if(res.ok == true){
        this.produto = {_id: res.body._id, title:res.body.title, price:res.body.price, description:res.body.description}
      }else{
        alert("Erro ao encontrar o produto");
      }
    });
  }

  atualizarProduto(){
    this.web.editProduto(this.produto).subscribe(res =>{
      if(res.ok == true) {
        alert("Produto atualizado com sucesso");
        this.router.navigate(['']);
      }else{
        alert("Erro ao atualizar o produto!");
      }
    });
  }

}
