import { makeAutoObservable, runInAction } from 'mobx';
import { MetersType } from '../types';

class MeterStore {
  meters: MetersType[] | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  totalCount: number = 0;
  currentPage: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchMeters(
    limit: number = 20,
    offset: number = 0
  ): Promise<MetersType[]> {
    this.isLoading = true;
    this.error = null;

    try {
      const res = await fetch(
        `http://showroom.eis24.me/api/v4/test/meters/?limit=${limit}&offset=${offset}`
      );
      const data = await res.json();
      const meters = data.results;
      this.totalCount = data.count;

      runInAction(() => {
        this.meters = meters;
        this.isLoading = false;
      });
      return meters;
    } catch (e) {
      runInAction(() => {
        if (e instanceof Error) {
          this.error = e.message;
        } else {
          this.error = 'Произошла неизвестая ошибка';
        }
        this.isLoading = false;
      });

      return [];
    }
  }

  async deleteMeter(id: string): Promise<void> {
    try {
      await fetch(`http://showroom.eis24.me/api/v4/test/meters/${id}/`, {
        method: 'DELETE',
      });

      const offset = (this.currentPage - 1) * 20;
      await this.fetchMeters(20, offset);
    } catch (e) {
      runInAction(() => {
        if (e instanceof Error) {
          this.error = e.message;
        } else {
          this.error = 'Произошла неизвестаня ошибка при удалении';
        }
      });
    }
  }
}

export const meterStore = new MeterStore();
