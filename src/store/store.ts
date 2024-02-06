import {configure, makeAutoObservable} from 'mobx';

configure({
    enforceActions: 'never',
});

export class Store {
    constructor() {
        makeAutoObservable(this);
    }
}
