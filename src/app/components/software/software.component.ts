import { Component, OnInit } from '@angular/core';
import { Software } from 'src/app/models/software/software.model';
import { SoftwareService } from '../../services/software/software.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormdialogSoftwareComponent } from 'src/app/components/software/formdialog/formdialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit {

  software : Software;
  entete : string = '';
  addtitle : string = '';
  updatetitle : string = '';
  data : any[] = [];
  constructor(
    private softwareService: SoftwareService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.entete = "Logiciels";
      this.addtitle = "Nouveau logiciel";
      this.updatetitle = "Modification du logiciel";
      this.softwareService.getSoftwares().subscribe((softwares) => {
        this.data = softwares;
      });
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormdialogSoftwareComponent,{
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

  add(data: Software) {
    this.softwareService.addSoftware(data).subscribe((software) => {
      this.snackbar.open('Logiciel créé avec succès', 'success', {
        duration: 2000,
      });
      this.data.push(software);
    });

  }

  update(row: { _id: String; }) {
    const dialogRef = this.dialog.open(FormdialogSoftwareComponent,{
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
        console.log('testest', data);
        this.softwareService.updateSoftware(row._id, data).subscribe((software) => {
          this.snackbar.open('Logiciel modifié avec succès', 'success', {
            duration: 2000,
          });
          this.data = this.data.filter((value, key) => {
            return value._id !== software._id;
          });
          this.data.push(software);
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
    this.softwareService.deleteSoftware(id).subscribe((software) => {
      this.snackbar.open('Logiciel supprimé avec succès', 'success', {
        duration: 2000,
      });
      this.data = this.data.filter((value, key) => {
        return value._id !== software._id;
      });
    });
  }

}
