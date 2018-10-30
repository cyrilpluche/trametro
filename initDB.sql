------------------------------------------------------------
--        Script Postgre
------------------------------------------------------------

DROP TABLE IF EXISTS public.Trip CASCADE;
DROP TABLE IF EXISTS public.Traveler CASCADE;

------------------------------------------------------------
-- Table: Traveler
------------------------------------------------------------
CREATE TABLE public.Traveler(
	traveler_id     VARCHAR (500) NOT NULL ,
	traveler_name   VARCHAR (250)   ,
	trip_favorite   VARCHAR (250)   ,
	CONSTRAINT Traveler_PK PRIMARY KEY (traveler_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Trip
------------------------------------------------------------
CREATE TABLE public.Trip(
	trip_id            SERIAL NOT NULL ,
	station_code       VARCHAR (250)  ,
	station_name       VARCHAR (250)  ,
	ligne_code         VARCHAR (250)  ,
	direction_code     VARCHAR (250)  ,
	direction_name     VARCHAR (250)  ,
	is_trip_finished   BOOL  NOT NULL ,
	session_id         VARCHAR (250) NOT NULL ,
	traveler_id        VARCHAR (500) NOT NULL  ,
	trip_date_creation DATE NOT NULL,
	CONSTRAINT Trip_PK PRIMARY KEY (trip_id)

	,CONSTRAINT Trip_Traveler_FK FOREIGN KEY (traveler_id) REFERENCES public.Traveler(traveler_id)
)WITHOUT OIDS;



