delete from POST_COMMENTS;
delete from POST_LIKES;
delete from POSTS;
delete from POST_SHARED;
delete from USER_FOLLOWS;
delete from USERS;

insert into USERS values (1,'2023-03-27 15:32:42.000000', '1978-07-20','andrew@gmail.com', 'andrii', '1234', '/headerPhoto/railway1.png','/photo/avatar.png', 'Andrii');
insert into USERS values (2,'2023-03-21 23:25:42.000000', '1995-03-15','nick@gmail.com', 'nick', '1234', '/headerPhoto/railway2.png','/photo/dog.png', 'Nick');
insert into USERS values (3,'2023-04-05 13:32:42.000000', '2000-01-04','tom@gmail.com', 'tomi', '1234', '/headerPhoto/railway1.png','/photo/spiderman.png', 'Tom');
insert into USERS values (4,'2023-04-07 23:22:42.000000', '1988-05-03','leyla@gmail.com', 'leyla', '1234', '/headerPhoto/railway2.png','/photo/avatar.png', 'Leyla');
insert into USERS values (5,'2023-04-13 21:32:42.000000', '1998-04-11','kate@gmail.com', 'kate', '1234', '/headerPhoto/railway1.png','/photo/dog.png', 'Katrin');
insert into USERS values (6,'2023-04-27 12:32:42.000000', '1999-09-30','dilan@gmail.com', 'dilan', '1234', '/headerPhoto/railway2.png','/photo/spiderman.png', 'Dilan');
insert into USERS values (7,'2023-04-29 12:32:42.000000', '1993-02-25','bob@gmail.com', 'bob', '1234', null,null, 'Bob');
insert into USERS values (8,'2023-04-29 12:32:42.000000', '1993-07-15','chris@gmail.com', 'chris', '1234', '/headerPhoto/railway21.png','/photo/spiderman1.png', 'Chris');

insert into POSTS values (1, 'MTA6MjQ6MjY=', '2023-03-29 12:10:42.000000','Hello world 1', 1);
insert into POSTS values (2, 'MTA6MjQ6MjY=', '2023-04-29 12:10:42.000000','Hello world 2', 2);
insert into POSTS values (3, 'MTA6MjQ6MjY=', '2023-05-29 12:10:42.000000','Hello world 3', 3);
insert into POSTS values (4, 'MTA6MjQ6MjY=', '2023-01-29 12:10:42.000000','Hello world 4', 4);
insert into POSTS values (5, 'MTA6MjQ6MjY=', '2022-03-29 12:10:42.000000','Hello world 11', 1);
insert into POSTS values (6, 'MTA6MjQ6MjY=', '2022-09-29 12:10:42.000000','Hello world 21', 2);
insert into POSTS values (7, 'MTA6MjQ6MjY=', '2022-02-23 12:10:42.000000','Hello world 41', 4);

insert into USER_FOLLOWS values (1,'true', 1, 2);
insert into USER_FOLLOWS values (2, 'true', 1, 3);
insert into USER_FOLLOWS values (3, 'true', 1, 4);
insert into USER_FOLLOWS values (4, 'true', 2, 1);
insert into USER_FOLLOWS values (5, 'true', 2, 4);
insert into USER_FOLLOWS values (6, 'true', 3, 4);
insert into USER_FOLLOWS values (7, 'true', 4, 1);