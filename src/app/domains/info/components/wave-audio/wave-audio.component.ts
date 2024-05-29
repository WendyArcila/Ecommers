import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, signal } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css',
})
export class WaveAudioComponent {
  @Input({ required: true }) audioURL: string = '';
  //Para hacer referencia a un elemento por # en el HTML
  // se pasa el #wave y se pone un nombre, el ! es para no tener
  // que inicializarlo y el ElementRef hace referencia que es un
  //elemento HTML
  @ViewChild('wave') container!: ElementRef;

  private ws!: WaveSurfer;
  isPlaying = signal(false);

  ngAfterViewInit() {
    this.ws = WaveSurfer.create({
      url: this.audioURL,
      container: this.container.nativeElement,
    });
    this.ws.on('play', () => this.isPlaying.set(true));
    this.ws.on('pause', () => this.isPlaying.set(false));
  }

  playPause() {
    this.ws.playPause();
  }
}
