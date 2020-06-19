import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WidgetInfo } from './response-models';
import { environment } from '../../../../environments/environment';
import { of } from 'rxjs';
import { delay } from "rxjs/operators"

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
        id: "bar-chart",
        name: 'Bar Chart',
        size:4,
        description: '',
        imageFile: 'chart-thumb.jpg',
        moduleFile: 'index.js',
        scriptFiles: [],
        styleFiles: []
      }
    ];

    //resolve assets path
    results.forEach(o => o.imageFile = `assets/widgets/${o.id}/${o.imageFile}`);

    return of(results).pipe(delay(100));
  }
}
