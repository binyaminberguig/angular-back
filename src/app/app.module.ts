import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';


import { AppComponent } from './app.component';
import { SiteComponent } from './components/site/site.component';
import { EmployeComponent } from './components/employe/employe.component';
import { IncidentComponent } from './components/incident/incident.component';
import { TechnicianComponent } from './components/technician/technician.component';
import { ServerComponent } from './components/server/server.component';
import { SoftwareComponent } from './components/software/software.component';
import { NetworkComponent } from './components/network/network.component';
import { MaterialComponent } from './components/material/material.component';
import { AuthComponent } from './components/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormdialogMaterialComponent } from './components/material/formdialog/formdialog.component';
import { FormdialogNetworkComponent } from './components/network/formdialog/formdialog.component';
import { FormdialogEmployeComponent } from './components/employe/formdialog/formdialog.component';
import { FormdialogTechnicianComponent } from './components/technician/formdialog/formdialog.component';
import { FormdialogServerComponent } from './components/server/formdialog/formdialog.component';
import { FormdialogSoftwareComponent } from './components/software/formdialog/formdialog.component';

import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { FormdialogIncidentComponent } from './components/incident/formdialog/formdialog.component';
import { MenuComponent } from './components/menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    SiteComponent,
    EmployeComponent,
    IncidentComponent,
    TechnicianComponent,
    ServerComponent,
    SoftwareComponent,
    NetworkComponent,
    MaterialComponent,
    AuthComponent,
    FormdialogMaterialComponent,
    FormdialogNetworkComponent,
    FormdialogEmployeComponent,
    FormdialogTechnicianComponent,
    FormdialogServerComponent,
    FormdialogSoftwareComponent,
    ConfirmationDialogComponent,
    FormdialogIncidentComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatGridListModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatSidenavModule,
    MatSelectModule,
    MatTooltipModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
