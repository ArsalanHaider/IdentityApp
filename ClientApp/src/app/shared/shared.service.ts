import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService,ModalOptions } from 'ngx-bootstrap/modal';
import { NotificationComponent } from './components/models/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
bsModalRef?: BsModalRef;

  constructor(private modalService:BsModalService) { }

    showNotification(isSucess:boolean, title:string, message: string){
      const initialState: ModalOptions = {
        initialState : {
          isSucess,
          title,
          message
        }
      };

      this.bsModalRef = this.modalService.show(NotificationComponent,initialState);
    }
}
