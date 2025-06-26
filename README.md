This application is responsible for storing skills in an SQLite database. Interaction with the database is handled by
the **SkillsDb** class, which has four methods:

* init()
* getSkillsFromDB()
* addSkillToDB(newSkill)
* delIdFromDB(id)

When accessing the ./skills page using the **POST**, **GET**, or **DELETE** methods, a corresponding method of the *
*SkillsDb** class is called.

Add REST API to manage data from Contact Form

When accessing the ./messages page using the **POST**, **GET**, or **DELETE** methods, a corresponding method of the *
*SkillsDb** class is called.

When calling the POST method, the following properties must be provided: username, email, message.
