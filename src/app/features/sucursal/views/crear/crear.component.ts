import {
  Component,
  ViewChild,
  EventEmitter,
  Output,
  Input,
  SimpleChanges,
} from '@angular/core';
import { Ciudad, Sucursal, TipoSucursal } from 'src/app/data/model/general';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { SucursalService } from 'src/app/services/backend/sucursal.service';
import { TipoSucursalService } from 'src/app/services/backend/tipoSucursal.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';
import { CiudadService } from 'src/app/services/backend/ciudad.service';
import { E } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-crear-sucursal',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearSucursalComponent {
  constructor(
    private toasterService: ToasterService,
    private sucursalService: SucursalService,
    private ciudadesService: CiudadService,
    private tipoSucursalService: TipoSucursalService
  ) {}

  @Output() finishEvent = new EventEmitter<any>();
  @ViewChild('sucursalForm', { read: NgForm }) form!: NgForm;
  @Input() sucursalId: number;
  ciudadesSelect: Array<Ciudad> = new Array<Ciudad>();
  tipoSucursal: Array<TipoSucursal> = new Array<TipoSucursal>();
  sucursal: Sucursal = new Sucursal();
  list = true;

  ngOnInit(): void {
    if (this.sucursalId) {
      this.sucursalService.get(this.sucursalId).subscribe({
        next: (value) => {
          this.sucursal = value.result;
        },
        error: () => {
          this.toasterService.showGenericErrorToast();
        },
      });
    }
    this.llenarDatosCiudades();
    this.llenarTipoSucursal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sucursalId']) {
      this.sucursalService.get(changes['sucursalId'].currentValue).subscribe({
        next: (value) => {
          this.sucursal = value.result;
        },
        error: () => {
          this.toasterService.showGenericErrorToast();
        },
      });
    }
  }

  save() {
    this.form.form.markAllAsTouched();
    /*
    if (!this.form.form.valid) {
      return;
    }*/
    this.sucursalService.save(this.sucursal).subscribe({
      next: () => {
        if (!this.sucursal) {
          this.toasterService.show({
            message: 'Sucursal creada con exito',
            type: ToasterEnum.SUCCESS,
          });
        } else {
          this.toasterService.show({
            message: 'Cambios realizados con exito',
            type: ToasterEnum.SUCCESS,
          });
        }
        this.finish();
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }
  finish() {
    this.finishEvent.emit();
  }

  llenarDatosCiudades(): void {
    this.ciudadesService.listAllHttp({}).subscribe({
      next: (value) => {
        this.ciudadesSelect = value.body.result;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  llenarTipoSucursal(): void {
    this.tipoSucursalService.listAllHttp({}).subscribe({
      next: (value) => {
        this.tipoSucursal = value.body.result;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  Latlng = { lat: 14.634915, lng: -90.506882 };

  mapOptions: google.maps.MapOptions = {
    center: { lat: 14.634915, lng: -90.506882 },
    zoom: 8,
  };

  marker = {
    position: { lat: this.Latlng.lat, lng: this.Latlng.lng },
    options: {
      icon: 'assets/icons/location.png',
      label: {
        text: ""+this.Latlng.lat+","+this.Latlng.lng,
        className: 'mark-label',
        color: '#3374AC',
        fontSize: '12px',
        fontWeight: '700',
      },
    },
  };

  loadMarker = false

  setMarker(positionmap: any) {
    this.loadMarker = true
    let lat = positionmap.latLng.lat;
    let lng  = positionmap.latLng.lng;
    this.marker.position = {lat:lat,lng:lng}
    this.marker.options.label.text = ""+lat+","+lng;
    this.loadMarker = false
  }
}
