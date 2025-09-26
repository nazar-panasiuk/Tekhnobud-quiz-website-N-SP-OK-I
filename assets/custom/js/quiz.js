const QUESTIONS = [
    {
        label: "Какой этап является наиболее важным перед началом строительного проекта?",
        answers: [
            "Разработка подробного плана и проектной документации",
            "Начало строительства без подготовки",
            "Ориентация только на удачу",
            "Использование непроверенных советов из интернета",
        ],
    },
    {
        label: "Какая технология считается наиболее надежной в современном строительстве?",
        answers: [
            "Применение энергоэффективных и сертифицированных материалов",
            "Использование устаревших методов без контроля качества",
            "Работа только с неподтвержденными поставщиками",
            "Отсутствие проверки технологий перед внедрением",
        ],
    },
    {
        label: "Как можно эффективно снизить риски при строительстве?",
        answers: [
            "Привлечение специалистов и использование проверенных технологий",
            "Сосредоточение всех ресурсов только на одном методе",
            "Игнорирование анализа условий строительства",
            "Применение решений без учета инженерных расчетов",
        ],
    },
    {
        label: "Какой фактор напрямую влияет на качество строительного объекта?",
        answers: [
            "Соблюдение современных стандартов и технологий",
            "Количество упоминаний в социальных сетях",
            "Цвет оборудования на стройке",
            "Название используемого материала",
        ],
    },
    {
        label: "Что является показателем успешного строительного проекта?",
        answers: [
            "Высокое качество, надежность и долговечность объекта",
            "Отсутствие значимых результатов",
            "Прекращение строительства на раннем этапе",
            "Закупка материалов и остановка работы",
        ],
    },
];


const $container = document.getElementById("container");

const startStep = {
    render: () => {
        $container.innerHTML = `
<div class="container quiz-wrapper">
    <div class="quiz-content">
        <div class="content">
            <img class="quiz-image" src="assets/custom/images/bg1.png"/>
            <h2 class="title">Проверьте свои знания о современных строительных технологиях</h2>
            <h3 class="sub-title">Насколько вы готовы к инновациям в строительстве?</h3>
            <h5 class="text">
                Ответьте на ключевые вопросы о новых материалах, энергоэффективных решениях, инженерных разработках и инновациях в строительстве, чтобы узнать свой уровень подготовки.
            </h5>
            <div class="contact-wrapper">
                <div class="my-3 icons-wrapper">
                    <span class="fables-iconphone fables-second-text-color pr-2 font-20 mt-1 d-inline-block"></span>
                    <p class="font-14 fables-fifth-text-color mt-2 ml-4">
                     +77112210261
                    </p>
                </div>
                <div class="my-3 icons-wrapper">
                    <span class="fables-iconemail fables-second-text-color pr-2 font-20 mt-1 d-inline-block"></span>
                    <p class="font-14 fables-fifth-text-color mt-2 ml-4">
                        tekhno_bud@gmail.com
                    </p>
                </div>
            </div>
            <div style="display: flex;justify-content: center;">
                <button class="btn btn-primary w-100 py-3 first-button" data-action="startQuiz">Начать тестирование</button>
            </div>
        </div>
    </div>
</div>

      `;
    },
    onClick: (el) => {
        if (el.getAttribute("data-action") === "startQuiz") {
            quiz.nextStep(questionsStep);
        }
    },
};

// <div class="bar-wrapper" style="width: 100%; padding-left: 20px; padding-right: 20px">
//     <div class="progress" style="padding-left: 0 !important; padding-right: 0 !important;">
//         <div class="progress-bar" style="width: ${questionsStep.getProgress()}%"></div>
//     </div>
// </div>

const questionsStep = {
    questionIndex: 0,
    answers: {},
    render: () => {
        const question = QUESTIONS[questionsStep.questionIndex];

        $container.innerHTML = `
          <div class="container quiz-wrapper">
            <div class="quiz-content text-center quiz-start">
                <img class="quiz-image" src="assets/custom/images/bg1.png"/>
                <div class="question-wrapper">
                    <h3 class="question mt-4">${question.label}</h3>
                </div>

                <div class="row answers">
                    ${question.answers
                        .map(
                            (answer, index) =>
                                `
                                <button class="answer border rounded" data-action="selectAnswer" data-answer-index="${index}">
                                    ${answer}
                                </button>
                            `
                        )
                        .join("")}
                </div>


            </div>
        </div>
      `;
    },
    getProgress: () =>
        Math.floor((questionsStep.questionIndex / QUESTIONS.length) * 100),
    onClick: (el) => {
        switch (el.getAttribute("data-action")) {
            case "goToNextQuestion":
                return questionsStep.goToNextQuestion();
            case "goToPreviousQuestion":
                return questionsStep.goToPreviousQuestion();
            case "selectAnswer":
                return questionsStep.selectAnswer(
                    parseInt(el.getAttribute("data-answer-index"), 10)
                );
        }
    },
    goToPreviousQuestion: () => {
        questionsStep.questionIndex -= 1;
        questionsStep.render();
    },
    selectAnswer: (answerIndex) => {
        const question = QUESTIONS[questionsStep.questionIndex];
        const selectedAnswer = question.answers[answerIndex];

        questionsStep.answers = {
            ...questionsStep.answers,
            [question.label]: selectedAnswer,
        };

        if (questionsStep.isFinalQuestion()) {
            questionsStep.completeStep();
        } else {
            questionsStep.goToNextQuestion();
        }
    },
    isFinalQuestion: () => questionsStep.questionIndex === QUESTIONS.length - 1,
    goToNextQuestion: () => {
        questionsStep.questionIndex += 1;
        questionsStep.render();
    },
    completeStep: () => {
        quiz.setAnswers(questionsStep.answers);
        quiz.nextStep(finalStep);
    },
};

