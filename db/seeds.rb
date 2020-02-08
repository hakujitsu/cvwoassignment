# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



tags = Tag.create([{name:"Important", color:"#DC9393"}])
tasks = Task.create([{name: "Do CVWO Task", done: false}, {name: "Play Celeste", done: true}, {name: "Sleep", done: false}])
tagtask = Task.create({name: "TagTask", done: false})
tagtask.tags << Tag.create({name:"tagtask", color:"#A8D8A5"})

# run rake db:migrate:reset  and rake db:seed to reseed 