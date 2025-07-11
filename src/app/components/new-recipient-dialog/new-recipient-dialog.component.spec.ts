import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecipientDialogComponent } from './new-recipient-dialog.component';

describe('NewRecipientDialogComponent', () => {
  let component: NewRecipientDialogComponent;
  let fixture: ComponentFixture<NewRecipientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRecipientDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRecipientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
