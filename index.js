const quizes = [
  {
    que: 'What is the Capital city of Pakistan?',
    options: ['Karachi', 'Lahore', 'Islamabad', 'Hyderabad'],
    correct: 'Islamabad'
  },
  {
    que: 'What is the largest city of Pakistan?',
    options: ['Islamabad', 'Karachi', 'Lahore', 'Faislabad'],
    correct: 'Karachi'
  },
  {
    que: 'What city is financial capital of Pakistan?',
    options: ['Karachi', 'Lahore', 'Islamabad', 'Hyderabad'],
    correct: 'Karachi'
  }, {
    que: 'Who is the first prime minister of Pakistan?',
    options: ['Qaid-e-azam muhammad Ali jinnah', 'Liaquat Ali khan', 'Fatima jinnah', 'Allama Iqbal'],
    correct: 'Liaquat Ali khan'
  },
  {
    que: 'In which country K2 mountain located?',
    options: ['India', 'Pakistan', 'Nepal', 'Sri lanka'],
    correct: 'Pakistan'
  },
  {
    que: 'Who is the atomic scientist of Pakistan?',
    options: ['Dr. abdul salam', 'Dr. samar mubarak', 'Dr. abdul kalam', 'Dr. abdul kadeer khan'],
    correct: 'Dr. abdul kadeer khan'
  },
  {
    que: 'Which mosque is the largest mosque of Pakistan?',
    options: ['Faisal Masjid', 'Badshah-i-masjid', 'Laal masjid', 'Jinnah masjid'],
    correct: 'Faisal Masjid'
  },
  {
    que: 'What is the national food of Pakistan?',
    options: ['Nihari', 'Koorma', 'Pulao', 'Biryani'],
    correct: 'Biryani'
  },
  {
    que: 'Which year Pakistan won the World`cup',
    options: ['1996', '1992', '2001', '1988'],
    correct: '1992'
  },
  {
    que: 'Who is the Captain of Cricket team',
    options: ['Shaheen afridi', 'Imam-u-haq', 'Babar azam', 'Muhammad rizwan'],
    correct: 'Babar azam'
  }
];

let indexOfArr = 0;
let correctAns = 0;
let wrongAns = 0;
let userChackValue = '';
let quizCaintainer = document.getElementById('quiz-caintainer');

let totalQusZero = document.getElementById('total-qus');
totalQusZero.innerText = quizes.length;

function makeQuizes() {
  quizCaintainer.innerHTML = null;
  let div = document.createElement('div');

  let h3 = document.createElement('h3');
  h3.innerText = quizes[indexOfArr].que;
  div.appendChild(h3)

  quizes[indexOfArr].options.map((opt) => {

    let optDiv = document.createElement('div');
    optDiv.className = 'opt-div'

    let span = document.createElement("span");
    span.innerText = opt
    span.className = 'options';

    let input = document.createElement("input");
    input.type = 'radio'
    input.name = 'quiz-opt'
    input.value = opt
    input.disabled = false
    input.className = 'inputs';

    input.addEventListener('change', function () {
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
  nextBtn.addEventListener('click', showQuizes)

  div.appendChild(nextBtn)

  quizCaintainer.appendChild(div)

  let presentQus = document.getElementById('present-qus');
  presentQus.innerText = indexOfArr + 1;
}
makeQuizes()

function abc() {
  if (userChackValue === quizes[indexOfArr].correct) {
    correctAns++
  } else;
  wrongAns = quizes.length - correctAns
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
        console.log(quizCaintainer.style.display)
      }
    })
  }
}
function showResult() {
  let scoreDiv = document.getElementById("score-div");
  scoreDiv.style.display = 'flex';

  let scorePerZero = document.getElementById('score-per');
  scorePerZero.innerText = correctAns * 10

  let scoreCircle = document.getElementById('scoreCircle');
  scoreCircle.style.borderColor = correctAns >= wrongAns ? 'green' : 'red'
  scoreCircle.style.color = correctAns >= wrongAns ? 'green' : 'red'

  let corAnsP = document.createElement('p');
  corAnsP.innerText = `${correctAns} Answer is Correct`

  let wroAnsP = document.createElement('p');
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
}, 60000)

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
