$(document).ready(function () {
    var phone_fields = 1,
        search_obj = [],
        search_call_obj = [],
        d = new Date(),
        start_month = d.getMonth(),
        start_year = d.getFullYear(),
        sel_month, sel_year = "", result = "",
        monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

    for (var j = start_year; j >= 1900; j--) {
        var opt = document.createElement('option');
        opt.value = j;
        opt.innerHTML = j;
        document.getElementById("option_years").appendChild(opt);
    }

    for (var i = 0; i <= 11; i++) {
        var opt = document.createElement('option');
        opt.value = i + 1;
        opt.innerHTML = monthNames[i];
        document.getElementById("option_months").appendChild(opt);
    }

    $(document).on('change keydown keyup', '#search_input', function (e) {
        search_obj['textaara'] = '#textarea_' + $(this).data('search-input-type') + '_' + $(this).data('id');
        search_obj['this'] = $(this);
        search_obj['searchtab'] = '#searchtab_' + $(this).data('search-input-type') + '_' + $(this).data('id');
        search_obj['type'] = $(this).data('search-input-type');
        search_obj['id'] = $(this).data('id');
       /* console.log(search_obj['id']);
        console.log(search_obj['type']);
        console.log(search_obj['textaara']);
        console.log(JSON.stringify(this, null, 4));*/
    });
    /*
        Post codes - testing
    */

    /*   new IdealPostcodes.Autocomplete.Controller({
      api_key: "iddqd",
      inputField: "#input",
      outputFields: {
        line_1: "#first_line",
        line_2: "#second_line",
        line_3: "#third_line",
        post_town: "#post_town",
        postcode: "#postcode"
      }

    }); */


    const controller = new IdealPostcodes.Autocomplete.Controller({
        api_key: "iddqd",
        checkKey: true,
        onLoaded: function () {
            $("#info").html("service ok");
        },
        onFailedCheck: function () {
            $("#info").html("---Please manually enter your address");
        },
        onAddressRetrieved: function (data) {
            var address_raw = JSON.stringify(data, null, 4);
            // call function to list address
            var addressToPrint = "";
            var lines = 0;
            if (data.organisation_name) {
                addressToPrint = addressToPrint + data.organisation_name + "\n";
                lines++;
            }
            if (data.building_name) {
                addressToPrint = addressToPrint + data.building_name + "\n";
                lines++;
            }
            if (data.sub_building_name) {
                addressToPrint = addressToPrint + data.sub_building_name + "\n";
                lines++;
            }
            if (data.line_1 && (data.line_1 !== data.organisation_name)) {
                addressToPrint = addressToPrint + data.line_1 + "\n";
                lines++;
            }
            if (data.line_2) {
                addressToPrint = addressToPrint + data.line_2 + "\n";
                lines++;
            }
            if (data.line_3) {
                addressToPrint = addressToPrint + data.line_3 + "\n";
                lines++;
            }
            if (data.post_town) {
                addressToPrint = addressToPrint + data.post_town + "\n";
                lines++;
            }
            if (data.county) {
                addressToPrint = addressToPrint + data.county + "\n";
                lines++;
            }
            if (data.postcode) {
                addressToPrint = addressToPrint + data.postcode + "\n";
                lines++;
            }

          /*  console.log(JSON.stringify(this, null, 4));

            search_this = this["input"];
            call_obj_keys = Object.keys(search_this);
            search_call_obj = this["input"][call_obj_keys[0]];*!/


            search_tab = '#searchtab_' + search_call_obj["searchInputType"] + '_' + search_call_obj["id"];

            console.log("call from: " + search_call_obj["searchInputType"] + search_call_obj["id"]);
*/
            $(search_obj['textaara']).attr("rows", lines).html(addressToPrint);
            $(search_obj['searchtab']).find("#address_field_" + search_obj['id']).removeClass("hidden");
            $(search_obj['searchtab']).find("#search_input_group_" + search_obj['id']).addClass("hidden");
            $(search_obj['searchtab']).find("#search_heading_" + search_obj['id']).addClass("ok");

            console.log(address_raw);
        },
        onSearchError: function (error) {
            console.log("suggestions not find: " + error);
        },
        onSuggestionsRetrieved: function (sugg) {
            var sugg_box = $(search_obj['searchtab']).find("#searchsuggcount");

            if (sugg.length === 10) {
                sugg_box.removeClass("danger").addClass("success");
                sugg_box.html("+" + sugg.length + " found");
            } else if (sugg.length > 0 && sugg.length !== 10) {
                sugg_box.removeClass("danger").addClass("success");
                sugg_box.html(sugg.length + " found");
            } else {
                sugg_box.removeClass("success").addClass("danger");
                sugg_box.html("not found");
            }

            //console.log('this: ' + JSON.stringify(this, null, 5));

            /*search_this = this["interface"]["input"];

            console.log(search_tab);

            call_obj_keys = Object.keys(search_this);
            search_call_obj = this["interface"]["input"][call_obj_keys[0]];


            console.log("call from: " + search_call_obj["searchInputType"] + search_call_obj["id"]);

          console.log(JSON.stringify(this["interface"]["input"][call_obj_keys[0]], null, 4));
            console.log("object keys: " + call_obj_keys[0]); */

           // $(search_obj[0]).find("#address_text1").html(sugg.length + " \n " +"test");

        },
        inputField: "#search_input",
        outputFields: {
            line_1: "#first_line",
            line_2: "#second_line",
            line_3: "#third_line",
            post_town: "#post_town",
            postcode: "#postcode"
        }
    });

    ///////// END  //////////////

    var navListItems = $('ul.setup-panel li a'),
        allWells = $('.setup-content');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this).closest('li');

        if (!$item.hasClass('disabled')) {
            navListItems.closest('li').removeClass('active');
            $item.addClass('active');
            allWells.hide();
            $target.show();
        }
    });

    $('ul.setup-panel li.active a').trigger('click');

    // DEMO ONLY //
    $('#activate-step-1').on('click', function (e) {
        $("#info").text($(this).attr('id'));
        $('ul.setup-panel li a[href="#step-1"]').trigger('click');
    })

    $('#activate-step-2').on('click', function (e) {
        $("#info").text($(this).attr('id'));
        $('ul.setup-panel li a[href="#step-2"]').trigger('click');
    })
    $('#activate-step-3').on('click', function (e) {
        $("#info").text($(this).attr('id'));
        $('ul.setup-panel li a[href="#step-3"]').trigger('click');
    })
    $('#activate-step-4').on('click', function (e) {
        $("#info").text($(this).attr('id'));
        $('ul.setup-panel li a[href="#step-4"]').trigger('click');
    })
    $('button').on('click', function (e) {
        //console.log($(this).attr('id'));
        var target = $(this).attr('id').split(':')[1];
        var temp = target.split("-")[1] - 1;
        $('ul.setup-panel li:eq(' + temp + ')').removeClass('disabled');
        $('ul.setup-panel li a[href="#' + target + '"]').trigger('click');
    });

    $('ul.first_address_tabs li.active a').trigger('click');


    $(document).on('click', "li.phoneChild", function (e) {
        e.preventDefault();
        var phonet = $(this).find("a").text() + " <span class='caret'></span>";
        $(this).find("a").parent().addClass("hidden").siblings().removeClass("hidden");
        //console.log($(this).parent().parent().find(".phone-type-button").text());
        $(this).parent().parent().find("button.phone-type-button").html(phonet);

        //console.log($(this).find("a").text());
    });

    $(document).on('click', "#remove_address1", function (e) {

        $(search_obj['textaara']).attr("rows", 1).html('');
        $(search_obj['searchtab']).find("#address_field_" + search_obj['id']).addClass("hidden");
        $(search_obj['searchtab']).find("#search_input_group_" + search_obj['id']).removeClass("hidden");
        $(search_obj['searchtab']).find("#search_heading_" + search_obj['id']).removeClass("ok");

    });

    $(document).on('click', "#option_months, #option_years", function (e) {
        // document.getElementById(this.id).removeChild(this.childNodes[1]);
    });

    $(document).on('change', "#option_months, #option_years", function (e) {

        // console.log(this.id + ": " + this.value);

        if (this.id === "option_months") sel_month = this.value;
        if (this.id === "option_years") sel_year = this.value;


        existing_tabs = $('div#' + search_obj['type'] + 'addresspanel').length;
        new_tab_nr = existing_tabs + 1;


        console.log('objects: ' + $(this).data('id') + '. existing: ' + existing_tabs);



        today = start_year * 12 + start_month;
        selected_date = sel_year * 12 + sel_month * 1;
        len_mnt = today - selected_date;

        /*console.log(start_year + ' + ' + start_month + ' = ' + today);
        console.log(sel_year + ' + ' + sel_month + ' = ' + selected_date);
        console.log(len_mnt);*/


        if (sel_month !== "" && sel_year !== "") {
            if (len_mnt <= 35) {
                console.log("checked but les then 3 years! " + len_mnt);
                $("#collapse_" + search_obj['id']).collapse('toggle');

                console.log('hellol!!!! - ' + search_obj['id']);
                //document.getElementById("title_collapse_" + search_obj['id']).innerHTML = "Address #1 - ok";

                sel_year = "";
                sel_month = "";

                //creating a clone of a tab
                var controlForm = $('#accordion:first'),
                    currentEntry = $('#' + search_obj['type'] + 'addresspanel:first'),
                    newEntry = $(currentEntry.clone())
                        .appendTo(controlForm);

                /*  newEntry.find('#panel-heading').prop("id","headingTwo");
                  newEntry.find('#collapse_label_1').text("Address #2").prop("id","collapse_label_2").prop("href","#collapseTwo");
                 newEntry.find("#collapseOne:last").attr("id","collapseTwo").removeClass("in").collapse("toggle");
                 */
                newEntry.find('div#heading_' + search_obj['id']).attr('id', 'heading' + new_tab_nr).find('a').prop('href', '#collapse_' + new_tab_nr).text('Collasible #' + new_tab_nr).addClass('collapsed');
                newEntry.find('div#collapse_' + search_obj['id']).attr('id', 'collapse' + new_tab_nr).removeClass('in');

            } else {
                console.log("checked and ALL GOOD " + len_mnt)

            }
        }


        /* $("div").find("#serchtab").find("#address_text1")
             .attr("rows", 1)
             .html("");
         $("div").find("#address_field1").addClass("hidden");
         $("div").find("#search_input1").removeClass("hidden");*/

    });

    $(document).on('click', ".btn-add", function (e) {


        if (phone_fields <= 2) {

            e.preventDefault();
            var controlForm = $('.phones'),
                currentEntry = $(this).parents('.form-group:first'),
                newEntry = $(currentEntry.clone())
                    .appendTo(controlForm);


            //console.log(currentEntry);
            newEntry.find('input').val('').attr("placeholder", "Your another phone number");
            newEntry.find("label").text("Another phone number.");
            controlForm.find('.phone:last .btn-add')
                .removeClass('btn-add').addClass('btn-remove')
                .removeClass('btn-success').addClass('btn-danger')
                .html('<span class="glyphicon glyphicon-minus"></span>');

            controlForm.find('.phone:last .input-group-addon')
                .removeClass("success").removeClass("danger")
                .html('<span class="glyphicon glyphicon-asterisk"></span>');
            if (phone_fields === 2) {
                controlForm.find(".btn.btn-success.btn-add:first")
                    .prop('disabled', true)
                    .html('<span class="glyphicon glyphicon-ban-circle"></span>');
            }

            phone_fields++;
            return false;
        }
    });

    $(document).on('click', '.btn-remove', function (e) {
        $(this).parents('.phone:first').remove();

        e.preventDefault();
        phone_fields--;
        if (phone_fields <= 2) {
            $('.phones').find(".btn.btn-success.btn-add:first")
                .prop('disabled', false)
                .html('<span class="glyphicon glyphicon-plus"></span>');
        }
        return false;
    });
    // on click controll
    // buttton click:
    $('#radioBtn span').on('click', function () {
        var sel = $(this).data('value');  //mr
        var tog = $(this).data('toggle'); //title
        $('#' + tog).val(sel);
        //  You can change these lines to change classes (Ex. btn-default to btn-danger)
        $('span[data-toggle="' + tog + '"]').not('[data-value="' + sel + '"]').removeClass('active btn-primary').addClass('notActive btn-default');
        $('span[data-toggle="' + tog + '"][data-value="' + sel + '"]').removeClass('notActive btn-default').addClass('active btn-primary');
        // button validation:
        $('span[id="title-icon1"]').addClass("success");
        $('span[id="title-icon2"]').attr('class', 'glyphicon glyphicon-ok');

    });

    $('#multi-buton span').on('click', function () {
        var sel = $(this).data('value');  //mr
        var tog = $(this).data('toggle'); //title

        $('span[data-toggle="' + tog + '"].statusb').not('[data-value="' + sel + '"]').removeClass('active btn-primary').removeClass('leading').addClass('notActive btn-default').addClass("hidden");
        $('span[data-toggle="' + tog + '"][data-value="' + sel + '"].statusb').removeClass('notActive btn-default').addClass('active btn-primary leading');
        $('ul.status-type').find("#" + sel).addClass("hidden").siblings().removeClass("hidden");

        // button validation:
        $('span[id="status-icon1"]').addClass("success");
        $('span[id="status-icon2"]').attr('class', 'glyphicon glyphicon-ok');
    });

    $(document).on('click', "li.statusChild", function (e) {
        e.preventDefault();
        var status_btn_txt = $(this).find("a").text();
        $(this).find("a").parent().addClass("hidden").siblings().removeClass("hidden");
        //console.log(
        $("#multi-buton").find("span.leading").text(status_btn_txt).removeClass('notActive btn-default').addClass('active btn-primary leading').siblings().addClass("hidden");

        // button validation:
        $('span[id="status-icon1"]').addClass("success");
        $('span[id="status-icon2"]').attr('class', 'glyphicon glyphicon-ok');

    });

    $(document).on('change keydown keyup', 'input', function (e) {
        var ver_type = this.getAttribute("ver");
        var ver_req = this.getAttribute("req");
        var inp_txt = this.value;
        var status = "";

        //console.log("=> " + inp_txt + " = " + ver_req + " <=> " + ver_type);

        switch (ver_type) {
            case "text-only":
                if (inp_txt !== "") {
                    status = "ok"
                }
                ;
                break;
            case "email":
                if (inp_txt) {
                    status = "ok"
                }
                ;
                break;
            case "email1":
                if (inp_txt) {
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    var result = re.test(inp_txt);

                    if (result) {
                        status = "ok"
                    }
                    if ($("#email2").val() !== "") {
                        if ($("#email2").val() === inp_txt) {
                            mark($("#email2"), "ok");
                        } else {
                            mark($("#email2"), "fail");
                        }
                    }
                }
                ;
                break;
            case "email2":
                if ($("#email1").val() === $("#email2").val()) {
                    status = "ok";
                } else {
                    status = "fail";
                }
                break;
            case "phone-only":
                if (inp_txt) {
                    var maintainplus = '';
                    //console.log(inp_txt.charAt(0));
                    if (inp_txt.charAt(0) === '+') {
                        maintainplus = '+';
                    }
                    var curphonevar = inp_txt.replace(/[\\A-Za-z!"£$%^&\,*+_={};:'@#~,.Š\/<>?|`¬\]\[]/g, '');
                    this.value = (maintainplus + curphonevar);
                    var maintainplus = '';
                    if (curphonevar.length >= 9) {
                        status = "ok"
                    }
                    ;
                }
                ;
                break;
            case "dob":
                var format = "dd/mm/yyyy";
                var match = new RegExp(format
                    .replace(/(\w+)\W(\w+)\W(\w+)/, "^\\s*($1)\\W*($2)?\\W*($3)?([0-9]*).*")
                    .replace(/m|d|y/g, "\\d"));
                var replace = "$1/$2/$3$4"
                    .replace(/\//g, format.match(/\W/));

            function doFormat(target) {
                target.value = target.value
                    .replace(/(^|\W)(?=\d\W)/g, "$10")   // padding
                    .replace(/[\\A-Za-z!"£$%^&\,*+_={};:'@#~,.Š\/<>?|`¬\]\[]/g, "")
                    .replace(match, replace)             // fields
                    .replace(/(\W)+/g, "$1");            // remove repeats
            }

                //var len = inp_txt.length;
                //inp_txt = inp_txt.replace(/[\\A-Za-z!"£$%^&\,*+_={};:'@#~,.Š\/<>?|`¬\]\[]/g,"");
                //this.value = inp_txt;


                if (!e.ctrlKey && !e.metaKey && (e.keyCode === 32 || e.keyCode > 46))
                    doFormat(e.target)

                const regex = /\b(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[12])[/](19[0-9]{2}|20[0-9]{2})/g;

                if (regex.test(inp_txt)) {
                    status = "ok"
                }
                ;
                //console.log(inp_txt);

                break;
        }
        ;

        if (ver_req === 0 && !status) {
            status = "option";
        }
        ;

        if (ver_type !== "none") {
            mark(this, status);
        }
        ;
        //console.log(item_id + ": " + inp_txt);


    });


    $('[data-toggle="tooltip"]').tooltip();

    $("[data-toggle='tooltip']").on("mouseover", function () {
        if ($(this).hasClass("danger")) {
            $(".tooltip").addClass("tooltip-invalid").removeClass("tooltip-valid");
            $(this).attr("data-original-title", $(this).attr("msg_err"));
        } else if ($(this).hasClass("success")) {
            $(".tooltip").addClass("tooltip-valid").removeClass("tooltip-invalid");
            $(this).attr("data-original-title", $(this).attr("msg_ok"));
        } else {
            $(".tooltip").removeClass("tooltip-invalid tooltip-valid");
        }
    });


    // end of ready(functon)


    function mark(item, status) {


        var $group = $(item).closest('.input-group'),
            $addon = $group.find('.input-group-addon'),
            $icon = $addon.find('span');

        //console.log("going to change class for: " + $addon.attr("class"));

        $("#info3").text(status);

        switch (status) {
            case "ok":
                $addon.addClass('success');
                $addon.removeClass('info');
                $addon.removeClass('danger');
                $icon.attr('class', 'glyphicon glyphicon-ok');
                break;
            case "option":
                $addon.addClass('info');
                $addon.removeClass('success');
                $addon.removeClass('danger');
                $icon.attr('class', 'glyphicon glyphicon-asterisk');
                break;
            default:
                $addon.addClass('danger');
                $addon.removeClass('success');
                $addon.removeClass('info');
                $icon.attr('class', 'glyphicon glyphicon-remove');
        }
    }

});