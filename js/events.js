$(document).on('click', '', function(e){

})



$(document).on('click', '.emotion', function(e){	
	game.react(e.target.id);
});

$(document).on('click', '.topic', function(e){	
	game.talk(e.target.id);
});

$(document).on('click', '.verb', function(e){	
	game[e.target.id]();
})

$(document).on('click', 'button', function(e){
	ui.refresh()
})
