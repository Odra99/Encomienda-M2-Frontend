import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/backend/user.service';
import { DashboardService } from 'src/app/services/backend/dashboard.services';
import { Sucursal } from 'src/app/data/model/general';
import { ToasterService } from 'src/app/services/others/toaster.service';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
} from 'ng-apexcharts';

interface month {
  value: string;
  viewValue: string;
}

export interface salesOverviewChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

export interface yearlyChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

export interface monthlyChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

interface stats {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  productName: string;
  budget: number;
  priority: string;
}

// ecommerce card
interface productcards {
  id: number;
  imgSrc: string;
  title: string;
  price: string;
  rprice: string;
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Sunil Joshi',
    position: 'Web Designer',
    productName: 'Elite Admin',
    budget: 3.9,
    priority: 'low',
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Andrew McDownland',
    position: 'Project Manager',
    productName: 'Real Homes Theme',
    budget: 24.5,
    priority: 'medium',
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    uname: 'Christopher Jamil',
    position: 'Project Manager',
    productName: 'MedicalPro Theme',
    budget: 12.8,
    priority: 'high',
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    uname: 'Nirav Joshi',
    position: 'Frontend Engineer',
    productName: 'Hosting Press HTML',
    budget: 2.4,
    priority: 'critical',
  },
];

