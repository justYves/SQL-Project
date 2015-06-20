var express = require("express");
var router = express.Router();

var fs =require("fs");
var file = "imdb-large.sqlite3.db";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db= new sqlite3.Database(file);


router.get("/",function(req,res,next){

			res.status(200).redirect("/movies");

})


router.post("/submit",function(req,res,next){
	var year = req.body.year; 
	var genre = req.body["genre-dropdown"];
	if(year && genre) res.redirect("/movies/genre/"+ genre +"/year/"+ year )
		if(year) res.redirect("/movies/year/" + year);
	if(genre) res.redirect("/movies/genre/"+ genre)
})

router.get("/movies",function(req,res,next){
	db.serialize(function(){
		db.all("select distinct genre from movies_genres ORDER BY genre ASC;",function(err,genres){
			res.status(200).render("index",{genres: genres});	
		})
	})
})

router.get("/movies/year/:year/",function(req,res,next){
	db.serialize(function(){
		var year = req.params.year; 
		db.all("SELECT Distinct name, year, id, rank ,genre from movies left join movies_genres on movies.id = movies_genres.movie_id WHERE year ="+year+" ORDER BY year ASC LIMIT 100",function(err,rows){
			db.serialize(function(){
				db.all("select distinct genre from movies_genres ORDER BY genre ASC;",function(err,genres){
					res.status(200).render("index",{movies: rows, showMovies: true, heading: year, genres: genres});	
				})
			})

		})
	})
})

router.get("/movies/genre/:genre",function(req,res,next){
	db.serialize(function(){
		var genre = req.params.genre; 
		db.all("SELECT Distinct name, year, id, rank ,genre from movies left join movies_genres on movies.id = movies_genres.movie_id WHERE genre LIKE '"+genre+"' LIMIT 100",function(err,rows){
			db.serialize(function(){
				db.all("select distinct genre from movies_genres ORDER BY genre ASC;",function(err,genres){
					res.status(200).render("index",{movies: rows, showMovies: true, heading: genre, genres: genres});	
				})
			})
		})
	})
})

router.get("/movies/genre/:genre/year/:year",function(req,res,next){
	db.serialize(function(){
		var year = req.params.year; 
		var genre = req.params.genre; 
		db.all("SELECT Distinct name, year, id, rank ,genre from movies left join movies_genres on movies.id = movies_genres.movie_id WHERE genre LIKE '"+genre+"' AND year ="+year+" LIMIT 100",function(err,rows){
			db.serialize(function(){
				db.all("select distinct genre from movies_genres ORDER BY genre ASC;",function(err,genres){
					res.status(200).render("index",{movies: rows, showMovies: true, genres: genres, heading: year + " " +genre});	
				})
			})

		})
	})
})


router.get("/movies/id/:id",function(req,res,next){
	db.serialize(function(){
		var id = req.params.id; 
		db.all("SELECT * from movies where movies.id ="+id+"",function(err,rows){
			res.status(200).render("movies",{movies: rows, showMovies: true, heading: rows.title});	
		})
	})
})

module.exports = router; 

