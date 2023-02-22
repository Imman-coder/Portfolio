mainJson={};

function sync(){
    $("#output").html(JSON.stringify(mainJson,undefined,2));
    refresh_table();
}
