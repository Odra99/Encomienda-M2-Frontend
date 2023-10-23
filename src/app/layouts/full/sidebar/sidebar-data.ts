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
  },
  {
    displayName: 'Manejo de Usuarios',
    iconName: 'user-cog',
    route: '/ui-components/tooltips',
  },
  {
    displayName: 'Manejo de Vehiculos',
    iconName: 'truck',
    route: '/features/vehiculos',
  },
  {
    displayName: 'Manejo de Ciudades',
    iconName: 'building',
    route: '/features/ciudades',
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
