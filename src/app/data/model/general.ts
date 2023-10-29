export class Ciudad {
  id!: number;
  nombre!: string;
  descripcion!: string;
  departamento!: string;
  estatico:boolean = false;
}

export class Puesto {
  id!: number;
  descripcion!: string;
  nombre!: string;
  salario_horario!: number;
  estatico:boolean = false;
}

export class Sucursal {
  id!: number;
  nombre!: string;
  direccion!: string;
  latitud!: number;
  longitud!: number;
  ciudad_id!: number;
  ciudad!: Ciudad;
  tiposucursal_id: number;
  tipoSucursal!: TipoSucursal;
  estatico:boolean = false;
}

export class Usuario {
  id!: number;
  nombre!: string;
  username!: string;
  email!: string;
  password!: string;
  horas!: number;
  rol_id!: number;
  sucursal_id!: number;
  puesto_id!: string;
  rol: Rol;
  sucursal: Sucursal;
  puesto: Puesto;
  estatico:boolean = false;
}

export class Vehiculo {
  id!: number;
  placa!: string;
  capacidad_lb!: number;
  costokm!: number;
  tipovehiculo_id!: number;
  sucursal_id!: number;
  sucursal!: Sucursal;
  tipoVehiculo!: TipoVehiculo;
}

export class ConceptoGasto {
  id!: number;
  nombre!: string;
  estatico:boolean = false;
}

export class Gasto {
  id!: number;
  sucursal_id!: number;
  tipo_gasto_id!: number;
  concepto_gasto_id!: number;
  detalles!: string;
  monto!: number;
  fecha!: string;

  sucursal!:Sucursal
  tipoGasto!:TipoGasto
  conceptoGasto!:ConceptoGasto
}

export class Segmento {
  id!:number
  sucursal_origen_id!:number
  sucursal_destino_id!:number
  descripcion!:string
  distancia!:number

  sucursal_origen!:Sucursal
  sucursal_destino!:Sucursal
}

interface Tipos {
  id: number;
  nombre: string;
  estatico:boolean;
}

export class TipoGasto implements Tipos {
  id!: number;
  nombre!: string;
  estatico!: boolean;
}

export class TipoSucursal implements Tipos{
  id: number;
  nombre: string;
  estatico!:boolean
}
export class TipoVehiculo implements Tipos{
  id!:number;
  nombre!:string;
  estatico!: boolean;
}

export class Rol{
  id!:number;
  nombre!: string;
  descripcion!: string;
  estatico:boolean = false;
  
}

export class Paquete{
  id!:number;
  segmento_id: number;
  estado_paquete_id: number;
  no_guia: string;
  descripcion: string;
  peso: number;
  volumen: number;
  remitente: string;
  destinatario: string;
  idCiudadInicio: number;
  idCiudadDestino: number;
  alto:number;
  ancho:number;
  largo: number;
  ciudadInicio: string;
  ciudadDestino: string;
  ciudadInicioObject: Ciudad;
  ciudadDestinoObject: Ciudad;
}
