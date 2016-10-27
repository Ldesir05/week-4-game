$(document).ready(function(){
function startGame(){
	function Char(hp,attack,base,counter){
		this.hp = hp;
		this.attack = attack;
		this.base = base;
		this.counter = counter;
	}
    function createChars(){
    	game.chars.push(new Char(150,10,10,15));
    	game.chars.push(new Char(80,40,40,35));
    	game.chars.push(new Char(250,10,10,15));
    	game.chars.push(new Char(200,20,20,10));
    }
	
var game = { chars: [],
 				attacker: undefined,
 				enemy: undefined,
 				player: undefined,
 				opp: undefined,
 				enemies: 3,
 				charHealth:undefined,
 				oppHealth:undefined,
 				enemiesDefeated: 0,
 				setEnemy: function(div) {
 						$('#enemy').append(div);
						this.oppHealth = $(div).find('.hp');
						this.opp = this.chars[$(div).data('index')];
						this.enemy = true;
						this.enemies--;
						$('#inst').html('<h2>Fight!</h2>');
						},
 				setPlayer: function(div) {
						$('#player').append(div);
						this.playerHealth = $(div).find('.hp');
						this.attacker = true;
						$('#inst').html('<h2>Choose your opponent</h2>');
						this.player = this.chars[$(div).data('index')];
						},
 				battle: function() {
 						if (this.enemy == true) {
							this.opp.hp = this.opp.hp - this.player.attack;
							this.player.hp = this.player.hp - this.opp.counter;
							$('#result').html('<h3>You hit your opponent for ' + this.player.attack + '</h3>' + '<h3>Your opponent hit you for ' + this.opp.counter + '</h3>');
							this.player.attack = this.player.attack + this.player.base;
							$(this.oppHealth).html(this.opp.hp);
							$(this.playerHealth).html(this.player.hp);

								if(this.opp.hp <= 0) {
									$('#enemy').empty();
									$('#inst').html('<h2>Choose your opponent</h2>');
									if(this.enemy == true){
										this.enemiesDefeated++;
									}
									this.enemy = false;
								}
								else if(this.player.hp <= 0) {
										$('.container').html('<h1>You Died</h1><br><button class="reset">Try Again</button');
										$('.reset').on('click', function() {
											location.reload();
										});
								}
						}
						else {
							alert("Please choose an Spartan");
						}
						if (this.enemies == 0 && this.enemiesDefeated == 3){
							$('.container').html('<h1 class="victory">VICTORY!!</h1><br><button class="reset">Replay</button');
							$('.reset').on('click', function() {
								location.reload();
							});
						};
 				},
};

$('.characters').on('click', function() {
	if (game.attacker == true) {
		game.setEnemy(this);
	}
	else {
		game.setPlayer(this);
	}
});
$('#attack').on('click', function() {
	game.battle();
});
createChars();
};
 startGame();
});