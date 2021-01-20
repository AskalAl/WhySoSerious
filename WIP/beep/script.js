const commands = String.raw`21e8@mesh-cdprojektred.com/:~ cd HAX
21e8@mesh-cdprojektred.com/HAX/:~ ls`;

const beep = String.raw`


  /$$$$$$  /$$      /$$ /$$$$$$$$  /$$$$$$  /$$   /$$ /$$$$$$$$ /$$$$$$$ 
 /$$__  $$| $$$    /$$$| $$_____/ /$$__  $$| $$  | $$| $$_____/| $$__  $$
| $$  \__/| $$$$  /$$$$| $$      | $$  \__/| $$  | $$| $$      | $$  \ $$
|  $$$$$$ | $$ $$/$$ $$| $$$$$   |  $$$$$$ | $$$$$$$$| $$$$$   | $$$$$$$/
 \____  $$| $$  $$$| $$| $$__/    \____  $$| $$__  $$| $$__/   | $$__  $$
 /$$  \ $$| $$\  $ | $$| $$       /$$  \ $$| $$  | $$| $$      | $$  \ $$
|  $$$$$$/| $$ \/  | $$| $$$$$$$$|  $$$$$$/| $$  | $$| $$$$$$$$| $$  | $$
 \______/ |__/     |__/|________/ \______/ |__/  |__/|________/|__/  |__/
                                                                                                                                                 
                                                                         
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #`;

const samurai = String.raw`

 (      *        (       )     (     
 )\ ) (  `       )\ ) ( /(     )\ )  
(()/( )\))(  (  (()/( )\())(  (()/(  
 /(_)|(_)()\ )\  /(_)|(_)\ )\  /(_)) 
(_)) (_()((_|(_)(_))  _((_|(_)(_))   
/ __||  \/  | __/ __|| || | __| _ \  
\__ \| |\/| | _|\__ \| __ | _||   /  
|___/|_|  |_|___|___/|_||_|___|_|_\  
                                     
`;

let blink = document.querySelector('.blink');
const code = document.querySelector('.code');

const RandomNumber = (min, max) => {
	return Math.floor(Math.random() * max) + min
};

const Delay = (time) => {
	return new Promise((resolve) => setTimeout(resolve, time))
};

const ResetTerminal = () => {
	code.innerHTML = '<span class="blink">█</span>';
	blink = document.querySelector('.blink');
};

const RenderString = characters => {
	blink.insertAdjacentHTML('beforeBegin', characters);
};

const TypeString = async characters => {
	for(const character of characters.split('')) {
		await Delay(RandomNumber(100, 200));
		RenderString(character);
	}
}

const DrawLines = async ( characters, min = 50, max = 500 ) => {
	for(const line of characters.split('\n')) {
		await Delay(RandomNumber(min, max));
		RenderString(`${line}\n`);
	}
}

const DrawCommands = async commands => {
	for( const line of commands.split('\n')){
		// Seperate the directory and the command
		const [currentDir, command] = line.split(':~ ');

		// Print the directory, type the command and finish with new line
		RenderString(`${currentDir}:~ `);
		await TypeString(command);
		RenderString('\n');
	}
}


// Start the code
(async()=> {
	await DrawCommands("/:~ ssh 21e8@mesh-cdprojektred.com -p 2021");
	await Delay(1000);
	RenderString("21e8@mesh-cdprojektred.com password:");
	await Delay(5000);
	RenderString("\n");
	await DrawCommands(commands);
	RenderString('\nbeep.js    21e8.js\n\n');
	await DrawCommands('21e8@mesh-cdprojektred.com/HAX:~ node beep.js');
	await DrawLines( beep );
	await TypeString("\n\nSeems you're not among us after all. Wanna play a game? Watch for the beeps.");
	await Delay(3000);
	ResetTerminal();
	await DrawCommands('21e8@mesh-cdprojektred.com:~ KEY=3db7ca618243da1ba3bc76ab14bcf07b node 21e8.js');
	await DrawLines(samurai);
})();
