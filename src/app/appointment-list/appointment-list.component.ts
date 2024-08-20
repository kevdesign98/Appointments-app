import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css',
})
export class AppointmentListComponent implements OnInit {
  //viene chiamato solo una volta, e serve per il caricamento dei dati o i dati che dovrebbero essere caricati quando il componente viene creato
  //questo pezzo di codice significa Quando il componente viene inizializzato (ngOnInit viene eseguito),il codice cerca di caricare una lista di appuntamenti salvata nel localStorage del browser. Se trova questa lista (sotto la chiave 'appointments'), la converte da stringa JSON in un array di oggetti e la assegna alla proprietà this.appointments. Se non trova nulla, this.appointments viene impostato su un array vuoto.

  ngOnInit(): void {
    let saveAppointments = localStorage.getItem('appointments');

    this.appointments = saveAppointments ? JSON.parse(saveAppointments) : [];
  }

  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();

  appointments: Appointment[] = []; //per richiamare l'interface

  addAppointment() {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate,
      };

      this.appointments.push(newAppointment);
      this.newAppointmentTitle = '';
      this.newAppointmentDate = new Date();

      //salvare i dati nel localstorage del browser, solo fino a 5mb
      //prima bisogna definire una key poi valore
      //con JSON.stringify ci converte l'oggetto in stringa
      //this.appointments, così salva tutto
      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }
  }

  deleteAppointment(index: number) {
    //index==indice numero in modo da poter rimuovere il primo elemento
    this.appointments.splice(index, 1); //rimuove l'elemento
    //sostituisce l'intero array nello storage con il nuovo array
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}
