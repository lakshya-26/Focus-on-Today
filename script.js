const checkBoxList = document.querySelectorAll('.custom-checkbox');
const inputFields = document.querySelectorAll('.goal-input');
const errorLabel = document.querySelector('.error-label'); 
const progressBar = document.querySelector('.progress-bar');
const progressValue = document.querySelector('.progress-value');
const progressLabel = document.querySelector('.progress-label');
const quote = document.querySelector('.quote');


const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first:{
        name:'',
        completed:false
    },
    second:{
        name:'',
        completed:false
    },
    third:{
        name:'',
        completed:false
    },
};
let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
progressValue.style.width=`${completedGoalsCount / 3 * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 Completed`
label();
Quote();

checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        const allGoalsAdded = [...inputFields].every((input) => {
            return input.value;
        })

        if(allGoalsAdded){
        checkbox.parentElement.classList.toggle('completed');
        const inputId = checkbox.nextElementSibling.id;
        allGoals[inputId].completed = !allGoals[inputId].completed;
        completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
        progressValue.style.width=`${completedGoalsCount / 3 * 100}%`;
        progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 Completed`
        label();
        Quote();
        localStorage.setItem('allGoals', JSON.stringify(allGoals));
        }else{
            progressBar.classList.add('show-error');
        }
    })
});

inputFields.forEach((input) => {

    input.value = allGoals[input.id].name;

    if(allGoals[input.id].completed){
        input.parentElement.classList.add('completed');
    }

    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error');
    })

    input.addEventListener('input', (e) => {

        if(allGoals[input.id].completed){
            input.value = allGoals[input.id].name;
            return;
        }

        allGoals[input.id] = {
            name:input.value,
            completed:false
        };
        localStorage.setItem('allGoals', JSON.stringify(allGoals));
    })
})

function label(){
    if(completedGoalsCount === 1){
        progressLabel.innerText = "Well begun is half done!";
    }else if(completedGoalsCount === 2){
        progressLabel.innerText = "Just a step away, keep going!";
    }else if(completedGoalsCount === 3){
        progressLabel.innerText = "Whoa! You just completed all the goals, time for chill :D";
    }else if(completedGoalsCount === 0){
        progressLabel.innerText = "Raise the bar by completing your goals!";
    }
}

function Quote(){
    if(completedGoalsCount){
        quote.innerText = '“Keep Going, You’re making great progress!”';
    }else if(completedGoalsCount === 0){
        quote.innerText = '"Move one step ahead, today!"';
    }
}