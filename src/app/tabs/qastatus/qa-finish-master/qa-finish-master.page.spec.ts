import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QaFinishMasterPage } from './qa-finish-master.page';

describe('QaFinishMasterPage', () => {
  let component: QaFinishMasterPage;
  let fixture: ComponentFixture<QaFinishMasterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaFinishMasterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QaFinishMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
