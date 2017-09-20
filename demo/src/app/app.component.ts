import { Component, OnInit } from '@angular/core';
import { NgxModalOptions, NgxModalStack, ModalDismissReasons } from 'ngx-multi-modal';
import { TestModalComponent } from './test-modal/test-modal.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public closeResult: string;

  public options: NgxModalOptions = {
  };

  constructor(public modalService: NgxModalStack, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.modalService.onRegister.subscribe((index: number) => {

      const templateModal = this.modalService.get(index);
      const modalCount = this.modalService.count;

      // Register listeners
      templateModal.result.then((result) => {
        this.closeResult = `Modal closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Modal dismissed ${this.getDismissReason(reason)}`;
      });

      console.log('Modal Registered [index=' + index + '], modal count=' + modalCount);
    });

    this.modalService.onUnregister.subscribe((index: number) => {

      const modalCount = this.modalService.count;

      console.log('Modal Unregistered [index=' + index + '], modal count=' + modalCount);
    });
  }


  openFromString(data: string) {
    this.modalService.openFromString(data, this.options);
  }

  openFromTemplate(content) {

    const context = {
      body: 'One fine body..',
      customMethod: (param) => {console.log(param); }
    };

    this.modalService.openFromTemplate(content, context, this.options);

  }

  openFromComponent() {
    const templateModal = this.modalService.openFromComponent(TestModalComponent, this.options);
    templateModal.instance.body = 'Modal from component';
    templateModal.instance.openFromString = this.openFromString;
    templateModal.instance.openFromComponent = this.openFromComponent;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
