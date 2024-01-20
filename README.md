# POWETP
Repositorio de examen de Programación orientada a la web


JavaScript (Svelte Script):
Importaciones:

Se importa onMount de Svelte para ejecutar la función fetchWord después de que el componente se monta.
Se importa io del cliente Socket.IO para establecer una conexión de socket con el servidor.
Variables de Estado:

word: Almacena la palabra que los jugadores deben adivinar.
hiddenWord: Representa la palabra oculta, inicialmente llena de guiones bajos (_).
guessedLetters: Almacena las letras que los jugadores han intentado adivinar.
incorrectAttempts: Contador de intentos incorrectos.
maxAttempts: Número máximo de intentos permitidos.
isGameOver: Indica si el juego ha terminado.
Conexión del Socket.IO:

Se crea una conexión de socket con el servidor Socket.IO en http://localhost:3000.
Eventos del Socket.IO:

startGame: Cuando el servidor emite este evento, se establece la palabra y se inicializa hiddenWord.
guessLetter: Cuando el servidor emite este evento, se procesa la letra adivinada y se actualiza el estado del juego.
Función fetchWord:

Realiza una solicitud a una API (simulada por https://api.example.com/word) para obtener una palabra y la emite al servidor para iniciar el juego.
Función handleLetterGuess:

Emite al servidor la letra que el jugador ha intentado adivinar.
Función checkGameStatus:

Verifica si el jugador ha adivinado todas las letras (hiddenWord.join('') === word) o si ha alcanzado el número máximo de intentos incorrectos. En ese caso, muestra un mensaje de victoria o derrota.
onMount(fetchWord):

Llama a la función fetchWord cuando el componente se monta para iniciar el juego.
CSS (Estilos Svelte):
Estilos Globales:

Se aplican estilos generales al contenedor (div) del juego para mejorar la apariencia y la disposición.
Estilos para Elementos Específicos:

Estilos específicos para h1, p y button para mejorar la legibilidad y la presentación.
Estilos para Botones:

Los botones tienen colores de fondo y texto específicos, junto con una transición suave al pasar el ratón.
Estilos para el Fin del Juego:

Se aplica un estilo específico a un párrafo cuando el juego ha terminado, ya sea por victoria o derrota.
HTML (Estructura Svelte):
Contenedor Principal (<div>):

Contiene todos los elementos del juego.
Elementos de Texto (<h1>, <p>):

Muestran información sobre el estado del juego, incluyendo intentos incorrectos, letras adivinadas y la palabra oculta.
Área de Juego ({hiddenWord.join(' ')}):

Muestra la palabra oculta con guiones bajos y letras reveladas según las adivinanzas exitosas.
Botones para Adivinar Letras:

Botones para cada letra del alfabeto. Los jugadores pueden hacer clic en estas letras para adivinar.
Mensajes de Fin de Juego (<p class="game-over">):

Muestra un mensaje de victoria o derrota cuando el juego ha terminado.
Este código implementa un juego simple de "El Ahorcado" en tiempo real utilizando Svelte y Socket.IO. Los jugadores intentan adivinar una palabra oculta haciendo clic en letras, y el juego se gestiona mediante eventos de Socket.IO.
