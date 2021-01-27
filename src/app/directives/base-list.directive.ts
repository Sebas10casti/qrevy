import {Observable} from 'rxjs';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {AfterViewInit, Directive, OnChanges, SimpleChanges, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ModalService} from '../services/modal.service';
import {LikeService} from '../services/like.service';


@Directive()
export class BaseListDirective implements OnInit, AfterViewInit, OnChanges {

  //variables
  @Input() filter: any | undefined;
  faStar = faStar;
  regions : any = [
    {
      name : "Africa",
      key : "Africa",
      countries : []
    },
    {
      name : "Americas",
      key : "Americas",
      countries : []
    },
    {
      name : "Asia",
      key : "Asia",
      countries : []
    },
    {
      name : "Europe",
      key : "Europe",
      countries : []
    },
    {
      name : "Oceania",
      key : "Oceania",
      countries : []
    }
  ]
  countries: any = [];

  constructor(
    public modalService: ModalService,
    public likeService: LikeService
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  /**
   *Process the received data
   * @param {Observable<any>} fn
   */
  query(fn: Observable<any>): Observable<any> {
    return new Observable<any>(subscriber => {
      fn.subscribe(
        data => {
          this.handleRows(data);
          subscriber.next();
          subscriber.complete();
        },
        error => {
          subscriber.error(error);
          subscriber.complete();
        }
      );
    });
  }


  /**
   * Classify the data received in the different regions
   * @param {object} data [Result of the petition]
   */
  handleRows(data: object) {
    this.countries = data;
    for(let i = 0; i < Object.keys(this.regions).length; i++){
      this.regions[i].countries = this.filterRegion(this.regions[i].key);
    }
  }

  /**
   * Sort your data by regions
   * @param {string} nameRegion [Name of the region to perform the classification]
   * @return {object} res [Result with countries separated by region]
   */
  filterRegion(nameRegion: string){
    const res : object =  this.countries.filter((countrie: { region: string; }) => countrie.region == nameRegion);
    return res;
  }

  /**
   * Validate if there is data to show or hide the column
   * @param {object} value
   * @return {boolean}
   */
  columnIsVisible(value: any) {
    if(typeof value === 'object') {
      if(Object.keys(value).length > 0) return true;
      return false;
    }
    return false;
  }

  getList() {
  }

  /**
   * Validate if data exists to display the results
   * @param {*} object []
   * @return {boolean} validator
   */
  existData(object : any){
    let validator = false;
    for(let i = 0; i < Object.keys(this.regions).length; i++){
      if(Object.keys(this.regions[i].countries).length > 0)
        validator = true;
    }
    return validator;
  }
}
