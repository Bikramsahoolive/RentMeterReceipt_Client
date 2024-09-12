import { Component } from '@angular/core';
import { MessagingService } from './services/messaging-service/messaging.service';
import { SwUpdate } from '@angular/service-worker';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RNMR';
  constructor(private messagingService: MessagingService,private updates:SwUpdate) {
    this.updates.activateUpdate().then(()=>document.location.reload());
  }

  ngOnInit() {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
  }
}
