import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopupSelectrepairPage } from './popup-selectrepair.page';

describe('PopupSelectrepairPage', () => {
  let component: PopupSelectrepairPage;
  let fixture: ComponentFixture<PopupSelectrepairPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupSelectrepairPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupSelectrepairPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
