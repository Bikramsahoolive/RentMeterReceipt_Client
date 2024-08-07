import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth Service/auth-service.service';
import { inject } from '@angular/core';

export const rentholderAuthGuard: CanActivateFn = (route, state) => {
  let router =inject(Router);
  let authServ = inject(AuthServiceService);

  authServ.checkSession();
  authServ.checkrentHolderSession();

  let data:any =  localStorage.getItem('connect.rid');
  data = atob(data);

  if(data !== false){
    return true;
  }
    return false;
  
};
