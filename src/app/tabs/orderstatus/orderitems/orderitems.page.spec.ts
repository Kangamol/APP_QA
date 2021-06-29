import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderitemsPage } from './orderitems.page';

describe('OrderitemsPage', () => {
  let component: OrderitemsPage;
  let fixture: ComponentFixture<OrderitemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderitemsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderitemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
