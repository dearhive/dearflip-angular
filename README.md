# DearFlip PDF Viewer Angular Integration

This project demonstrates how to integrate the DearFlip PDF viewer into an Angular application.

## Prerequisites

- Angular 19.x+
- DearFlip PDF viewer library (JS & CSS)
- A PDF file to display

## Installation

1. Create a new Angular project or use an existing one:
   ```bash
   ng new my-dearflip-app
   cd my-dearflip-app
   ```

2. Create a `public` folder in the root of your project and add the following structure:
   ```
   public/
   ├── dflip/
   │   ├── css/
   │   │   └── dflip.css
   │   ├── js/
   │   │   ├── libs/
   │   │   │   └── jquery.min.js
   │   │   └── dflip.js
   │   ├── images/
   │   └── sound/
   └── pdf/
       └── your-pdf-file.pdf
   ```

3. Download the DearFlip library from the official source and place the files in the `public/dflip/` directory.

4. Update your `angular.json` to include the public assets:
   ```json
   "assets": [
     {
       "glob": "**/*",
       "input": "public"
     }
   ]
   ```

5. Include DearFlip CSS and JavaScript files in your `index.html`:
   ```html
   <head>
     <!-- Other head elements -->
     <link rel="stylesheet" href="dflip/css/dflip.css">
   </head>
   <body>
     <!-- App root -->
     <script src="dflip/js/libs/jquery.min.js"></script>
     <script src="dflip/js/dflip.js"></script>
   </body>
   ```

## Creating the DearFlip Viewer Component

1. Generate a new component:
   ```bash
   ng generate component dearflip-viewer
   ```

2. Create the component template (`dearflip-viewer.component.html`):
   ```html
   <div id="my-dflip-viewer"></div>
   ```

3. Add styles to the component (`dearflip-viewer.component.css`):
   ```css
   :host {
     display: block;
     width: 100%;
   }

   #my-dflip-viewer {
     width: 100%;
     height: 100%;
     min-height: 500px;
   }
   ```

4. Implement the component with TypeScript typings (`dearflip-viewer.component.ts`):
   ```typescript
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

     constructor() {}

     ngOnInit() {
       setTimeout(() => {
         window.DEARFLIP.jQuery('#my-dflip-viewer').flipBook(this.options.source, this.options);
       }, 100);
     }
   }
   ```

## Using the DearFlip Viewer Component

In your main component:

1. Import the DearflipViewerComponent and DearFlipOptions:
   ```typescript
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
   ```

2. Use the component in your template:
   ```html
   <main class="main">
     <h1 class="title">{{title}}</h1>
     <app-dearflip-viewer [options]="dflipOptions"></app-dearflip-viewer>
   </main>
   ```

## Configuration Options

The DearFlip viewer supports numerous configuration options. Here are some of the most commonly used:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| source | string | null | Path to the PDF file |
| height | number | null | Height of the viewer |
| width | number | null | Width of the viewer |
| webgl | boolean | true | Whether to use WebGL rendering |
| autoEnableOutline | boolean | false | Auto enable document outline |
| autoEnableThumbnail | boolean | false | Auto enable thumbnails |
| backgroundColor | string | '#FFFFFF' | Background color of the viewer |
| paddingTop | number | 0 | Top padding in pixels |
| paddingBottom | number | 0 | Bottom padding in pixels |

For a complete list of options, refer to the [DearFlip documentation](https://js.dearflip.com/docs/).

## Troubleshooting

### Common Issues

1. **PDF not loading**
   - Ensure the PDF path is correct and the file exists in the specified location
   - Check for console errors related to CORS issues

2. **DearFlip not initializing**
   - Verify that all the required DearFlip files are correctly included in the project
   - Check if the jQuery library is loaded before the DearFlip script

3. **Styling issues**
   - Make sure the DearFlip CSS file is correctly included
   - Check if your custom CSS is conflicting with DearFlip's styles

### Browser Compatibility

DearFlip works best on modern browsers that support WebGL. For older browsers, it automatically falls back to CSS 3D transformations.

## License

Make sure to adhere to the DearFlip license terms when using their library in your project.

## Additional Resources

- [DearFlip Official Documentation](https://js.dearflip.com/docs/)
- [DearFlip Demo Examples](https://js.dearflip.com/flipbook-examples/)
