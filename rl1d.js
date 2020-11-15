var c=document.getElementById("leftui");
var ctx=c.getContext("2d");
for (var i=1;i<6;i++)
{
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.setLineDash([10, 5]);
    ctx.moveTo(5+100*i, 115);
    ctx.lineTo(5+100*i, 215);
    ctx.stroke();
    ctx.closePath();
}

ctx.lineWidth = 3;
ctx.setLineDash([])
ctx.strokeRect(5,115,600,100);
ctx.stroke();
ctx.closePath();
ctx.font = "20px futura"
ctx.fillText('Score=0',50,25)
ctx.fillText('Episodes=1',50,60)
ctx.fillText('State=0',440,25)
ctx.fillText('Action=None',440,60)
ctx.fillText('Reward=None',440,95)
var img1 = new Image();
//trap
img1.src = "images/WeChat Screenshot_20201019004628.png";
img1.onload = function() {
    ctx.drawImage(img1, 10, 120, 90, 90);
}
var img2 = new Image();
img2.src = "images/Downloads/download.jpg";
img2.onload = function() {
    ctx.drawImage(img2, 210, 120, 90, 90);
}
var img3 = new Image();
img3.src = "images/Cartoon-treasure-chest-1-580x386.jpg";
ctx.font = "20px futura"
img3.onload = function() {
    ctx.drawImage(img3, 510, 120, 90, 90);
    for (var i=0;i<6;i++) {
    ctx.fillText(i.toString(),85+100*i,210)
}
}

var c2=document.getElementById("rightui");
var ctx2=c2.getContext("2d");

for (var i=1;i<6;i++)
{
    ctx2.beginPath();
    ctx.lineWidth = 1;
    ctx2.moveTo(5+100*i, 65);
    ctx2.lineTo(5+100*i, 165);
    ctx2.stroke();
}

ctx2.lineWidth = 3;
ctx2.strokeRect(5,65,600,100);
ctx2.font = "italic 24px futura "
ctx2.fillText('Past Experience',12,40)

ctx2.lineWidth = 1;
ctx2.setLineDash([10, 5]);
for (var i=0;i<6;i++)
{
    ctx2.beginPath();
    ctx.lineWidth = 1;
    ctx2.moveTo(55+100*i, 65);
    ctx2.lineTo(55+100*i, 165);
    ctx2.stroke();
}
ctx2.closePath();

var img7 = new Image();
img7.src = "images/Downloads/qm.png";
img7.onload = function () {
    for (var i = 0; i < 12; i++) {
        ctx2.drawImage(img7, i * 50, 85, 50, 50);
    }
}
ctx2.font = "italic 18px futura "
    for (var i = 0; i < 6; i++) {
        ctx2.fillText(i.toString(), 85 + 100 * i, 155)
        }
// var c3=document.getElementById("midui");
// var ctx3=c3.getContext("2d");
// ctx3.font = "20px futura";
// ctx3.fillText('State',85,50);
// ctx3.fillText('Action',80,190);
// ctx3.fillText('Reward',80,320);
// ctx3.fillText('Learn',85,450);

// var img5 = new Image();
// img5.src = "C:/Users/zzy99/Downloads/arrow.png";
// img5.onload = function() {
//     ctx3.drawImage(img5, 65, 55, 90, 115);
//     ctx3.drawImage(img5, 65, 190, 90, 115);
//     ctx3.drawImage(img5, 65, 325, 90, 115);
// }
//
// var img6 = new Image();
// img6.src = "C:/Users/zzy99/Downloads/arrow1.png";
// img6.onload = function() {
//     ctx3.drawImage(img6, 130, 410, 80, 75);
// }

/* algorithm */
var alpha = 0.7;
var gamma = 0.6;
var epsilon = 0.2;
var m_or_a = 1;
var action_array = ['left','right'];
var reward_table = [[-10,-1],[-20,-1],[-1,-1],
                    [-1,-1],[-1,20],[-1,-10]];
var state_flags = new Array(6).fill(0);
var q_table = new Array(6);   //表格有10行
for(var i = 0;i < q_table.length; i++){
   q_table[i] = new Array(2).fill(0);    //每行有10列
}

var training_episodes = 0;
var total_score = 0;
var state = 0;
var action = "None";
var reward = 0;
var x = 2
var last_state = 0
var speed = 1000
var button_flag = 0
var start = 0
var moves = 0

