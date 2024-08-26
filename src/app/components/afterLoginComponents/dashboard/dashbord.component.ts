import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent {
  deferredPrompt:any;
  constructor(){}
  ngOnInit(){
    window.addEventListener('beforeinstallprompt',(event:any)=>{
      event.preventDefault();
      this.deferredPrompt = event;
      const currentTime = String(Date.now());
      const setTime = localStorage.getItem('app-prompt')||'';
      if(currentTime >= setTime){
      Swal.fire({
        html:` <span> RentⓝMeter.Receipt in App Available ! Get best experience,and  enjoy faster access.<br><br>
        <strong>Install App Now</strong>
        </span>  `,
        showCloseButton:true,
        confirmButtonText:"Install",
        position:'top',
        allowOutsideClick:false
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
          });
        }else{
          const timeer = String(Date.now()+86400000);
          localStorage.setItem('app-prompt',timeer);
        }
      });
    }
});
  }
}
