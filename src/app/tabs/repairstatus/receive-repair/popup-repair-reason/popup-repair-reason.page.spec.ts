import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopupRepairReasonPage } from './popup-repair-reason.page';

describe('PopupRepairReasonPage', () => {
  let component: PopupRepairReasonPage;
  let fixture: ComponentFixture<PopupRepairReasonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupRepairReasonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupRepairReasonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
