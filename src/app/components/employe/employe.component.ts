import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/models/employe/employe.model';
import { EmployeService } from '../../services/employe/employe.service';
import { SiteService } from '../../services/site/site.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormdialogEmployeComponent } from 'src/app/components/employe/formdialog/formdialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {

  employe : Employe;
  entete : string = '';
  addtitle : string = '';
  updatetitle : string = '';
  data : any[] = [];

  constructor(
    private employeService: EmployeService,
    private siteService: SiteService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.entete = "Employés";
      this.addtitle = "Nouvel employé";
      this.updatetitle = "Modification d'un employé";
     this.getData();
    });
  }

  getData() {
    this.employeService.getEmployes().subscribe((employes) => {
      var result = employes;
      for (let index = 0; index < employes.length; index++) {
        let element = employes[index].site;
        this.siteService.getSiteById(element).subscribe((site) => {
          result[index].site = site.name;
        });
      }
      this.data = result;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormdialogEmployeComponent,{
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

  add(data: Employe) {
    this.employeService.addEmploye(data).subscribe((employe) => {
      this.snackbar.open('Employé créé avec succès', 'success', {
        duration: 2000,
      });
      this.getData();
    });

  }

  update(row: { _id: String; }) {
    const dialogRef = this.dialog.open(FormdialogEmployeComponent,{
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
        this.employeService.updateEmploye(row._id, data).subscribe((employe) => {
          this.snackbar.open('Employé modifié avec succès', 'success', {
            duration: 2000,
          });
          this.getData();
        });
      }
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
    this.employeService.deleteEmploye(id).subscribe((employe) => {
      this.snackbar.open('Employé supprimé avec succès', 'success', {
        duration: 2000,
      });
      this.getData();
    });
  }
}
