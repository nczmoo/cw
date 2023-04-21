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

$(document).on('click', '.verb2', function(e){	
	console.log(e.target.id.split('-'))
	game[e.target.id.split('-')[0]](e.target.id.split('-')[1]);
})

$(document).on('click', 'button', function(e){
	ui.refresh()
})
