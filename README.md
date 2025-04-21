download MySql 
  for linux https://dev.mysql.com/doc/refman/8.4/en/linux-installation.html
after download in terminal run:
  sudo mysql_secure_installation -y
  enter 0 for low-level password 
  Create a password can just use the password in the database_creator.py file as that is what the project is configured for right now 
  MySql should now be set up, run the database_creator.py to create the database and tables, if it does not work comment out the tables section and just run the create database section then uncomment the tables and run it again and it should work.
  Now you will have a database with tables but no data. Now run the database_seeder.py the database will now have data in it.

In the 471proj directory either from a terminal or within your IDE:
  install mysql-connector:
  
    pip install mysql-connector-python

  You may need to install the Python 3 and MySQL development headers and libraries like so:
  This should not be necessary for Windows you should be able to pip install mysqlclient

    $ sudo apt-get install python3-dev default-libmysqlclient-dev build-essential pkg-config # Debian / Ubuntu
    % sudo yum install python3-devel mysql-devel pkgconfig # Red Hat / CentOS
  
  Then you can install mysqlclient via pip now:

    $ pip install mysqlclient

If you are having trouble installing mysqlclient check out the developers README https://github.com/PyMySQL/mysqlclient/blob/main/README.md

  For react make sure you have react downloaded

  from a second terminal differnt from the django server cd into the frontend directory
  if first time run "npm install" to download dependencies

  now useing matirial ui stuff for css

  then with the django server running type  python manage.py runserver
  " npm run dev" still inside the frontend directory to start the react stuff
  and now by going to http://127.0.0.1:8000 the frontend should be loaded

  super user admin page log in = 
  username: user
  email bib@email.ca
  password: password



  may need to fix later

  1. Primary Key Conflicts

Several tables use only card_number or isbn as primary keys where they likely need composite keys:

    BORROW:
    Primary key is just card_number, meaning a member can only borrow one book at a time.
    ✅ Fix: Make (card_number, isbn) the primary key.

    HOLDS:
    Same issue—only card_number as PK prevents multiple holds by the same member.
    ✅ Fix: Make (card_number, isbn) the primary key.

    OWNS:
    Uses isbn as the sole primary key, which means a book can only be held by one branch.
    ✅ Fix: Make (isbn, branch_id) the primary key.


