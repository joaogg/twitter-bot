var Twit = require('twit');

require('dotenv').config();

/* Instancie o bot com as chaves no arquivo .env */
const Bot = new Twit({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
	timeout_ms: 60 * 1000,
});

// Objeto com frases do método de Tweet por TAGS
let phrases = [
	"❝ Todos aqueles que não conhecem a si mesmo, estão fadados a falhar. ❞ \n\nNaruto 🧐",
	"❝ Quando você ama, há o risco de odiar. ❞ \n\nNaruto 🧐",
	"❝ Eu nunca volto atrás na minha palavra... Esse é o meu jeito! ❞ \n\nNaruto 🧐",
	"❝ Sorrir é a melhor maneira de se lidar com situações difíceis. ❞ \n\nNaruto 🧐",
	"❝ Não importa o quão grande seja a dor, eu continuarei seguindo em frente. ❞ \n\nNaruto 🧐",
	"❝ Se o herói mudasse, se tornaria uma nova historia. ❞ \n\nNaruto 🧐",
	"❝ Feridas em seu coração são diferentes de feridas em seu corpo e existe apenas uma coisa que pode cura-la essa é, o amor. ❞ \n\nNaruto 🧐",

	" ❝ A vontade de Yahiko e Nagato não desapareceu deste mundo! Eu também acredito no Naruto! Ele se tornará a ponte que nos guiará até a paz! E eu serei o suporte que segurará a ponte! ❞ \n\nKonan 🧐",
	"❝ Desta vez ... espero que estas sejam as flores da esperança que nunca morrem. ❞ \n\nKonan 🧐",
	"❝ Ele é a luz em pessoa. É por isso que todos que ele encontra... Carregam a flor chamada esperança! ❞ \n\nKonan 🧐",
	"❝ Yahiko e Nagato... Eu serei o suporte que manterá as nossas pontes erguidas!	❞ \n\nKonan 🧐",
	"❝ Uma questão, Madara... Você sabe por que nós traímos você? Porque você é escuridão, e num mundo sem luz as flores só podem murchar e morrer! ❞ \n\nKonan 🧐",
	
	"❝ Aqueles que não entendem a dor verdadeira nunca podem entender a verdadeira paz. ❞ \n\nPain 🧐",
	"❝ Eu quero que vocês sintam a dor, pensem na dor, aceitem a dor, conheçam a dor. ❞ \n\nPain 🧐",
	"❝ Enquanto não conhecer a dor de uma pessoa, não saberá quem ela é. Ainda que a conheça, não poderá compreender! ❞ \n\nPain 🧐",
	"❝ Seus motivos para justificar a guerra não importam religião, filosofia, recursos, terras, vingança, amor, até um capricho, não importam o quão trivial seja o motivo qualquer um pode causar uma guerra, sempre existira a guerra, o motivo pode ser descoberto depois, o instinto humano busca conflito. ❞ \n\nPain 🧐",
	"❝ Aprendi a aceitar como abraçar o medo do sentimento que é contemplar e conhecer a verdadeira dor, porque quando eu não tinha nada e nem ninguém, eu sempre tive DOR. ❞ \n\nPain 🧐",

	"❝ Não precisa me perdoar...E não importa o que faça daqui pra frente, saiba que.. sempre vou te amar. ❞ \n\nItachi Uchiha 🧐",
	"❝ Se você quer me matar… Me odeie, me amaldiçoe, e fuja, fuja… Viva uma vida miserável correndo e se escondendo. Então, quando você tiver os mesmos olhos que eu, me procure. ❞ \n\nItachi Uchiha 🧐",
	"❝ Ser forte não é tudo isso. Ser forte significa que você se tornará arrogante e egoísta. Mesmo que você nunca tivesse desejado isso ❞ \n\nItachi Uchiha 🧐",
	"❝ Não importa o quão poderoso você se torne nunca tente fazer tudo sozinho, caso contrario ira falhar. ❞ \n\nItachi Uchiha 🧐",
	"❝ Você não tem que me perdoar... Não importa o que você decida fazer a partir de agora, eu sempre vou te amar. ❞ \n\nItachi Uchiha 🧐",
	"❝ Aqueles que não são capazes de aceitar quem realmente são, estão destinados a falhar. Assim como eu falhei no passado. ❞ \n\nItachi Uchiha 🧐",
	"❝ Todas as pessoas vivem confiando na sua sabedoria e no seu conhecimento, e ficam presos a eles. Eles chamam isso de 'realidade'. Entretando sabedoria e conhecimento são ambíguos, deste modo, a realidade não é nada além de uma 'ilusão'. Então não seria errado dizer que cada pessoa vive mediante suas próprias convicções. ❞ \n\nItachi Uchiha 🧐",
	"❝ Não importa que tipo de humano somos, é somente na hora da morte que descobrimos nossa verdadeira natureza, a verdadeira razão de nossa existência. ❞ \n\nItachi Uchiha 🧐",
	"❝ Para sobreviver nós agarramos a tudo aquilo que aceitamos como 'certo'. E criamos a nossa realidade.... Mas o 'certo' não passa de um mero conceito vago...E essa tal de realidade, pode ser apenas uma ilusão. Todos os humanos têm de viver com possíveis suposições. Mas isso não é apenas outra definição? ❞ \n\nItachi Uchiha 🧐",
	"❝ Nós não sabemos que tipo de pessoas realmente somos até um momento antes da	nossa morte. Assim que a morte vier abraçá-lo você perceberá o que você é. ❞ \n\nItachi Uchiha 🧐",
	"❝ É tolice temer o desconhecido. ❞ \n\nItachi Uchiha 🧐",
	"❝ As pessoas vivem apegas à aquilo que traduzem como certo e verdadeiro, assim elas definem a realidade. Mas o que significa correto e verdadeiro? Meramente conceitos vagos e subjetivos... A realidade deles pode muito bem ser uma miragem. Podemos considerar que todos simplesmente vivem em seu próprio mundo, amarrados cegamente por suas crenças, não acha? ❞ \n\nItachi Uchiha 🧐",
	"❝ Você e eu somos carne e osso, eu sempre vou estar lá para você, mesmo que seja apenas como um obstáculo para você superar. Mesmo que você me odeie, isso é o que irmãos mais velhos fazem. ❞ \n\nItachi Uchiha 🧐",
	"❝ A vida das pessoas não acaba quando elas morrem, mas sim quando perdem a fé. ❞ \n\nItachi Uchiha 🧐",

	"❝ Quem quebra as regras pode ser considerado lixo, mas quem abandona seus amigos é pior que lixo. ❞ \n\nKakashi Hatake 🧐",
	"❝ Há momentos em que palavras de compaixão só pioram as coisas. ❞ \n\nKakashi Hatake 🧐",
	"❝ Você não entedeu, você acha que entendeu, isso quer dizer que você não entendeu, entendeu? ❞ \n\nKakashi Hatake 🧐",
	"❝ Um ninja deve ver através da decepção. ❞ \n\nKakashi Hatake 🧐",
	"❝ Ser diferente nem sempre significa ser melhor! ❞ \n\nKakashi Hatake 🧐",
	"❝ Me desculpem o atraso, me perdi no caminho da vinda ❞ \n\nKakashi Hatake 🧐",
	"❝ O lugar onde as pessoas pensam em você é o lugar para onde você deve sempre retornar! ❞ \n\nKakashi Hatake 🧐",
	"❝ O Naruto pode ser um pouco duro as vezes, talvez você não saiba mas ele também cresceu sem pai e nunca teve nenhum amigo em nossa aldeia, na verdade ele nunca conheceu nenhum de seus pais, mas eu nunca vi ele chorar meu palpite... Ele se cansou de chorar ❞ \n\nKakashi Hatake 🧐",

];


