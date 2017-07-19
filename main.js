var global = {
    sequence : [],
    playerInput : [],
    waitForInput: false,
    length:0,
    curLength:0,
    replay:false,
    level: 0,
    onGoing:false,
    on:false,
    strict: false
}

$(document).ready(function(){
    reset();

    $(".on-off .checkbox").click(function(){
        if(this.checked) global.on = true;
        else {
            reset();
        }
    });

    $(".menu .start").click(function(){
        if(global.on){
            if(!global.onGoing){
                global.onGoing = true;
                start(computer());
            }
        }
    });

    $(".strict .checkbox").click(function(){
        if(global.on){
            if(this.checked) global.strict = true;
            else global.strict = false;;
        }

    });


    //---------------Green------------------
    $(".color-1").mousedown(function(){
        if(global.on){
            if(global.waitForInput){
                lightOn(1);
            }
        }
    });
    $(".color-1").mouseup(function(){
        if(global.on){
            if(global.waitForInput){
                var promise = lightOff(1);
                promise.then(function(){
                    check();
                });
            }
        }
    });
//---------------Red------------------
    $(".color-2").mousedown(function(){
        if(global.on){
            if(global.waitForInput){
                lightOn(2);
            }
        }

    });
    $(".color-2").mouseup(function(){
        if(global.on){
            if(global.waitForInput){
                var promise = lightOff(2);
                promise.then(function(){
                    check();
                });
            }
        }

    });
//---------------Yellow------------------
    $(".color-3").mousedown(function(){
        if(global.on){
            if(global.waitForInput){
                lightOn(3);
            }
        }

    });
    $(".color-3").mouseup(function(){
        if(global.on){
            if(global.waitForInput){
                var promise = lightOff(3);
                promise.then(function(){
                    check();
                });
            }
        }

    });
//---------------Blue-----------------
    $(".color-4").mousedown(function(){
        if(global.on){
            if(global.waitForInput){
                lightOn(4);
            }
        }

    });
    $(".color-4").mouseup(function(){
        if(global.on){
            if(global.waitForInput){
                var promise = lightOff(4);
                promise.then(function(){
                    check();
                });
            }
        }

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
                    if( i >= sequence.length || !global.on) {
                        if(!global.on) {
                            clearInterval(interval);
                            reject("turn off");
                        }
                        clearInterval(interval);
                        resolve("success");
                    }

                });

            },800);

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
            $(".count #number").text(++global.level);
            global.replay = false;
            global.waitForInput = false;
            start(computer());
        }
    }

    else {
        console.log("3");
        global.waitForInput = false;
        var promise = wrongAns();
        if(global.strict){
            promise.then(function(){
                $(".board .wrong-ans").css("z-index","-1");
                reset();
                global.on = true;
                $(".count #number").text(global.level);
                global.onGoing = true;
                start(computer());
            });

        }else{
            promise.then(function(){
                $(".count #number").text(global.level);
                $(".board .wrong-ans").css("z-index","-1");
                global.replay = true;
                start(computer());
            });
        }


    }
}

var wrongAns = function(){
    return new Promise(function(resolve, reject){
        $(".count #number").text("! !");
        $(".board .wrong-ans").css("z-index","1");
        setTimeout(function(){
            resolve();
        },2000);
    });


}





//------------lights effect-----------
var lightOn = function(color){
    $(".color-" + color).addClass("color-"+ color +"-press");
    $("#sound-"+color).get(0).cloneNode().play();
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
    global.waitForInput = false;
    global.length = 0;
    global.curLength = 0;
    global.replay = false;
    global.level = 0;
    global.onGoing = false;
    global.on = false;
    global.strict = false;
    $(".count #number").text("--");
}
