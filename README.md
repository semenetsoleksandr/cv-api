This application is responsible for storing skills in an SQLite database. Interaction with the database is handled by
the **SkillsDb** class, which has four methods:

* init()
* getSkillsFromDB()
* addSkillToDB(newSkill)
* delIdFromDB(id)

When accessing the ./skills page using the **POST**, **GET**, or **DELETE** methods, a corresponding method of the *
*SkillsDb** class is called.
