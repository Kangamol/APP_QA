import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopupQafinishPage } from './popup-qafinish.page';

describe('PopupQafinishPage', () => {
  let component: PopupQafinishPage;
  let fixture: ComponentFixture<PopupQafinishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupQafinishPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupQafinishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
