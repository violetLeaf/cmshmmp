export default interface MediaModel {
    id: number;
    caption: string;
    language_id: number;
    file_id?: number;
    text_id?: number;
    station_id: number;
    
    text?: string;
    destinationurl?: string;

    active?: boolean;
  }

