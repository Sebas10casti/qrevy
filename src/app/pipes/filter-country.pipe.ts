import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCountry'
})
export class FilterCountryPipe implements PipeTransform {

  transform(data: any, args: any) {

    if((args.country === undefined || args.country === "")  && (args.category === undefined || args.category === 'Show All'))
      return data;

    let regions : any = []

    //Category filter manager
    if(args.category !== 'Show All' && args.category !== 'Favorites')
      regions = this.filterCategory(data, args.category);

    //Favorite filter manager
    if(args.category === 'Favorites')
      regions = this.filterFavorites(args.category);

    //Country filter manager
    if(args.country !== '')
      regions = this.filtercountries(data, args.country, regions);

    return regions;
  }

  /**
   *Category filter manager
   * @param {*} data [Object with the countries]
   * @param {*} arg [parameters]
   * @return {object} [Leaked data]
   */
  filterCategory(data:any, arg:any){
    let res : any = [];
    for(let i = 0; i < Object.keys(data).length; i++){
      if(arg == data[i]['key']){
        res.push({
          name: data[i]['name'],
          key: data[i]['key'],
          countries: data[i]['countries']
        })
      }
    }
    return res;
  }

  /**
   * Favorite filter manager
   * @param {*} arg [parameters]
   * @return {object} [Leaked data]
   **/

  filterFavorites(arg: any){
    let res : any = [{
      name: 'Favorites',
      key: 'Favorites',
      countries: this.getLikes()
    }];

    return res;
  }


  /**
   * Countri filter manager
    * @param {*} data [Object with the countries]
   * @param {*} arg [parameters]
   * @param {*} regions [Object with the countries]
   * @return {*}
   */

  filtercountries(data:any, arg: any, regions: any){

    let values = [];
    //Validate what data to use
    if(Object.entries(regions).length > 0){
      values = regions;
    }else{
      values = data;
    }

    //Realizar filtro
    let res : any = []
      for(let i = 0; i < Object.keys(values).length; i++){
        res.push({
          name: values[i]['name'],
          key: values[i]['key'],
          countries: this.countries(values[i]['countries'], arg)
        })
      }
    return res;
  }

  /**
   * @memberof filtercountries
   */
  countries (countries: any, arg: any){
    const res = [];
    for (const countrie of countries){
      if(countrie.name.toLowerCase().indexOf(arg.toLowerCase()) > -1){
          res.push(countrie);
        }
    }
    return res;
  }

  /**
   *  Gets the data for the favorites filter
   * @return {object} [filtered data]
   * @memberof filterFavorites
   */
  getLikes(){
    var likes :any = localStorage.getItem('QLikes');
    return JSON.parse(likes);
  }

}

