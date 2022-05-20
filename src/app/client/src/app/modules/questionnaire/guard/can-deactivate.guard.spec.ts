import { TestBed } from '@angular/core/testing';

import {
  CanDeactivateGuard,
  ComponentDeactivate,
} from './can-deactivate.guard';
import { ResourceService } from '@sunbird/shared';

class MockComponent implements ComponentDeactivate {
  // Set this to the value you want to mock being returned from GuardedComponent
  returnValue: boolean;
  unloadNotification($event: any) {
    if (!this.canDeactivate) {
      $event.returnValue = true;
    }
  }

  canDeactivate(): boolean {
    return this.returnValue;
  }
}

// Old One
xdescribe('CanDeactivateGuard', () => {
  let service;
  let mockComponent: MockComponent;
  const resourceBundle = {
    frmelmnts: {
      lbl: {
        confirmBackClick: 'Confirm',
      },
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        CanDeactivateGuard,
        MockComponent,
        { provide: ResourceService, useValue: resourceBundle },
      ],
    });
    service = TestBed.inject(CanDeactivateGuard);
    mockComponent = TestBed.inject(MockComponent);
  });

  it('expect service to instantiate', () => {
    expect(service).toBeTruthy();
    mockComponent.returnValue = false;
    expect(service.canDeactivate(mockComponent)).toBeFalsy();
  });

  it('expect service to canDeactivate', () => {
    mockComponent.returnValue = true;
    expect(service.canDeactivate(mockComponent)).toBeTruthy();
  });

  it('expect to call ComponentDeactivate', () => {
    spyOn(mockComponent, 'canDeactivate').and.callFake(() => {
      return false;
    });
    spyOn(mockComponent, 'unloadNotification').and.callThrough();
    const event = {returnValue: false};
    mockComponent.unloadNotification(event);
    expect(mockComponent.unloadNotification).toHaveBeenCalled();
  });
});
