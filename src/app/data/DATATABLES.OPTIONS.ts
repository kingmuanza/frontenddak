import { FrLanguage } from "./DATATABLES.LANGUAGE";

export const DatatablesOptions = {
    pagingType: 'full_numbers',
    language: FrLanguage,
    aLengthMenu: [
      [25, 50, 100, 200, -1],
      [25, 50, 100, 200, "All"]
  ],
  iDisplayLength: -1,
    dom: 'Bfrtip',
    order: [[ 0, 'desc' ]],
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