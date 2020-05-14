import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-map-edit',
  templateUrl: './map-edit.component.html',
  styleUrls: ['./map-edit.component.css']
})
export class MapEditComponent implements OnInit {

  forma: FormGroup

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<MapEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
      this.forma = fb.group({
        title: data.title,
        desc: data.desc
      })
    }

  ngOnInit(): void {
  }

  saveChanges() {
    this.dialogRef.close( this.forma.value )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
