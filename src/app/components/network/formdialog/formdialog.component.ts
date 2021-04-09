import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, FormGroupDirective, NgForm } from '@angular/forms';

@Component({
  selector: 'app-formdialog',
  templateUrl: './formdialog.component.html',
  styleUrls: ['./formdialog.component.css']
})
export class FormdialogNetworkComponent implements OnInit {

  entete: string = '';
  name: string = '';
  dialogForm: FormGroup;
  isUpdate : boolean= false;
  formValue : any;
  confirmButtonText = "Valider"
  cancelButtonText = "Annuler"

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<FormdialogNetworkComponent>, private formbuilder: FormBuilder) {
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
      name: ['', Validators.required]
    });
  }

  onConfirmClick(): void {
    var data;
    data = this.dialogForm.value;
    this.dialogRef.close(data);
  }

  ngOnInit():void {
    this.createForm();
    if(this.isUpdate) {
      this.dialogForm.patchValue(this.formValue);
    }
  }

}
