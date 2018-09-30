import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupChannelsComponent } from './group-channels.component';

describe('GroupChannelsComponent', () => {
    let component: GroupChannelsComponent;
    let fixture: ComponentFixture<GroupChannelsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GroupChannelsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupChannelsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
