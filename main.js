var global = {
    sequence : [],
    playerInput : [],
    waitForInput : false,
    length : 0,
    curLength : 0
}

$(document).ready(function(){
    computer();
    $(".color-1").click(function(){
        var promise = new Promise(function(resolve,reject){
            global.waitForInput = false;
            pressGreen();
            resolve("success");
        });
        promise.then(function(){
            global.playerInput.push(0);
            if(global.playerInput[global.curLength] == global.sequence[global.curLength] ) global.curLength++;
            else again();
            if(global.curLength == global.sequence.length) {
                computer();
            }else global.waitForInput = true;
        });
    });
    $(".color-2").click(function(){
        var promise = new Promise(function(resolve,reject){
            global.waitForInput = false;
            pressRed();
            resolve("success");
        });
        promise.then(function(){
            global.playerInput.push(1);
            if(global.playerInput[global.curLength] == global.sequence[global.curLength] ) global.curLength++;
            else again();
            if(global.curLength == global.sequence.length) {
                computer();
            }else global.waitForInput = true;
        });

    });
    $(".color-3").click(function(){
        if(global.waitForInput){
            var promise = new Promise(function(resolve,reject){
                global.waitForInput = false;
                pressYellow();
                resolve("success");
            });
            promise.then(function(){
                global.playerInput.push(2);
                if(global.playerInput[global.curLength] == global.sequence[global.curLength] ) global.curLength++;
                else again();
                if(global.curLength == global.sequence.length) {
                    computer();
                }else global.waitForInput = true;
            });

        }

    });
    $(".color-4").click(function(){
        var promise = new Promise(function(resolve,reject){
            global.waitForInput = false;
            pressBlue();
            resolve("success");
        });
        promise.then(function(){
            global.playerInput.push(3);
            if(global.playerInput[global.curLength] == global.sequence[global.curLength] ) global.curLength++;
            else again();
            if(global.curLength == global.sequence.length) {
                computer();
            }else global.waitForInput = true;
        });

    });
});

//-----------function-------------


var computer = function(repeat){
    var num = Math.floor(Math.random()*4);
    global.sequence.push(num);
    var i = 0;
    var interval = setInterval(function(){
        var num = global.sequence[i++];
        if(num == 0) pressGreen();
        else if(num == 1) pressRed();
        else if(num == 2) pressYellow();
        else if(num == 3) pressBlue();
        if( i >= global.sequence.length) clearInterval(interval);
    },1000);

    global.waitForInput = true;
    global.curLength = 0;
}



//------------lights effect-----------
var pressGreen = function(){
    $(".color-1").addClass("color-1-press");
    setTimeout(function(){
        $(".color-1").removeClass("color-1-press");
    },500);
};


var pressRed = function(){
    $(".color-2").addClass("color-2-press");
    setTimeout(function(){
        $(".color-2").removeClass("color-2-press");
    },500);
};

var pressYellow = function(){
    $(".color-3").addClass("color-3-press");
    setTimeout(function(){
        $(".color-3").removeClass("color-3-press");
    },500);
};

var pressBlue = function(){
    $(".color-4").addClass("color-4-press");
    setTimeout(function(){
        $(".color-4").removeClass("color-4-press");
    },500);
};
