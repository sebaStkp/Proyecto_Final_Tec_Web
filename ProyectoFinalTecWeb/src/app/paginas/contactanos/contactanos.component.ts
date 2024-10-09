// contactanos.component.ts

import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.scss']
})
export class ContactanosComponent {

  @ViewChild('nombreInput') nombreInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('mensajeInput') mensajeInput!: ElementRef;

  constructor() { }

  enviarFormulario(nombre: string, email: string, mensaje: string) {
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('Nombre:', nombre);
    console.log('Correo Electrónico:', email);
    console.log('Mensaje:', mensaje);
    // Mostrar un mensaje de éxito
    alert('¡Mensaje enviado correctamente!');
    // Limpiar los campos
    this.nombreInput.nativeElement.value = '';
    this.emailInput.nativeElement.value = '';
    this.mensajeInput.nativeElement.value = '';
  }
}
