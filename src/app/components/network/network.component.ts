import { Component, OnInit } from '@angular/core';
import { Network } from 'src/app/models/network/network.model';
import { NetworkService } from '../../services/network/network.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormdialogNetworkComponent } from 'src/app/components/network/formdialog/formdialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  network : Network;
  entete : string = '';
  addtitle : string = '';
  updatetitle : string = '';
  data : any[] = [];
  constructor(
    private networkService: NetworkService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.entete = "Réseaux";
      this.addtitle = "Nouveau réseau";
      this.updatetitle = "Modification du réseau";
      this.networkService.getNetworks().subscribe((networks) => {
        this.data = networks;
      });
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormdialogNetworkComponent,{
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

  add(data: Network) {
    this.networkService.addNetwork(data).subscribe((network) => {
      this.snackbar.open('Réseau créé avec succès', 'success', {
        duration: 2000,
      });
      this.data.push(network);
    });

  }

  update(row: { _id: String; }) {
    const dialogRef = this.dialog.open(FormdialogNetworkComponent,{
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
        this.networkService.updateNetwork(row._id, data).subscribe((network) => {
          this.snackbar.open('Réseau modifié avec succès', 'success', {
            duration: 2000,
          });
          this.data = this.data.filter((value, key) => {
            return value._id !== network._id;
          });
          this.data.push(network);
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
    this.networkService.deleteNetwork(id).subscribe((network) => {
      this.snackbar.open('Réseau supprimé avec succès', 'success', {
        duration: 2000,
      });
      this.data = this.data.filter((value, key) => {
        return value._id !== network._id;
      });
    });
  }

}
