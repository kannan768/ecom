import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { VerifyloginComponent } from './verifylogin/verifylogin.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { authGuard } from './guards/auth.guard';
import { BodyComponent } from './body/body.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'verify',component:VerifyloginComponent},
  {path:'reset',component:ResetpasswordComponent},
{
    path: '',
    component: BodyComponent,  //allow sidenav 
    children: [
      { path: 'product', component: ProductComponent,canActivate:[authGuard] },
      { path: 'cart', component: CartComponent,canActivate:[authGuard] },
      { path: 'order', component: OrderComponent,canActivate:[authGuard] },
      { path: '', redirectTo: 'product', pathMatch: 'full', }
    ]
  }, { path: '**', redirectTo: 'login' }
];
