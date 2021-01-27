import { Component, Input  } from '@angular/core';
import {DataService} from '../../services/data.service';
import {BaseListDirective} from '../../directives/base-list.directive';
import {ModalService} from '../../services/modal.service';
import {LikeService} from '../../services/like.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.sass']
})

export class CountryListComponent extends BaseListDirective {

  //variables
  dataModal: any = '';
  regionsModal: any = '';

  constructor(
    modalService: ModalService,
    likeService: LikeService,
    private data: DataService,
    ) {
      super(modalService, likeService);
  }

  ngOnInit(){
    this.getList();
  }

  /**
   * Invoke the functions to fetch the country information
   */
  getList() {
    super.getList();
    this.query(this.data.country()).subscribe();
  }


  /**
   * Load the variables to send to the modal and send the request to open it
   * @param {string} id [#id modal]
   * @param {object} data [Row with country information]
   * @param {object} regions [Object with all regions]
   */
  openModal(id: string, data: object, regions: object) {
    this.modalService.open(id);
    this.dataModal = data;
    this.regionsModal = regions;
  }


  /**
   * Send request to close modal
   * @param {string} id [#id modal]
   */
  closeModal(id: string) {
      this.modalService.close(id);
  }

  /**
   * Send information to validate if the country is favorite
   * @param {object} data
   */
  existLike(data: object){
    return this.likeService.existLike(data);
  }

}
