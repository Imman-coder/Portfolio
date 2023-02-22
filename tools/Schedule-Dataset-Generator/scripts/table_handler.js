selectedCell=[1,1];
t=[2,4];
days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function refresh_table(){
    days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    html=`
    <tr>
    <td style="">
        <div>Time<br>------<br>Day</div>
    </td>
    `;
    colv=parseInt($("#cols").val());
    rowv=parseInt($("#rows").val());
    
    for(x=0;x<=colv;x++){
        if(x>0){
            html+=`<tr>`;
        }
        for(y=0;y<=rowv;y++){
            title='';
            cellname='';
            closeb='';
            ftp=(x===selectedCell[0] && y===selectedCell[1])?" selectedCell":"";
            if((y===0 && x===0))
                continue;
            if(y===0 && x>0){
                if(x<7)
                {
                    html+=`<td>
                    <input id="day`+x+`-0"class=" simplexinput" placeholder="`+days[x-1]+`">
                    </td>`
                }
                else{
                    html+=`<td>
                    <input id="day`+x+`-0" class=" simplexinput" placeholder="Custom Input">
                    </td>`
                }
                continue;
            }
                
            if(x===0){
                html+=`<td>
                <input id="time0`+y+`" onchange="time_recruiter(0,`+y+`)" class=" simplexinput half" placeholder="Start Time"> <a>-</a>
                <input id="time1`+y+`" onchange="time_recruiter(1,`+y+`)" class=" simplexinput half" placeholder="End Time">
                </td>`
                continue;
            }
            if((y>0)&&(x>0))
            {
                // console.log(y-1+" "+(x-1))
                ljson=JSON.parse(JSON.stringify(mainJson[days[x-1]]))[y-1];
                title=JSON.stringify(ljson,undefined,4).replaceAll  ('"',"'");
                if(ljson["subnames"]===""){
                    closeb=' class="hidden" ';
                    title='';
                }
                if(ljson["isLab"]){
                        cellname=ljson["subnames"][0];
                    for(z=1;z<ljson["groups"];z++){
                        cellname+=" / "+ljson["subnames"][z];
                    }
                }
                else{
                    cellname=ljson["subnames"];
                }
                html+=`<td>
                    <div title="`+title+`" onclick="javascript:selectCell(`+x+`,`+y+`,event||window.event)" class="entry-box`+ftp+`">
                        <a class="sl tab-ele" title="`+title+`">`+cellname+`</a>
                        <button title="remove"`+closeb+` onclick="javascript:removeCell(`+x+`,`+y+`,event||window.event)">x</button>
                    </div>
                </td>
                `
            }
        }
        html+=`</tr>
        `
    }
    $("#tablee").html(html);
}

function selectCell(x,y,e){
    e.cancelBubble = true;
    $("#so").html(x+"-"+y);
    selectedCell=[x,y];
    sync();
    dataloader();
}

function time_recruiter(x,y){
    data=$("#time"+x+""+y).val();
    consicutive?$("#time"+(x==1?0:1)+""+(x==1?y+1:y-1)).val(data):0;
}

function removeCell(x,y,e){
    e.cancelBubble = true;
    console.log("remove ",x,y);
    var confremov = confirm("Do you want to delete the cell "+x+y+"?");
    if( confremov === true ) {
        console.log("confirm delete");
        mainJson[days[x-1]][y-1]={
            "isLab":false,
            "groups":0,
            "subnames":"",
            "subteach":"",
            "subasstteach":"",
            "linked_to":0
        };
        sync();
    } else {
        console.log("declined");
    }

}

function createJson(){
    // closePopup();
    colv=parseInt($("#cols").val());
    rowv=parseInt($("#rows").val());
    for(x=0;x<colv;x++){
        bigx=[]
        sub={
            "isLab":false,
            "groups":0,
            "subnames":"",
            "subteach":"",
            "subasstteach":"",
            "linked_to":0
        }
        for(y=0;y<rowv;y++){
            bigx[y]=sub;
        }
        mainJson[days[x]]=JSON.parse(JSON.stringify(bigx));
    }
    sync()
}

$("document").ready(function() {createJson();refresh_table();});