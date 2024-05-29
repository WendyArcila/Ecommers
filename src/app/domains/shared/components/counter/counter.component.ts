import { Component, Input, OnInit, SimpleChanges, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  @Input({ required: true }) duration = 0;
  @Input({ required: true }) message = '';

  counter = signal(0);

  constructor() {
    //Se crea para crear valores por defecto
    //No debe ser asincrónos
    //Corre antes del render, solo una vez
    console.log('CONSTRUCTOR');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    //corre antes y durante el render
    //cada que haya cambios trakea si hay algún cambio
    console.log('ngOnChanges');
    console.log('-'.repeat(10));
    console.log(changes);
    const duration = changes['duration'];
    if (duration && duration.currentValue !== duration.previousValue) {
      this.doSomething();
    }
  }

  ngOnInit() {
    //Es parecido al constructor
    //aquí ya se renderizó el componente
    //Corre solo una vez, perfecto para asincronía
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration =>', this.duration);
    console.log('message =>', this.message);
    window.setInterval(() => {
      console.log('run interval');
      this.counter.update((statePrev) => statePrev + 1);
    }, 1000);
  }

  ngAfterViewInit() {
    //me dice cuando los hijos del componente ya fueron renderizados
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestro() {
    //se activa cuando se destruye
    //si no cumple se elimina por ejm un ngIf
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
  }

  doSomething() {
    console.log('Change something duration!');
  }
}
