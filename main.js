var global = {
    sequence : [],
    playerInput : [],
    waitForInput: false,
    length:0,
    curLength:0,
    replay:false
}

$(document).ready(function(){
    reset();
    start(computer());

//---------------Green------------------
    $(".color-1").mousedown(function(){
        if(global.waitForInput){
            lightOn(1);
        }
    });
    $(".color-1").mouseup(function(){
        var promise = lightOff(1);
        promise.then(function(){
            check();
        });
    });
//---------------Red------------------
    $(".color-2").mousedown(function(){
        if(global.waitForInput){
            lightOn(2);
        }
    });
    $(".color-2").mouseup(function(){
        var promise = lightOff(2);
        promise.then(function(){
            check();
        });
    });
//---------------Yellow------------------
    $(".color-3").mousedown(function(){
        if(global.waitForInput){
            lightOn(3);
        }
    });
    $(".color-3").mouseup(function(){
        var promise = lightOff(3);
        promise.then(function(){
            check();
        });
    });
//---------------Blue-----------------
    $(".color-4").mousedown(function(){
        if(global.waitForInput){
            lightOn(4);
        }
    });
    $(".color-4").mouseup(function(){
        var promise = lightOff(4);
        promise.then(function(){
            check();
        });
    });

    $("body").mouseup(function(){
        AllLightOff();
    });
});

//-----------main function-------------


var computer = function(){
    return new Promise(function(resolve, reject){

        var promise;
        var sequence = global.sequence;

        if(!global.replay) {
            var num = Math.floor(Math.random()*4);
            sequence.push(num);
        }
        console.log(sequence);
        var i = 0;
        var interval = setInterval(function(){
            num = sequence[i++];
            switch(num){
                case 0:
                    lightOn(1);
                    promise = lightOff(1);
                    break;
                case 1:
                    lightOn(2);
                    promise = lightOff(2);
                    break;
                case 2:
                    lightOn(3);
                    promise = lightOff(3);
                    break;
                case 3:
                    lightOn(4);
                    promise = lightOff(4);
                    break;
            }

            promise.then(function(){
                if( i >= sequence.length) {
                    clearInterval(interval);
                    resolve("success");
                }

            });

        },1000);

    });


}

var start = function(promise){

    promise.then(function(){
        global.waitForInput = true;
        global.curLength = 0;
        global.playerInput = [];
    })

}

var check = function(){
    if(global.playerInput[global.curLength] == global.sequence[global.curLength]) {
        global.curLength++;
        console.log("1");
        if(global.curLength == global.sequence.length) {
            console.log("2");
            global.replay = false;
            global.waitForInput = false;
            start(computer());
        }
    }

    else {
        console.log("3");
        global.replay = true;
        computer();
    }
}





//------------lights effect-----------
var lightOn = function(color){
    $(".color-" + color).addClass("color-"+ color +"-press");
    global.playerInput.push(color-1);
};

var lightOff = function(color){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            $(".color-" + color).removeClass("color-"+ color +"-press");
            resolve("finished");
        },200);
    });


}

var AllLightOff = function(){
    for(var i = 0; i < 4; i++){
        lightOff(i+1);
    }
};
//-----------reset-------------------
var reset = function(){
    global.sequence = [];
    global.playerInput = [];
    global.waitForInput = true;
    global.length = 0;
    global.curLength = 0;
    global.replay = false;
}
