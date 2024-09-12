import { Component } from '@angular/core';
import { MessagingService } from './services/messaging-service/messaging.service';
import { SwUpdate } from '@angular/service-worker';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RNMR';
  constructor(private updates: SwUpdate, private messagingService: MessagingService) {
    this.updates.versionUpdates.subscribe(event => {
      Swal.fire({
        text:'A New Version Was Found.',
        confirmButtonText:'Update'
      }).then(()=>{
        window.location.reload();
      });
    });
  }

  ngOnInit() {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
  }
}
