import { Component, Input, OnInit } from '@angular/core';
import { NgxModalStack, NgxActiveModal } from 'ngx-multi-modal';

@Component({
  selector: 'app-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.css']
})
export class TestModalComponent implements OnInit {

  public body = '';
  public content;

  public openFromString: (data: string) => void;
  public openFromComponent: () => void;

  constructor(public activeModal: NgxActiveModal, public modalService: NgxModalStack) { }

  ngOnInit() {
  }

}
