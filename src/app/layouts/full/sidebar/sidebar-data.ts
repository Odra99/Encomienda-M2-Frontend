import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'INICIO',
  },
  {
    displayName: 'inicio',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    displayName: 'Tarifario',
    iconName: 'calculator',
    route: '/features/tarifario',
  },
  {
    navCap: 'Menu Principal',
  },
  {
    displayName: 'Agencias',
    iconName: 'home-search',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Quienes Somos?',
    iconName: 'help-octagon',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Rastreo',
    iconName: 'map-search',
    route: '/ui-components/lists',
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
  },
  {
    displayName: 'Manejo de Ciudades',
    iconName: 'building',
    route: '/features/ciudades',
  },{
    displayName: 'Manejo de Puestos',
    iconName: 'users-group',
    route: '/features/puestos',
  },
  {
    displayName: 'Manejo de Sucursales',
    iconName: 'home-cog',
    route: '/features/sucursales',
  },
  {
    displayName: 'Manejo de Usuarios',
    iconName: 'user-cog',
    route: '/features/usuarios',
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
  },
  {
    displayName: 'Manejo de Segmentos',
    iconName: 'road',
    route: '/features/segmentos',
  },
  {
    navCap: 'AUTENTIFICACION',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
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
