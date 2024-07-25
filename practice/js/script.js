function btnclick(val){
    document.getElementById('input-screen').value= document.getElementById('input-screen').value+val;

}
function clearValue(){
    document.getElementById('input-screen').value="";
}

function equalClick(){
    var text=document.getElementById('input-screen').value
    var result=eval(text)
    document.getElementById('input-screen').value=result
}