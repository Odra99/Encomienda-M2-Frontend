import { Component, OnInit } from '@angular/core';
import { Sucursal } from 'src/app/data/model/general';
import { SucursalService } from 'src/app/services/backend/sucursal.service';

interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  },
  options:any
};

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{

  constructor(
    private sucursalService: SucursalService){

  }
  mapOptions: google.maps.MapOptions = {
    center: { lat: 14.634915, lng:-90.506882 },
    zoom: 8,
    
  };

  markers: MarkerProperties[] = [
  ];

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.sucursalService.listAllHttp({}).subscribe({
      next: (value) => {
       let sucursales = <Sucursal[]> value.body.result;

       sucursales.forEach(element => {
         this.markers.push({position:{lat: element.latitud,lng: element.longitud},options:{
          icon: 'assets/icons/location.png',
          label: {
          text: element.nombre,
          className: 'mark-label',
          color: '#3374AC',
          fontSize: '12px',
          fontWeight: '700',
        
        }}})
       });

      },
      error: () => {
      },
    });
  }
}
