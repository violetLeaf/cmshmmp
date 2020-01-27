  export default interface TourModel {
    id: number;
    title: string;
    reversible: boolean;
    template_id?: number;
    guide?: string;
    date: Date;
  }

