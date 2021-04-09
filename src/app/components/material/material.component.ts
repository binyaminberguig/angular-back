import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/models/material/material.model';
import { MaterialService } from '../../services/material/material.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormdialogMaterialComponent } from 'src/app/components/material/formdialog/formdialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  material : Material;
  entete : string = '';
  addtitle : string = '';
  updatetitle : string = '';
  data : any[] = [];
  constructor(
    private materialService: MaterialService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.entete = "Matériels";
      this.addtitle = "Nouveau matériel";
      this.updatetitle = "Modification du matériel";
      this.materialService.getMaterials().subscribe((materials) => {
        this.data = materials;
      });
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormdialogMaterialComponent,{
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

  add(data: Material) {
    this.materialService.addMaterial(data).subscribe((material) => {
      this.snackbar.open('Matériel créé avec succès', 'success', {
        duration: 2000,
      });
      this.data.push(material);
    });

  }

  update(row: { _id: String; }) {
    const dialogRef = this.dialog.open(FormdialogMaterialComponent,{
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
        this.materialService.updateMaterial(row._id, data).subscribe((material) => {
          this.snackbar.open('Matériel modifié avec succès', 'success', {
            duration: 2000,
          });
          this.data = this.data.filter((value, key) => {
            return value._id !== material._id;
          });
          this.data.push(material);
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
    this.materialService.deleteMaterial(id).subscribe((material) => {
      this.snackbar.open('Matériel supprimé avec succès', 'success', {
        duration: 2000,
      });
      this.data = this.data.filter((value, key) => {
        return value._id !== material._id;
      });
    });
  }

}
