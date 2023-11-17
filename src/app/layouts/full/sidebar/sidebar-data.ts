import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'INICIO',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
    predictable:true,
  },
  {
    displayName: 'Tarifario',
    iconName: 'calculator',
    route: '/features/tarifario',
    predictable:true
  },
  {
    navCap: 'Menu Principal',
  },
  {
    displayName: 'Manejo de Paquetes',
    iconName: 'box-seam',
    route: '/features/paqueteria',
  },/*
  {
    displayName: 'Manejo de Usuarios',
    iconName: 'user-cog',
    route: '/ui-components/tooltips',
  },*/
  {
    displayName: 'Manejo de Vehiculos',
    iconName: 'truck',
    route: '/features/vehiculos',
    predictable:true
  },
  {
    displayName: 'Manejo de Ciudades',
    iconName: 'building',
    route: '/features/ciudades',
    predictable:true
  },{
    displayName: 'Manejo de Puestos',
    iconName: 'users-group',
    route: '/features/puestos',
  },
  {
    displayName: 'Manejo de Sucursales',
    iconName: 'home-cog',
    route: '/features/sucursales',
    predictable:true
  },
  {
    displayName: 'Manejo de Usuarios',
    iconName: 'user-cog',
    route: '/features/usuarios',
    predictable:true
  },
  {
    displayName: 'Manejo de Concepto de Gastos',
    iconName: 'currency-dollar',
    route: '/features/concepto-gasto',
  },
  {
    displayName: 'Manejo de Gastos',
    iconName: 'receipt-2',
    route: '/features/gastos',
    predictable:true
  },
  {
    displayName: 'Manejo de Segmentos',
    iconName: 'road',
    route: '/features/segmentos',
    predictable:true
  },{
    displayName: 'Manejo de Salidas',
    iconName: 'truck-return',
    route: '/features/salidas',
    predictable:true
  },
  {
    navCap: 'Menu de Administracion',
  },
  {
    displayName: 'Proyecciones Mensuales',
    iconName: 'chart-arrows-vertical',
    route: '',
  },
  {
    displayName: 'Reportes',
    iconName: 'aperture',
    route: '/extra/sample-page',
  },
  {
    displayName: 'iconos',
    iconName: 'aperture',
    route: '/extra/icons',
  },
];
