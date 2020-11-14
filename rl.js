var c=document.getElementById("leftui");
var ctx=c.getContext("2d");
for (var i=1;i<4;i++)
{
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.setLineDash([10, 5]);
    ctx.moveTo(5+100*i, 115);
    ctx.lineTo(5+100*i, 515);
    ctx.moveTo(5, 115+100*i);
    ctx.lineTo(405, 115+100*i);
    ctx.stroke();
    ctx.closePath();
}
ctx.beginPath();
ctx.lineWidth = 3;
ctx.setLineDash([])
ctx.strokeRect(5,115,400,400);
ctx.moveTo(305, 115);
ctx.lineTo(305, 215);
ctx.moveTo(105, 215);
ctx.lineTo(205, 215);
ctx.moveTo(105, 315);
ctx.lineTo(205, 315);
ctx.stroke();
ctx.closePath();
ctx.font = "20px arial"
ctx.fillText('Score=0',10,30)
ctx.fillText('Episodes=1',10,70)
ctx.fillText('State=0',240,25)
ctx.fillText('Action=None',240,60)
ctx.fillText('Reward=None',240,95)
var img1 = new Image();
img1.src = "images/WeChat Screenshot_20201019004628.png";
img1.onload = function() {
    ctx.drawImage(img1, 110, 220, 90, 90);
    ctx.drawImage(img1, 10, 420, 90, 90);
}
var img2 = new Image();
img2.src = "images/download.jpg";
img2.onload = function() {
    ctx.drawImage(img2, 10, 120, 90, 90);
}
var img3 = new Image();
img3.src = "images/Cartoon-treasure-chest-1-580x386.jpg";
img3.onload = function() {
    ctx.drawImage(img3, 210, 320, 90, 90);
}
var img4 = new Image();
img4.src = "images/cartoon-image-of-exit-icon-leave-symbol-vector-14700142.jpg";
img4.onload = function() {
    ctx.drawImage(img4, 310, 420, 90, 90);
}

var c2=document.getElementById("rightui");
var ctx2=c2.getContext("2d");
for (var i=1;i<4;i++)
{
    ctx2.beginPath();
    ctx.lineWidth = 1;
    ctx2.moveTo(5+100*i, 115);
    ctx2.lineTo(5+100*i, 515);
    ctx2.moveTo(5, 115+100*i);
    ctx2.lineTo(405, 115+100*i);
    ctx2.stroke();
}
for (var i=0;i<4;i++) {
    ctx2.moveTo(5, 115 + 100 * i);
    ctx2.lineTo(405 - 100 * i, 515);
    ctx2.moveTo(5+100*i, 115);
    ctx2.lineTo(405, 515-100*i);
    ctx2.moveTo(5+100*i, 115);
    ctx2.lineTo(5, 115+100*i);
    ctx2.moveTo(5+100*i, 515);
    ctx2.lineTo(405, 115+100*i);
    ctx2.stroke();
}
ctx2.closePath();
ctx2.lineWidth = 3;
ctx2.strokeRect(5,115,400,400);
ctx2.font = "italic 24px futura "
ctx2.fillText('Past Experience',12,100)

var img7 = new Image();
img7.src = "images/qm.png";
img7.onload = function () {
    for (var k = 0; k < 4; k++) {
        for (var i = 0; i < 4; i++) {
            ctx2.drawImage(img7, i * 100, 150+100*k, 40, 40);
            ctx2.drawImage(img7, 35 + i * 100, 115+100*k, 40, 40);
            ctx2.drawImage(img7, 65 + i * 100, 150+100*k, 40, 40);
            ctx2.drawImage(img7, 35 + i * 100, 175+100*k, 40, 40);
        }
    }
}

var c3=document.getElementById("midui");
var ctx3=c3.getContext("2d");
ctx3.font = "20px futura";
ctx3.fillText('State',85,50);
ctx3.fillText('Action',80,190);
ctx3.fillText('Reward',80,320);
ctx3.fillText('Learn',85,450);

var img5 = new Image();
img5.src = "images/arrow.png";
img5.onload = function() {
    ctx3.drawImage(img5, 65, 55, 90, 115);
    ctx3.drawImage(img5, 65, 190, 90, 115);
    ctx3.drawImage(img5, 65, 325, 90, 115);
}

var img6 = new Image();
img6.src = "images/arrow1.png";
img6.onload = function() {
    ctx3.drawImage(img6, 130, 410, 80, 75);
}

