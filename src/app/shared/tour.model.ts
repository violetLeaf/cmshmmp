  export default interface TourModel {
    id: number;
    title: string;
    reversible: boolean;
    guide?: string;
    date: Date;
    
    template_id?: number;
    language_id?: number;
  }