function move_agent(s) {
    ctx.clearRect(10+100*x, 120, 90, 90);
    ctx.drawImage(img1, 10, 120, 90, 90);
    ctx.drawImage(img3, 510, 120, 90, 90);
    x = s;

    ctx.drawImage(img2, 10 + 100 * x, 120, 90, 90);
    for (var i = 0; i < 6; i++) {
        ctx.fillText(i.toString(), 85 + 100 * i, 210)
        }
    ctx.clearRect(50, 10, 120, 30);
    ctx.clearRect(440, 0, 120, 30);
    ctx.clearRect(440, 35, 150, 30);
    ctx.clearRect(440, 70, 150, 30);
    ctx.fillText('Score='+""+total_score,50,25);
    ctx.fillText('State='+""+state,440,25);
    ctx.fillText('Action='+""+action,440,60);
    ctx.fillText('Reward='+""+reward,440,95);
    ctx.stroke();
    ctx.restore();
    //window.requestAnimationFrame(move_agent)
}

function update_qui(){
    var a = last_state
    var qvalue = q_table[last_state][action_array.indexOf(action)]
    if(qvalue<0){
        var absq = Math.abs(qvalue)/50
        ctx2.fillStyle = "rgba(255,0,0,"+absq+")"
    }
    if(qvalue>=0){
        qvalue = qvalue/50
        ctx2.fillStyle = "rgba(0,255,0,"+qvalue+")"
    }
    ctx2.setLineDash([]);
    if(state_flags[last_state] == 1) {
        if(action=='left'){
            ctx2.beginPath()
            ctx2.fillRect(5+100*a,65,50,100);
            ctx2.closePath()
        }
        else if(action=='right'){
            ctx2.beginPath()
            ctx2.fillRect(55+100*a,65,50,100);
            ctx2.closePath()
        }
    }
    ctx2.fillStyle = "black"
}


function sleep(delay) {
  return new Promise(reslove => {
    setTimeout(reslove, delay)
  })
}

//pass
function choose_action(s) {
    if (Math.random() < epsilon){
        action = action_array[Math.round(Math.random())];
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
    }
    return next_state;
}

function update_q_table(current_state,next_state) {
    qvalue = q_table[current_state][action_array.indexOf(action)];
    updated_q = (1 - alpha) * qvalue + alpha * (reward + gamma * Math.max(...q_table[next_state]));
    q_table[current_state][action_array.indexOf(action)] = updated_q;
    return updated_q;
}


