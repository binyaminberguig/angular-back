import { Component, OnInit } from '@angular/core';
import { Server } from 'src/app/models/server/server.model';
import { ServerService } from '../../services/server/server.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormdialogServerComponent } from 'src/app/components/server/formdialog/formdialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  server : Server;
  entete : string = '';
  addtitle : string = '';
  updatetitle : string = '';
  data : any[] = [];
  constructor(
    private serverService: ServerService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.entete = "Serveurs";
      this.addtitle = "Nouveau serveur";
      this.updatetitle = "Modification du serveur";
      this.serverService.getServers().subscribe((servers) => {
        this.data = servers;
      });
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormdialogServerComponent,{
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

  add(data: Server) {
    this.serverService.addServer(data).subscribe((server) => {
      this.snackbar.open('Serveur créé avec succès', 'success', {
        duration: 2000,
      });
      this.data.push(server);
    });

  }

  update(row: { _id: String; }) {
    const dialogRef = this.dialog.open(FormdialogServerComponent,{
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
        this.serverService.updateServer(row._id, data).subscribe((server) => {
          this.snackbar.open('Réseau modifié avec succès', 'success', {
            duration: 2000,
          });
          this.data = this.data.filter((value, key) => {
            return value._id !== server._id;
          });
          this.data.push(server);
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
    this.serverService.deleteServer(id).subscribe((server) => {
      this.snackbar.open('Serveur supprimé avec succès', 'success', {
        duration: 2000,
      });
      this.data = this.data.filter((value, key) => {
        return value._id !== server._id;
      });
    });
  }

}
