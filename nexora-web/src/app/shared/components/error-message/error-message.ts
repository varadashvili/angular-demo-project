import {Component, input} from '@angular/core';

@Component({
  imports: [],
  selector: 'app-error-message',
  styles: `
    p {
      color: red;
    }
  `,
  template: `<p>{{ errorMsg() }}</p>`,
})
export class ErrorMessage {
  public errorMsg = input<string>('');
}
