function getHello(){
    $.ajax({
    type: "GET",
    url: "http://localhost:8080/",
    success: function(data){
    $("#resGetHello").html(data); },
    error: function(res){
    alert("ERROR: "+ res.statusText); }
    });
}
    