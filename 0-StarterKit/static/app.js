$(function() {
    $("#getJoke").click(
        function() {
            $.get("/jokes",function(data){
                $("#setup").html(data.setup);
                $("#punchline").html(data.punchline);
            },"json")
        }
    );
});