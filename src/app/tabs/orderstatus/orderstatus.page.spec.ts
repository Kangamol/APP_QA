import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderstatusPage } from './orderstatus.page';

describe('OrderstatusPage', () => {
  let component: OrderstatusPage;
  let fixture: ComponentFixture<OrderstatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderstatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderstatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
