# Employee-Tracker

This app is a command line app that utilizes SQL databases to update and sort a database of employees. It helps keep track of departments, roles, salaries, and the employees within. First, let's go over the viewing functionality. Let's take a look!

### View Employee
The first function is View Employee. After being prompted about the employee's department, the user will select which employee to view. The employee's information will be displayed on a console.table.

![](assets/viewemp.gif)



### View Department
Next is View Department. A list of departments will display. Once selected, the information of all employees will be listed within the matching department.

![](assets/viewdept.gif)



### View Role
When View Role is chosen, all roles within the company will be listed. When a role is selected, all employees matching that role will print on a table.

![](assets/viewrole.gif)



## Use Case Example
Now let's say a company is starting a new department from scratch. Microsoft is relaunching a branch of Microsoft Office, and needs to build their employee base from the ground up.

### Add Department
The first step is adding the Department 'Microsoft Office'. This will populate an empty row in the 'departments' table of our database.

![](assets/adddept.gif)



### Add Role
Next we have the need for some jobs. Every department will need sanitation staff, so let's add a janitor. We have the option to choose a salary, so let's start off at $30,000. The role info will be added to the role table. Like the department we made, it will read as empty until we give it some employee data.

![](assets/addrole.gif)



### Add Employee
After the groundwork has been laid, we can hire on our janitor for Microsoft Office! We've had a lot of applicants, but one standout - a bright, eager employee named Donald Duck.

![](assets/addemp.gif)
![](assets/testall.gif)
![](assets/updaterole.gif)
