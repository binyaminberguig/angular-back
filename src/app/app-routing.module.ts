import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
import { EmployeComponent } from './components/employe/employe.component';
import { MaterialComponent } from './components/material/material.component';
import { ServerComponent } from './components/server/server.component';
import { SoftwareComponent } from './components/software/software.component';
import { TechnicianComponent } from './components/technician/technician.component';
import { NetworkComponent } from './components/network/network.component';
import { IncidentComponent } from './components/incident/incident.component';

const routes: Routes = [

  {
  path : 'login',
  component : AuthComponent
  },
  {
    path : 'app',
    children: [
      {
      path : 'employe',
      component : EmployeComponent
      },
      {
        path : 'material',
        component : MaterialComponent
      },
      {
        path : 'network',
        component : NetworkComponent
      },
      {
        path : 'server',
        component : ServerComponent
      },
      {
        path : 'software',
        component : SoftwareComponent
      },
      {
        path : 'technician',
        component : TechnicianComponent
      },
      {
        path : 'incident',
        component : IncidentComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