/* algorithm */
var alpha = 0.7;
var gamma = 0.6;
var epsilon = 0.2;
var m_or_a = 1;
var action_array = ['left','right','up','down'];
var reward_table = [[-10,-1,-10,-1],
                    [-1,-1,-10,-10],
                    [-1,-10,-10,-1],
                    [-10,-10,-10,-1],
                    [-10,-20,-1,-1],
                    [-1,-1,-10,-10],
                    [-20,-1,-1,-1],
                    [-1,-10,-1,-1],
                    [-10,-1,-1,-20],
                    [-1,20,-10,-1],
                    [-1,-1,-1,-1],
                    [20,-10,-1,50],
                    [-10,-1,-1,-10],
                    [-20,-1,-1,-10],
                    [-1,50,20,-10],
                    [-1,-10,-1,-10]];
var state_flags = new Array(16).fill(0);
var q_table = new Array(16);   //表格有10行
for(var i = 0;i < q_table.length; i++){
   q_table[i] = new Array(4).fill(0);    //每行有10列
}

var training_episodes = 0;
var total_score = 0;
var state = 0;
var action = "None";
var reward = 0;
var x = 0
var y = 0
var last_state = 0
var speed = 300
var manual_flag = 0
var button_flag = 0
var start = 0

function move_agent(s) {
    ctx.clearRect(10+100*x, 120+100*y, 90, 90);
    ctx.drawImage(img1, 110, 220, 90, 90);
    ctx.drawImage(img1, 10, 420, 90, 90);
    ctx.drawImage(img3, 210, 320, 90, 90);
    ctx.drawImage(img4, 310, 420, 90, 90);
    x = s % 4;
    y = Math.floor(s/4);
    ctx.drawImage(img2, 10+100*x, 120+100*y, 90, 90);
    ctx.clearRect(10, 10, 120, 30);
    ctx.clearRect(240, 0, 120, 30);
    ctx.clearRect(240, 35, 150, 30);
    ctx.clearRect(240, 70, 150, 30);
    ctx.fillText('Score='+""+total_score,10,30);
    ctx.fillText('State='+""+state,240,25);
    ctx.fillText('Action='+""+action,240,60);
    ctx.fillText('Reward='+""+reward,240,95);
    ctx.stroke();
    ctx.restore();
    //window.requestAnimationFrame(move_agent)
}

function update_qui(){
    var a = last_state % 4;
    var b = Math.floor(last_state/4);
    var qvalue = q_table[last_state][action_array.indexOf(action)]
    // if(-1 < qvalue && qvalue< 0){
    //     ctx2.fillStyle = "#ffcccc";
    // }
    // else if(-10 < qvalue && qvalue < -1){
    //     ctx2.fillStyle = "#ff9999";
    //     console.log('??')
    // }
    // else if(-20 < qvalue && qvalue < -10){
    //     ctx2.fillStyle = "#ff3333";
    //     console.log('???')
    // }
    // else if(0 < qvalue && qvalue < 5){
    //     ctx2.fillStyle = "#80ff80";
    // }
    // else if(5 < qvalue && qvalue < 25){
    //     ctx2.fillStyle = "#4dff4d";
    // }
    // else if(25 < qvalue && qvalue < 100){
    //     ctx2.fillStyle = "#00e600";
    // }
    if(qvalue<0){
        var absq = Math.abs(qvalue)/100
        ctx2.fillStyle = "rgba(255,0,0,"+absq+")"
    }
    if(qvalue>=0){
        qvalue = qvalue/60
        ctx2.fillStyle = "rgba(0,255,0,"+qvalue+")"
    }
    console.log(ctx2.fillStyle)
    if(state_flags[last_state] == 1) {
        if(action=='left'){
            ctx2.beginPath()
            ctx2.moveTo(8+100*a, 122+100*b);
            ctx2.lineTo(8+100*a, 208+100*b);
            ctx2.lineTo(50+100*a, 165+100*b);
            ctx2.lineTo(8+100*a, 122+100*b);
            ctx2.fill();
            ctx2.closePath()
        }
        else if(action=='right'){
            ctx2.beginPath()
            ctx2.moveTo(102+100*a, 122+100*b);
            ctx2.lineTo(102+100*a, 208+100*b);
            ctx2.lineTo(59+100*a, 165+100*b);
            ctx2.lineTo(102+100*a, 122+100*b);
            ctx2.closePath()
            ctx2.fill();
        }
        else if(action=='up'){
            ctx2.beginPath()
            ctx2.moveTo(12+100*a, 118+100*b);
            ctx2.lineTo(98+100*a, 118+100*b);
            ctx2.lineTo(55+100*a, 160+100*b);
            ctx2.lineTo(12+100*a, 118+100*b);
            ctx2.closePath()
            ctx2.fill();
        }
        else if(action=='down'){
            ctx2.beginPath()
            ctx2.moveTo(12+100*a, 212+100*b);
            ctx2.lineTo(98+100*a, 212+100*b);
            ctx2.lineTo(55+100*a, 169+100*b);
            ctx2.lineTo(12+100*a, 212+100*b);
            ctx2.closePath()
            ctx2.fill();
        }
    }
}


