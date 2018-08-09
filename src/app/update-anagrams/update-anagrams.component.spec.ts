import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAnagramsComponent } from './update-anagrams.component';

describe('UpdateAnagramsComponent', () => {
  let component: UpdateAnagramsComponent;
  let fixture: ComponentFixture<UpdateAnagramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAnagramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAnagramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
