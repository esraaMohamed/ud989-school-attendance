"strict use";
(function(){

    var model = {
        data : [{"student_name": "Student 1", "missing_days": [3,5,7,9]},
        {"student_name": "Student 2", "missing_days":[1]},
        {"student_name": "Student 3", "missing_days":[]} ],

        addMissingDay: function(studentIndex, day){
            if(this.data[studentIndex].missing_days.indexOf(day) === -1 )
                this.data[studentIndex].missing_days.push(day);
        },
        removeMissingDay: function(studentIndex, day){
            var index = this.data[studentIndex].missing_days.indexOf(day);
            if(index > -1)
                this.data[studentIndex].missing_days.splice(index, day);
        },
        getAllItems: function(){
            return data;
        },
    };

    var controller = {
        init: function(){
            // Initialize application
            view.init();
        },

        getAllItems: function(){
            return model.data;
        },
        getMissingDays: function(studentIndex){
            return model.data[studentIndex].missing_days.length;
        },
        addMissingDay: function(studentIndex, day){
            model.addMissingDay(studentIndex, day);
        },
        removeMissingDay: function(studentIndex, day){
            model.removeMissingDay(studentIndex, day);
        },
    };

    var view = {
        init: function(){
            // Initialize view
            this.render();

        },
        updateTotal: function(studentIndex, total){
            var td = document.getElementById("total_row_" + studentIndex);
            td.innerText = total
        },
        render: function(){
            // Render table
            var rows = controller.getAllItems();
            var size = rows.length;
            // Get tbody of the table and remove everything inside
            var tbody = document.querySelector("tbody");
            tbody.innerHTML = "";
            // Variables for storing tr, td and checkboxes elements
            var tr;
            var td;
            var tds = [];
            var ch;

            // Add rows
            for(var i = 0; i < size; i++)
            {
                // Create table row
                tr = document.createElement("tr");
                //Create 14 cells and checkboxes and per row
                for(var k = 0; k < 14; k++)
                {

                    td = document.createElement("td");
                    // If first column, set the name
                    if(k === 0)
                        td.appendChild(document.createTextNode(rows[i].student_name));
                    // If 13th column, set the total number of days missed
                    if(k === 13){
                        td.setAttribute("id", "total_row_" + i);
                        td.appendChild(document.createTextNode( controller.getMissingDays(i) ));
                    }

                    // Create checkboxes only in the columun s 1-12
                    if(0 < k && k < 13)
                    {
                        ch = document.createElement("input");
                        ch.type= 'checkbox';
                        ch.name = "row_" + i + "_col_" + k;
                        ch.id = ch.name;
                        // Check if day is reported as missing in the model
                        if(rows[i].missing_days.indexOf(k) > -1)
                            ch.checked = true;

                        // Add event handler to checkbox
                        ch.addEventListener("click",(function(that, studentIndex, day){
                            return function(){
                                if(this.checked)
                                    controller.addMissingDay(studentIndex, day);
                                else
                                    controller.removeMissingDay(studentIndex, day);
                                that.updateTotal(studentIndex, controller.getMissingDays(studentIndex));
                            }
                        })(this, i, k));
                        // Append checkbox to cell
                        td.appendChild(ch);
                    }
                    // Append cell to row
                    tr.appendChild(td);
                }

                // Append row to table body
                tbody.appendChild(tr);
            }
        },
    };
    // Starting function
    controller.init();
})();