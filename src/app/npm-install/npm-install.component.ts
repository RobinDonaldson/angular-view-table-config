import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-npm-install',
  templateUrl: './npm-install.component.html',
  styleUrls: ['./npm-install.component.css']
})
export class NpmInstallComponent implements OnInit {

  @Output() copiedToClipboard: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
