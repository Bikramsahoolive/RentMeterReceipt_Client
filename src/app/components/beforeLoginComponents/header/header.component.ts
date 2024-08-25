import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth Service/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public authService:AuthServiceService){}

  deferredPrompt:any;
  showPopup:boolean=false;

  ngOnInit(){
    localStorage.setItem('connect.rid',btoa('false'));
      this.authService.setHeader();

      window.addEventListener('beforeinstallprompt',(event:any)=>{
        event.preventDefault();
        this.deferredPrompt = event;
        const currentTime = String(Date.now());
        const setTime = localStorage.getItem('app-prompt')||'';
        if(currentTime >= setTime){
        Swal.fire({
          html:` <span> Get best experience! Install RentⓝMeter.Receipt for offline use and enjoy faster access. <br>
          <strong>Install App Now !</strong>
          </span>  `,
          showCloseButton:true,
          confirmButtonText:"Install",
          position:'top'
        })
        .then((res)=>{
          if(res.isConfirmed){
            this.deferredPrompt.prompt();
            localStorage.removeItem('app-prompt');
            this.deferredPrompt.userChoice.then((choiceResult:any)=>{
              if(choiceResult.outcome ==='accepted'){
                console.log("app installed");
              }else{
            const timeer = String(Date.now()+86400000);
            localStorage.setItem('app-prompt',timeer);
              }
            })
          }else{
            const timeer = String(Date.now()+86400000);
            localStorage.setItem('app-prompt',timeer);
          }
        })
      }
  })
 }
  dropdownToggle(dropdown:any,tglBtn:any)
  {
    dropdown.classList.toggle('open');
    const isOpen = dropdown.classList.contains('open')

    tglBtn.classList = isOpen
            ? 'fa-solid fa-xmark'
            : 'fa-solid fa-bars'
  }
  hideMenu(dropdown:any,tglBtn:any){
    dropdown.classList='dropdown_menu';
    tglBtn.classList ='fa-solid fa-bars';
  }
  logout(){
    this.authService.logout();
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
