import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopupRepairbyorderPage } from './popup-repairbyorder.page';

describe('PopupRepairbyorderPage', () => {
  let component: PopupRepairbyorderPage;
  let fixture: ComponentFixture<PopupRepairbyorderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupRepairbyorderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupRepairbyorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