//   <h2 class="title">Formulario de contacto financiero</h2>
//   <h3 class="mb-4">Por favor, completa el formulario para recibir tus resultados financieros</h3>

const finalStep = {
    render: () => {
        $container.innerHTML = `
<div class="container quiz-wrapper">
    <div class="row quiz-content form-content">
        <div class="col-lg-12 col-md-12 col-sm-12" style="display: flex; justify-content: center; margin-top: 20px">
            <img class="quiz-image" src="assets/custom/images/bg1.png"/>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12 form-block">
            <form id="quiz-form">
                <h2 class="title" style="color: #fff;">Вы почти закончили!</h2>
                <p class="text" style="color: #fff; margin-bottom: 20px;">
                    Укажите ваши данные, чтобы получить персонализированный результат по современным строительным технологиям и инновациям.
                </p>

                <input class="form-control" name="name" type="text" placeholder="Иван Петров" required>
                <input class="form-control" name="email" type="email" placeholder="Электронная почта" required>

                <div class="checkbox" style="color: #fff;">
                    <input type="checkbox" required id="privacyPolicy">
                    <label for="privacyPolicy">
                        Я принимаю
                        <a class="form-link" href="cookie-policy.html" target="_blank" style="color: #fff; text-decoration: underline;">Политику использования файлов cookie</a>,
                        <a class="form-link" href="privacy-policy.html" target="_blank" style="color: #fff; text-decoration: underline;">Политику конфиденциальности</a> и
                        <a class="form-link" href="terms-of-use.html" target="_blank" style="color: #fff; text-decoration: underline;">Условия использования</a>.
                    </label>
                </div>

                <div class="checkbox" style="color: #fff;">
                    <input type="checkbox" id="newsletter" checked>
                    <label for="newsletter">Я хочу получать информацию о современных технологиях и инновациях в строительстве по электронной почте.</label>
                </div>

                ${Object.keys(quiz.answers)
                    .map(
                        (question) =>
                            `<input name="${question}" value="${quiz.answers[question]}" hidden>`
                    )
                    .join("")}

                <button type="submit" class="btn btn-primary w-100 py-3 first-button">Посмотреть результат</button>
            </form>
        </div>
    </div>
</div>

      `;

        // Agrega aquí el manejador de envío del formulario
        document
            .getElementById("quiz-form")
            .addEventListener("submit", function (e) {
                e.preventDefault(); // evita el envío tradicional del formulario
                localStorage.setItem("quizDone", true);
                window.location.href = "thanks.html";
            });
    },

    // Ya no necesitas esto si no se usa en ningún sitio:
    onClick: (el) => {
        const newPath = "thanks.html";
        if (el.getAttribute("data-action") === "submitAnswers") {
            localStorage.setItem("quizDone", true);
            document.getElementById("main-page").classList.remove("hide");
            document.getElementById("quiz-page").classList.add("hide");
            document.getElementById("footer").classList.add("hide");
            window.location.href = newPath;
        }
    },
};

const quiz = {
    activeStep: startStep,
    answers: {},
    clear: () => ($container.innerHTML = ""),
    init: () => {
        $container.addEventListener("click", (event) =>
            quiz.activeStep.onClick(event.target)
        );
        $container.addEventListener("submit", (event) =>
            event.preventDefault()
        );
    },
    render: () => {
        quiz.clear();
        quiz.activeStep.render();
    },
    nextStep: (step) => {
        quiz.activeStep = step;
        quiz.render();
    },
    setAnswers: (answers) => (quiz.answers = answers),
};

if (!localStorage.getItem("quizDone")) {
    document.getElementById("main-page").classList.add("hide");
    quiz.init();
    quiz.render();
}
