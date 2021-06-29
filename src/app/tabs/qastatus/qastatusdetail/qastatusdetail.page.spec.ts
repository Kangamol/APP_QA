import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QastatusdetailPage } from './qastatusdetail.page';

describe('QastatusdetailPage', () => {
  let component: QastatusdetailPage;
  let fixture: ComponentFixture<QastatusdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QastatusdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QastatusdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
