import { RoleEnum } from "./rol-enum"

export enum PermissionTypeEnum{
    CREATE,
    READ,
    UPDATE,
    DELETE,
    ALL
}

export enum EntityEnum{
    CIUDAD,
    PAQUETE,
    VEHICULO
}

class Permission {
    types: PermissionTypeEnum[]
    entity: EntityEnum
    rol: RoleEnum
}

const rolePermissions : Permission[] =[
    {
        types:[PermissionTypeEnum.ALL],
        entity: EntityEnum.CIUDAD,
        rol: RoleEnum.ADMIN
    },
    {
        types:[PermissionTypeEnum.ALL],
        entity: EntityEnum.PAQUETE,
        rol: RoleEnum.ADMIN
    },
    {
        types:[PermissionTypeEnum.ALL],
        entity: EntityEnum.VEHICULO,
        rol: RoleEnum.ADMIN
    },
    {
        types:[PermissionTypeEnum.READ],
        entity: EntityEnum.CIUDAD,
        rol: RoleEnum.OPERATOR
    },
    {
        types:[PermissionTypeEnum.READ],
        entity: EntityEnum.PAQUETE,
        rol: RoleEnum.OPERATOR
    },
    {
        types:[PermissionTypeEnum.READ],
        entity: EntityEnum.VEHICULO,
        rol: RoleEnum.OPERATOR
    }
]