function sleep(delay) {
  return new Promise(reslove => {
    setTimeout(reslove, delay)
  })
}

//pass
function choose_action(s) {
    if (Math.random() < epsilon){
        action = action_array[Math.round(Math.random() * 3)];
        console.log('ore');
    }
    else{
        action = action_array[q_table[s].indexOf(Math.max(...q_table[s]))];
        console.log('oit');
    }
}

//pass
function next_state(current_state) {
    var next_state = 0;
    reward = reward_table[state][action_array.indexOf(action)];
    if (reward == -10) {
        next_state = current_state;
    }
    else {
        if (action == 'left') {
            next_state = current_state - 1;
        }
        if (action == 'right') {
            next_state = current_state + 1;
        }
        if (action == 'up') {
            next_state = current_state - 4;
        }
        if (action == 'down') {
            next_state = current_state + 4;
        }
    }
    return next_state;
}

function next_state2(current_state) {
    var next_state = 0;
    if (reward_table[state][action_array.indexOf(action)] == -10) {
        next_state = current_state;
    }
    else {
        if (action == 'left') {
            next_state = current_state - 1;
        }
        if (action == 'right') {
            next_state = current_state + 1;
        }
        if (action == 'up') {
            next_state = current_state - 4;
        }
        if (action == 'down') {
            next_state = current_state + 4;
        }
    }
    return next_state;
}

function update_q_table(current_state,next_state) {
    qvalue = q_table[current_state][action_array.indexOf(action)];
    updated_q = (1 - alpha) * qvalue + alpha * (reward + gamma * Math.max(...q_table[next_state]));
    q_table[current_state][action_array.indexOf(action)] = updated_q;
    return updated_q;
}

function loop() {
  if (button_flag == 0){
      setTimeout(loop,0)
          return 1
        }
    else{
        return 0
  }
}

var manual_processing = 0
var auto_processing = 0
var nextstate = 0;
async function main_algorithm(){
    console.log('manual_processing',manual_processing)
    if (manual_processing == 0) {
        start = 0
        state = 0;
        last_state = 0;
        action = "None";
        reward = "None";
        nextstate = 0;
        total_score = 0;
        treasure_exist = 1;
        state_flags = new Array(16).fill(0);
        ctx.clearRect(10, 50, 120, 30);
        ctx.fillText('Episodes=' + "" + (training_episodes + 1), 10, 70);
        move_agent(state)
        console.log('pass')
        auto_processing=1
    }
    while (state != 15 && manual_flag==0) {
        //confirm('hhh')
        auto_processing = 1
        state_flags[state] = 1;
        choose_action(state);
        nextstate = next_state(state);
        last_state = state;
        console.log('nextstate2',nextstate);
        // if(manual_flag == 1){
        //     loop()
        // }
        // ret = loop()
        // if (ret==1){
        //    continue
        // }
        //button_flag=0
        f = 0
        update_q_table(state, nextstate);
        console.log('state',state);
        console.log('action',action);
        console.log('reward',reward);
        console.log('nextstate1',nextstate);
        state = nextstate;
        await sleep(speed);
        if(manual_flag ==0){
            move_agent(state);
        }
        if (state == 10 && treasure_exist == 1) {
            treasure_exist = 0;
            total_score += reward;
        }
        else if (state == 10 && treasure_exist == 0) {
            total_score += -1;
        }
        else {
            total_score += reward;
        }
        update_qui()
        if (state == 5 || state == 12) {
            state = 0;
            reward = 'None';
            action = 'None';
            await sleep(speed);
            move_agent(state);
        }
    }
    if(manual_flag==0) {
        move_agent(state);
        await sleep(speed);
        training_episodes += 1;
        console.log('training_episodes', training_episodes);
        auto_processing = 0
        manual_processing = 0
    }

    // state = 0
    // route = []
    // while state != 15:
    //     if state == 5 or state == 12:
    //         print('mission failed')
    //     action = action_array[np.argmax(q_table[state])]
    //     reward, nextstate = next_state(state, action)
    //     state = nextstate
    //     route.append(action)
    // print(route)
    // while True:
    //     pass
    }

