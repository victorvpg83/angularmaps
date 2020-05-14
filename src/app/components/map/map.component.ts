import { Component, OnInit } from '@angular/core';
import { Marker } from '../../classes/marker.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapEditComponent } from './map-edit.component';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  markers: Marker[] = []

  lat = 51.678418;
  lng = 7.809007;

  constructor( private snackBar: MatSnackBar,
               public dialog: MatDialog ) {

    if ( localStorage.getItem( 'markers' ) ) {
      this.markers = JSON.parse( localStorage.getItem( 'markers' ) )
    }

   }

  ngOnInit(): void {
  }

  addMarker( event ) {

    const coords: { lat: number, lng: number } = event.coords

    const newMarker = new Marker( coords.lat, coords.lng )
    this.markers.push( newMarker )
    this.saveStorage()
    this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000 });
  }

  deleteMarker( i: number ) {
    this.markers.splice( i, 1 )
    this.saveStorage()
    this.snackBar.open('Marcador borrado', 'Cerrar', { duration: 3000 });
  }

  editMarker( marker: Marker ) {

    const dialogRef = this.dialog.open( MapEditComponent, {
      width: '250px',
      data: {title: marker.title, desc: marker.desc}
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( !result ) { return }

      marker.title = result.title
      marker.desc = result.desc

      this.saveStorage()
      this.snackBar.open('Marcador actualizado', 'Cerrar', { duration: 3000 });

    });
  }

  saveStorage() {
    localStorage.setItem('markers', JSON.stringify( this.markers ))
  }

}
