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
  colors:any;
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
  selector: 'app-dashboard-gastos',
  templateUrl: './dashboard-gastos.component.html',
  styleUrls: ['./dashboard-gastos.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardGastosComponent implements OnInit {
  gastoPorMes = 0;
  gastoPromedioPorSucursal = 0;
  gastoTotales = 0;

  fijos = 0;
  variables = 0;

  color:string[]=[]

  labelsTipo:string[]=[]
  dataTipo:number[]=[]

  labelsConcepto:string[]=[]
  dataConcepto:number[]=[]

  labelsSucursales:string[]=[]
  dataSucursales:number[]=[]


  labelsSucursalesT:string[]=[]
  dataSucursalesT:number[]=[]

  public tipoGastoChart: Partial<pieChart> | any;
  public conceptoGastoChart: Partial<pieChart> | any;
  public sucursalesMes!: Partial<BarChart> | any;
  public sucursalesT!: Partial<BarChart> | any;

  constructor(
    private dashboardService: DashboardService,
    private toaster: ToasterService,
    private predictableService: PredectiveModuleService
  ) {

    this.color = predictableService.isPredective() ? ['#fa896b','#0074ba','#7B9E87','#775144','#2A0800']:['#5d87ff','#B4B8AB','#413C58','#419D78'];
    
  }

  fecha = Date.now()

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dashboardService
      .getGasto(this.fecha)
      .pipe(
        tap((response) => {
          this.gastoPorMes = response.body.result.gastos;
        }),
        switchMap(() => this.dashboardService.getGasto('')),
        tap((response) => {
          this.gastoTotales = response.body.result.gastos;
        }),
        switchMap(() => this.dashboardService.getGastoPromedio('')),
        tap((response) => {
          this.gastoPromedioPorSucursal = response.body.result.gastos;
        }),
        switchMap(() => this.dashboardService.getTipoGasto('')),
        tap((response) => {
          let tipo = response.body.result;
          for (let index = 0; index < tipo.length; index++) {
            const element = tipo[index];
            this.labelsTipo.push(element.name)
            this.dataTipo.push(element.value)
           
          }
        }),
        switchMap(() => this.dashboardService.getConceptoGasto('')),
        tap((response) => {
          let tipo = response.body.result;
          for (let index = 0; index < tipo.length; index++) {
            const element = tipo[index];
            this.labelsConcepto.push(element.name)
            this.dataConcepto.push(element.value)
           
          }
        }),
        switchMap(() => this.dashboardService.getGastoSucursal('')),
        tap((response) => {
          let tipo = response.body.result;
          for (let index = 0; index < tipo.length; index++) {
            const element = tipo[index];
            this.labelsSucursalesT.push(element.name)
            this.dataSucursalesT.push(element.value)
           
          }
        }),
        switchMap(() => this.dashboardService.getGastoSucursal(this.fecha)),
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
    this.tipoGastoChart = {
      series:  this.dataTipo,
      chart: {
        type: "donut"
      },
      labels: this.labelsTipo,
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
    this.conceptoGastoChart = {
      series: this.dataConcepto,
      chart: {
        type: "donut"
      },
      labels: this.labelsConcepto,
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
