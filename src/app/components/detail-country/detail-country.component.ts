import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {LikeService} from '../../services/like.service';
import { faTimes, faStar } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-detail-country',
  templateUrl: './detail-country.component.html',
  styleUrls: ['./detail-country.component.sass']
})
export class DetailCountryComponent implements OnInit, OnDestroy {

  // Icons
  faTimes = faTimes;
  faStar = faStar;

  // Variables
  @Input() id: any | undefined;
  @Input() data: any | undefined;
  @Input() regions: any | undefined;

  statusLike: boolean = false;

  private element: any;

  constructor(
    private modalService: ModalService,
    private el: ElementRef,
    private likeService: LikeService)
  {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    this.initModal();
    this.likeService.createObjetcLikes();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.validateLike(this.data);
  }

  ngOnDestroy(): void {
      this.modalService.remove(this.id);
      this.element.remove();
  }


  /**
   *Load Modal Components
   */
  initModal(): void {
    if (!this.id) {
      return;
    }
    document.body.appendChild(this.element);
    this.element.addEventListener('click', (el : any) => {
      if (el.target.className === 's-modal') {
          this.close();
      }
    });
    this.modalService.add(this);
  }

  open(): void {
      this.element.style.display = 'block';
      document.body.classList.add('s-modal-open');
  }

  close(): void {
      this.element.style.display = 'none';
      document.body.classList.remove('s-modal-open');
  }

  /**
   *Validate if the data has any object type value
   * @param {*} data
   * @return {boolean} [true: Exist Data, false: No exist data]
   */
  existData(data:any){
    if(typeof data === 'string')
      return false
    return true
  }

  /**
   * Abbreviate the number in [K, M G] format
   * @param {number} num [value to convert]
   * @return {string} Formatted value
   */
  formatterPoblation(num: number) {
    let clear = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    const abbreviations = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "k" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "G" },
    ];
    for (i = abbreviations.length - 1; i > 0; i--) {
      if (num >= abbreviations[i].value) {
        break;
      }
    }
    return (num / abbreviations[i].value).toFixed(0).replace(clear, "$1") + abbreviations[i].symbol;
  }


  /**
   *Returns the names of the countries that are bordering
   * @param {object} data [Row with border data]
   * @param {*} regions [Object to compare to obtain the names of the countries]
   * @return {string} [Country names separated by commas]
   */
  borderCountries(data:any, regions: any) {
    let arr: any = [];
    data.forEach((border:any) =>{
      for (const region of regions){
        for (const country of region.countries){
          if(country.alpha3Code.indexOf(border) > -1){
            arr.push(country.name);
          }
        }
      }
    })

    return arr.join(', ');
  }


  /**
   * In charge of managing whether it is like or dislike
   * @param {object} data [country row]
   */
  like(data:any){
    this.statusLike = !this.statusLike;
    if(!this.likeService.existLike(data)){
      this.likeService.like(data)
    }else{
      this.likeService.dislike(data);
    }
  }


  /**
   * Valid if the country is favorite
   * @param {object} data [country row]
   */
  validateLike(data:any){
    this.statusLike = false;
    if(Object.entries(data).length > 0){
      if(this.likeService.existLike(data)){
        this.statusLike = true;
      }
    }
  }
}
