import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ApplicationFormComponent } from './application/application-form/application-form.component';
import { DocumentUploadComponent } from './documents/document-upload/document-upload.component';
import { AppliccationStatusComponent } from './application/application-status/status.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'i/login',pathMatch:'full' }, // redirect to /login or any default page
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'application', component: ApplicationFormComponent },
  { path: 'documents', component: DocumentUploadComponent },
  { path: 'status', component: ApplicationStatusComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' } // Catch-all route for non-existent paths.
];
@Nmodule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
