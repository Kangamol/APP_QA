import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReceiveRepairPage } from './receive-repair.page';

describe('ReceiveRepairPage', () => {
  let component: ReceiveRepairPage;
  let fixture: ComponentFixture<ReceiveRepairPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveRepairPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReceiveRepairPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
