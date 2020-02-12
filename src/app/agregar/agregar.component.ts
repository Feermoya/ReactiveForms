import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Usuario{
  nombre: string;
  correo: string;
  password: string;
}
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  formularioCreado: FormGroup;
  esNuevo: boolean= true;
  usuarios: Array<Usuario> = new Array<Usuario>();
  posicionEditar: number = -1;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.crearFormulario();  //la mando a llamar cuando se abra la pagina
  }

crearFormulario(){
this.formularioCreado= this.fb.group({
  nombre:['', Validators.required],//para que sea requerido
  correo: ['', Validators.compose([//Cuando esta compuesto por dos validaciones
Validators.required, Validators.email //que sea valido el email
  ])],
  password: ['', Validators.compose([
    Validators.required, Validators.minLength(5) //un ancho minimo de 5 caracteres
  ])]
})
}

agregar(){
  this.usuarios.push(this.formularioCreado.value as Usuario)
  this.formularioCreado.reset()
}

editar(){

  this.usuarios[this.posicionEditar].nombre=this.formularioCreado.value.nombre;
  this.usuarios[this.posicionEditar].correo=this.formularioCreado.value.correo;
  this.usuarios[this.posicionEditar].password=this.formularioCreado.value.contraseña;
  this.formularioCreado.reset();
  this.esNuevo=true;
  this.posicionEditar=-1;

}

editarUsuario(posicion: number){
  this.formularioCreado.setValue({
    nombre: this.usuarios[posicion].nombre,
    correo:this.usuarios[posicion].correo,
    password: this.usuarios[posicion].password
  })
  this.posicionEditar= posicion;
  this.esNuevo=false;
}

eliminarUsuario(posicion: number){
this.usuarios.splice(posicion,1)
}

}
