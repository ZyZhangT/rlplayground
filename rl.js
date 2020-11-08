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
ctx.fillText('Last Round=0',10,70)
ctx.fillText('State=1',240,25)
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
ctx3.font = "20px futura"
ctx3.fillText('State',85,50)
ctx3.fillText('Action',80,190)
ctx3.fillText('Reward',80,320)
ctx3.fillText('Learn',85,450)

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