var f1 = 0
var f2 = 0
var trap = 0
var finish = 0

async function manual() {
    if(f1==0 && manual_flag==1 && start == 1 && auto_processing==0){
        var nextstate = 0
        state = 0;
        last_state = 0;
        action = "None";
        reward = "None";
        total_score = 0;
        treasure_exist = 1;
        state_flags = new Array(16).fill(0);
        ctx.clearRect(10, 50, 120, 30);
        ctx.fillText('Episodes=' + "" + (training_episodes + 1), 10, 70);
        move_agent(state);
        await sleep(500)
        f1 = 1;
        manual_processing=1
    }
    if(f2==0 && manual_flag==1 && start == 1 && finish==0) {
        if(trap==0) {
            state_flags[state] = 1;
            choose_action(state);
            nextstate = next_state2(state);
            move_agent(nextstate);
            console.log('s1', nextstate)
            console.log('s2', state)
        }
        manual_processing = 1
        f2 = 1
        trap = 0
    }
    //console.log('f1',f1)
    //console.log(button_flag)
    if (button_flag == 1 && state!=15 && start == 1 && finish==0){
            f2 = 0
            last_state = state;
            console.log('nextstate2',nextstate);
            // if(manual_flag == 1){
            //     loop()
            // }
            // ret = loop()
            // if (ret==1){
            //    continue
            // }
            button_flag=0
            f = 0
            console.log('3')
            console.log('f2',f2)
            update_q_table(state, nextstate);
            console.log()
            console.log('state',state);
            console.log('action',action);
            console.log('reward',reward);
            console.log('nextstate1',nextstate);
            state = nextstate;
            move_agent(state);
            if (state == 10 && treasure_exist == 1) {
                treasure_exist = 0;
                total_score += reward;
            }
            else if (state == 10 && treasure_exist == 0) {
                total_score += -1;
            }
            else {
                total_score += reward;
            }
            update_qui()
            if (state == 5 || state == 12) {
                trap = 1
                state = 0;
                reward = 'None';
                action = 'None';
                move_agent(state);
                await sleep(500)
                choose_action(state);
                nextstate = next_state2(state);
                move_agent(nextstate);
            }
            if(state==15){
                finish = 1
                manual_processing=0
                auto_processing=0
            }
        }
    else if(state == 15 && start == 1){
        move_agent(state);
        training_episodes += 1;
        console.log('training_episodes',training_episodes);
        f1 = 0
        f2 = 0
        start = 0
        finish = 0
    }
    else if(button_flag == 0 && start == 1){
        setTimeout(manual,200)
    }
}


function test(m){
 if(3<m && m<5){
     console.log('true')
 }
 else if(5<m && m<8){
     console.log('false')
 }
}

var btn1 = document.getElementById("btn1")
btn1.onclick=function() {
    manual_flag = 0
    start = 1
    window.requestAnimationFrame(main_algorithm)
}

var btn2 = document.getElementById("btn2")
btn2.onclick=function() {
    manual_flag = 1
    start = 1
    // window.requestAnimationFrame(main_algorithm)
    manual()
}

var btn3 = document.getElementById("btn3")
btn3.onclick=function() {
    manual()
    if(start==1 && manual_flag==1){
        button_flag = 1
        reward=10
    }
}

var btn4 = document.getElementById("btn4")
btn4.onclick=function() {
    manual()
    if(start==1 && manual_flag==1){
        button_flag = 1
        reward=5
    }
}

var btn5 = document.getElementById("btn5")
btn5.onclick=function() {
    manual()
    if(start==1 && manual_flag==1){
        button_flag = 1
        reward=1
    }
}

var btn6 = document.getElementById("btn6")
btn6.onclick=function() {
    manual()
    if(start==1 && manual_flag==1){
        button_flag = 1
        reward=-1
    }
}

var btn7 = document.getElementById("btn7")
btn7.onclick=function() {
    manual()
    if(start==1 && manual_flag==1){
        button_flag = 1
        reward=-5
    }
}

var btn8 = document.getElementById("btn8")
btn8.onclick=function() {
    manual()
    if(start==1 && manual_flag==1){
        button_flag = 1
        reward=-10
    }
}
