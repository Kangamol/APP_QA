import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopupReportrepairItemPage } from './popup-reportrepair-item.page';

describe('PopupReportrepairItemPage', () => {
  let component: PopupReportrepairItemPage;
  let fixture: ComponentFixture<PopupReportrepairItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupReportrepairItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupReportrepairItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
