import { Component, OnInit, ViewChild, ViewContainerRef, Input } from '@angular/core';

@Component({
  selector: 'app-content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.css']
})
export class ContentContainerComponent implements OnInit {

  @ViewChild('content', { read: ViewContainerRef })

  @Input()
  selector: string;

  @Input()
  settings: any;

  constructor() { }

  ngOnInit() {
  }

}
