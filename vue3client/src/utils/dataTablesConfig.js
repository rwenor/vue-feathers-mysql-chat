
import $ from "jquery";
import "datatables.net-bs5/";
import "datatables.net-rowgroup-bs5/css/rowGroup.bootstrap5.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import "datatables.net-select-bs5/css/select.bootstrap5.min.css";
import "datatables.net-searchpanes-bs5/css/searchPanes.bootstrap5.min.css";

export function destroyUpdateDataTable(tableId){
    $(document).ready(function() {
        $(tableId).DataTable().destroy();
    })
}

// Using in System List tables for Feltsystem and Fartsmåler
export function setTableConfiguration(tableId) {
    $(document).ready(function() {
        $(tableId).DataTable({
            order: [[0, "desc"]],
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Alle"]],
            pageLength: 10,

            language: {
                lengthMenu: "Vis _MENU_ per side",
                zeroRecords: "Ingenting funnet.",
                info: "Vises side  _PAGE_ av _PAGES_",
                infoEmpty: "Ingen poster tilgjengelig",
                infoFiltered: "(filtrert fra _MAX_ total poster)",
                search: "Søk",
                paginate: {
                    first: "Først",
                    last: "Siste",
                    next: "Neste",
                    previous: "Forrige",
                },
            },
            drawCallback: function(settings) {
                let displayCounter = $(tableId)
                    .DataTable()
                    .page.info().recordsDisplay;
                let totalCounter = $(tableId)
                    .DataTable()
                    .page.info().recordsTotal;
                $(tableId + "_info").html(
                    `Viser ${displayCounter} av ${totalCounter}`
                );
            },
        });
    });
}

// Using in System List tables for Enheter
export function  setTableConfigurationEnhet(tableId){
    $(document).ready( function () {
         $(tableId).DataTable({
           rowGroup: {
               startRender: function ( rows, group ) {
                 if(group==1){ return 'Felsystem' +' ('+rows.count()+')'};
                 if(group== 2){ return 'Monteringsplate' +' ('+rows.count()+')'};
                 return 'Fartsmåler' +' ('+rows.count()+')';
               },
             dataSrc: 1
           },
           order: [[1, 'asc']],
           lengthMenu:  [[10, 25, 50, -1], [10, 25, 50, 'Alle']],
           pageLength: -1,
           
           language: {
             lengthMenu: 'Vis _MENU_ per side',
             zeroRecords: 'Ingenting funnet.',
             info: 'Vises side  _PAGE_ av _PAGES_',
             infoEmpty: 'Ingen poster tilgjengelig',
             infoFiltered: '(filtrert fra _MAX_ total poster)',
             search: 'Søk',
             paginate: {
               first:      "Først",
               last:       "Siste",
               next:       "Neste",
               previous:   "Forrige"
               },
           },
           drawCallback: function(settings) {
             let displayCounter = $(tableId).DataTable().page.info().recordsDisplay;
             let totalCounter = $(tableId).DataTable().page.info().recordsTotal;
              $(tableId+"_info").html(
                 `Viser ${displayCounter} av ${totalCounter}`
               );
           }
         });
   });
 }

 // Using in when showing details for each enhet
 export function setTableConfigurationEnhetDetails(tableId, columnDefsConfig, myPreSelect, layoutCol) {
    var table;
    $(document).ready(function() {
        table = $(tableId).DataTable({
            searchPanes: {
                layout: layoutCol || 'auto',
                cascadePanes: true,
                dtOpts: {
                    select: { style: "multi" },
                    order: [[1, "desc"]],
                },
                preSelect: myPreSelect || [],
            },
            columnDefs: columnDefsConfig,
            dom: "Plfrtip",
            order: [[0, "desc"]],
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Alle"]],
            language: {
                lengthMenu: "Vis _MENU_ per side",
                zeroRecords: "Ingenting funnet.",
                info: "Vises side  _PAGE_ av _PAGES_",
                infoEmpty: "Ingen poster tilgjengelig",
                infoFiltered: "(filtrert fra _MAX_ total poster)",
                search: "Søk",
                paginate: {
                    first: "Først",
                    last: "Siste",
                    next: "Neste",
                    previous: "Forrige",
                },
            },

            drawCallback: function(settings) {
                let displayCounter = $(tableId)
                    .DataTable()
                    .page.info().recordsDisplay;
                let totalCounter = $(tableId)
                    .DataTable()
                    .page.info().recordsTotal;
                $(tableId + "_info").html(
                    `Viser ${displayCounter} av ${totalCounter}`
                );
            },
        });
    });
}