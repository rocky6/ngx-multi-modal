import { NgxMultiModalDemoPage } from './app.po';

describe('ngx-multi-modal-demo App', () => {
  let page: NgxMultiModalDemoPage;

  beforeEach(() => {
    page = new NgxMultiModalDemoPage ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
