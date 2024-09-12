import { Component } from '@angular/core';
import { MessagingService } from './services/messaging-service/messaging.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RNMR';
  constructor(private messagingService: MessagingService) {}

  ngOnInit() {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
  }
}
