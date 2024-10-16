import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth Service/auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  // let router =inject(Router);
  let authServ = inject(AuthServiceService);

  authServ.checkSession();
  authServ.checkLandlordSession();

  let data:any =  localStorage.getItem('connect.rid');
  data = atob(data);
   if(data !=='false'){
      return true;
  }
  return false;
};
