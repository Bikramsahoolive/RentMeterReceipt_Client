import { CanActivateFn } from '@angular/router';
import { AuthServiceService } from '../services/auth Service/auth-service.service';
import { inject } from '@angular/core';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  let authServ = inject(AuthServiceService);

  authServ.checkSession();
  authServ.checkAdminSession();

  let data:any =  localStorage.getItem('connect.aid');
  data = atob(data);

  if(data !== false){
    return true;
  }
    return false;
};
