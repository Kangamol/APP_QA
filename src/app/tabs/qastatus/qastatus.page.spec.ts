import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QastatusPage } from './qastatus.page';

describe('QastatusPage', () => {
  let component: QastatusPage;
  let fixture: ComponentFixture<QastatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QastatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QastatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
