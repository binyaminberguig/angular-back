import { Component, OnInit } from '@angular/core';
import { Incident } from 'src/app/models/incident/incident.model';
import { IncidentService } from '../../services/incident/incident.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormdialogIncidentComponent } from 'src/app/components/incident/formdialog/formdialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { EmployeService } from '../../services/employe/employe.service';
import { TechnicianService } from '../../services/technician/technician.service';
import { SiteService } from '../../services/site/site.service';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit {

  incident : Incident;
  entete : string = '';
  addtitle : string = '';
  updatetitle : string = '';
  data : any[] = [];
  constructor(
    private incidentService: IncidentService,
    private technicianService: TechnicianService,
    private siteService: SiteService,
    private employeService: EmployeService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.entete = "Incidents";
      this.addtitle = "Nouvel incident";
      this.updatetitle = "Modification de l'incident";
      this.getData();
    });
  }

  getData() {
    this.incidentService.getIncidents().subscribe((incidents) => {
      var result : any []= incidents;
      for (let index = 0; index < incidents.length; index++) {
        let technician = incidents[index].technician;
        this.technicianService.getTechnicianById(technician).subscribe((tech) => {
          result[index].technician = tech.name;
        });
        let employe = incidents[index].employe;
        this.employeService.getEmployeById(employe).subscribe((empl) => {
          result[index].employe = empl.name;
          this.siteService.getSiteById(empl.site).subscribe((site) => {
            result[index].site = site.name;
          });
        });
      }
      this.data = result;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormdialogIncidentComponent,{
      data:{
        entete: this.addtitle + ': ' ,
        buttonText: {
          ok: 'Valider',
          cancel: 'Annuler'
        },
        isUpdate : false,
      }
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.add(data);
      }
    });
  }

  add(data : any) {
    switch (data.type) {
      case 'Matériel':
       data.material = data.typedata;
        break;
      case 'Logiciel':
        data.software = data.typedata;
        break;
      case 'Serveur':
        data.server = data.typedata;
        break;
      case 'Réseau':
        data.network = data.typedata;
      break;
    }
    data.state = false;
    this.incidentService.addIncident(data).subscribe((incident) => {
      this.snackbar.open('Incident créé avec succès', 'success', {
        duration: 2000,
      });
      this.technicianService.getTechnicianById(incident.technician).subscribe((technician) => {
        this.employeService.getEmployeById(incident.employe).subscribe((employe) => {
          this.siteService.getSiteById(employe.site).subscribe((site) => {
            let params = {
              email : technician.mail,
              title: data.title,
              type: data.type,
              description: data.description,
              site : site.name,
            };
            this.incidentService.sendEmail(params).subscribe(
              respdata => {
                console.log('Notification envoyée');
              }
            );
          });
        });
      });
      this.getData();
    });

  }

  update(row: { _id: String; }) {
    const dialogRef = this.dialog.open(FormdialogIncidentComponent,{
      data:{
        entete:  this.updatetitle + ':',
        buttonText: {
          ok: 'Valider',
          cancel: 'Annuler'
        },
        isUpdate : true,
        row : row,
      }
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.incidentService.updateIncident(row._id, data).subscribe((incident) => {
          this.snackbar.open('Incident modifié avec succès', 'success', {
            duration: 2000,
          });
          this.getData();
        });
      }
    });
  }

  validate(row: { _id: string; }) {
    this.incidentService.getIncidentById(row._id).subscribe((incident) => {
      incident.date_resolution = new Date();
      incident.state = true;
      this.incidentService.updateIncident(row._id, incident).subscribe((result) => {
        this.snackbar.open('Incident résolu avec succès', 'success', {
          duration: 2000,
        });
        this.getData();
      });
    });
}

  openDialogForDelete(id : string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Etes-vous sûr de vouloir supprimer?',
        buttonText: {
          ok: 'Oui',
          cancel: 'Non'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.delete(id);
      }
    });
  }

  delete (id: string) {
    this.incidentService.deleteIncident(id).subscribe((incident) => {
      this.snackbar.open('Incident supprimé avec succès', 'success', {
        duration: 2000,
      });
      this.getData();
    });
  }

}
