import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DearflipViewerComponent, DearFlipOptions } from "./dearflip-viewer/dearflip-viewer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DearflipViewerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dearflip-angular';
  /**
   * For more options, refer to the doc https://js.dearflip.com/docs/ 
   */
  dflipOptions: DearFlipOptions = {
    source: '/pdf/the-three-musketeers.pdf',
    height: 800,
    webgl: true,
    autoEnableOutline: false,
    autoEnableThumbnail: false,
    backgroundColor: '#FFFFFF',
    paddingTop: 30,
    paddingBottom: 30
  };
}
