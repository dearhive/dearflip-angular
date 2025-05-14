import { Component, Input, OnInit } from '@angular/core';
import JQueryStatic from 'jquery';


// Define types for DEARFLIP global object
declare global {
  interface Window {
    DEARFLIP: {
      jQuery: JQueryStatic;
    }
  }

  interface JQuery {
    flipBook(source: string, options?: DearFlipOptions): any;
  }
}

// Define DearFlip options interface
export interface DearFlipOptions {
  // Core settings
  source: string;
  height?: number;
  width?: number;
  duration?: number;
  webgl?: boolean;

  // UI options
  autoEnableOutline?: boolean;
  autoEnableThumbnail?: boolean;
  backgroundColor?: string;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;

  // Controls
  moreControls?: ('download' | 'pageMode' | 'startPage' | 'endPage' | 'sound')[];
  hideControls?: ('thumbnail' | 'outline' | 'startPage' | 'endPage' | 'pageNumber')[];

  // Behavior
  autoPlay?: boolean;
  autoPlayDuration?: number;
  autoPlayStart?: boolean;

  // Additional options
  transparent?: boolean;
  hard?: string | boolean;
  overwritePDFOutline?: boolean;
  enableDownload?: boolean;
  enableAnnotation?: boolean;
  enableNavigation?: boolean;

  // Callbacks
  onFlip?: (flipbook: any) => void;
  onReady?: (flipbook: any) => void;
}

// Define FlipBook object returned by the flipBook method
export interface FlipBook {
  dispose(): void;
}

@Component({
  selector: 'app-dearflip-viewer',
  standalone: true,
  imports: [],
  templateUrl: './dearflip-viewer.component.html',
  styleUrl: './dearflip-viewer.component.css'
})
export class DearflipViewerComponent implements OnInit {
  @Input() options: DearFlipOptions = { source: '/pdf/the-three-muskeeteers.pdf' };

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      window.DEARFLIP.jQuery('#my-dflip-viewer').flipBook(this.options.source, this.options);
    }, 100);
  }
}
