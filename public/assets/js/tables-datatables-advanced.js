"use strict";
$((function() {
    var a = $(".datatables-ajax")
      , t = $(".dt-column-search")
      , e = $(".dt-advanced-search")
      , l = $(".dt-responsive")
      , n = $(".start_date")
      , o = $(".end_date")
      , s = $(".flatpickr-range");
    s.length && s.flatpickr({
        mode: "range",
        dateFormat: "m/d/Y",
        orientation: isRtl ? "auto right" : "auto left",
        locale: {
            format: "MM/DD/YYYY"
        },
        onClose: function(a, t, e) {
            var l = ""
              , r = new Date;
            null != a[0] && (l = moment(a[0]).format("MM/DD/YYYY"),
            n.val(l)),
            null != a[1] && (r = moment(a[1]).format("MM/DD/YYYY"),
            o.val(r)),
            $(s).trigger("change").trigger("keyup")
        }
    }),
    $.fn.dataTableExt.afnFiltering.length = 0;
    var r = function(a, t, e) {
        $.fn.dataTableExt.afnFiltering.push((function(l, n, o) {
            var s = d(n[a])
              , r = d(t)
              , c = d(e);
            return r <= s && s <= c || (s >= r && "" === c && "" !== r || s <= c && "" === r && "" !== c)
        }
        ))
    }
      , d = function(a) {
        var t = new Date(a);
        return t.getFullYear() + "" + ("0" + (t.getMonth() + 1)).slice(-2) + ("0" + t.getDate()).slice(-2)
    };
    if (a.length)
        a.dataTable({
            processing: !0,
            ajax: assetsPath + "json/ajax.php",
            dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>><"table-responsive"t><"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>'
        });
    if (t.length) {
        $(".dt-column-search thead tr").clone(!0).appendTo(".dt-column-search thead"),
        $(".dt-column-search thead tr:eq(1) th").each((function(a) {
            var t = $(this).text();
            $(this).html('<input type="text" class="form-control" placeholder="Search ' + t + '" />'),
            $("input", this).on("keyup change", (function() {
                c.column(a).search() !== this.value && c.column(a).search(this.value).draw()
            }
            ))
        }
        ));
        var c = t.DataTable({
            ajax: assetsPath + "json/table-datatable.json",
            columns: [{
                data: "full_name"
            }, {
                data: "email"
            }, {
                data: "post"
            }, {
                data: "city"
            }, {
                data: "start_date"
            }, {
                data: "salary"
            }],
            orderCellsTop: !0,
            dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>><"table-responsive"t><"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>'
        })
    }
    if (e.length){
        e.DataTable({
            dom: "<'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6 dataTables_pager'p>>",
            ajax: assetsPath + "json/table-datatable.json",
            columns: [{
                data: ""
            }, {
                data: "full_name"
            }, {
                data: "email"
            }, {
                data: "post"
            }, {
                data: "city"
            }, {
                data: "start_date"
            }, {
                data: "salary"
            }],
            columnDefs: [{
                className: "control",
                orderable: !1,
                targets: 0,
                render: function(a, t, e, l) {
                    return ""
                }
            }],
            orderCellsTop: !0,
            responsive: {
                details: {
                    display: $.fn.dataTable.Responsive.display.modal({
                        header: function(a) {
                            return "Details of " + a.data().full_name
                        }
                    }),
                    type: "column",
                    renderer: function(a, t, e) {
                        var l = $.map(e, (function(a, t) {
                            return "" !== a.title ? '<tr data-dt-row="' + a.rowIndex + '" data-dt-column="' + a.columnIndex + '"><td>' + a.title + ":</td> <td>" + a.data + "</td></tr>" : ""
                        }
                        )).join("");
                        return !!l && $('<table class="table"/><tbody />').append(l)
                    }
                }
            }
        });
    }
        
    if ($("input.dt-input").on("keyup", (function() {
        !function(a, t) {
            if (5 == a) {
                var l = n.val()
                  , s = o.val();
                "" !== l && "" !== s && ($.fn.dataTableExt.afnFiltering.length = 0,
                e.dataTable().fnDraw(),
                r(a, l, s)),
                e.dataTable().fnDraw()
            } else
                e.DataTable().column(a).search(t, !1, !0).draw()
        }($(this).attr("data-column"), $(this).val())
    }
    )),
    l.length)
        l.DataTable({
            ajax: assetsPath + "json/table-datatable.json",
            columns: [{
                data: ""
            }, {
                data: "full_name"
            }, {
                data: "email"
            }, {
                data: "post"
            }, {
                data: "city"
            }, {
                data: "start_date"
            }, {
                data: "salary"
            }, {
                data: "age"
            }, {
                data: "experience"
            }, {
                data: "status"
            }],
            columnDefs: [{
                className: "control",
                orderable: !1,
                targets: 0,
                searchable: !1,
                render: function(a, t, e, l) {
                    return ""
                }
            }, {
                targets: -1,
                render: function(a, t, e, l) {
                    var n = e.status
                      , o = {
                        1: {
                            title: "Current",
                            class: "bg-label-primary"
                        },
                        2: {
                            title: "Professional",
                            class: " bg-label-success"
                        },
                        3: {
                            title: "Rejected",
                            class: " bg-label-danger"
                        },
                        4: {
                            title: "Resigned",
                            class: " bg-label-warning"
                        },
                        5: {
                            title: "Applied",
                            class: " bg-label-info"
                        }
                    };
                    return void 0 === o[n] ? a : '<span class="badge rounded-pill ' + o[n].class + '">' + o[n].title + "</span>"
                }
            }],
            destroy: !0,
            dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
            responsive: {
                details: {
                    display: $.fn.dataTable.Responsive.display.modal({
                        header: function(a) {
                            return "Details of " + a.data().full_name
                        }
                    }),
                    type: "column",
                    renderer: function(a, t, e) {
                        var l = $.map(e, (function(a, t) {
                            return "" !== a.title ? '<tr data-dt-row="' + a.rowIndex + '" data-dt-column="' + a.columnIndex + '"><td>' + a.title + ":</td> <td>" + a.data + "</td></tr>" : ""
                        }
                        )).join("");
                        return !!l && $('<table class="table"/><tbody />').append(l)
                    }
                }
            }
        });
    setTimeout((()=>{
        $(".dataTables_filter .form-control").removeClass("form-control-sm"),
        $(".dataTables_length .form-select").removeClass("form-select-sm")
    }
    ), 300)
}
));