// Bot para fazer um Retweet de um Tweet pela TAG
function BotRetweet() {
	var query = {
		q: "naruto",
		result_type: "recent"
	}

	Bot.get('search/tweets', query, BotGotLatestTweet);

	function BotGotLatestTweet(error, data, response) {
		if (error) {
			console.log('Bot não pôde achar o último tweet, : ' + error);
		}
		else {
			var id = {
				id: data.statuses[0].id_str
			}

			Bot.post('statuses/retweet/:id', id, BotRetweeted);

			function BotRetweeted(error, response) {
				if (error) {
					console.log('Bot não pode retweetar, : ' + error);
				}
				else {
					console.log('Bot retweetou : ' + id.id);
				}
			}
		}
	}
}

// BOT para enviar um Tweet
function BotTweet() {
	Bot.post('statuses/update', { status: "Primeiro Tweet do BOT!" }, function (error, tweet, response) {
		if (error) console.log("error", error);
		else
			console.log("Tweet enviado.");
	});
}


// BOT para responder Tweet's pela TAG
function BotTweetInTag() {
	var query = {
		q: "naruto",
		result_type: "recent"
	}

	let twitter_id = 0;

	Bot.get('search/tweets', query, BotGotLatestTweet);

	function BotGotLatestTweet(error, data, response) {
		if (error) {
			console.log('Bot não pôde achar o último tweet, : ' + error);
		}
		else {

			const random = Math.floor(Math.random() * phrases.length);

			data.statuses.forEach(element => {				
				if (element['retweeted_status'] === undefined && twitter_id === 0) {
					twitter_id++;
				}
			});

			if (twitter_id > 0) {
				Bot.post('statuses/update', {
					in_reply_to_status_id: data.statuses[twitter_id-1].id_str, status: '@' + data.statuses[twitter_id-1].user.screen_name + " " + phrases[random]
				}, function (error, tweet, response) {
					if (error)
						console.log("Tweet não foi enviado!" , error);
					else
						console.log("Tweet enviado!");
				});
			} else {
				console.log("Nenhum Tweet encontrado!")
			}

		}
	}
}


console.log('Iniciando o BOT ...');

// Tweeta de 5 em 5 minutos
setInterval(BotTweetInTag, 300000);

BotTweetInTag();
// BotRetweet();
// BotTweet();