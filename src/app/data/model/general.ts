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
  tipo_sucursal_id: number;
  tipo_Sucursal!: TipoSucursal;
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
  costo_km!: number;
  tipo_vehiculo_id!: number;
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

export class TipoSalida implements Tipos{
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
  sucursal_origen_id: number;
  sucursal_destino_id: number;
  descripcion: string;
  peso: number;
  volumen: number;
  remitente: string;
  destinatario: string;
  campo:string;

  id!:number;
  segmento_id: number;
  estado_paquete_id: number;
  no_guia: string;
  alto:number;
  ancho:number;
  largo: number;
  sucursalOrigen: string;
  sucursalDestino: string;
  sucursalInicioObject: Sucursal;
  sucursalDestinoObject: Sucursal;
  //ayuda para el tarificador
  precio:number;
  distanciaRecorrida:number;
 
}

export class Salida{
  id!:number;
  tipo_salida_id!:number;
  vehiculo_id!:number;
  segmento_id!:number;
  fecha_salida!:string;
  fecha_llegada!:string;
  fecha_programada!:string;
  comentario!:string;
  costo_lb!:number;
  capacidad_lb!:number;
  capacidad_reservada!:number;
  capacidad_ocupada!:number;

  tipoSalida!:TipoSalida
  vehiculo!:Vehiculo
  segmento!:Segmento
}

export class Tarifario{
  id!:number;
  fecha!:string;
  ganancia_envio!:number;
  costo_lb!:number;
}


export class Cotizacion{
  criterio: string;
  descripcion:string;
  costo_total: number;
  distancia_total: number;
}


export class PaqueteCotizar{
  sucursal_origen_id: number;
  sucursal_destino_id: number;
  peso:number;
}

export class Tracking{
  id!:string;
  paquete_id!:string;
  sucursal_id!:string;
  estado_tracking_id!:string;
  salida_id!:string;
  actualizacion!:string;
  comentario!:string;
  paquete!:Paquete;
}

export class Ingreso{
  sucursal_id: number;
  detalles: string;
  monto: number;
  fecha: string;
}