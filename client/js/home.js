let goalsContainer, prevWeekButton, nextWeekButton, addGoalButton, goalModal, closeButton, saveGoalButton, goalDateInput, goalValueInput, goalProgressInput, modalTitle;

let currentWeek = 0; // 0 represents the current week
let editingGoalId = null;

function getGoals(week) {
    return new Promise((resolve, reject) => {
        if(!goalsContainer) return;
        var fxhr = new FXMLHttpRequest();
        fxhr.open('GET', 'server/goalsReports');
        fxhr.onreadystatechange = function(){ 
            if(fxhr.readyState === 4){
                if(fxhr.status === 200){
                    var goalData = JSON.parse(fxhr.responseText);
                    resolve(goalData);
                } else {
                    reject(`Error: ${fxhr.responseText}`);
                }
            }
        }
        fxhr.send();
    });
};

function getGoal(id){
    return new Promise((resolve, reject) => {
        var fxhr = new FXMLHttpRequest();
        fxhr.open('GET', `server/goalsReports/${id}`);
        fxhr.onreadystatechange = function(){ 
            if(fxhr.readyState === 4){
                if(fxhr.status === 200){
                    var goal = JSON.parse(fxhr.responseText);
                    resolve(goal);
                } else {
                    reject(`Error: ${fxhr.responseText}`);
                }
            }
        }
        fxhr.send();
    });
};

function updateGoal(id, goal){
    return new Promise((resolve, reject) => {
        var fxhr = new FXMLHttpRequest();
        if(id){
            fxhr.open('PUT', `server/goalsReports/${id}`);
        } else {
            fxhr.open('POST', 'server/goalsReports');
        }
        fxhr.send(JSON.stringify(goal));
        fxhr.onreadystatechange = function(){ 
            if(fxhr.readyState === 4){
                if(fxhr.status === 200 || fxhr.status === 201){
                    resolve();
                } else {
                    reject(`Error: ${fxhr.responseText}`);
                }
            }
        }
    });
};


function renderGoalBars(goalData) {
  goalsContainer.innerHTML = '';

  goalData.forEach((goal) => {
    const goalBar = document.createElement('div');
    goalBar.classList.add('goal-bar');

    const goalName = document.createElement('div');
    goalName.classList.add('goal-name');
    goalName.textContent = goal.date;

    const goalProgress = document.createElement('div');
    goalProgress.classList.add('goal-progress');

    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    progressBar.style.width = `${(goal.goal / 10) * 100}%`;
    progressBar.style.backgroundColor = getProgressColor(goal);

    const progressPercentage = document.createElement('div');
    progressPercentage.classList.add('progress-percentage');
    progressPercentage.textContent = `${goal.goal}`;

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => openGoalModal(goal.date));

    goalProgress.appendChild(progressBar);
    goalProgress.appendChild(progressPercentage);

    goalBar.appendChild(goalName);
    goalBar.appendChild(goalProgress);
    goalBar.appendChild(editButton);

    goalsContainer.appendChild(goalBar);
  });
};

function getProgressColor(goal) {
  progress = goal.completed / goal.goal;
    if (progress >= 0.7) {
        return 'green';
    } else if (progress >= 0.3) {
        return 'orange';
    } else {
        return 'red';
    }
};

async function openGoalModal(id) {
    editingGoalId = id;
    try {
        var goal = await getGoal(id);
        goalDateInput.value = goal.date;
        goalValueInput.value = goal.goal;
        goalProgressInput.value = goal.progress;
      
        modalTitle.textContent = 'Edit Goal';
        goalModal.style.display = 'block';
    } catch (error) {
        alert(error);
    }
  };
  
function openAddGoalModal() {
    editingGoalId = null;
    goalDateInput.value = '';
    goalValueInput.value = '';
    goalProgressInput.value = '';
  
    modalTitle.textContent = 'Add Goal';
    goalModal.style.display = 'block';
  };
  
function closeGoalModal() {
    goalModal.style.display = 'none';
    editingGoalId = null;
  };
  
async function saveGoal() {
    const goal = {
      date: goalDateInput.value,
      goal: parseInt(goalValueInput.value),
      progress: parseInt(goalProgressInput.value)
    };
    
    await updateGoal(editingGoalId, goal);
    const updatedGoals = await getGoals(currentWeek);
    renderGoalBars(updatedGoals);
    
    closeGoalModal();
  };


function initElements() {
    goalsContainer = document.querySelector('.goals-container');
    prevWeekButton = document.getElementById('prevWeek');
    nextWeekButton = document.getElementById('nextWeek');
    addGoalButton = document.getElementById('addGoal');
    goalModal = document.getElementById('goalModal');
    closeButton = document.querySelector('.close-button');
    saveGoalButton = document.getElementById('saveGoal');
    goalDateInput = document.getElementById('goalDate');
    goalValueInput = document.getElementById('goalValue');
    goalProgressInput = document.getElementById('goalProgress');
    modalTitle = document.getElementById('modalTitle');

    prevWeekButton?.addEventListener('click', () => {
        currentWeek--;
        getGoals(currentWeek);
    });
      
    nextWeekButton?.addEventListener('click', () => {
        currentWeek++;
        getGoals(currentWeek);
    });

    addGoalButton?.addEventListener('click', openAddGoalModal);
    closeButton?.addEventListener('click', closeGoalModal);
    saveGoalButton?.addEventListener('click', saveGoal);
}

async function initHome(){
    initElements();
    const goals = await getGoals(currentWeek);
    renderGoalBars(goals);
}

initHome();