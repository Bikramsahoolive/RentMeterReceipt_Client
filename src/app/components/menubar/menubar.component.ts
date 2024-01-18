import { Component } from '@angular/core';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent {
  toggleMenu(menubar:any)
  {
      menubar.classList.toggle('menu-open');
  }
}
