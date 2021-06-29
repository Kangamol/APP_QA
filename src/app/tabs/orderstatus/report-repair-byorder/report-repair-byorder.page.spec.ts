import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportRepairByorderPage } from './report-repair-byorder.page';

describe('ReportRepairByorderPage', () => {
  let component: ReportRepairByorderPage;
  let fixture: ComponentFixture<ReportRepairByorderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportRepairByorderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportRepairByorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
