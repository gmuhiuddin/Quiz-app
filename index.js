let quizes;

getQuestions()

function getQuestions(){
  fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple')
.then(res => res.json())
.then(res => {
  var randomNumber = Math.floor(Math.random() * 3);

  res.results.map((element)=> {
   element.options = [...element.incorrect_answers]
   element.options.splice(randomNumber,0,element.correct_answer)
  })

  quizes = res.results
  quizFunc()
}).catch(() => {
getQuestions()
})
}

function quizFunc (){
  
  let indexOfArr = 0;
  let correctAns = quizes.length;
  let wrongAns = quizes.length;
  let userChackValue = '';
  let quizCaintainer = document.getElementById('quiz-caintainer');
  let totalQusZero = document.getElementById('total-qus');
  totalQusZero.innerText = quizes.length;
  
  function makeQuizes() {
    quizCaintainer.innerHTML = null;
    let div = document.createElement('div');
  
    let h3 = document.createElement('h3');
    h3.innerText = quizes[indexOfArr].question;
    div.appendChild(h3)
  
    quizes[indexOfArr].options.map((opt) => {
  
      let optDiv = document.createElement('div');
      optDiv.className = 'opt-div'
  
      let input = document.createElement("input");
      input.type = 'radio'
      input.name = 'quiz-opt'
      input.value = opt
      input.disabled = false
      input.className = 'inputs';

      let label = document.createElement('label');
      label.innerText = opt
      label.className = 'options';

      input.addEventListener('change', function () {
        userChackValue = this.value;
        nextBtn.disabled = false;
      })
  
      optDiv.appendChild(input)
      optDiv.appendChild(label)
      div.appendChild(optDiv)
    })
  
    let nextBtn = document.createElement('button');
    nextBtn.innerText = 'Next'
    nextBtn.className = 'next-btn'
    nextBtn.disabled = true
    nextBtn.addEventListener('click', showQuizes)
  
    div.appendChild(nextBtn)
  
    quizCaintainer.appendChild(div)
  
    let presentQus = document.getElementById('present-qus');
    presentQus.innerText = indexOfArr + 1;
  }
  
  makeQuizes()
  
  function abc() {
    if (userChackValue === quizes[indexOfArr].correct_answer) {
      wrongAns--;
    }else{
      correctAns--;
    }
    
  }
  
  function showQuizes() {
    abc()
  
    if (indexOfArr + 1 < quizes.length) {
      indexOfArr++
      makeQuizes()
  
    }
    if (indexOfArr + 1 === quizes.length) {
      let nextBtn = document.getElementsByClassName('next-btn');
      nextBtn[0].innerText = 'Submit'
      nextBtn[0].addEventListener('click', function () {
        quizCaintainer.style.display = 'none'
        showResult()
  
        if (quizCaintainer.style.display === 'none') {
          clearInterval(MiuntesInterval)
          clearInterval(secondInterval)
        }
      })
    }
  };
  
  function showResult() {
    let percentage = correctAns * 10 
  
    let scoreDiv = document.getElementById("score-div");
    scoreDiv.style.display = 'flex';
  
    let scorePerZero = document.getElementById('score-per');
    scorePerZero.innerText = percentage
  
    let scoreCircle = document.getElementById('scoreCircle');
    scoreCircle.style.borderColor = percentage >= 50 ? 'green' : 'red'
    scoreCircle.style.color = percentage >= 50 ? 'green' : 'red'
  
    let corAnsP = document.createElement('p');
    corAnsP.innerText = `${correctAns} Answer is Correct`
  
    let wroAnsP = document.createElement('p');
    console.log(wrongAns)
    wroAnsP.innerText = `${wrongAns} Answer is Wrong`
  
    let qusCout = document.getElementsByClassName('qusCout');
  
    qusCout[0].appendChild(corAnsP)
    qusCout[0].appendChild(wroAnsP)
  };
  
  let minutes = 9;
  let seconds = 59;
  
  let secondsZero = document.getElementById('seconds');
  let minutesZero = document.getElementById('minutes');
  
  
  let secondInterval = setInterval(() => {
    secondsCountDown()
  }, 1000)
  
  let MiuntesInterval = setInterval(() => {
    minutesCountDown()
  }, 59385)
  
  setTimeout(() => {
    minutesCountDown()
  }, 1)
  
  setTimeout(() => {
    secondsCountDown()
  }, 1)
  
  function minutesCountDown() {
  
    minutesZero.innerText = minutes
    minutes--
  }
  
  function secondsCountDown() {
    if (seconds === 0) {
      seconds = 59
    }
    seconds = seconds < 10 ? '0' + seconds : seconds
    secondsZero.innerText = seconds
  
    if (minutes === -1 && seconds === '01') {
      clearInterval(MiuntesInterval)
      clearInterval(secondInterval)
      let inputs = document.getElementsByClassName('inputs');
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
      }
      quizCaintainer.style.display = 'none'
      showResult()
      secondsZero.innerText = '00'
    }
    seconds--;
  }
};