import { makeAutoObservable, runInAction } from 'mobx';

class AddressStore {
  addressCache: Map<string, any> = new Map();
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAddressById(id: string) {
    if (this.addressCache.has(id)) {
      return this.addressCache.get(id);
    }
    this.isLoading = true;

    try {
      const res = await fetch(
        `http://showroom.eis24.me/api/v4/test/areas/?id__in=${id}`
      );
      const data = await res.json();

      runInAction(() => {
        if (data.results && data.results.length > 0) {
          this.addressCache.set(id, data.results[0]);
        }
        this.isLoading = false;
      });

      return data.results[0];
    } catch (e) {
      runInAction(() => {
        this.error =
          e instanceof Error ? e.message : 'Произошла неизвестаня ошибка';
        this.isLoading = false;
      });
      return null;
    }
  }
}

const addressStore = new AddressStore();

export default addressStore;
