import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { PermissionTypeEnum, rolePermissions } from 'src/global/permissions';
import { CurrentUserService } from '../services/others/current-user.service';

@Directive({
  selector: '[appCheckPermission]',
})
export class CheckPermissionDirective implements OnInit {
  @Input() appCheckPermission: PermissionTypeEnum = PermissionTypeEnum.NULL;

  permissions = rolePermissions;

  constructor(
    private elRef: ElementRef,
    private currentUserService: CurrentUserService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (this.appCheckPermission==PermissionTypeEnum.NULL) {
      return;
    }

    let result = false;

    var role = this.currentUserService.getMyRole();

    var rolePermission = this.permissions.find(element=>element.rol==role)

    if(rolePermission){
        result = rolePermission.types.includes(this.appCheckPermission) || rolePermission.types.includes(PermissionTypeEnum.ALL)
    }

    if(!result){
        this.elRef.nativeElement?.remove();
    }


  }
}
