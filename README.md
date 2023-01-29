## Bug Binder

A Bug tracking and ticketing system using Django.
This is the final project for CS50's Web Programming with Python and JavaScript.
Find all previous projects <b>[here.](https://github.com/asifo1/cs50w)</b>

#### Features

1. Create project.
2. Add or remove dev from project.
3. Issue & track bugs.
4. Assign dev to an issue.
5. Public bug issue url.
6. Developer's profile.
7. Reset password using email.

#### Installation with docker
1. Run `docker-compose up -d`
2. Check `127.0.0.1:8000` or `localhost:8000`

#### Files & Directories

- `Main Directory`

  - `bugbinder` - Main application directory.

    - `_auth` - Authentication app.

      - `models.py` - ORM auth model. Contains an Code class which has user and hashed reset password code.
      - `urls.py` - Contains all url paths for authentication, like login, sign up, forget and reset password as well as logout.
      - `views.py` - Contains all view functions for authentication, like login, sign up, forget and reset password as well as logout.

    - `_profile` - Profile app for maintaining user's prolife.
      - `models.py` - ORM profile model. Contains an Profile class which has all information of a user.
      - `urls.py` - Contains all url paths for profile, like view, edit and delete profile as well as change password.
      - `views.py` - Contains all view functions for profile, like view, edit and delete profile as well as change password.
    - `bugbinder` - Containes settings and main url file.
    - `core` - Core app for all functionalities like create project, assign task etc.
      - `models.py` - Contains two classes Project and Task which has all information about the project and tasks(bugs).
      - `urls.py` - Contains all url paths for Project and Task control, like view dashboard, project, task. search add, assign and remove devloper. Delete task and project. Create bugs.
      - `views.py` - Contains all view functions for Project and Task (mentioned in `urls.py`).
    - `static` - Holds all static files.
      - `css` - Contain all css files for styling the website.
        - `base.css` - Common styles for all pages.
        - `bug-issue.css` - Styles for bug issue page.
        - `colors.css` - Colors in root section.
        - `dashboard.css` - Styles for dashboard page.
        - `home.css` - Style for home page with login, sign up and reset password.
        - `profile.css` - Style for profile page.
        - `project.css` - Style for project page.
        - `task.css` - Style for tasks page.
        - `user.css` - Style for other user profile page.
      - `js` - Contains all JavaScript files for manipulating the DOM with ajax functionalities.
      - `img` - Holds all static images and icons.
    - `Templates` - Holds all html files.

  - `gitignore` - Ignored files for git.
  - `Pipfile` - Project dependencies.

  #### Justification

  This project is distinct from all previous projects so far. Why?

  - More models with complex relation between them.
  - Uses ajax functionality, fetch data without reloading the page.
  - Send password reset code using email.
  - Saves hashed password reset code in db.
  - Uses Chart.js for showing the chart.
  - Completely Mobile responsive.

#### Preview

![Preview](preview.gif)
