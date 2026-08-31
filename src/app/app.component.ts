import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, arrowBack, chevronBack, settingsOutline, trash } from 'ionicons/icons';
import { Configuracion } from './servicios/configuracion';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private configuracion: Configuracion) {
    addIcons({ add, arrowBack, chevronBack, settingsOutline, trash });
  }

  async ngOnInit(): Promise<void> {
    await this.configuracion.inicializar();
  }
}
