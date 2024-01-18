import { Component } from '@angular/core';
import{Router} from '@angular/router'
@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})
export class MainTableComponent {
searchTerm:any='';
datalist:any;
userMessage:undefined | string;
confirm:boolean|undefined;
totalLength:any;
page:number=1
userService:any;
constructor(/*private userService:UserService,*/  private router:Router){
}
  userDetails(data:any)
  {
    
  }
  ngOnInit(){
    this.userService.getUserData().subscribe(()=>{
      // this.datalist=result;
    })
  }
  updateUser(id:any){
    this.router.navigate(['/update/'+id]);
  }
  deleteData(id:number)
  {
    this.confirm = confirm("Are You Sure! This Action Is irreversible.");
    if(this.confirm){
      this.userService.deleteUserData(id).subscribe(()=>{
      this.userMessage="User Deleted Successfully";
        this.ngOnInit();
    });
    setTimeout(()=>{
      this.userMessage=undefined;
    },5000)

    }
  }
  dataFilter(selector:string)
  {
    
    if(selector==="0"){
      this.ngOnInit();
    }
    if(selector==="1"){
      this.datalist.reverse();
    }
    if(selector==="2"){
      this.datalist.sort((a:any,b:any)=>{
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if(nameA<nameB){
          return -1;
        }else if(nameA>nameB){
          return 1;
        }else{
          return 0;
        }
      });
    }
    if(selector==="3"){
      this.datalist.sort((a:any,b:any)=>{
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if(nameA<nameB){
          return 1;
        }else if(nameA>nameB){
          return -1;
        }else{
          return 0;
        }
      });
    }
  }

  openSearch(box:any,input:any){
    console.log(input);
   
    box.classList.forEach((item:string)=>{
      
        if (item==='open' && input.value==""){

          input.classList.add('hide')

          setTimeout(()=>input.classList.add('hide'),800)
          
          box.classList.remove('open');
        }else{
          box.classList.add('open');
          setTimeout(() => {
            input.classList.remove('hide');
            input.focus();
          }, 800);
        }
      
    
    });
  }
}
