import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  site = null;
  path = null;
  parameter = null;
  data = null;
  // template = '';
  // style = '';
  // script = null;
  component = {
    template: '',
    style: '',
    script: null,
    footer: {
      template: '',
      style: '',
      script: null,
    },
    header: {
      template: '',
      style: '',
      script: null,
    }
  }
  page = 'home';
  layout: {
    template: '',
    pledge: '',
  }
  show = false;

}
