import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  txInfos: any;
  error: any;

  constructor(public router: Router, private route: ActivatedRoute, private requestService: RequestService) {}


  ngOnInit() {
    this.requestService.getTxDetails(this.route.snapshot.params.txHash).subscribe(
      res => {
        this.txInfos = res;
      },
      error => {
        this.error = error;
      }
    );
  }

}
