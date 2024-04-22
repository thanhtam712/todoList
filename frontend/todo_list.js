
fetch("http://127.0.0.1:7125/todo_list/")
    .then((response) => {
        return response.json();
    })

    .then((data) => {
        var parentToDoElement = document.getElementById("list_todo")

        data.map(function (d) {
            var tickElement = document.createElement("div")
            var taskElement = document.createElement("div")
            var updateElement = document.createElement("div")
            var deleteElement = document.createElement("div")

            taskElement.classList.add("col-span-9")
            

            var deleteButton = document.createElement("button")
            deleteButton.innerHTML = '<img src="images/bin.png">'
            deleteButton.onclick = function () {
                const xhttp = new XMLHttpRequest();

                var dic = {
                    "id": parseInt(d.id),
                }

                xhttp.open("DELETE", "http://127.0.0.1:7125/todo_list/");
                console.log(dic)
                xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

                console.log("params: " + JSON.stringify(dic))
                xhttp.send(JSON.stringify(dic));
            }

            var checkButton = document.createElement("input")
            checkButton.id = "checkEvent"
            checkButton.classList.add("checkbox")
            checkButton.classList.add("checkbox-info")
            checkButton.type = "checkbox"



            var task_div = document.createElement("div")

            var updateButton = document.createElement("button")
            updateButton.innerHTML = '<img src="images/edit.png">'
            task_div.innerHTML = '<input type="text" ' + 'value="' + d.task + '" id="new_task" disabled="disabled" style="display:table-cell; width:100%">'



            updateButton.onclick = function () {
                task_div.focus()
                task_div.innerHTML = '<input type="text" ' + 'value="' + d.task + '" id="new_task" class="input input-bordered input-info w-full max-w-xs" style="display:table-cell; width:100%">'

                const new_task = document.getElementById('new_task')
                new_task.addEventListener('keypress', function (event) {
                    if (event.key === "Enter") {
                        console.log('Enter key pressed!');

                        console.log(new_task.value.toString())
                        const xhttp = new XMLHttpRequest();

                        var dic = {
                            "id": d.id,
                            "task": (new_task.value).toString(),
                        }
                        xhttp.open("PUT", "http://127.0.0.1:7125/todo_list/");
                        console.log(dic)
                        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

                        console.log("params: " + JSON.stringify(dic))
                        xhttp.send(JSON.stringify(dic));
                        d.task = (new_task.value).toString()
                        task_div.innerHTML = '<input type="text" ' + 'value="' + d.task + '" id="new_task" disabled="disabled" style="display:table-cell; width:100%">'

                    }
                })
            }

            checkButton.addEventListener("click", function () {
                console.log(d.state)
                if (d.state === false) {
                    d.state = true
                }
                else {
                    d.state = false
                }

                const xhttp = new XMLHttpRequest();

                var dic = {
                    "id": d.id,
                    "task": d.task,
                    "state": d.state,
                }

                xhttp.open("PUT", "http://127.0.0.1:7125/todo_list/");
                console.log(dic)
                xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

                console.log("params: " + JSON.stringify(dic))
                xhttp.send(JSON.stringify(dic));
            })

            if (d.state == true)
            {
                task_div.classList.add("line-through")
                checkButton.checked = "true"
            }
            else 
            {
                task_div.classList.add("none")
            }


            tickElement.appendChild(checkButton)
            taskElement.appendChild(task_div)
            updateElement.appendChild(updateButton)
            deleteElement.appendChild(deleteButton)

            parentToDoElement.appendChild(tickElement)
            parentToDoElement.appendChild(taskElement)
            parentToDoElement.appendChild(updateElement)
            parentToDoElement.appendChild(deleteElement)

        })

        console.log(data)
    })

// .catch(function (error) {
//     alert(error)
// })


function load_data() {
    const xhttp = new XMLHttpRequest();

    var task_input = document.getElementById("task_input")

    var dic = {
        "task": task_input.value,
        "state": false
    }
    xhttp.open("POST", "http://127.0.0.1:7125/todo_list/");

    console.log(dic)
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    console.log("params: " + JSON.stringify(dic))
    xhttp.send(JSON.stringify(dic));
}

function nodeToString(node) {
    var tmpNode = document.createElement("div");
    tmpNode.appendChild(node.cloneNode(true));
    var str = tmpNode.innerHTML;
    tmpNode = node = null;
    return str;
}