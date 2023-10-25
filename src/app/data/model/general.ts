export class Ciudad {
  id!:number;
  nombre!: string;
  descripcion!: string;
  departamento!: string;
}

export class Puesto {
  id!:number;
  nombre!: string;
  salarioHora!: number;
  descripcion!: string;
}


export class Sucursal {
  id!:number;
  nombre!: string;
  direccion!: string;
  latitud!: number;
  longitud!: number;
  ciudadId!: number;
  ciudad!: string;
  tipoSucursalId:number;
  tipoSucursal!: string;
}

export class Usuario {
  id!:number;
  nombreUsuario!: string;
  nombre!: string;
  correo!: string;
  idPuesto!: number;
  idRol!: number;
  idTrabajador!: number;
  idSucursal!: number;
  password!:string;
  horasTrabajo!:number;
}

export class Vehiculo{
  id!:number;
  placa!: string;
  modelo!:string;
  idSucursal!: number;
  sucursalNombre!: string;
  idTipo!: string;
  volumen!: number;
  peso!: number;
}
