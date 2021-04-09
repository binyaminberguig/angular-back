import { Component, OnInit } from '@angular/core';
import { Technician } from 'src/app/models/technician/technician.model';
import { TechnicianService } from '../../services/technician/technician.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormdialogTechnicianComponent } from 'src/app/components/technician/formdialog/formdialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.css']
})
export class TechnicianComponent implements OnInit {

  technician : Technician;
  entete : string = '';
  addtitle : string = '';
  updatetitle : string = '';
  data : any[] = [];
  constructor(
    private technicianService: TechnicianService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.entete = "Techniciens";
      this.addtitle = "Nouveau technicien";
      this.updatetitle = "Modification du technicien";
      this.technicianService.getTechnicians().subscribe((technicians) => {
        this.data = technicians;
      });
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormdialogTechnicianComponent,{
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

  add(data: Technician) {
    this.technicianService.addTechnician(data).subscribe((technician) => {
      this.snackbar.open('Technicien créé avec succès', 'success', {
        duration: 2000,
      });
      this.data.push(technician);
    });

  }

  update(row: { _id: String; }) {
    const dialogRef = this.dialog.open(FormdialogTechnicianComponent,{
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
        this.technicianService.updateTechnician(row._id, data).subscribe((technician) => {
          this.snackbar.open('Technicien modifié avec succès', 'success', {
            duration: 2000,
          });
          this.data = this.data.filter((value, key) => {
            return value._id !== technician._id;
          });
          this.data.push(technician);
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
    this.technicianService.deleteTechnician(id).subscribe((technician) => {
      this.snackbar.open('Technicien supprimé avec succès', 'success', {
        duration: 2000,
      });
      this.data = this.data.filter((value, key) => {
        return value._id !== technician._id;
      });
    });
  }

}
