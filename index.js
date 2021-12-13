'use strict';
window.onload = function () {
    let canvas = document.getElementById('tshirtCanvas');
    let context = canvas.getContext('2d');
    let button = document.getElementById('previewButton');

    context.strokeRect(0, 0, canvas.width, canvas.height);
    button.onclick = previewHandler;
    makeImage(canvas);
};

function previewHandler() {
    let canvas = document.getElementById('tshirtCanvas');
    let context = canvas.getContext('2d');
    let selectObj = document.getElementById('shape');
    let index = selectObj.selectedIndex;
    let shape = selectObj[index].value;

    fillBackgroundColor(canvas, context);

    if (shape === 'squares') {
        for (let squares = 0; squares < 20; squares++) {
            drawSquare(canvas, context);
        }
    } else if (shape === 'circles') {
        for (let circles = 0; circles < 20; circles++) {
            drawCircle(canvas, context);
        }
    }

    drawText(canvas, context);
    drawBird(context);
    context.strokeRect(0, 0, canvas.width, canvas.height);
}

function fillBackgroundColor(canvas, context) {
    let selectObj = document.getElementById('backgroundColor');
    let index = selectObj.selectedIndex;
    let bgColor = selectObj[index].value;

    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSquare(canvas, context) {
    let w = Math.floor(Math.random() * 50);
    let x = Math.floor(Math.random() * canvas.width - w / 2);
    let y = Math.floor(Math.random() * canvas.height - w / 2);

    context.fillStyle = 'lightblue';
    context.fillRect(x, y, w, w);
}

function drawCircle(canvas, context) {
    let r = Math.floor(Math.random() * 30);
    let x = Math.floor(Math.random() * canvas.width);
    let y = Math.floor(Math.random() * canvas.height);

    context.beginPath();
    context.arc(x, y, r, 0, degreesToRadians(360), true);
    context.fillStyle = 'lightblue';
    context.fill();
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function updateTweets(tweets) {
    let tweetsSelection = document.getElementById('tweets');

    for (let i = 0; i < tweets.length; i++) {
        let tweet = tweets[i];
        let option = document.createElement('option');

        option.text = tweet.text;
        option.value = tweet.text.replace('\"', '\'');
        tweetsSelection.options.add(option);
    }

    tweetsSelection.selectedIndex = 0;
}

function drawText(canvas, context) {
    let selectObj = document.getElementById('foregroundColor');
    let index = selectObj.selectedIndex;
    let fgColor = selectObj[index].value;

    context.fillStyle = fgColor;
    context.font = 'bold 1em sans-serif';
    context.textAlign = 'left';
    context.fillText('I saw this tweet...', 20, 40);

    selectObj = document.getElementById('tweets');
    index = selectObj.selectedIndex;
    let tweet = selectObj[index].text;

    context.font = 'italic 1.2em serif';

    if (tweet.length > 60) {
        let tweetLines = splitIntoLines(tweet);

        for (let i = 0; i < tweetLines.length; i++) {
            context.fillText(tweetLines[i], 30, 70 + (i * 25));
        }
    } else {
        context.fillText(tweet, 30, 100);
    }

    context.font = 'bold 1em sans-serif';
    context.textAlign = 'right';
    context.fillText(
        '...and all I got was this lousy t-shirt!',
        canvas.width - 20,
        canvas.height - 40
    );
}

function drawBird(context) {
    let twitterBird = new Image();

    twitterBird.src = 'twitterBird.png';

    twitterBird.onload = function () {
        context.drawImage(twitterBird, 20, 120, 70, 70);
    };
}

function splitIntoLines(str) {
    let strs = new Array();
    let space = str.indexOf(' ', 60);

    strs[0] = str.substring(0, space);
    strs[1] = str.substring(space + 1);

    if (strs[1].length > 60) {
        space = strs[1].indexOf(' ', 60);
        strs[2] = strs[1].substring(space + 1);
        strs[1] = strs[1].substring(0, space);
    }

    return strs;
}

function makeImage(canvas) {
    canvas.onclick = function () {
        window.location = canvas.toDataURL('image/png');
    };
}