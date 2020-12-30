import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LockedUser } from 'src/app/shared/models/locked-user';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-locked-account',
  templateUrl: './locked-account.component.html',
  styleUrls: ['./locked-account.component.scss'],
})
export class LockedAccountComponent implements OnInit,OnDestroy {
  lockedUsers: LockedUser[] = [];
  subscriptionArray:Subscription[]=[];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllLockedUser();
  }

  //on loading of component all locked users will be fetched
  getAllLockedUser() {
    //@ts-ignore
    let subs=this.adminService.getAllLockedUser().subscribe((res: LockedUser[]) => {
      this.lockedUsers = res.map((r) => {
        return r;
      });
    });
    this.subscriptionArray.push(subs);
  }

  //on click of activate button user will be reactivated
  //@ts-ignore
  activateAccount(email: any) {
    let subs=this.adminService.activateAccount(email).subscribe((res) => {
      this.getAllLockedUser();
    });
    this.subscriptionArray.push(subs);
  }
  ngOnDestroy(): void {
    this.subscriptionArray.forEach(d => {
      d.unsubscribe();
    })
  }
}
