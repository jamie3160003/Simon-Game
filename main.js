$(document).ready(function(){
    $(".color-1").click(function(){
        console.log("success");
        pressGreen();
    });
});

//-----------function-------------

var pressGreen = function(){
    $(".color-1").addClass("color-1-press");
    $(".color-1").removeClass("color-1-press");
};


var pressRed = function(){

};

var pressYellow = function(){

};

var pressBlue = function(){

};
