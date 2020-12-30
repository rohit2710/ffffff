import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ComplaintDTO } from 'src/app/shared/models/departmentComplaints';
import { ComplaintService } from 'src/app/shared/services/complaint.service';

@Component({
  selector: 'app-complaint-details',
  templateUrl: './complaint-details.component.html',
  styleUrls: ['./complaint-details.component.scss'],
})
export class ComplaintDetailsComponent implements OnInit, OnDestroy {
  // complaint = new  ComplaintDTO();
  complaint: any;
  complaintSubject!: Subscription;
  fileBaseUrl: string = 'http://localhost:8080/api/download/';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private complaintService: ComplaintService
  ) {}
  ngOnDestroy(): void {
    this.complaintSubject.unsubscribe();
  }

  //on loading of component complaints details are fetched 
  ngOnInit(): void {
    //@ts-ignore
    this.complaintSubject = this.complaintService.complaintSubject.subscribe((cp: ComplaintDTO) => {
        this.complaint = cp;
      }
    );
  }

}
