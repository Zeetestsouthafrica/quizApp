//getting all required elements
const start_btn = document.querySelector(".start-btn");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const homeContent = document.querySelector(".home_content");
const timeCount =quiz_box.querySelector(".timer .timer_sec");
const timeLine =quiz_box.querySelector("header .time_line");
const timeOff =quiz_box.querySelector("header .time_left_txt");

const option_list = document.querySelector(".option_list");

//if start quiz button cliccked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
    homeContent.classList.add("active");
    // show the infobox
}

//if exit quiz button cliccked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    homeContent.classList.remove("active");// hide the infobox
}

//if continue quiz button cliccked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");// hide the infobox
    quiz_box.classList.add("activeQuiz"); //show quiz
    homeContent.classList.add("active");
    showQuestions(0);
    queCounter(1);
    startTimer(10);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 10;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const retry_quiz = result_box.querySelector(".buttons .tryAgain-btn");
const quit_quiz = result_box.querySelector(".buttons .quitQuiz-btn");



quit_quiz.onclick = () => {
    window.location.reload();
}

retry_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    que_count = 0;
    que_numb = 1;
    timeValue = 10;
    widthValue = 0;
    userScore = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Time Left";
}

//if next button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Time Left";
    }
    else{
        clearInterval(counter);
        startTimer(timeValue);
        console.log("Questions Completed");
        showResultBox();
    }   
}

//getting questions and options from array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag ='<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");       
    }
}

let tickIcon = '<div class="icon tick"><i class="bx bx-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="bx bx-x"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        
        
        console.log("Answer is correct");
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }else{
        
        console.log("answer is wrong");
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        //if answers is incorrect then automticall select correct answer
        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }   
        }
    }
    //once user selected disabled all options
    for (let i = 0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function showResultBox(){
    info_box.classList.remove("activeInfo");// hide the infobox
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult");

    const scoreText = document.querySelector(".score-text");
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector(".circular-progress");
    const progressValue = document.querySelector(".progress-value");
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progess = setInterval(() => {
        progressStartValue++;
        //console.log(progressStartValue);

        progressValue.textContent =`${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(palevioletred ${progressStartValue * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`;
        if(progressStartValue == progressEndValue) {
            clearInterval(progess);
        }
    }, speed);
   
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent == correctAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }   
            }

            for (let i = 0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 20);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}





function queCounter(index){
    const botton_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>'+ index +'</p>Of<p>'+ questions.length +'</p>Questions</span>';
    botton_ques_counter.innerHTML = totalQuesCountTag;
}


