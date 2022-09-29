import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-display-badge',
  templateUrl: './display-badge.component.html',
  styleUrls: ['./display-badge.component.scss']
})
export class DisplayBadgeComponent implements OnInit {

  @Input() vigile!: Vigile;

  constructor(
    private vigileService: JarvisService<Vigile>,
    private notifierService: NotifierService,
  ) { }

  ngOnInit(): void {
  }

  remis() {
    this.vigile.badge = true;
    this.save();
  }

  nonRemis() {
    this.vigile.badge = false;
    this.save();
  }

  save() {
    this.vigileService.modifier('vigile', this.vigile.idvigile, this.vigile).then((data) => {
      console.log('data');
      console.log(data);
      this.notifierService.notify('success', "Modification effectuée avec succès");
    }).catch((e) => {
    });

  }

}
