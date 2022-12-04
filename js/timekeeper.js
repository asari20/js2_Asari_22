

// ---------メイン機能-------//

function showclock(){
let nowtime = new Date();
let nowyear = nowtime.getFullYear();
let nowmonth = nowtime.getMonth();
let nowday = nowtime.getDay();
let nowhour = nowtime.getHours();
let nowmin = nowtime.getMinutes();
let nowsec = nowtime.getSeconds();
let clock = `${nowhour}:${nowmin}:${nowsec}`

$('#clockarea').html(clock);
}

function startclock(){
    let starttime = new Date();
    let startyear = starttime.getFullYear();
    let startmonth = starttime.getMonth() + 1;
    let startday = starttime.getDate();
    let starthour = starttime.getHours();
    let startmin = starttime.getMinutes();
    let startsec = starttime.getSeconds();

    let date = `${startyear}/${startmonth}/${startday}`
    let time = `${starthour}:${startmin}:${startsec}`

    const list = `<tr>
                    <td><input type="text" name="date" value=${date} disabled></td>
                    <td><input type="text" name="s_time" value=${time} disabled></td>
                    <td id="stoptime"></td>
                    <td class="tag_input"><input type="text" name="tag" ></td>
                    <td class="des_input"><input type="text" name="des"></td>
                    <td id="save">保存</td>
                    <td></td>
                    <td style="display: none;"></td>
                 </tr>`
    
     $("#list").append(list);

}

function stopclock(){
    let stoptime = new Date();
    let stophour = stoptime.getHours();
    let stopmin = stoptime.getMinutes();
    let stopsec = stoptime.getSeconds();

    let time = `${stophour}:${stopmin}:${stopsec}`;

    $('#stoptime').html(`<input type="text" name="e_time" value=${time} disabled>`);
    $('#save').addClass("save")

    $('#stoptime').removeAttr('id');
    $('#save').removeAttr('id');
}


setInterval('showclock()',1000)

$('#start').on('click', function(){
    $('#stop').prop('disabled', false);
    $('#stop').removeClass('btn_disable');
    $('#stop').addClass('btn');
    $('#start').prop('disabled', true);
    $('#start').removeClass('btn');
    $('#start').addClass('btn_disable');

    startclock();
})

$('#stop').on('click', function(){
    $('#start').prop('disabled', false);
    $('#start').removeClass('btn_disable');
    $('#start').addClass('btn');
    $('#stop').prop('disabled', true);
    $('#stop').removeClass('btn');
    $('#stop').addClass('btn_disable');

    stopclock();
})


$(document).on('click','.save', function(){
    let count = 0;
    getjson = localStorage.getItem('master_count') 
    count = JSON.parse(getjson) + 1

    let savedate = $(this).closest('tr').find('input[name=date]').val();
    let savestart = $(this).closest('tr').find('input[name=s_time]').val();
    let saveend = $(this).closest('tr').find('input[name=e_time]').val();
    let savetag = $(this).closest('tr').find('input[name=tag]').val();
    let savedes = $(this).closest('tr').find('input[name=des]').val();

    let setjson = JSON.stringify([savedate,savestart,saveend,savetag,savedes]);

    localStorage.setItem(count, setjson)

    setjson = JSON.stringify(count)
    localStorage.setItem('master_count',setjson)

    $(this).closest('tr').children("td")[7].append(count)

    $(this).closest('tr').find('input[name=tag]').attr('disabled', true);
    $(this).closest('tr').find('input[name=des]').attr('disabled', true)
    
    $(this).closest('tr').addClass("disable")
    
    $(this).closest('tr').children('td')[6].innerHTML = '<i class="fa-solid fa-xmark delete"></i>';
    

    $(this).text("編集");
    $(this).removeClass('save');
    $(this).addClass('change');


})

$(document).on('click','.change', function(){

    $(this).closest('tr').find('input[name=date]').attr('disabled',false);
    $(this).closest('tr').find('input[name=s_time]').attr('disabled',false);
    $(this).closest('tr').find('input[name=e_time]').attr('disabled',false);
    $(this).closest('tr').find('input[name=tag]').attr('disabled', false);
    $(this).closest('tr').find('input[name=des]').attr('disabled', false)   

    $(this).closest('tr').removeClass("disable")

    $(this).text("変更を保存");
    $(this).removeClass('change');
    $(this).addClass('changesave');

})

$(document).on('click','.changesave', function(){

    $(this).closest('tr').find('input[name=date]').attr('disabled',true);
    $(this).closest('tr').find('input[name=s_time]').attr('disabled',true);
    $(this).closest('tr').find('input[name=e_time]').attr('disabled',true);
    $(this).closest('tr').find('input[name=tag]').attr('disabled', true);
    $(this).closest('tr').find('input[name=des]').attr('disabled', true)   

    let savemaster = $(this).closest('tr').children('td')[7].innerText;
    let savedate = $(this).closest('tr').find('input[name=date]').val();
    let savestart = $(this).closest('tr').find('input[name=s_time]').val();
    let saveend = $(this).closest('tr').find('input[name=e_time]').val();
    let savetag = $(this).closest('tr').find('input[name=tag]').val();
    let savedes = $(this).closest('tr').find('input[name=des]').val();

    let setJsonDatas = JSON.stringify([savedate,savestart,saveend,savetag,savedes])

    localStorage.setItem(savemaster, setJsonDatas)
    
    $(this).closest('tr').addClass("disable");

    $(this).text("編集");
    $(this).removeClass('changesave');
    $(this).addClass('change');

})

$(document).on('click','.delete', function(){

    let deletemaster = $(this).closest('tr').children('td')[7].innerText;
    localStorage.removeItem(deletemaster);

   $(this).parents('tr').remove();

})

//-----------history機能---------- //

$("#history_btn").on('click',function(){
    
    $('#historical_list').find('tr').slice(1).remove()
    
    $('#history').fadeIn(1000);


    for(let i=0; i<localStorage.length; i++){
        const key   = localStorage.key(i);

        if(key == "master_count"){
        
        }else{        
        
        const getvalue = localStorage.getItem(key);
        const value = JSON.parse(getvalue)       
        const html = `<tr>
                        <td><input type="text" name="date" value=${value[0]} disabled></td>
                        <td><input type="text" name="s_time" value=${value[1]} disabled></td>
                        <td><input type="text" name="e_time" value=${value[2]} disabled></td>
                        <td><input type="text" name="tag" value=${value[3]} disabled></td>
                        <td><input type="text" name="des" value=${value[4]} disabled></td>
                        <td class="change">編集</td>
                        <td><i class="fa-solid fa-xmark delete"></i></td>
                        <td style="display:none;" >${key}</td>

                        </tr>`;
        $("#historical_list").append(html);
        }


    }



})

$("#close").on("click", function(){

   $('#history').fadeOut(1000);

})
