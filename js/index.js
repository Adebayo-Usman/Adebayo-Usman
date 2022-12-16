const   quesText = document.querySelector('.question_text'),
        quesOption = document.querySelector('.question_options'),
        quesNum = document.querySelector('.question_number'),
        quizDate = document.querySelector('.current_date');
       

// quiz buttons
const   start = document.querySelector('.start'),
        next = document.querySelector('.next'),
        tryBtn = document.querySelector('.try'),
        exit = document.querySelector('.exit');

//quiz boxes
const homeBox = document.querySelector('.home_box'),
      quizBox = document.querySelector('.quiz_box'),
      result = document.querySelector('.result_box');

let quesCount = 0;
let avalaibleQues = [];
const avalaibleOpt = [];
const totalQues = quiz.length;
let currentQues;
let correctAnss = 0;
let attempt = 0; 

//seting quiz Timer
const startingMin = 5;
let time = startingMin * 60;

const timer = document.querySelector('.timer_sec');


// set quiz to avalaibleQues Array
const setAvailableQues = event =>{
    quiz.forEach(event => {
        avalaibleQues.push(event);
    });

}

// get quiz from avalaibleQues Array
const getNewQues = event =>{

    // set random quiz questions text
    currentQues = avalaibleQues[Math.floor(Math.random() * avalaibleQues.length)];
    quesText.innerHTML = `${quesCount+1}. ${currentQues.ques}`;

    //get the positon of quiz from available array
    const quesIndex = avalaibleQues.indexOf(currentQues);
    avalaibleQues.splice(quesIndex, 1);

    // set quiz options 
    let options = `<div class="option" id="0">${currentQues.options[0]}</div>`
                + `<div class="option" id="1">${currentQues.options[1]}</div>`
                + `<div class="option" id="2">${currentQues.options[2]}</div>`
                + `<div class="option" id="3">${currentQues.options[3]}</div>`;

    quesOption.innerHTML = options;
    const option = quesOption.querySelectorAll(".option");

    for(let i = 0; i<option.length; i++){
        option[i].setAttribute("onclick", "getAns(this)");
    }
    
    // set quiz question num
    quesNum.innerHTML = `${quesCount+1} of ${totalQues} questions`;
    setInterval(updateTime, 1000); 
    updateTime()
    quesCount++;
    
   
}

//  set quiz date
const setDate = event =>{
    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth()
    const y = date.getFullYear();

    quizDate.textContent = `${d}/${m}/${y}`;
}
 

const getAns = optionSelected =>{
    // console.log(optionSelected.id);
    const ans = parseInt(optionSelected.id);
    const correctAns = currentQues.ans;
    const allOptions = quesOption.children.length;

    // indicate the correct answer when selected
    if(ans == correctAns){
        optionSelected.classList.add('correct');
        correctAnss++
        console.log('correct ans '+ correctAnss)
    }
     // indicate the wrong answer when selected
    else{
        optionSelected.classList.add('wrong');
        // console.log('wrong ans')
        const allOptions = quesOption.children.length;
        for(let i = 0; i < allOptions; i++){
            if(parseInt(quesOption.children[i].id) === currentQues.ans){
                quesOption.children[i].classList.add('correct');
            }
        }

    }
    attempt++

    // if one option is selected disable other options
    for(let i = 0; i < allOptions; i++){
        quesOption.children[i].classList.add('disable');
    }
}


next.addEventListener('click',event =>{

    if(quesCount === totalQues){
        console.log('Quiz over');   
       quizOver();
    }else{
        getNewQues();
    }
 })


 const quizOver = event =>{
    // homeBox.classList.add('hide');
    quizBox.classList.add('hide');
    result.classList.remove('hide');
    quizResult();
}

 const quizResult = event =>{
    result.querySelector('.total-score').innerHTML      = correctAnss + '/' + totalQues;
    result.querySelector('.correct').innerHTML          = correctAnss;
    result.querySelector('.wrong').innerHTML            = totalQues - correctAnss;
    result.querySelector('.total-attempts').innerHTML   = attempt;
    result.querySelector('.total-questions').innerHTML  = quiz.length;
 }

 const resetQuiz = event =>{
    quesCount = 0;
    correctAnss = 0;
    attempt = 0; 
 }

tryBtn.addEventListener('click', event =>{
        result.classList.add('hide');
        quizBox.classList.remove('hide');
        resetQuiz();
        setDate();
        setAvailableQues();
        getNewQues();
          
});

exit.addEventListener('click', event =>{
    homeBox.classList.remove('hide');
    result.classList.add('hide');
    start();
    
});

//update quiz timer
const updateTime = event =>{
    const minutes = Math.floor(time/60);
    let seconds =   time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    timer.innerHTML = `${minutes}:${seconds}`;
    time--
}
// display quiz as window loads
start.addEventListener('click', event =>{
    homeBox.classList.add('hide');
    quizBox.classList.remove('hide');
    resetQuiz();
    setDate();
    setAvailableQues();
    getNewQues();
    
    
});











