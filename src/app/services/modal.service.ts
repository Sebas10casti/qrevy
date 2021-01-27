import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ModalService {

    private modals: any[] = [];

    /**
     *add modal to array of active modals
     * @param {*} modal
     */
    add(modal: any) {
        this.modals.push(modal);
    }

    /**
     *remove modal from array of active modals
     * @param {*} modal
     */
    remove(id: string) {
        this.modals = this.modals.filter(x => x.id !== id);
    }

    /**
     * open modal specified by id
     * @param {*} modal
     */
    open(id: string) {
      const modal = this.modals.find(x => x.id === id);
      modal.open();
    }
    /**
     * close modal specified by id
     * @param {*} modal
     */
    close(id: string) {
        // close modal specified by id
        const modal = this.modals.find(x => x.id === id);
        modal.close();
    }
}
