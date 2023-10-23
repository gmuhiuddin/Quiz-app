const quizes = [
    {
      que: 'What is the Capital of Pakistan?',
      options: ['Karachi', 'Lahore', 'Islamabad', 'Hyderabad'],
      correct: 'Islamabad'
    },
    {
      que: 'What is the Capital of Pakistan?',
      options: ['Karachi', 'Lahore', 'Islamabad', 'Hyderabad'],
      correct: 'Islamabad'
    },
    {
      que: 'What is the Capital of Pakistan?',
      options: ['Karachi', 'Lahore', 'Islamabad', 'Hyderabad'],
      correct: 'Islamabad'
    },
    {
      que: 'What is the Capital of Pakistan?',
      options: ['Karachi', 'Lahore', 'Islamabad', 'Hyderabad'],
      correct: 'Islamabad'
    },
    {
      que: 'What is the Capital of Pakistan?',
      options: ['Karachi', 'Lahore', 'Islamabad', 'Hyderabad'],
      correct: 'Islamabad'
    },
    {
      que: 'What is the Capital of Pakistan?',
      options: ['Karachi', 'Lahore', 'Islamabad', 'Hyderabad'],
      correct: 'Islamabad'
    },
    {
      que: 'What is the Capital of Pakistan?',
      options: ['Karachi', 'Lahore', 'Islamabad', 'Hyderabad'],
      correct: 'Islamabad'
    },
    {
      que: 'What is the Capital of Pakistan?',
      options: ['Karachi', 'Lahore', 'Islamabad', 'Hyderabad'],
      correct: 'Islamabad'
    },{
      que: 'What is the Capital of Pakistan?',
      options: ['Karachi', 'Lahore', 'Islamabad', 'Hyderabad'],
      correct: 'Islamabad'
    },
    {
      que: 'What is the Capital of Pakistan?',
      options: ['Karachi', 'Lahore', 'Islamabad', 'Hyderabad'],
      correct: 'Islamabad'
    }
  ];

  let indexOfArr = 0;
  let correctAns = 0;
  let wrongAns = 0;
  let userChackValue = '';
  let quizCaintainer = document.getElementById('quiz-caintainer');

  let totalQusZero = document.getElementById('total-qus');
  totalQusZero.innerText = quizes.length;

  function makeQuizes (){
    quizCaintainer.innerHTML = null;
    let div = document.createElement('div');

    let h3 = document.createElement('h3');
    h3.innerText = quizes[indexOfArr].que;
    div.appendChild(h3)

    quizes[indexOfArr].options.map((opt) => {
      
      let optDiv =document.createElement('div');
      optDiv.className = 'opt-div'

      let span = document.createElement("span");
      span.innerText = opt
      span.className = 'options';

      let input = document.createElement("input");
      input.type = 'radio'
      input.name = 'quiz-opt'
      input.value = opt

      input.addEventListener('change',function (){
        userChackValue = this.value
        nextBtn.disabled = false
      })

      optDiv.appendChild(input)
      optDiv.appendChild(span)
      div.appendChild(optDiv)
    })

    let nextBtn = document.createElement('button');
    nextBtn.innerText = 'Next'
    nextBtn.className = 'next-btn'
    nextBtn.disabled = true
    nextBtn.addEventListener('click',showQuizes)
    div.appendChild(nextBtn)
    
    quizCaintainer.appendChild(div)

    let presentQus = document.getElementById('present-qus');
      presentQus.innerText =indexOfArr+1 ;
  }
  makeQuizes()
  function showQuizes (){
    if(userChackValue === quizes[indexOfArr].correct){
      correctAns++
    }else{
      wrongAns++
    }
    
    if(indexOfArr+1 < quizes.length){
      indexOfArr++
      makeQuizes()
      
    }
    if(indexOfArr+1 === quizes.length){
      let nextBtn = document.getElementsByClassName('next-btn');
           nextBtn[0].innerText = 'Submit'
           nextBtn[0].addEventListener('click',function () {
            quizCaintainer.style.display = 'none'
            showResult()
           })
    }
  }
  function showResult (){
    let scoreDiv = document.getElementById("score-div");
    scoreDiv.style.display = 'flex';
    let scorePerZero = document.getElementById('score-per');
    scorePerZero.innerText = correctAns*10 

    let scoreCircle = document.getElementById('scoreCircle');
    scoreCircle.style.borderColor = correctAns >= wrongAns ? 'green' : 'red'

    let corAnsP = document.createElement('p');
    corAnsP.innerText = `${correctAns} Answer is Correct`

    let wroAnsP = document.createElement('p');
    wroAnsP.innerText = `${wrongAns} Answer is Correct`

    let qusCout = document.getElementsByClassName('qusCout');

    qusCout[0].appendChild(corAnsP)
    qusCout[0].appendChild(wroAnsP)
    }
