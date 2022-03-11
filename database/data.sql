insert into "users"
  ("username", "password")
  values ('John Baik', 'temp'), ('Bailey Yu', 'temp2'), ('Nicholas Prodehl', 'temp3'),
  ('Angela Nan', 'temp4'), ('Gustavo Ayala', 'temp5') ;

insert into "posts"
  ("post", "userId", "startTime", "endTime", "location", "startDate", "price", "createdAt")
  values ('Hi everyone! I am looking for a skilled photographer who can take 4k resolution photos for my wedding! If you are interested, please private message me or post your website below in the comments.', '1', '3:00 PM', '5:00 PM', '16007 Crenshaw Blvd, Torrance, CA 90506', '03/21/2022', 300, 'Jan 1, 2022 9:00 PM'),
   ('Is there any videographers around the area looking for freelance work? I need someone to record my dance performance this Saturday.', '2', '7:00 PM', '9:00 PM', '1398 Artesia Blvd, Gardena, CA 90248', '03/02/2022', 50, 'Jan 2, 2022 9:00 PM'),
    ('Hi, I am a professional stunt coordinator for Marvel Studios. We are currently hiring 12 stunt doubles to perform tricks for the sequel to Shang Chi. If you have at least 2 years of professional experience doing stunts and are interested, please message me for more details', '3', '7:00 PM', '9:00 PM', '16520 Crenshaw Blvd, Torrance, CA 90504', '03/02/2022', 1000, 'Jan 3, 2022 9:00 PM'),
    ('I''m looking for a skilled Video Editor who can cut 20-30 minutes of gameplay and condense it into a 8-10 minute video with only the best parts and highlights. I will be playing through a videogame while a voice actor commentates over my footage in an improv fashion so both video and audio will need to be cut, spliced, and properly balanced. The final video needs to be funny, entertaining, and constantly rewarding the viewer for watching with no moments of awkward silence or boredom. There should always be commentary throughout. If there are parts of a cutscene or in game dialogue you want to highlight for the voice actor to bounce off of, you can mute the commentary and let the footage speak for itself but most of the time, I only want the bare minimum highlighted during cutscenes to quickly focus back on the commentary. It is the job of the editor to make sure it is as entertaining as possible with very little filler. It is also the job of the editor to decipher which scenes are needed and which scenes need to be cut for the final video.', '4', '10:00 AM', '5:00 PM', '3545 Artesia Blvd, Torrance, CA 90504', '04/01/2022', 13000, 'Jan 4, 2022 9:00 PM'),
    ('Hello. Any urban photographers in the Torrance area? I need someone to take visually appealing shots for my linkedIn profile. Price can be discussed.', '5', '10:00 AM', '5:00 PM', '2200 Marine Ave, Gardena, CA 90249', '04/01/2022', 300, 'Jan 5, 2022 9:00 PM'),
    ('URGENT! NEED A MAKEUP ARTIST!! Person must have a bachelor''s degree and at least 20 years of preofessional experience.', '2', '7:00 PM', '9:00 PM', '3560 Redondo Beach Blvd, Torrance, CA 90504', '03/02/2022', 50, 'Jan 7, 2022 9:00 PM');


insert into "comments"
  ("commentText", "postId", "userId")
  values ('Test comment', '2', '1'),
  ('Test Comment 2', '2', '2'),
  ('Test Comment 3', '2', '3'),
  ('Test Comment 4', '1', '2');
