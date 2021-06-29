import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RepairstatusPage } from './repairstatus.page';

describe('RepairstatusPage', () => {
  let component: RepairstatusPage;
  let fixture: ComponentFixture<RepairstatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairstatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RepairstatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
