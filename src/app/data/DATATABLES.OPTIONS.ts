import { FrLanguage } from "./DATATABLES.LANGUAGE";

export const DatatablesOptions = {
    pagingType: 'full_numbers',
    language: FrLanguage,
    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'copyHtml5',
        title: 'Liste des zones',
        className: 'btn btn-primary'
      },
      {
        extend: 'excelHtml5',
        title: 'Liste des zones',
        className: 'btn btn-primary'
      },
      {
        extend: 'pdfHtml5',
        title: 'Liste des zones',
        download: 'open',
        className: 'btn btn-primary'
      },
      {
        extend: 'print',
        message: 'Liste des zones',
        autoPrint: false,
        className: 'btn btn-primary'
      }
    ],
  };