import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RepairFinishMasterPage } from './repair-finish-master.page';

describe('RepairFinishMasterPage', () => {
  let component: RepairFinishMasterPage;
  let fixture: ComponentFixture<RepairFinishMasterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairFinishMasterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RepairFinishMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
