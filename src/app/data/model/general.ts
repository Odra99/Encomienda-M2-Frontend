export class Ciudad {
  id!:number;
  nombre!: string;
  descripcion!: string;
  departamento!: string;
}

export class Puesto {
  id!:number;
  descripcion!: string;
  nombre!: string;
  salario_horario!: number;
  
}


export class Sucursal {
  id!:number;
  nombre!: string;
  direccion!: string;
  latitud!: number;
  longitud!: number;
  ciudad_id!: number;
  ciudad!: string;
  tiposucursal_id:number;
  tipoSucursal!: string;
}

export class Usuario {
  id!:number;
  nombre!: string;
  username!: string;
  email!: string;
  password!: string;
  horas!: number;
  rol_id!: number;
  sucursal_id!: number;
  puesto_id!:string;
  rol:string;
  sucursal:string;
  puesto:string
}

export class Vehiculo{
  id!:number;
  placa!: string;
  capacidad_lb!:number;
  costokm!: number;
  tipovehiculo_id!: number;
  sucursal_id!: number;
  sucursal!: string;
  tipovehiculo!: string;
}
