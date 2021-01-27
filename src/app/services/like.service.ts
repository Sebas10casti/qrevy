import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor() { }


  /**
   *Initialize likes object
   */
  createObjetcLikes(){
    if(localStorage.getItem('QLikes') === null){
      localStorage.setItem('QLikes', JSON.stringify([]));
    }
  }


  /**
   * Get list of favorite countries
   * @return {object} [list of favorite countries]
   */
  getLikes(){
    var likes :any = localStorage.getItem('QLikes');
    return JSON.parse(likes);
  }


  /**
   * add country to favorites list
   * @param {object} data [country]
   */
  like(data: object){
      var likes: any = this.getLikes();
      likes.push(data);
      localStorage.setItem('QLikes', JSON.stringify(likes));
  }


  /**
   * Validate if the country is already in favorites
   * @param {*} data [country]
   * @return {boolean} [true: exists, false: not exits]
   */
  existLike(data: any){
    var likes: any = this.getLikes();
    for (const like of likes){
      if(like.name.toLowerCase().indexOf(data.name.toLowerCase()) > -1){
          return true;
        }
    }
    return false;
  }


  /**
   * Remove country to favorites list
   * @param {object} data [country]
   */
  dislike(data: any){
    let likes: any = this.getLikes();
    for (let i = 0; i < Object.entries(likes).length; i++) {
      if(likes[i].name == data.name){
        likes.splice(likes.indexOf(likes[i]), 1);
      }
    }
    localStorage.setItem('QLikes', JSON.stringify(likes));
  }
}
