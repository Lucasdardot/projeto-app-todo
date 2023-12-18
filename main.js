const firebaseConfig = {
    apiKey: "AIzaSyAJwQz8v0gfMLd6jV7939RQO7Xp3pEpHo4",
    authDomain: "tarefas---todo.firebaseapp.com",
    databaseURL: "https://tarefas---todo-default-rtdb.firebaseio.com",
    projectId: "tarefas---todo",
    storageBucket: "tarefas---todo.appspot.com",
    messagingSenderId: "627450517617",
    appId: "1:627450517617:web:762614ff37847515c0a3d0"
  };

  firebase.initializeApp(firebaseConfig)
  let database = firebase.database()

  function addTask(){
    let inputTask = document.getElementById("inputTask")
    let taskValue = inputTask.value

    if(inputTask !== ""){
        // criação de um novo nó para colocar as tarefas dentro
        let newTaskRef = database.ref("Tasks").push()
        newTaskRef.set({
            task: taskValue
        })
        inputTask.value = ""
    }
   
  }

  // monitorar as alteraçõs do banco de dados e mostrar no site

  database.ref("Tasks").on("value",function(snapshot){ // snapshot = objeto para armazenar o "value" atual
  let taskList = document.querySelector(".tarefas")
  taskList.innerHTML = "" //sempre limpa as tarefas para não ter duplicação
  snapshot.forEach(function(childSnapshot){
    let task = childSnapshot.val().task
    let divConteudoTarefas = document.createElement("div")
    divConteudoTarefas.classList.add("tarefa1")
    let divTextoTarefas = document.createElement("div")
    divTextoTarefas.classList.add("nomeTarefa")
    let h3Tarefas = document.createElement("h3")
    h3Tarefas.classList.add("tarefa")
    h3Tarefas.appendChild(document.createTextNode(task)) //cria o valor da tarefa dentro do h3
    divTextoTarefas.appendChild(h3Tarefas)
    divConteudoTarefas.appendChild(divTextoTarefas)
    taskList.appendChild(divConteudoTarefas)
    let divBtExcluir = document.createElement("div")
    divBtExcluir.classList.add("botaoExcluir")
    let excluirButton = document.createElement("button")
    excluirButton.classList.add("excluir")
    excluirButton.appendChild(document.createTextNode("x"))
    excluirButton.setAttribute("onclick","excluirTarefa('" + childSnapshot.key + "')")
    divBtExcluir.appendChild(excluirButton)
    divConteudoTarefas.appendChild(divBtExcluir)
  })  
  })
  
  function excluirTarefa(taskId){
    console.log("clicou")
    database.ref("Tasks").child(taskId).remove()
  }