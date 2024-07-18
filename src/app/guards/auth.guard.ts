import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const isLogged = localStorage.getItem('islogin');
    if (isLogged === 'false' || !isLogged) {
      alert("Please login, redirecting to login page!!");
      router.navigate(['login']);
      return false;
    }
    return true;
  }

  // Default behavior if not in the browser (SSR or other environment)
  return false;
};
