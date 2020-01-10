// copied from app for later use

//   export interface Media {
//     type: string;
//     path: string;
//     text: string;
//   }

//   export interface Station {
//     name: string;
//     media: Media[];
//   }

//   export interface Area {
//     name: string;
//     stations: Station[];
//   }

  export default interface TourModel {
    id: number;
    title: string;
    descriptioin: string;
    reversible: boolean;
    template_id: number;
    guide: string;
    date: Date;
  }

