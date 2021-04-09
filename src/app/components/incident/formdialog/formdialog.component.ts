import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { TechnicianService } from '../../../services/technician/technician.service';
import { EmployeService } from '../../../services/employe/employe.service';
import { Technician } from 'src/app/models/technician/technician.model';
import { Employe } from 'src/app/models/employe/employe.model';
import { NetworkService } from '../../../services/network/network.service';
import { ServerService } from '../../../services/server/server.service';
import { SoftwareService } from '../../../services/software/software.service';
import { MaterialService } from '../../../services/material/material.service';

@Component({
  selector: 'app-formdialog',
  templateUrl: './formdialog.component.html',
  styleUrls: ['./formdialog.component.css']
})
export class FormdialogIncidentComponent implements OnInit {

  entete: string = '';
  title : String= '';
  date_creation : Date;
  date_resolution : String= '';
  state : String= '';
  description : String= '';
  type : String= '';
  material : String= '';
  network : String= '';
  software : String= '';
  server : String= '';
  employe : String= '';
  technician : String= '';
  employes : Employe[] = [] ;
  technicians : Technician[] = [] ;
  typedatas : any[] = [];
  dialogForm: FormGroup;
  isUpdate : boolean= false;
  formValue : any;
  confirmButtonText = "Valider"
  cancelButtonText = "Annuler"

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<FormdialogIncidentComponent>, private formbuilder: FormBuilder,
    private technicianService: TechnicianService, private employeService: EmployeService,
    private networkService: NetworkService, private serverService: ServerService, private softwareService: SoftwareService, private materialService: MaterialService) {
      if(data){
      this.entete = data.entete || this.entete;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
      if(data.row) {
        this.formValue = data.row;
      }

      if(data.isUpdate) {
        this.isUpdate = data.isUpdate;
      }
    }
  }

  private createForm() {
    this.dialogForm = this.formbuilder.group({
      title: ['', Validators.required],
      date_creation: [new Date().toLocaleDateString(), Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      typedata: ['', Validators.required],
      technician: ['', Validators.required],
      employe: ['', Validators.required],
    });
  }

  onConfirmClick(): void {
    var data;
    data = this.dialogForm.value;
    data.date_creation = new Date();
    this.dialogRef.close(data);
  }

  ngOnInit():void {
    this.createForm();
    this.technicianService.getTechnicians().subscribe((technicians) => {
      this.technicians = technicians;
    });
    this.employeService.getEmployes().subscribe((employes) => {
      this.employes = employes;
    });
    if(this.isUpdate) {
      this.dialogForm.patchValue(this.formValue);
    }
  }

  onTypeChanged():void{
    let type  = this.dialogForm.controls['type'].value;
    switch (type) {
      case 'Matériel':
        this.materialService.getMaterials().subscribe((materials) => {
          this.typedatas = materials;
        });
        break;
      case 'Logiciel':
        this.softwareService.getSoftwares().subscribe((softwares) => {
          this.typedatas = softwares;
        });
        break;
      case 'Serveur':
        this.serverService.getServers().subscribe((servers) => {
          this.typedatas = servers;
          console.log("type", servers);
        });
        break;
      case 'Réseau':
        this.networkService.getNetworks().subscribe((networks) => {
          this.typedatas = networks;
        });
      break;
    }
  }
}
