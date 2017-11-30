/* ======= Model ======= */

var model = {
		currentStudent: null,
		students: [
			{
				daysMissed : 5,
				days:[3,4,5,7,9],
				name : 'Slappy the Frog'
			},
			{
				daysMissed : 3,
				days: [1,6,8],
				name : 'Lilly the Lizard'
			},
			{
				daysMissed : 1,
				days: [8],
				name : 'Paulrus the Walrus'
			},
			{
				daysMissed : 0,
				days: [],
				name : 'Gregory the Goat'
			},
			{
				daysMissed : 2,
				days: [2,10],
				name : 'Adam the Anaconda'
			}
			]
};

/* ======= Octopus ======= */

var octopus = {

		init: function() {
			model.currentStudent = model.students[0];
			studentView.init();

		},

		getCurrentStudent: function() {
			return model.currentStudent;
		},

		getStudents: function() {
			return model.students;
		},

		incrementDaysMissed: function(index, day) {
			model.students[index].daysMissed++;
			model.students[index].days.push(day);
			studentView.render();
		},

		decrementDaysMissed: function(index, day){
			model.students[index].daysMissed--;
			var i = model.students[index].days.indexOf(day);
			model.students[index].days.splice(i, day);
			studentView.render();
		}
};

/* ======= View ======= */

var studentView = {

		init: function() {
			// render this view (update the DOM elements with the right values)
			this.render();
		},

		render: function() {
			var students = octopus.getStudents();
			var studentsCount = students.length;
			var tableColumns = 14;
			var tbody = document.getElementById("table-body");
			tbody.innerHTML ="";
			var tr;
			var td;
			var checkbox;

			//create rows
			for(var row=0;row<studentsCount;row++){
				tr = document.createElement("tr");
				//create columns
				for(var column=0;column<tableColumns;column++){
					td = document.createElement("td");
					//set first column to the student name
					if(column===0){
						var student_name = students[row].name;
						td.appendChild(document.createTextNode(student_name));
					}//set last column with the number of missed attendance days
					else if(column==13){
						var missedDays = students[row].daysMissed;
						td.setAttribute("id", "total_row_" + row);
						td.appendChild(document.createTextNode(missedDays))
					}//create check boxes in the columns between 1 to 13
					else{
						checkbox = document.createElement('input');
						checkbox.type = "checkbox";
						checkbox.name = "row_" + row + "_col_" + column;
						checkbox.value = "";
						checkbox.id = checkbox.name;
						td.appendChild(checkbox);
						if(students[row].days.indexOf(column) > -1)
                          checkbox.checked = true;
						checkbox.addEventListener("click",(function(student, index, day){
                            return function(){
                                if(this.checked)
                                    octopus.incrementDaysMissed(index, day);
                                else
                                    octopus.decrementDaysMissed(index, day);
                            }
                        })(students[row], row, column));
					}
					tr.appendChild(td);
				}
				tbody.appendChild(tr);
			}

		}
};

octopus.init();
