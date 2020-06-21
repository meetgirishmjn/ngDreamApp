import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { of } from 'rxjs';
import { delay } from "rxjs/operators"
import { WidgetInfo } from '../../../framework-lib';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.metadataApiEndpoint;
  }

  getWidgetList(search: string) {
    const results: WidgetInfo[] = [
      {
        id: "dimpleJS",
        name: 'Bar Chart',
        size:4,
        description: '',
        imageFile: 'chart-thumb.jpg',
        moduleFile: 'widgetModule.js',
        scriptFiles: ['d3.v4.min.js','dimple.v2.3.0.min.js'],
        styleFiles: []
      },
      {
        id: "pieChart",
        name: 'Pie Chart',
        size: 2,
        description: '',
        imageFile: 'pie-thumb.png',
        moduleFile: 'widgetModule.js',
        scriptFiles: ['Chart.min.js'],
        styleFiles: []
      }
    ];

    //resolve assets path
    results.forEach(o => o.imageFile = `assets/widget-plugins/${o.id}/${o.imageFile}`);
    results.forEach(o => o.moduleFile = `assets/widget-plugins/${o.id}/${o.moduleFile}`);
    results.forEach(o => o.styleFiles = o.styleFiles.map(file => `assets/widget-plugins/${o.id}/${file}`));
    results.forEach(o => o.scriptFiles = o.scriptFiles.map(file => `assets/widget-plugins/${o.id}/${file}`));

    return of(results).pipe(delay(100));
  }
}