@Component({
  selector: 'app-dashboard-logistico',
  templateUrl: './dashboardLogistico.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class DashboardLogisticoComponent implements OnInit{

  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public salesOverviewChart!: Partial<salesOverviewChart> | any;
  public yearlyChart!: Partial<yearlyChart> | any;
  public monthlyChart!: Partial<monthlyChart> | any;

  displayedColumns: string[] = ['name', 'priority', 'budget'];
  dataSource = ELEMENT_DATA;

  months: month[] = [
    { value: 'mar', viewValue: 'March 2023' },
    { value: 'apr', viewValue: 'April 2023' },
    { value: 'june', viewValue: 'June 2023' },
  ];
  // recent transaction
  stats: stats[] = [
    {
      id: 1,
      time: '09.30 am',
      color: 'primary',
      subtext: 'Payment received from John Doe of $385.90',
    },
    {
      id: 2,
      time: '10.30 am',
      color: 'accent',
      title: 'New sale recorded',
      link: '#ML-3467',
    },
    {
      id: 3,
      time: '12.30 pm',
      color: 'success',
      subtext: 'Payment was made of $64.95 to Michael',
    },
    {
      id: 4,
      time: '12.30 pm',
      color: 'warning',
      title: 'New sale recorded',
      link: '#ML-3467',
    },
    {
      id: 5,
      time: '12.30 pm',
      color: 'error',
      title: 'New arrival recorded',
      link: '#ML-3467',
    },
    {
      id: 6,
      time: '12.30 pm',
      color: 'success',
      subtext: 'Payment Done',
    },
  ];
  public numeroPaquetesMes:number=0;
  public numeroPaquetes:number=0;

  public pesoPromedioMes:number=0;
  public pesoPromedio:number=0;

  public costoPromedioMes:number=0;
  public costoPromedio:number=0;

  public vehiculosTotales:number=0;
  public sucursalesTotales:number=0;
  public empleadosTotales:number=0;

  public paquetesEstado:any[]=[];
  public top5Sucursales:any[]=[];

  public paquetesEstadoGrafica:any[]=[];
public fecha:any= new Date();
  constructor(
    private userService:UserService,
    private dashboardService:DashboardService,
    private toasterService: ToasterService,
    ) {
    // sales overview chart GRAFICA DE BARRAS
    this.salesOverviewChart = {
      series: [
        {
          name: 'Eanings this month',
          data: [355, 1500, 300, 350, 390, 180, 355, 390],
          color: '#5D87FF',
        },
        {
          name: 'Expense this month',
          data: [280, 250, 325, 215, 250, 310, 280, 250],
          color: '#49BEFF',
        },
      ],

      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: '35%', borderRadius: [4] },
      },
      chart: {
        type: 'bar',
        height: 390,
        offsetX: -15,
        toolbar: { show: true },
        foreColor: '#adb0bb',
        fontFamily: 'inherit',
        sparkline: { enabled: false },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      legend: { show: false },
      xaxis: {
        type: 'category',
        categories: [
          '16/08',
          '17/08',
          '18/08',
          '19/08',
          '20/08',
          '21/08',
          '22/08',
          '23/08',
        ],
        labels: {
          style: { cssClass: 'grey--text lighten-2--text fill-color' },
        },
      },
      yaxis: {
        show: true,
        min: 0,
        max: 400,
        tickAmount: 4,
        labels: {
          style: {
            cssClass: 'grey--text lighten-2--text fill-color',
          },
        },
      },
      stroke: {
        show: true,
        width: 3,
        lineCap: 'butt',
        colors: ['transparent'],
      },
      tooltip: { theme: 'light' },

      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              },
            },
          },
        },
      ],
    };
    // yearly breakup chart
    // mohtly earnings chart
    /*this.monthlyChart = {
      series: [
        {
          name: '',
          color: '#fa896b',
          data: [25, 66, 20, 40, 12, 58, 20],
        },
      ],

      chart: {
        type: 'area',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 60,
        sparkline: {
          enabled: true,
        },
        group: 'sparklines',
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        colors: ['#E8F7FF'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
    };*/
  
    this.yearlyChart = {
      series: this.calcularArregloPaquetes(),

      chart: {
        type: 'donut',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 150,
      },
      colors: ['#5d87ff', '#13deb9', '#2a3547','#ffae1f','#fa896b'] ,
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          donut: {
            size: '75%',
            background: 'transparent',
          },
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 991,
          options: {
            chart: {
              width: 120,
            },
          },
        },
      ],
      tooltip: {
        enabled: true,
      },
    };

  }

  ngOnInit(): void {

    this.obtenerDatos(this.fecha.toString());
  }

  obtenerDatos(fecha:string){
   this.obtenerPaquetesEstado(fecha);
    this.obtenerNumeroPaquetes(fecha);
    this.obtenerPesoPromedio(fecha);
    this.obtenerCostoPromedio(fecha);
    this.obtenerVehiculosTotales();
    this.obtenersSucursalesTotales();
    this.obtenerEmpleadosTotales(fecha);
    this.obtenerTopSucursales(fecha);

  }

  obtenerNumeroPaquetes(fecha:any){
    var dateEmpt={ fecha: ''};
    var date={ fecha: ''};
    if(fecha!=''){
      
      date={
        fecha: new Date(fecha).toISOString().replaceAll('Z','')
      }
    }
    this.dashboardService.getNumeroPaquetes(date).subscribe({
      next: (value) => {
        this.numeroPaquetesMes = value.body.result.no_paquetes;
        
        //this.dataSource = new MatTableDataSource<Paquete>(this.tracking);
        //this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
    //TODOS
    this.dashboardService.getNumeroPaquetes(dateEmpt).subscribe({
      next: (value) => {
        this.numeroPaquetes = value.body.result.no_paquetes;
        //this.dataSource = new MatTableDataSource<Paquete>(this.tracking);
        //this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  obtenerPesoPromedio(fecha:any){
    var dateEmpt={ fecha: ''};
    var date={ fecha: ''};
    if(fecha!=''){
      date={
        fecha: new Date(fecha).toISOString().replaceAll('Z','')
      }
    }
    this.dashboardService.getPesoPromedio(date).subscribe({
      next: (value) => {
        this.pesoPromedioMes = value.body.result.peso;
        console.log(value);
        //this.dataSource = new MatTableDataSource<Paquete>(this.tracking);
        //this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });

    //TODOS
    this.dashboardService.getPesoPromedio(dateEmpt).subscribe({
      next: (value) => {
        this.pesoPromedio = value.body.result.peso;
        console.log(value);
        //this.dataSource = new MatTableDataSource<Paquete>(this.tracking);
        //this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  obtenerCostoPromedio(fecha:any){
    var dateEmpt={ fecha: ''};
    var date={ fecha: ''};
    if(fecha!=''){
      date={
        fecha: new Date(fecha).toISOString().replaceAll('Z','')
      }
    }
   
    this.dashboardService.getCostoPromedio(date).subscribe({
      next: (value) => {
        this.costoPromedioMes = value.body.result.costo.toFixed(2);
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
    //TODOS
    this.dashboardService.getCostoPromedio(dateEmpt).subscribe({
      next: (value) => {
        this.costoPromedio = value.body.result.costo.toFixed(2);
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  obtenerVehiculosTotales(){
    this.dashboardService.getVehiculosTotales().subscribe({
      next: (value) => {
       this.vehiculosTotales = value.result.no_vehiculos;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  obtenersSucursalesTotales(){
    this.dashboardService.getSucursalesTotales().subscribe({
      next: (value) => {
        this.sucursalesTotales = value.result.no_sucursales;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  obtenerEmpleadosTotales(fecha:any){
    var dateEmpt={ fecha: ''};
    var date={ fecha: ''};
    if(fecha!=''){
      date={
        fecha: new Date(fecha).toISOString().replaceAll('Z','')
      }
    }
    this.dashboardService.getempleadosTotales(date).subscribe({
      next: (value) => {
        this.empleadosTotales = value.body.result.no_usuarios;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });

    //TODOS
    this.dashboardService.getempleadosTotales(dateEmpt).subscribe({
      next: (value) => {
        this.costoPromedio = value.body.result.no_usuarios;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  obtenerPaquetesEstado(fecha:any){
    var dateEmpt={ fecha: ''};
    var date={ fecha: ''};
    if(fecha!=''){
      date={
        fecha: new Date(fecha).toISOString().replaceAll('Z','')
      }
    }
    this.dashboardService.getPaquetesEstado(date).subscribe({
      next: (value) => {
        this.paquetesEstado= value.body.result;
        //this.dataSource = new MatTableDataSource<Paquete>(this.tracking);
        //this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });

    //TODOS
    this.dashboardService.getPaquetesEstado(dateEmpt).subscribe({
      next: (value) => {
        this.paquetesEstado = value.body.result;
        this.calcularArregloPaquetes();
        console.log(" Paquetes Estado")
        console.log(value);
        //this.dataSource = new MatTableDataSource<Paquete>(this.tracking);
        //this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  totalPaquetesAux:number=0;
  paquetesEstadoVal:number[]=[0,0,0,0,0];
  calcularArregloPaquetes(){
    
  this.paquetesEstadoGrafica=[0,0,0,0,0];
    this.paquetesEstado.forEach(element => {
      this.totalPaquetesAux=this.totalPaquetesAux+element.value;
    });

    this.paquetesEstado.forEach(element => {
      if(element.name=='Recepcion'){
        this.paquetesEstadoGrafica[0]=  (element.value*100)/this.totalPaquetesAux;
        this.paquetesEstadoVal[0]=element.value;
      }else if(element.name=='Transito'){
        this.paquetesEstadoGrafica[1]= (element.value*100)/this.totalPaquetesAux;
        this.paquetesEstadoVal[1]=element.value;
      }else if(element.name=='Ruta Final'){
        this.paquetesEstadoGrafica[2]= (element.value*100)/this.totalPaquetesAux;
        this.paquetesEstadoVal[2]=element.value;
      }else if(element.name=='Por Entregar'){
        this.paquetesEstadoGrafica[3]= (element.value*100)/this.totalPaquetesAux;
        this.paquetesEstadoVal[3]=element.value;
      }else{
        this.paquetesEstadoGrafica[4]= (element.value*100)/this.totalPaquetesAux;
        this.paquetesEstadoVal[4]=element.value;
      }
    });

    return this.paquetesEstadoGrafica;
  }

  obtenerTopSucursales(fecha:any){
    var dateEmpt={ fecha: ''};
    var date={ fecha: ''};
    if(fecha!=''){
      date={
        fecha: new Date(fecha).toISOString().replaceAll('Z','')
      }
    }
   
    this.dashboardService.getTopSucursales(date).subscribe({
      next: (value) => {
        this.top5Sucursales = value.body.result;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });

    //TODOS
    this.dashboardService.getTopSucursales(date).subscribe({
      next: (value) => {
        this.top5Sucursales =  value.body.result;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }
}
