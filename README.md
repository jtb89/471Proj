download MySql 
  for linux https://dev.mysql.com/doc/refman/8.4/en/linux-installation.html
after download in terminal run:
  sudo mysql_secure_installation -y
  enter 0 for low-level password 
  Create a password can just use the password in the database_creator.py file as that is what the project is configured for right now 
  MySql should now be set up, run the database_creator.py to create the database and tables, if it does not work comment out the tables section and just run the create database section then uncomment the tables and run it again and it should work.
  Now you will have a database with tables but no data, I will make a script to seed the database shortly. 

  For react make sure you have react downloaded

  from a second terminal differnt from the django server cd into the frontend directory
  if first time run "npm install" to download dependencies

  then with the django server running type
  " npm run dev" still inside the frontend directory to start the react stuff
  and now by going to http://127.0.0.1:8000 the frontend should be loaded