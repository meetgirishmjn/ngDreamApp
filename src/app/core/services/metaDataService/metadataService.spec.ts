import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MetadataService } from './metadataService';

describe('MetadataService', () => {

  let service: MetadataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule
      ],
      providers: [MetadataService],
      declarations: [

      ],
    });

    service = TestBed.get(MetadataService);

  }));

  it('should get widget list', async(() => {

    service.getWidgetList('').subscribe(o => {
      expect(o.length).toBeGreaterThan(0);
    });
    
  }));

});
