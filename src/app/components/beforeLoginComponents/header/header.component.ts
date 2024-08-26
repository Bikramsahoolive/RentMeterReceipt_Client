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

  // deferredPrompt:any;
  showPopup:boolean=true;

  ngOnInit(){

      window.addEventListener('beforeinstallprompt',(event:any)=>{
        event.preventDefault();
        this.showPopup = false;
  });

  const openApp = ()=>{
    console.log(this.showPopup);
    
    localStorage.setItem('connect.rid',btoa('false'));
      this.authService.setHeader();
     
        const platform = /Android/i.test(navigator.userAgent)
        
        if( platform && this.showPopup && !window.matchMedia('(display-mode: standalone)').matches){
          Swal.fire({
            html:'<strong>Open RentⓝMeter.Receipt in App ?</strong>',
            position:'top',
            confirmButtonText:'Open App',
            showCancelButton:true,
            cancelButtonText:'Continue in Browser',
            allowOutsideClick:false
          })
          .then((res)=>{
            if(res.isConfirmed){
              let tag = document.createElement('a');
              tag.href = '/';
              tag.target = '_blank';
              tag.click();
              window.open('about:blank','_self');
            }
          })
        }
        }
        setTimeout(openApp,1000);
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
