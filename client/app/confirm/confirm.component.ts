import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  missingTxHash: boolean;

  constructor(public router: Router, private route: ActivatedRoute, private requestService: RequestService) {}


  ngOnInit() {
    if (this.route.snapshot.queryParams.txHash) {
      this.requestService.getTxDetails(this.route.snapshot.queryParams.txHash).subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.missingTxHash = true;
    }
  }

}
