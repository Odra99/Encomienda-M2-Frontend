import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTheme,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';
import { switchMap, tap } from 'rxjs';
import { DashboardService } from 'src/app/services/backend/dashboard.services';
import { PredectiveModuleService } from 'src/app/services/others/predictive-module.service';
import { ToasterService } from 'src/app/services/others/toaster.service';

export interface pieChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
  theme:ApexTheme;
  labels: any;
}


export interface BarChart {
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

@Component({
  selector: 'app-dashboard-ingresos',
  templateUrl: './dashboard-ingresos.component.html',
  styleUrls: ['./dashboard-ingresos.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardIngresosComponent implements OnInit {
  ingresoTMes = 0;
  ingresoPronMes = 0;
  ingresoTotales = 0;


  color:string[]=[]

  labelsPronReal:string[]=[]
  dataPronReal:number[]=[]

  labelsPronRealT:string[]=[]
  dataPronRealT:number[]=[]

  labelsSucursales:string[]=[]
  dataSucursales:number[]=[]


  labelsSucursalesT:string[]=[]
  dataSucursalesT:number[]=[]

  public ingresoMes: Partial<pieChart> | any;
  public ingresoTotal: Partial<pieChart> | any;
  public sucursalesMes!: Partial<BarChart> | any;
  public sucursalesT!: Partial<BarChart> | any;

  constructor(
    private dashboardService: DashboardService,
    private toaster: ToasterService,
    private predictableService: PredectiveModuleService
  ) {

    this.color = predictableService.isPredective() ? ['#fa896b','#0074ba']:['#5d87ff','#44b7f7'];
    
  }

  fecha = Date.now()

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dashboardService
      .getIngreso(this.fecha)
      .pipe(
        tap((response) => {
          this.ingresoTMes = response.body.result.ingresos;
        }),
        switchMap(() => this.dashboardService.getIngreso('')),
        tap((response) => {
          this.ingresoTotales = response.body.result.ingresos;
        }),
        switchMap(() => this.dashboardService.getIngresoPron('')),
        tap((response) => {
          this.ingresoPronMes = response.body.result.ingresos;
        }),
        switchMap(() => this.dashboardService.getIngresoRealVsPron(this.fecha)),
        tap((response) => {
          let tipo = response.body.result;
            this.labelsPronReal.push('real')
            this.dataPronReal.push(tipo[0].real)
            this.labelsPronReal.push('pronosticado')
            this.dataPronReal.push(tipo[1].pronosticado)
        }),
        switchMap(() => this.dashboardService.getIngresoRealVsPron('')),
        tap((response) => {
          let tipo = response.body.result;
            this.labelsPronRealT.push('real')
            this.dataPronRealT.push(tipo[0].real)
            this.labelsPronRealT.push('pronosticado') 
            this.dataPronRealT.push(tipo[1].pronosticado)
        }),
        switchMap(() => this.dashboardService.getIngresoSucursal('')),
        tap((response) => {
          let tipo = response.body.result;
          for (let index = 0; index < tipo.length; index++) {
            const element = tipo[index];
            this.labelsSucursalesT.push(element.name)
            this.dataSucursalesT.push(element.value)
           
          }
        }),
        switchMap(() => this.dashboardService.getIngresoSucursal(this.fecha)),
        tap((response) => {
          let tipo = response.body.result;
          for (let index = 0; index < tipo.length; index++) {
            const element = tipo[index];
            this.labelsSucursales.push(element.name)
            this.dataSucursales.push(element.value)
           
          }
        })
      )
      .subscribe({
        next: () => {
          this.setCharts();
        },
        error: () => {
          this.toaster.showGenericErrorToast();
        },
      });
  }

  setCharts(){
    this.ingresoMes = {
      series:  this.dataPronReal,
      chart: {
        type: "donut"
      },
      labels: this.labelsPronReal,
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                formatter: function (val:string) {
                  console.log(val)
                  Math.round(Number(val) * 100) / 100
                }
              }
            }
          },
          expandOnClick: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      colors:this.color
    };
    this.ingresoTotal = {
      series: this.dataPronRealT,
      chart: {
        type: "donut"
      },
      labels: this.labelsPronRealT,
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true
              }
            }
          },
          expandOnClick: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      colors:this.color
      
    };
    this.sucursalesMes = {
      series: [
        {
          name: 'Gastos',
          data: this.dataSucursales,
          color: this.color[0],
        }
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
        categories: this.labelsSucursales,
        labels: {
          style: { cssClass: 'grey--text lighten-2--text fill-color' },
        },
      },
      yaxis: {
        show: true,
        min: 0,
        max: Math.max(...this.dataSucursales)+500,
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
      colors:this.color
    };
    this.sucursalesT = {
      series: [
        {
          name: 'Gastos',
          data: this.dataSucursalesT,
          color: this.color[0],
        }
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
        categories: this.labelsSucursalesT,
        labels: {
          style: { cssClass: 'grey--text lighten-2--text fill-color' },
        },
      },
      yaxis: {
        show: true,
        min: 0,
        max: Math.max(...this.dataSucursalesT)+500,
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
      colors:this.color
    };

  }
}

