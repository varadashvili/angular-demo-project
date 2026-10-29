import {Component} from '@angular/core';

@Component({
  imports: [],
  selector: 'app-spinner',
  styles: `
    .spinner-container {
      width: 100%;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;

      .overlay {
        width: 100%;
        height: 100%;
        background: black;
        opacity: 0.1;
      }

      .spinner-grow {
        width: 3rem;
        height: 3rem;
        position: absolute;
        top: 50%;
        left: 50%;
        border-inline-end-color: #0000;
        background: lightblue;
      }
    }
  `,
  template: `
    <div class="spinner-container">
      <div class="overlay">

      </div>
      <div class="spinner-grow" role="status">
        <span class="visually-hidden">Loading…</span>
      </div>
    </div>
  `,
})
export class Spinner {
}
