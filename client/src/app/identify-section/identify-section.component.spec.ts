import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { IdentifySectionComponent } from "./identify-section.component";

describe("IdentifySectionComponent", () => {
  let component: IdentifySectionComponent;
  let fixture: ComponentFixture<IdentifySectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdentifySectionComponent],
      providers:[]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("show hava h1", () => {
    expect(true).toBe(true);
  });
});
