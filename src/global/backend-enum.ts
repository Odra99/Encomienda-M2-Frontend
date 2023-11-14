export enum EstadoPaqueteEnum {
  RECEPCION = 1,
  TRANSITO = 2,
  RUTA_FINAL = 3,
  POR_ENTREGAR = 4,
  ENTREGADO = 5,
}
export enum EstadoTrackingEnum {
  EN_ESPERA = 1,
  EN_BODEGA = 2,
  CARGANDO = 3,
  CARGADO = 4,
  EN_RUTA = 5,
  COMPLETADO = 6,
}

export enum TipoSalidaEnum {
  PROYECCION = 1,
  LISTO_PARA_CARGAR = 2,
  CARGANDO = 3,
  CARGADO = 4,
  EN_RUTA = 5,
  FIN = 6,
}
