import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RepairFinishDetailPage } from './repair-finish-detail.page';

describe('RepairFinishDetailPage', () => {
  let component: RepairFinishDetailPage;
  let fixture: ComponentFixture<RepairFinishDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairFinishDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RepairFinishDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