var notify = 0
async function main_algorithm() {
    start = 0
    state = 2;
    last_state = 0;
    action = "None";
    reward = "None";
    var nextstate = 0;
    total_score = 0;
    treasure_exist = 1;
    state_flags = new Array(16).fill(0);
    ctx.clearRect(50, 50, 120, 30);
    ctx.fillText('Episodes=' + "" + (training_episodes + 1), 50, 60);
    move_agent(state)
    auto_processing = 1

    while (state != 5) {
        //confirm('hhh')
        moves++
        auto_processing = 1
        state_flags[state] = 1;
        choose_action(state);
        await sleep(speed)
        move_agent(state);
        nextstate = next_state(state);
        last_state = state;
        f = 0
        //epsilon = 4.6 - Math.log(60 + moves)
        update_q_table(state, nextstate);
        // console.log('state',state);
        // console.log('action',action);
        // console.log('reward',reward);
        // console.log('nextstate1',nextstate);
        state = nextstate;
        await sleep(speed);
        move_agent(state);
        total_score += reward;
        update_qui()
        if (state == 0) {
            state = 2;
            reward = 'None';
            action = 'None';
            await sleep(speed);
            move_agent(state);
        }
    }
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

var btn1 = document.getElementById("btn1")
btn1.onclick=function() {
    start = 1
    window.requestAnimationFrame(main_algorithm)
}

var btn2 = document.getElementById("btn2")
btn2.onclick=function() {
var c=document.getElementById("leftui");
var ctx=c.getContext("2d");
    ctx.clearRect(0, 0, 610, 220);
for (var i=1;i<6;i++)
{
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.setLineDash([10, 5]);
    ctx.moveTo(5+100*i, 115);
    ctx.lineTo(5+100*i, 215);
    ctx.stroke();
    ctx.closePath();
}
ctx.beginPath();
ctx.lineWidth = 3;
ctx.setLineDash([])
ctx.strokeRect(5,115,600,100);
ctx.stroke();
ctx.closePath();
ctx.font = "20px futura"
ctx.fillText('Score=0',50,25)
ctx.fillText('Episodes=1',50,60)
ctx.fillText('State=0',440,25)
ctx.fillText('Action=None',440,60)
ctx.fillText('Reward=None',440,95)
var img1 = new Image();
//trap
img1.src = "images/WeChat Screenshot_20201019004628.png";
img1.onload = function() {
    ctx.drawImage(img1, 10, 120, 90, 90);
}
var img2 = new Image();
img2.src = "images/download.jpg";
img2.onload = function() {
    ctx.drawImage(img2, 210, 120, 90, 90);
}
var img3 = new Image();
img3.src = "images/Cartoon-treasure-chest-1-580x386.jpg";
img3.onload = function() {
    ctx.drawImage(img3, 510, 120, 90, 90);
    for (var i = 0; i < 6; i++) {
        ctx.fillText(i.toString(), 85 + 100 * i, 210)
    }
}

var c2=document.getElementById("rightui");
var ctx2=c2.getContext("2d");
ctx2.clearRect(0, 0, 610, 170);
for (var i=1;i<6;i++)
{
    ctx2.beginPath();
    ctx.lineWidth = 1;
    ctx2.moveTo(5+100*i, 65);
    ctx2.lineTo(5+100*i, 165);
    ctx2.stroke();
}

ctx2.lineWidth = 3;
ctx2.strokeRect(5,65,600,100);
ctx2.font = "italic 24px futura"
ctx2.fillText('Past Experience',12,40)

ctx2.lineWidth = 1;
ctx2.setLineDash([10, 5]);
for (var i=0;i<6;i++)
{
    ctx2.beginPath();
    ctx.lineWidth = 1;
    ctx2.moveTo(55+100*i, 65);
    ctx2.lineTo(55+100*i, 165);
    ctx2.stroke();
}
ctx2.closePath();

var img7 = new Image();
img7.src = "images/qm.png";
img7.onload = function () {
    for (var i = 0; i < 12; i++) {
        ctx2.drawImage(img7, i * 50, 85, 50, 50);
    }
}
ctx2.font = "italic 18px futura "
    for (var i = 0; i < 6; i++) {
        ctx2.fillText(i.toString(), 85 + 100 * i, 155)
        }
    alpha = 0.7;
    gamma = 0.6;
    epsilon = 1;
    action_array = ['left','right'];
    reward_table = [[-10,-1],[-20,-1],[-1,-1],
                        [-1,-1],[-1,20],[-1,-10]];
    state_flags = new Array(6).fill(0);
    q_table = new Array(6);   //表格有10行
    for(var i = 0;i < q_table.length; i++){
       q_table[i] = new Array(2).fill(0);    //每行有10列
    }
    training_episodes = 0;
    total_score = 0;
    state = 0;
    action = "None";
    reward = 0;
    x = 2
    last_state = 0
    speed = 1000
    button_flag = 0
    start = 0
    moves = 0
}

var btn3 = document.getElementById("btn3")
btn3.onclick=function() {
    confirm('State: Position of the robot, from 0-5.\nAction: What direction the robot chooses to move. \n' +
        'Reward: Numerical reward received by the robot from the maze environment. \nScore: The total numerical reward received by the robot. \n' +
        'Episodes: How many times the robot successfully finds the treasure.')
}

var btn4 = document.getElementById("btn4")
btn4.onclick=function() {
    confirm('This part shows the learning result of the robot. Each state is divided into left and right halves, ' +
        'the color of each rectangle shows robot\'s perception on the expected return of taking corresponding action in this state')
}

var btn5 = document.getElementById("btn5")
btn5.onclick=function() {
    window.location="C:/Users/zzy99/AppData/Roaming/JetBrains/PyCharm2020.2/scratches/scratch.html"
}


$(document).ready(async function(){
    await sleep(100)
    window.confirm('Welcome! In this game you would see how a robot could be trained to find the treasure and avoid trap with reinforcement learning. ' +
            'Click "Auto training" to start, the robot would explore in the environment and learn from the reward it receives by taking different actions. ' +
            'After each episode finishes (robot successfully finds the treasure), click "Auto training" again to let the robot train itself another episode. ' +
            'Click reset to make the robot forget everthing it learned and restart')})
