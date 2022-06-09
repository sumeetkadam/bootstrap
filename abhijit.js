
    save = ()=>{
        let date = $("#date").value;
        let time = $("#time").value;
        let task = $("#task").value;
        if(date == "")
        {
          alert("Select date");
          $("#date").focus();
          return;
        }
        if(time == "")
        {
          alert("Select time");
          $("#time").focus();
          return;
        }
        if(task == "")
        {
          alert("Enter task");
          $("#task").focus();
          return;
        }
        let tasks = new Array();
        let id = $("id").value;
        if(localStorage.getItem("tasks") != null)
        {
          tasks = JSON.parse(localStorage.getItem("tasks"));
        }      
        if(id == 0)
        {
          for(let i = 0; i < tasks.length; i++)
          {
            if(tasks[i]["id"] > id)
              id = tasks[i]["id"];
          }
          id = id + 1;          
          let mytask = {
            id:id,
            date:date,
            time:time,
            task:task,
            status:"open"
          }
          tasks.push(mytask);
        }
        else{
          for(let i = 0; i < tasks.length; i++)
          {
            if(tasks[i]["id"] == id)
            {
              tasks[i]["date"] = date;
              tasks[i]["time"] = time;
              tasks[i]["task"] = task;
            }
          }
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        alert("Task saved");
  
  
        list();
  
      }
  
      function list()
      {
        if(localStorage.getItem("tasks") != null)
        {
          let tasks = JSON.parse(localStorage.getItem("tasks"));
          console.log(tasks);
  
          let table = $("#mytable");
          while(table.rows.length > 1){
            table.deleteRow(1);
          }
          for(let i = 0; i < tasks.length; i++)
          {
              let row = table.insertRow(table.rows.length);
              if(tasks[i]["status"] == "open")
                row.style.backgroundColor = "red";
              else
                row.style.backgroundColor = "green";
              let cell0 = row.insertCell(0);
              let cell1 = row.insertCell(1);
              let cell2 = row.insertCell(2);
              let cell3 = row.insertCell(3);
              let cell4 = row.insertCell(4);
              let cell5 = row.insertCell(5);
              let cell6 = row.insertCell(6);
              let cell7 = row.insertCell(7);
              cell0.innerHTML = "<button onclick='edit(" + tasks[i]["id"] + ")'>Edit</button> <button onclick='deletetask(" + tasks[i]["id"] + ")'>Delete</button>";
              cell1.innerHTML = i + 1;
              cell2.innerHTML = tasks[i]["id"];
              cell3.innerHTML = tasks[i]["date"];
              cell4.innerHTML = tasks[i]["time"];
              cell5.innerHTML = tasks[i]["task"];
              cell6.innerHTML = tasks[i]["status"];
              if(tasks[i]["status"] == "open")
                cell7.innerHTML = "<button onclick='changestatus(" + tasks[i]["id"] + ", \"close\")'>Close</button>";
              else
                cell7.innerHTML = "<button onclick='changestatus(" + tasks[i]["id"] + ", \"open\")'>Open</button>";
  
          }
        }
        $("#id").val("0");
        $("#date").val("");
        $("#time").val("");
        $("#task").val("");
      }
  
      edit = (id) => {
        $("#id").value = id;
        if(localStorage.getItem("tasks") != null)
        {
        
          tasks = JSON.parse(localStorage.getItem("tasks"));
          for(let i = 0; i < tasks.length; i++)
          {
            if(tasks[i]["id"] == id)
            {
              $("#date").val(tasks[i]["date"]);
              $("#time").val(tasks[i]["time"]);
              $("#task").val(tasks[i]["task"]);
            }
          }
        }
      }

      function printDiv(divName) {
        var printContents = $("#" + divName).html();
        var originalContents = document.body.innerHTML;
   
        document.body.innerHTML = printContents;
   
        window.print();
   
        document.body.innerHTML = originalContents;
   }
  
      deletetask = (id)=>{
        if(confirm("Sure to delete?"))
        {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        let newtasks = new Array();
        for(let i = 0; i < tasks.length; i++)
        {
          if(tasks[i]["id"] != id)
          {
            newtasks.push(tasks[i]);
          }
        }
        localStorage.setItem("tasks", JSON.stringify(newtasks));
        list();
      }      
      }
  
      changestatus = (id, status)=>{
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        let newtasks = new Array();
        for(let i = 0; i < tasks.length; i++)
        {
          if(tasks[i]["id"] == id)
          {
            tasks[i]["status"] = status;
          }
          newtasks.push(tasks[i]);
        }
        localStorage.setItem("tasks", JSON.stringify(newtasks));
        list();
      }

      
      list();