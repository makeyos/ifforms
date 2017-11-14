var i = 1;
var input = "#search_field_";
var output = "#result_field_";


const controller = new IdealPostcodes.Autocomplete.Controller({
    api_key: "iddqd",
    inputField: input,
    outputFields: {
        line_1: "#first_line",
        line_2: "#second_line",
        line_3: "#third_line",
        post_town: "#post_town",
        postcode: "#postcode"
    },
    onAddressRetrieved: function (data) {
        var print_address = data.line_1 + "\n" + data.post_town + "\n" + data.postcode + "\n";
        $(this).find(output + i).html = print_address;

    }

});

$(document).on('click', "button#add_button", function (e) {
    i++;
    $("info").html = "Active: " + i;
    var form = $("#address_lists"),
        current = $("#fields:first")
        newEntry = $(current.clone()).appendTo(form);

    current.$("span#input_field").removeClass("visible").addClass("hidden")
    newEntry.$("span#input_field").$("label#search").html = "Search for address #" + i;
    newEntry.$("span#input_field").$("input").attr("id",input + i);
    newEntry.$("label#output").html = "result #" + i;
    newEntry.$("textarea").html = "";


});