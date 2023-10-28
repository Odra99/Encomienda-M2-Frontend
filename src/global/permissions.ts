import { RoleEnum } from "./rol-enum"

export enum PermissionTypeEnum{
    CREATE,
    READ,
    UPDATE,
    DELETE,
    ALL,
    NULL,
    NONE
}

export enum EntityEnum{
    CIUDAD,
    PAQUETE,
    VEHICULO
}

class Permission {
    types: PermissionTypeEnum[]
    // entities: EntityEnum
    rol: RoleEnum
}

export const rolePermissions : Permission[] =[
    {
        types:[PermissionTypeEnum.ALL],
        rol: RoleEnum.ADMIN
    },
    {
        types:[PermissionTypeEnum.READ],
        rol: RoleEnum.OPERATOR
    }
    
]