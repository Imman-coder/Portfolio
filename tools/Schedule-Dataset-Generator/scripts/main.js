const blankjson={
    "isLab":false,
    "groups":0,
    "subnames":"",
    "subteach":"",
    "subasstteach":"",
    "linked_to":0
}
const islab_cb = $("#is_lab");
const subgroup_dm = $("#subgroups");
const sub_table = $("#sub_inf")
const consicutive = true;

function save(){
    getpopulator();
    sync();
    refresh_table();
}

function getpopulator(){
    var njson = {};
    njson["isLab"]=islab_cb.prop("checked");
    if(njson["isLab"]){
        njson["groups"]=subgroup_dm.prop('selectedIndex')+1;
        arn=[3];
        art=[3]
        ara=[3];
        for(var i = 0;i< njson["groups"];i++){
            arn[i]=$("#sub_name"+(i+1)).val();
            art[i]=$("#teach_name"+(i+1)).val();
            ara[i]=$("#asst_teach_name"+(i+1)).val();
        }
        njson["subnames"]=arn;
        njson["subteach"]=art;
        njson["subasstteach"]=ara;
    }
    else{
        njson["groups"]=0;
        njson["subnames"]=$("#sub_name").val();
        njson["subteach"]=$("#teach_name").val();
        njson["subasstteach"]="";
    }
    njson["linked_to"]=$("#linked_to").prop('selectedIndex');
    mainJson[days[selectedCell[0]-1]][selectedCell[1]-1]=JSON.parse(JSON.stringify(njson));
    
    
}

function dropdown_toggle(id){
    menu = $("#"+id);
    if (menu.css("display") === "block"){
        menu.css("display","none");
    }
    else{
        menu.css("display","block");
    }
}


function subgroup_changed(){
    console.log(subgroup_dm.val());
    subgroup_populator(subgroup_dm.val())
}


function lab_cb(){
    if($('#is_lab').prop("checked")){
        subgroup_populator(1);
        subgroup_dm.attr('disabled',false);
        $("#subgroup_div").css("display","block");
        subgroup_dm.prop('selectedIndex',0);
    }
    else{
        sub_populator();
        subgroup_dm.attr('disabled',true);
        $("#subgroup_div").css("display","none");
    }
}



function sub_populator(){
    sub_table.html(`
                    <div id="subgroup1-inf" class="div-table no-padding no-margin" style="display: block;" >
                        <div class="div-table-row">
                            <a class="div-table-col">Subject Name</a>
                            <input class="div-table-col" id="sub_name">
                        </div>
                        <div class="div-table-row">
                            <a class="div-table-col">Teacher Name</a>
                            <input class="div-table-col" id="teach_name">
                        </div>
                    </div>`);
}


function subgroup_populator(len){
    html = ``;
    for(var i = 1;i<=len;i++){
        html+=`<div class = "spacer">
                    <button class="dropdown-btn" title="Click to expand/shrink menu."  onclick="javascript:dropdown_toggle('subgroup`+i+`-inf')">Subgroup `+i+`
                        <a class="down-arrow">▼</a>
                    </button>
                    <div id="subgroup`+i+`-inf" class="div-table bordered no_padding" style="display: block;">
                        <div class="div-table-row">
                            <a class="div-table-col">Subject Name</a>
                            <input class="div-table-col" id="sub_name`+i+`">
                        </div>
                        <div class="div-table-row">
                            <a class="div-table-col">Teacher Name</a>
                            <input class="div-table-col" id="teach_name`+i+`">
                        </div>
                        <div class="div-table-row">
                            <a class="div-table-col">Asst. Teacher Name</a>
                            <input class="div-table-col" id="asst_teach_name`+i+`">
                        </div>
                    </div>
                </div>
                `

    }
    sub_table.html(html);
}

const popup = document.querySelector('.full-screen');

function download() {
    saveAs(new Blob([JSON.stringify(mainJson,undefined,"\t")], {type: "application/json"}))
}

function showPopup(){
    popup.classList.remove('hidden');
}

function closePopup(){
    createJson();
    popup.classList.add('hidden');
}

function dataloader(init = false){
    var dat=JSON.parse(JSON.stringify(mainJson[days[selectedCell[0]-1]][selectedCell[1]-1]));
    if(init){
        dat=JSON.parse(JSON.stringify(blankjson));
    }
    if(!init){
        if((dat["subnames"]==="")){
            return;
        }
    }
    if(dat["isLab"]){
        islab_cb.prop("checked",true);
        lab_cb();
        subgroup_dm.prop('selectedIndex',dat["groups"]-1);
        subgroup_changed();
        
        for(var i = 0;i< dat["groups"];i++){
            $("#sub_name"+(i+1)).val(dat["subnames"][i]);
            $("#teach_name"+(i+1)).val(dat["subteach"][i]);
            $("#asst_teach_name"+(i+1)).val(dat["subasstteach"][i]);
        }
    }
    else{
        islab_cb.prop("checked",false);
        lab_cb();
        $("#sub_name").val(dat["subnames"]);
        $("#teach_name").val(dat["subteach"]);

    }
    return;
}

function loadJson(){
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => { 

    // getting a hold of the file reference
    var file = e.target.files[0]; 

    // setting up the reader
    var reader = new FileReader();
    reader.readAsText(file,'UTF-8');

    // here we tell the reader what to do when it's done reading...
    reader.onload = readerEvent => {
        var content = readerEvent.target.result; // this is the content!
        mainJson=JSON.parse(content);
    }

    }

    input.click();
    sync()
}



$('#jsfp').on('change',function() {console.log("5");loadJson()})
$('#is_lab').click(function() {lab_cb()});
$('document').ready(function() {
    // $(document).tooltip({show: {effect:"none", delay:0}});
    lab_cb();
    // showPopup();
});
// islab()
// $(document).tooltip({show: null});
