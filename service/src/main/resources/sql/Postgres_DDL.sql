
DROP TABLE IF EXISTS Player;
CREATE TABLE Player (
  player_uuid UUID NOT NULL,
  user_name varchar(45) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  email varchar(225) DEFAULT NULL,
  PRIMARY KEY (player_uuid) 
) ;

DROP TABLE IF EXISTS Army;

CREATE TABLE Army (
  army_uuid UUID NOT NULL,
  size INT DEFAULT 1,
  position_X INT NOT NULL DEFAULT 1,
  position_Y INT NOT NULL DEFAULT 1,
  player_uuid UUID DEFAULT NULL,
  PRIMARY KEY (army_uuid),  
  CONSTRAINT fk_Army_1 FOREIGN KEY (player_uuid) REFERENCES Player (player_uuid) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

DROP INDEX IF EXISTS army_player_uuid_idx;
CREATE INDEX army_player_uuid_idx on Army (player_uuid);

DROP TABLE IF EXISTS Army_Movements;

CREATE TABLE Army_Movements (
  army_uuid UUID NOT NULL,
  new_position_X INT NOT NULL,
  new_position_Y INT NOT NULL,
  sequence_id INT DEFAULT 0,  
  CONSTRAINT fk_ArmyMovements_1 FOREIGN KEY (army_uuid) REFERENCES Army (army_uuid) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

DROP INDEX IF EXISTS fk_ArmyMovements_1_idx;
CREATE INDEX fk_ArmyMovements_1_idx on Army_Movements (army_uuid);

DROP TABLE IF EXISTS Strat_Map;
CREATE TABLE Strat_Map (
  map_uuid UUID NOT NULL,
  name varchar(45) NOT NULL UNIQUE,
  size_X INT NOT NULL,
  size_Y INT NOT NULL,
  altitude_json JSON NOT NULL,
  PRIMARY KEY (map_uuid)  
) ;

DROP TABLE IF EXISTS Game;
CREATE TABLE Game (
  game_uuid UUID NOT NULL,
  name varchar(45) NOT NULL UNIQUE,
  map_uuid UUID NOT NULL,
  PRIMARY KEY (game_uuid),  
  CONSTRAINT fk_Game_1 FOREIGN KEY (map_uuid) REFERENCES Strat_Map (map_uuid) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

DROP INDEX IF EXISTS fk_ArmyMovements_1_idx;
CREATE INDEX fk_ArmyMovements_1_idx on Game (map_uuid);
 

DROP TABLE IF EXISTS Players_Of_Game;
CREATE TABLE Players_Of_Game (
  game_uuid UUID NOT NULL,
  player_uuid UUID NOT NULL,
  player_alias varchar(45) DEFAULT NULL,
  CONSTRAINT fk_PlayersOfGame_1 FOREIGN KEY (game_uuid) REFERENCES Game (game_uuid) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_PlayersOfGame_2 FOREIGN KEY (player_uuid) REFERENCES Player (player_uuid) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

DROP INDEX IF ExISTS fk_PlayersOfGame_1_idx;
CREATE INDEX fk_PlayersOfGame_1_idx on Players_Of_Game (game_uuid);
DROP INDEX IF ExISTS fk_PlayersOfGame_2_idx;  
CREATE INDEX fk_PlayersOfGame_2_idx on Players_Of_Game (player_uuid);