import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Site } from 'src/app/models/site/site.model';
import { SiteService } from '../../../services/site/site.service';

@Component({
  selector: 'app-formdialog',
  templateUrl: './formdialog.component.html',
  styleUrls: ['./formdialog.component.css']
})
export class FormdialogEmployeComponent implements OnInit {

  entete: string = '';
  name: string = '';
  firstname : String= '';
  phone : String= '';
  job : String= '';
  site : String= '';
  dialogForm: FormGroup;
  isUpdate : boolean= false;
  formValue : any;
  confirmButtonText = "Valider"
  cancelButtonText = "Annuler"
  sites : Site[] = [] ;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<FormdialogEmployeComponent>, private formbuilder: FormBuilder, private siteService: SiteService) {
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
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      phone: ['', Validators.required],
      job: ['', Validators.required],
      site: ['', Validators.required]
    });
  }

  onConfirmClick(): void {
    var data;
    data = this.dialogForm.value;
    this.dialogRef.close(data);
  }

  ngOnInit():void {
    this.createForm();
    this.siteService.getSites().subscribe((sites) => {
      this.sites = sites;
    });
    if(this.isUpdate) {
      this.dialogForm.patchValue(this.formValue);
    }
  }

}
