import { Component, ElementRef, ViewChild } from '@angular/core';
import { timeout } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth Service/auth-service.service';
import { NetworkStatusService } from 'src/app/services/network-status-service/network-status.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('internetStatus')internetStatus!:ElementRef;
  @ViewChild('internetIcon')internetIcon!:ElementRef;
  @ViewChild('internetMsg')internetMsg!:ElementRef;
  @ViewChild('dropBackground')dropBackground!:ElementRef;

  constructor(public authService:AuthServiceService , private networkStatus:NetworkStatusService){}

  ngAfterViewInit(){
    let timmer:any;
    this.networkStatus.onlineStatus.subscribe(isOnline=>{
      if(isOnline===true){
        this.internetStatus.nativeElement.style.backgroundColor = "#0c791eba";
        this.internetIcon.nativeElement.innerHTML = 'wifi';
        this.internetMsg.nativeElement.innerHTML = "Back to online";
        timmer = setTimeout(()=>{
          this.internetStatus.nativeElement.classList.remove('internet-show');
          timmer=undefined;
        },4000);
      }else{
        if(timmer!==undefined){
          clearTimeout(timmer);
        console.log('timeout cleared');
        }
        this.internetStatus.nativeElement.style.backgroundColor = "rgb(167 0 0 / 70%)";
        this.internetStatus.nativeElement.classList.add('internet-show');
        this.internetIcon.nativeElement.innerHTML = 'wifi_off';
        this.internetMsg.nativeElement.innerHTML = "No internet connection";
      }
      
      
    })
  }

  deferredPrompt:any;
  showPopup:boolean=true;
Toast:any;
  ngOnInit(){
     this.Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }, 
          willClose:(toast) => {
            // Prevent closing by immediately reopening the toast
            this.Toast.fire({
              icon: "warning",
              title: "Hang on! Waking server...",
            });
          },
        });
        this.Toast.fire({
          icon: "warning",
          title: "Hang on! Waking Server up..."
        });
    this.checkServer();
    window.addEventListener('beforeinstallprompt',(event:any)=>{
      event.preventDefault();
      this.showPopup = false;
      this.deferredPrompt = event;
      const currentTime = String(Date.now());
      const setTime = localStorage.getItem('app-prompt')||'';
      if(currentTime >= setTime){

        setTimeout(()=>{

          Swal.fire({
            html:` <span> RentⓝMeter.Receipt in App Available ! Get best experience,and  enjoy faster access.<br><br>
            <strong>Install RNMR App Now!</strong>
            </span>  `,
            showCloseButton:true,
            confirmButtonText:"Download App",
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

        },6000);
      
    }
});

  const openApp = ()=>{
    
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
        setTimeout(openApp,3000);

        



        
 }
  dropdownToggle(dropdown:any,tglBtn:any)
  {
    dropdown.classList.toggle('open');
    const isOpen = dropdown.classList.contains('open')

    tglBtn.classList = isOpen
            ? 'fa-solid fa-xmark'
            : 'fa-solid fa-bars'
            if(isOpen){
              this.dropBackground.nativeElement.style.display = "unset";
            }else{
              this.dropBackground.nativeElement.style.display = "none";
            }
  }
  hideMenu(dropdown:any,tglBtn:any){
    dropdown.classList='dropdown_menu';
    tglBtn.classList ='fa-solid fa-bars';
    this.dropBackground.nativeElement.style.display = "none";
  }
  logout(){
    this.authService.logout();
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  checkServer(){

        this.authService.serverStatus().subscribe({
          next:(res:any)=>{
            if(res.status && res.status !=="OK"){
              if(this.isRechecked){
                this.Toast.close();
                const Toast1 = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                // timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
                willClose:(toast) => {
                  // Prevent closing by immediately reopening the toast
                  Toast1.fire({
                    icon: "error",
                    title: "Server is temporarily down!"
                  });
                },
              });
              Toast1.fire({
                icon: "error",
                title: "Server is temporarily down!"
              });
              }
              
              this.reCheckServer();
            }else{
              clearInterval(this.intervalTimmer);
              this.isRechecked = true;
              this.Toast.close();
              const Toast2 = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                // showCloseButton:true,
                // timer: 3000,
                // timerProgressBar: true,
                // didOpen: (toast) => {
                //   toast.onmouseenter = Swal.stopTimer;
                //   toast.onmouseleave = Swal.resumeTimer;
                // }
              });
              Toast2.fire({
                icon: "success",
                title: "Server is up and running..."
              });

              setTimeout(()=>Toast2.close(),7000);
            }
          },
          error:(err:any)=>{
            console.log(err.error);
            if(this.isRechecked){
              this.Toast.close();
              const Toast1 = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                // timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
                willClose:(toast) => {
                  // Prevent closing by immediately reopening the toast
                  Toast1.fire({
                    icon: "error",
                    title: "Server is temporarily down!"
                  });
                },
              });
              Toast1.fire({
                icon: "error",
                title: "Server is temporarily down!"
              });
            }
              
              this.reCheckServer();

          }
        });
  }

  isRechecked=true;
intervalTimmer:any;
  reCheckServer(){
    if(this.isRechecked){
      this.isRechecked = false;
      this.intervalTimmer = setInterval(()=>this.checkServer(),5000);
    }
  }
}
