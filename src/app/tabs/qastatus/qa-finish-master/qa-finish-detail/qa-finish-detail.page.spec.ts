import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QaFinishDetailPage } from './qa-finish-detail.page';

describe('QaFinishDetailPage', () => {
  let component: QaFinishDetailPage;
  let fixture: ComponentFixture<QaFinishDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaFinishDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QaFinishDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
