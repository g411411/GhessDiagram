export type Language = 'en' | 'ru' | 'es' | 'uk' | 'vi';
export const LANGUAGE_STORAGE_KEY = 'chess-diagrams.language';
export function readLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved === 'ru' || saved === 'es' || saved === 'uk' || saved === 'vi' ? saved : 'en';
  } catch {
    return 'en';
  }
}
const entries: Record<string, readonly [string, string]> = {
  'Chess Diagrams — home': ['Chess Diagrams — главная', 'Chess Diagrams — inicio'],
  'Chess Diagrams — chess in focus': [
    'Chess Diagrams — шахматы крупным планом',
    'Chess Diagrams — ajedrez en detalle',
  ],
  'TOOLS FOR CHESS COACHES': [
    'ИНСТРУМЕНТЫ ДЛЯ ШАХМАТНЫХ ТРЕНЕРОВ',
    'HERRAMIENTAS PARA ENTRENADORES DE AJEDREZ',
  ],
  'Ready for your next lesson': [
    'Всё готово к следующему уроку',
    'Todo listo para tu próxima clase',
  ],
  'Lesson materials and help': ['Материалы урока и справка', 'Materiales de clase y ayuda'],
  'PDF Library': ['Библиотека PDF', 'Biblioteca PDF'],
  'Video Library': ['Видеоуроки', 'Videoteca'],
  'Open local file': ['Открыть свой файл', 'Abrir archivo local'],
  Help: ['Помощь', 'Ayuda'],
  Settings: ['Настройки', 'Ajustes'],
  'CHOOSE MATERIAL FOR YOUR CLASS': ['ВЫБЕРИТЕ МАТЕРИАЛ ДЛЯ УРОКА', 'ELIGE MATERIAL PARA TU CLASE'],
  'Choose a worksheet and click Open PDF. Then click a detected board to present it to your students.':
    [
      'Выберите материал и нажмите «Открыть PDF». Затем нажмите на найденную доску, чтобы показать её ученикам.',
      'Elige una hoja y pulsa Abrir PDF. Después, haz clic en un tablero detectado para mostrárselo a tus alumnos.',
    ],
  'Search the library': ['Поиск в библиотеке', 'Buscar en la biblioteca'],
  'Search books and worksheets': ['Поиск книг и заданий', 'Buscar libros y hojas de ejercicios'],
  'Loading…': ['Загрузка…', 'Cargando…'],
  Loading: ['Загрузка', 'Cargando'],
  Cancel: ['Отмена', 'Cancelar'],
  'Open PDF': ['Открыть PDF', 'Abrir PDF'],
  Open: ['Открыть', 'Abrir'],
  'No matching PDFs. Try another search.': [
    'PDF не найдены. Измените поисковый запрос.',
    'No se encontraron PDF. Prueba otra búsqueda.',
  ],
  'Library PDFs are downloaded from this website when selected. An internet connection is required.':
    [
      'Выбранный PDF загружается с этого сайта. Необходимо подключение к интернету.',
      'Los PDF seleccionados se descargan de este sitio. Se necesita conexión a Internet.',
    ],
  'BRING A VIDEO INTO YOUR LESSON': ['ДОБАВЬТЕ ВИДЕО В СВОЙ УРОК', 'INCORPORA UN VÍDEO A TU CLASE'],
  'Choose a lesson and click Watch on YouTube. Return to this tab to continue working with diagrams.':
    [
      'Выберите урок и нажмите «Смотреть на YouTube». Вернитесь в эту вкладку, чтобы продолжить работу с диаграммами.',
      'Elige una lección y pulsa Ver en YouTube. Vuelve a esta pestaña para seguir trabajando con los diagramas.',
    ],
  'YouTube lesson': ['Урок на YouTube', 'Lección de YouTube'],
  'Watch on YouTube ↗': ['Смотреть на YouTube ↗', 'Ver en YouTube ↗'],
  Watch: ['Смотреть', 'Ver'],
  'on YouTube (opens in a new tab)': [
    'на YouTube (откроется в новой вкладке)',
    'en YouTube (se abre en una pestaña nueva)',
  ],
  'YouTube is an external website. An internet connection is required.': [
    'YouTube — внешний сайт. Необходимо подключение к интернету.',
    'YouTube es un sitio externo. Se necesita conexión a Internet.',
  ],
  'Help for coaches': ['Справка для тренеров', 'Ayuda para entrenadores'],
  'Choose a tab above to prepare and present your lesson.': [
    'Выберите вкладку сверху, чтобы подготовить и провести урок.',
    'Elige una pestaña de arriba para preparar e impartir tu clase.',
  ],
  'Choose material:': ['Выбор материала:', 'Elige el material:'],
  "PDF Library opens the website's worksheets. Open local file lets you use a PDF or image from your device.":
    [
      'В «Библиотеке PDF» находятся материалы сайта. Вкладка «Открыть свой файл» позволяет выбрать PDF или изображение с вашего устройства.',
      'Biblioteca PDF contiene las hojas del sitio. Abrir archivo local permite usar un PDF o una imagen de tu dispositivo.',
    ],
  'Present a position:': ['Показ позиции:', 'Presenta una posición:'],
  'click a highlighted board to enlarge it. Use Full screen when presenting to the class.': [
    'нажмите на выделенную доску, чтобы увеличить её. Для показа классу используйте полноэкранный режим.',
    'haz clic en un tablero resaltado para ampliarlo. Usa Pantalla completa para presentarlo a la clase.',
  ],
  'Move through the lesson:': ['Навигация по уроку:', 'Avanza en la clase:'],
  'use ← and → for pages in page view, or diagrams in the enlarged view. Press Esc to return to the page.':
    [
      'клавиши ← и → переключают страницы в общем режиме и диаграммы в увеличенном. Нажмите Esc, чтобы вернуться к странице.',
      'usa ← y → para cambiar de página en la vista de página o de diagrama en la vista ampliada. Pulsa Esc para volver a la página.',
    ],
  'Play a video:': ['Видеоурок:', 'Reproduce un vídeo:'],
  'choose Video Library, then Watch on YouTube. The video opens in another tab; return here to continue your lesson.':
    [
      'откройте «Видеоуроки» и нажмите «Смотреть на YouTube». Видео откроется в другой вкладке; вернитесь сюда, чтобы продолжить урок.',
      'elige Videoteca y luego Ver en YouTube. El vídeo se abre en otra pestaña; vuelve aquí para continuar tu clase.',
    ],
  'Dismiss message': ['Закрыть сообщение', 'Cerrar mensaje'],
  'A QUICK START FOR COACHES': ['БЫСТРЫЙ СТАРТ ДЛЯ ТРЕНЕРОВ', 'GUÍA RÁPIDA PARA ENTRENADORES'],
  'Your next chess lesson.': ['Ваш следующий урок шахмат.', 'Tu próxima clase de ajedrez.'],
  'Ready to teach.': ['Всё готово к занятию.', 'Todo listo para enseñar.'],
  'Choose a worksheet, present a position, or play a video lesson.': [
    'Выберите задание, покажите позицию или включите видеоурок.',
    'Elige una hoja de ejercicios, presenta una posición o reproduce una lección en vídeo.',
  ],
  'Use PDF Library and Video Library, or open your own PDF or image.': [
    'Используйте «Библиотеку PDF» и «Видеоуроки» или откройте свой PDF или изображение.',
    'Usa Biblioteca PDF y Videoteca, o abre tu propio PDF o imagen.',
  ],
  'Choose your material.': ['Выберите материал.', 'Elige tu material.'],
  'Open a worksheet from PDF Library, or use Open local file.': [
    'Выберите задание в «Библиотеке PDF» или воспользуйтесь вкладкой «Открыть свой файл».',
    'Abre una hoja de Biblioteca PDF o usa Abrir archivo local.',
  ],
  'Present a position.': ['Покажите позицию.', 'Presenta una posición.'],
  'Wait for the boards to be found, then click one to enlarge it for your students.': [
    'Дождитесь обнаружения досок и нажмите на нужную, чтобы увеличить её для учеников.',
    'Espera a que se detecten los tableros y haz clic en uno para ampliarlo para tus alumnos.',
  ],
  'Teach at your pace.': ['Ведите урок в своём темпе.', 'Enseña a tu ritmo.'],
  'Use the arrows for the next diagram, or choose a lesson from Video Library.': [
    'Переключайте диаграммы стрелками или выберите урок во вкладке «Видеоуроки».',
    'Usa las flechas para pasar al siguiente diagrama o elige una lección en Videoteca.',
  ],
  'Use your own teaching material': [
    'Откройте свои учебные материалы',
    'Usa tu propio material didáctico',
  ],
  'Drop a PDF or image here, or click to choose one': [
    'Перетащите сюда PDF или изображение либо нажмите для выбора файла',
    'Arrastra aquí un PDF o una imagen, o haz clic para elegir un archivo',
  ],
  'up to 100 MB': ['до 100 МБ', 'hasta 100 MB'],
  'Choose another local file': ['Выбрать другой файл', 'Elegir otro archivo local'],
  'Website library': ['Библиотека сайта', 'Biblioteca del sitio'],
  'Local document': ['Файл с устройства', 'Documento local'],
  'Page navigation': ['Навигация по страницам', 'Navegación de páginas'],
  'Previous page': ['Предыдущая страница', 'Página anterior'],
  '← Previous page': ['← Предыдущая страница', '← Página anterior'],
  Page: ['Страница', 'Página'],
  'Page number': ['Номер страницы', 'Número de página'],
  of: ['из', 'de'],
  'Next page': ['Следующая страница', 'Página siguiente'],
  'Next page →': ['Следующая страница →', 'Página siguiente →'],
  'Finding chessboards…': ['Ищем шахматные доски…', 'Buscando tableros…'],
  'Change page zoom': ['Изменить масштаб страницы', 'Cambiar el zoom de la página'],
  'Fit page': ['Вписать страницу', 'Ajustar página'],
  'Highlight boards': ['Выделить доски', 'Resaltar tableros'],
  'Rotate page 90 degrees': ['Повернуть страницу на 90 градусов', 'Girar página 90 grados'],
  '↻ Rotate': ['↻ Повернуть', '↻ Girar'],
  'No boards found on this page. Try another page or file.': [
    'Доски на этой странице не найдены. Попробуйте другую страницу или файл.',
    'No se encontraron tableros en esta página. Prueba otra página o archivo.',
  ],
  'Click to enlarge diagram': [
    'Нажмите, чтобы увеличить диаграмму',
    'Haz clic para ampliar el diagrama',
  ],
  'Current document page': ['Текущая страница документа', 'Página actual del documento'],
  'Enlarge diagram': ['Увеличить диаграмму', 'Ampliar diagrama'],
  'Preparing page…': ['Готовим страницу…', 'Preparando página…'],
  'Switch pages': ['Переключение страниц', 'Cambiar de página'],
  Brightness: ['Яркость', 'Brillo'],
  Contrast: ['Контраст', 'Contraste'],
  Reset: ['Сбросить', 'Restablecer'],
  'Opening document…': ['Открываем документ…', 'Abriendo documento…'],
  'Worksheets, positions and video lessons for chess coaches.': [
    'Задания, позиции и видеоуроки для шахматных тренеров.',
    'Ejercicios, posiciones y vídeos para entrenadores de ajedrez.',
  ],
  'Drop the file to open it': ['Отпустите файл, чтобы открыть', 'Suelta el archivo para abrirlo'],
  '← Back to page': ['← К странице', '← Volver a la página'],
  'Back to page': ['К странице', 'Volver a la página'],
  Diagram: ['Диаграмма', 'Diagrama'],
  'Zoom out': ['Уменьшить', 'Alejar'],
  'Fit diagram': ['Вписать диаграмму', 'Ajustar diagrama'],
  'Zoom in': ['Увеличить', 'Acercar'],
  'Toggle full screen': ['Переключить полный экран', 'Alternar pantalla completa'],
  '⛶ Full screen': ['⛶ Полный экран', '⛶ Pantalla completa'],
  'Chess diagram': ['Шахматная диаграмма', 'Diagrama de ajedrez'],
  'Enlarging diagram…': ['Увеличиваем диаграмму…', 'Ampliando diagrama…'],
  '← Previous diagram': ['← Предыдущая диаграмма', '← Diagrama anterior'],
  '· ← → diagrams · Esc to return': [
    '· ← → диаграммы · Esc — назад',
    '· ← → diagramas · Esc para volver',
  ],
  'Next diagram →': ['Следующая диаграмма →', 'Diagrama siguiente →'],
  'PDF password': ['Пароль PDF', 'Contraseña del PDF'],
  'Document password': ['Пароль документа', 'Contraseña del documento'],
  'Diagrams on this page:': ['Диаграмм на странице:', 'Diagramas en esta página:'],
  'No diagrams found': ['Диаграммы не найдены', 'No se encontraron diagramas'],
  'Could not load this library PDF. Check your connection and try again.': [
    'Не удалось загрузить PDF из библиотеки. Проверьте соединение и попробуйте ещё раз.',
    'No se pudo cargar el PDF de la biblioteca. Comprueba tu conexión e inténtalo de nuevo.',
  ],
  'Choose a PDF, PNG, JPEG or WebP file.': [
    'Выберите PDF, PNG, JPEG или WebP.',
    'Elige un archivo PDF, PNG, JPEG o WebP.',
  ],
  'Maximum file size is 100 MB.': [
    'Максимальный размер файла — 100 МБ.',
    'El tamaño máximo del archivo es 100 MB.',
  ],
  'Incorrect password. Please try again.': [
    'Неверный пароль. Попробуйте ещё раз.',
    'Contraseña incorrecta. Inténtalo de nuevo.',
  ],
  'This PDF is password protected.': [
    'Этот PDF защищён паролем.',
    'Este PDF está protegido con contraseña.',
  ],
  'This PDF has more than 500 pages. Open a smaller document.': [
    'В PDF больше 500 страниц. Откройте документ меньшего размера.',
    'Este PDF tiene más de 500 páginas. Abre un documento más pequeño.',
  ],
  'This image exceeds 40 megapixels. Please resize it.': [
    'Изображение больше 40 мегапикселей. Уменьшите его размер.',
    'Esta imagen supera los 40 megapíxeles. Reduce su tamaño.',
  ],
  'Could not open the file. Check that it is a valid, supported document.': [
    'Не удалось открыть файл. Проверьте его формат и целостность.',
    'No se pudo abrir el archivo. Comprueba que sea un documento válido y compatible.',
  ],
  'Opening PDF cancelled.': ['Открытие PDF отменено.', 'Se canceló la apertura del PDF.'],
  'Could not display this page. Try another page or file.': [
    'Не удалось отобразить страницу. Попробуйте другую страницу или файл.',
    'No se pudo mostrar esta página. Prueba otra página o archivo.',
  ],
  'Board detection failed. Try another page or reopen the file.': [
    'Не удалось найти доски. Попробуйте другую страницу или откройте файл заново.',
    'Falló la detección de tableros. Prueba otra página o vuelve a abrir el archivo.',
  ],
  'Board detection timed out. Please try another file.': [
    'Поиск занял слишком много времени. Попробуйте другой файл.',
    'La detección tardó demasiado. Prueba otro archivo.',
  ],
  'Your browser could not start board detection.': [
    'Браузер не смог запустить поиск досок.',
    'Tu navegador no pudo iniciar la detección de tableros.',
  ],
  'Could not complete board detection. Try another page.': [
    'Не удалось завершить поиск досок. Попробуйте другую страницу.',
    'No se pudo completar la detección. Prueba otra página.',
  ],
  'Could not enlarge this diagram. Please try opening it again.': [
    'Не удалось увеличить диаграмму. Попробуйте открыть её ещё раз.',
    'No se pudo ampliar el diagrama. Intenta abrirlo de nuevo.',
  ],
  'Full screen is unavailable in this browser.': [
    'Полный экран недоступен в этом браузере.',
    'La pantalla completa no está disponible en este navegador.',
  ],
  'Interface language': ['Язык интерфейса', 'Idioma de la interfaz'],
  'Choose a language, then select Save. The Settings tab always stays in English.': [
    'Выберите язык и нажмите «Сохранить». Название вкладки Settings всегда остаётся на английском.',
    'Elige un idioma y pulsa Guardar. El nombre de la pestaña Settings siempre permanece en inglés.',
  ],
  Save: ['Сохранить', 'Guardar'],
  'Language saved.': ['Язык сохранён.', 'Idioma guardado.'],
  'Language changed for this visit. Your browser could not save the preference.': [
    'Язык изменён для текущего посещения. Браузер не позволил сохранить выбор.',
    'El idioma se cambió para esta visita. Tu navegador no pudo guardar la preferencia.',
  ],
  'Chess Test Ben-Igor Book — Part Three': [
    'Шахматный тест Бен-Игорь — часть третья',
    'Prueba de ajedrez Ben-Igor — tercera parte',
  ],
  'Find the Best Move 1': ['Найди лучший ход 1', 'Encuentra la mejor jugada 1'],
  'Find the Best Move 3': ['Найди лучший ход 3', 'Encuentra la mejor jugada 3'],
  'Find the Best Move 4': ['Найди лучший ход 4', 'Encuentra la mejor jugada 4'],
  'Mate in One — Worksheet 1': ['Мат в один ход — задание 1', 'Mate en una — ejercicio 1'],
  'Mate in One — Worksheet 1 Answers': ['Мат в один ход — ответы 1', 'Mate en una — respuestas 1'],
  'Mate in One — Worksheet 2': ['Мат в один ход — задание 2', 'Mate en una — ejercicio 2'],
  'Mate in One — Worksheet 2 Answers': ['Мат в один ход — ответы 2', 'Mate en una — respuestas 2'],
  'Mate in One — Worksheet 3': ['Мат в один ход — задание 3', 'Mate en una — ejercicio 3'],
  'Mate in One — Worksheet 3 Answers': ['Мат в один ход — ответы 3', 'Mate en una — respuestas 3'],
  'Pawn Moves 1': ['Ходы пешек 1', 'Jugadas de peones 1'],
  Hopkins: ['Хопкинс', 'Hopkins'],
  'Learn How to Play Chess for Beginners in Less Than 8 Minutes': [
    'Как играть в шахматы: для начинающих за 8 минут',
    'Aprende a jugar al ajedrez en menos de 8 minutos',
  ],
  'Checkmate in 3 MOVES! | Chess Strategy | ChessKid': [
    'Мат в 3 хода! | Шахматная стратегия | ChessKid',
    '¡Jaque mate en 3 jugadas! | Estrategia | ChessKid',
  ],
  'How to win Chess in 2 moves!': [
    'Как выиграть в шахматы за 2 хода!',
    '¡Cómo ganar al ajedrez en 2 jugadas!',
  ],
  'How Do I Castle in Chess? | Castling | ChessKid': [
    'Как делать рокировку? | Рокировка | ChessKid',
    '¿Cómo se hace el enroque? | Enroque | ChessKid',
  ],
  'King & Queen Checkmate | ChessKid': [
    'Мат королём и ферзём | ChessKid',
    'Mate con rey y dama | ChessKid',
  ],
  MB: ['МБ', 'MB'],
};
Object.assign(entries, {
  'Filter by color': ['Фильтр по цвету', 'Filtrar por color'],
  'All videos': ['Все видео', 'Todos los vídeos'],
  Green: ['Зелёный', 'Verde'],
  Red: ['Красный', 'Rojo'],
  Blue: ['Синий', 'Azul'],
  Black: ['Чёрный', 'Negro'],
  'Checkmate | Chess Terms | ChessKid': [
    'Мат | Шахматные термины | ChessKid',
    'Jaque mate | Términos de ajedrez | ChessKid',
  ],
  'Top 3 Best Chess Openings for Beginners | ChessKid': [
    'Три лучших дебюта для начинающих | ChessKid',
    'Las 3 mejores aperturas para principiantes | ChessKid',
  ],
  'The Basic Tactics Of Chess For Kids!': [
    'Основные шахматные тактики для детей!',
    '¡Tácticas básicas de ajedrez para niños!',
  ],
  'How to Defend Against Quick Mates & Traps': [
    'Как защититься от быстрых матов и ловушек',
    'Cómo defenderse de mates rápidos y trampas',
  ],
  'How to Play Chess: Chess Rules for Beginners | ChessKid': [
    'Как играть в шахматы: правила для начинающих | ChessKid',
    'Cómo jugar al ajedrez: reglas para principiantes | ChessKid',
  ],
  'Lichess Tutorial for Beginners': [
    'Lichess: руководство для начинающих',
    'Guía de Lichess para principiantes',
  ],
  'How to Checkmate with a King and Rook': ['Мат королём и ладьёй', 'Mate con rey y torre'],
  'How to Checkmate with Two Bishops': ['Мат двумя слонами', 'Mate con dos alfiles'],
  'Knight and Bishop Checkmate': ['Мат конём и слоном', 'Mate con caballo y alfil'],
  'Top 10 Fastest Checkmates in History!': [
    '10 самых быстрых матов в истории!',
    '¡Los 10 mates más rápidos de la historia!',
  ],
  'King and Queen Checkmate — Lichess': [
    'Мат королём и ферзём — Lichess',
    'Mate con rey y dama — Lichess',
  ],
  'Pawn Moves — Lichess': ['Ходы пешек — Lichess', 'Movimientos de peones — Lichess'],
  'How to Play Chess — Lichess': [
    'Как играть в шахматы — Lichess',
    'Cómo jugar al ajedrez — Lichess',
  ],
  'Visualization Lessons — Lichess': [
    'Уроки визуализации — Lichess',
    'Lecciones de visualización — Lichess',
  ],
  '7 Most Common Chess Mistakes': [
    '7 самых частых шахматных ошибок',
    'Los 7 errores más comunes de ajedrez',
  ],
  'Choose a lesson and click Watch. Return to this tab to continue working with diagrams.': [
    'Выберите урок и нажмите «Смотреть». Вернитесь в эту вкладку, чтобы продолжить работу с диаграммами.',
    'Elige una lección y pulsa Ver. Vuelve a esta pestaña para seguir con los diagramas.',
  ],
  'Video lesson': ['Видеоурок', 'Lección en vídeo'],
  'Watch ↗': ['Смотреть ↗', 'Ver ↗'],
  '(opens in a new tab)': ['(откроется в новой вкладке)', '(se abre en una pestaña nueva)'],
  'Videos open on YouTube or Lichess. An internet connection is required.': [
    'Видео открываются на YouTube или Lichess. Необходимо подключение к интернету.',
    'Los vídeos se abren en YouTube o Lichess. Se necesita conexión a Internet.',
  ],
  'choose Video Library, then Watch. The lesson opens in another tab; return here to continue your lesson.':
    [
      'Выберите «Видеоуроки», затем «Смотреть». Материал откроется в другой вкладке; вернитесь сюда, чтобы продолжить урок.',
      'Elige Videoteca y luego Ver. El material se abre en otra pestaña; vuelve aquí para continuar la clase.',
    ],
});
export const translations: Record<Language, Record<string, string>> = {
  uk: {
    'Filter by color': 'Фільтр за кольором',
    'All videos': 'Усі відео',
    Green: 'Зелений',
    Red: 'Червоний',
    Blue: 'Синій',
    Black: 'Чорний',
    'Checkmate | Chess Terms | ChessKid': 'Мат | Шахові терміни | ChessKid',
    'Top 3 Best Chess Openings for Beginners | ChessKid':
      'Три найкращі дебюти для початківців | ChessKid',
    'The Basic Tactics Of Chess For Kids!': 'Основні шахові тактики для дітей!',
    'How to Defend Against Quick Mates & Traps': 'Як захищатися від швидких матів і пасток',
    'How to Play Chess: Chess Rules for Beginners | ChessKid':
      'Як грати в шахи: правила для початківців | ChessKid',
    'Lichess Tutorial for Beginners': 'Lichess: посібник для початківців',
    'Chess Diagrams — home': 'Chess Diagrams — головна',
    'Chess Diagrams — chess in focus': 'Chess Diagrams — шахи крупним планом',
    'TOOLS FOR CHESS COACHES': 'ІНСТРУМЕНТИ ДЛЯ ШАХОВИХ ТРЕНЕРІВ',
    'Ready for your next lesson': 'Усе готово до наступного уроку',
    'Lesson materials and help': 'Матеріали уроку та довідка',
    'PDF Library': 'Бібліотека PDF',
    'Video Library': 'Відеоуроки',
    'Open local file': 'Відкрити свій файл',
    Help: 'Допомога',
    Settings: 'Налаштування',
    'CHOOSE MATERIAL FOR YOUR CLASS': 'ВИБЕРІТЬ МАТЕРІАЛ ДЛЯ УРОКУ',
    'Choose a worksheet and click Open PDF. Then click a detected board to present it to your students.':
      'Виберіть завдання й натисніть «Відкрити PDF». Потім натисніть на знайдену дошку, щоб показати її учням.',
    'Search the library': 'Пошук у бібліотеці',
    'Search books and worksheets': 'Пошук книг і завдань',
    'Loading…': 'Завантаження…',
    Loading: 'Завантаження',
    Cancel: 'Скасувати',
    'Open PDF': 'Відкрити PDF',
    Open: 'Відкрити',
    'No matching PDFs. Try another search.': 'PDF не знайдено. Спробуйте інший запит.',
    'Library PDFs are downloaded from this website when selected. An internet connection is required.':
      'Вибраний PDF завантажується з цього сайту. Потрібне підключення до інтернету.',
    'BRING A VIDEO INTO YOUR LESSON': 'ДОДАЙТЕ ВІДЕО ДО СВОГО УРОКУ',
    'Choose a lesson and click Watch on YouTube. Return to this tab to continue working with diagrams.':
      'Виберіть урок і натисніть «Дивитися на YouTube». Поверніться до цієї вкладки, щоб продовжити роботу з діаграмами.',
    'YouTube lesson': 'Урок на YouTube',
    'Watch on YouTube ↗': 'Дивитися на YouTube ↗',
    Watch: 'Дивитися',
    'on YouTube (opens in a new tab)': 'на YouTube (відкриється в новій вкладці)',
    'YouTube is an external website. An internet connection is required.':
      'YouTube — зовнішній сайт. Потрібне підключення до інтернету.',
    'Help for coaches': 'Довідка для тренерів',
    'Choose a tab above to prepare and present your lesson.':
      'Виберіть вкладку вгорі, щоб підготувати та провести урок.',
    'Choose material:': 'Вибір матеріалу:',
    "PDF Library opens the website's worksheets. Open local file lets you use a PDF or image from your device.":
      'У «Бібліотеці PDF» є матеріали сайту. Вкладка «Відкрити свій файл» дозволяє вибрати PDF або зображення з вашого пристрою.',
    'Present a position:': 'Показ позиції:',
    'click a highlighted board to enlarge it. Use Full screen when presenting to the class.':
      'натисніть на виділену дошку, щоб збільшити її. Для показу класу використовуйте повноекранний режим.',
    'Move through the lesson:': 'Навігація уроком:',
    'use ← and → for pages in page view, or diagrams in the enlarged view. Press Esc to return to the page.':
      'клавіші ← і → перемикають сторінки у загальному режимі та діаграми у збільшеному. Натисніть Esc, щоб повернутися до сторінки.',
    'Play a video:': 'Відеоурок:',
    'choose Video Library, then Watch on YouTube. The video opens in another tab; return here to continue your lesson.':
      'виберіть «Відеоуроки», потім «Дивитися на YouTube». Відео відкриється в іншій вкладці; поверніться сюди, щоб продовжити урок.',
    'Dismiss message': 'Закрити повідомлення',
    'A QUICK START FOR COACHES': 'ШВИДКИЙ СТАРТ ДЛЯ ТРЕНЕРІВ',
    'Your next chess lesson.': 'Ваш наступний урок шахів.',
    'Ready to teach.': 'Усе готово до заняття.',
    'Choose a worksheet, present a position, or play a video lesson.':
      'Виберіть завдання, покажіть позицію або ввімкніть відеоурок.',
    'Use PDF Library and Video Library, or open your own PDF or image.':
      'Використовуйте «Бібліотеку PDF» та «Відеоуроки» або відкрийте свій PDF чи зображення.',
    'Choose your material.': 'Виберіть матеріал.',
    'Open a worksheet from PDF Library, or use Open local file.':
      'Відкрийте завдання з «Бібліотеки PDF» або скористайтеся вкладкою «Відкрити свій файл».',
    'Present a position.': 'Покажіть позицію.',
    'Wait for the boards to be found, then click one to enlarge it for your students.':
      'Дочекайтеся виявлення дощок і натисніть на потрібну, щоб збільшити її для учнів.',
    'Teach at your pace.': 'Проводьте урок у своєму темпі.',
    'Use the arrows for the next diagram, or choose a lesson from Video Library.':
      'Перемикайте діаграми стрілками або виберіть урок у вкладці «Відеоуроки».',
    'Use your own teaching material': 'Відкрийте свої навчальні матеріали',
    'Drop a PDF or image here, or click to choose one':
      'Перетягніть сюди PDF чи зображення або натисніть для вибору файлу',
    'up to 100 MB': 'до 100 МБ',
    'Choose another local file': 'Вибрати інший файл',
    'Website library': 'Бібліотека сайту',
    'Local document': 'Файл із пристрою',
    'Page navigation': 'Навігація сторінками',
    'Previous page': 'Попередня сторінка',
    '← Previous page': '← Попередня сторінка',
    Page: 'Сторінка',
    'Page number': 'Номер сторінки',
    of: 'із',
    'Next page': 'Наступна сторінка',
    'Next page →': 'Наступна сторінка →',
    'Finding chessboards…': 'Шукаємо шахові дошки…',
    'Change page zoom': 'Змінити масштаб сторінки',
    'Fit page': 'Вмістити сторінку',
    'Highlight boards': 'Виділити дошки',
    'Rotate page 90 degrees': 'Повернути сторінку на 90 градусів',
    '↻ Rotate': '↻ Повернути',
    'No boards found on this page. Try another page or file.':
      'Дошок на цій сторінці не знайдено. Спробуйте іншу сторінку або файл.',
    'Click to enlarge diagram': 'Натисніть, щоб збільшити діаграму',
    'Current document page': 'Поточна сторінка документа',
    'Enlarge diagram': 'Збільшити діаграму',
    'Preparing page…': 'Готуємо сторінку…',
    'Switch pages': 'Перемикання сторінок',
    Brightness: 'Яскравість',
    Contrast: 'Контраст',
    Reset: 'Скинути',
    'Opening document…': 'Відкриваємо документ…',
    'Worksheets, positions and video lessons for chess coaches.':
      'Завдання, позиції та відеоуроки для шахових тренерів.',
    'Drop the file to open it': 'Відпустіть файл, щоб відкрити',
    '← Back to page': '← До сторінки',
    'Back to page': 'До сторінки',
    Diagram: 'Діаграма',
    'Zoom out': 'Зменшити',
    'Fit diagram': 'Вмістити діаграму',
    'Zoom in': 'Збільшити',
    'Toggle full screen': 'Перемкнути повноекранний режим',
    '⛶ Full screen': '⛶ Повний екран',
    'Chess diagram': 'Шахова діаграма',
    'Enlarging diagram…': 'Збільшуємо діаграму…',
    '← Previous diagram': '← Попередня діаграма',
    '· ← → diagrams · Esc to return': '· ← → діаграми · Esc — назад',
    'Next diagram →': 'Наступна діаграма →',
    'PDF password': 'Пароль PDF',
    'Document password': 'Пароль документа',
    'Diagrams on this page:': 'Діаграм на сторінці:',
    'No diagrams found': 'Діаграм не знайдено',
    'Could not load this library PDF. Check your connection and try again.':
      'Не вдалося завантажити PDF із бібліотеки. Перевірте з’єднання та спробуйте ще раз.',
    'Choose a PDF, PNG, JPEG or WebP file.': 'Виберіть PDF, PNG, JPEG або WebP.',
    'Maximum file size is 100 MB.': 'Максимальний розмір файлу — 100 МБ.',
    'Incorrect password. Please try again.': 'Неправильний пароль. Спробуйте ще раз.',
    'This PDF is password protected.': 'Цей PDF захищений паролем.',
    'This PDF has more than 500 pages. Open a smaller document.':
      'У PDF понад 500 сторінок. Відкрийте менший документ.',
    'This image exceeds 40 megapixels. Please resize it.':
      'Зображення перевищує 40 мегапікселів. Зменште його розмір.',
    'Could not open the file. Check that it is a valid, supported document.':
      'Не вдалося відкрити файл. Перевірте його формат і цілісність.',
    'Opening PDF cancelled.': 'Відкриття PDF скасовано.',
    'Could not display this page. Try another page or file.':
      'Не вдалося показати сторінку. Спробуйте іншу сторінку або файл.',
    'Board detection failed. Try another page or reopen the file.':
      'Не вдалося знайти дошки. Спробуйте іншу сторінку або відкрийте файл знову.',
    'Board detection timed out. Please try another file.':
      'Пошук тривав надто довго. Спробуйте інший файл.',
    'Your browser could not start board detection.': 'Браузер не зміг запустити пошук дощок.',
    'Could not complete board detection. Try another page.':
      'Не вдалося завершити пошук дощок. Спробуйте іншу сторінку.',
    'Could not enlarge this diagram. Please try opening it again.':
      'Не вдалося збільшити діаграму. Спробуйте відкрити її ще раз.',
    'Full screen is unavailable in this browser.':
      'Повноекранний режим недоступний у цьому браузері.',
    'Interface language': 'Мова інтерфейсу',
    'Choose a language, then select Save. The Settings tab always stays in English.':
      'Виберіть мову та натисніть Save. Вкладка Settings завжди залишається англійською.',
    Save: 'Зберегти',
    'Language saved.': 'Мову збережено.',
    'Language changed for this visit. Your browser could not save the preference.':
      'Мову змінено для цього відвідування. Браузер не зміг зберегти вибір.',
    'Chess Test Ben-Igor Book — Part Three': 'Шаховий тест Бен-Ігор — частина третя',
    'Find the Best Move 1': 'Знайди найкращий хід 1',
    'Find the Best Move 3': 'Знайди найкращий хід 3',
    'Find the Best Move 4': 'Знайди найкращий хід 4',
    'Mate in One — Worksheet 1': 'Мат в один хід — завдання 1',
    'Mate in One — Worksheet 1 Answers': 'Мат в один хід — відповіді 1',
    'Mate in One — Worksheet 2': 'Мат в один хід — завдання 2',
    'Mate in One — Worksheet 2 Answers': 'Мат в один хід — відповіді 2',
    'Mate in One — Worksheet 3': 'Мат в один хід — завдання 3',
    'Mate in One — Worksheet 3 Answers': 'Мат в один хід — відповіді 3',
    'Pawn Moves 1': 'Ходи пішаків 1',
    Hopkins: 'Гопкінс',
    'Learn How to Play Chess for Beginners in Less Than 8 Minutes':
      'Як грати в шахи: для початківців за 8 хвилин',
    'Checkmate in 3 MOVES! | Chess Strategy | ChessKid': 'Мат у 3 ходи! — ChessKid',
    'How to win Chess in 2 moves!': 'Як виграти в шахи за 2 ходи!',
    'How Do I Castle in Chess? | Castling | ChessKid': 'Як робити рокіровку? — ChessKid',
    'King & Queen Checkmate | ChessKid': 'Мат королем і ферзем — ChessKid',
    MB: 'МБ',
    'How to Checkmate with a King and Rook': 'Мат королем і турою',
    'How to Checkmate with Two Bishops': 'Мат двома слонами',
    'Knight and Bishop Checkmate': 'Мат конем і слоном',
    'Top 10 Fastest Checkmates in History!': '10 найшвидших матів в історії!',
    'King and Queen Checkmate — Lichess': 'Мат королем і ферзем — Lichess',
    'Pawn Moves — Lichess': 'Ходи пішаків — Lichess',
    'How to Play Chess — Lichess': 'Як грати в шахи — Lichess',
    'Visualization Lessons — Lichess': 'Уроки візуалізації — Lichess',
    '7 Most Common Chess Mistakes': '7 найпоширеніших шахових помилок',
    'Choose a lesson and click Watch. Return to this tab to continue working with diagrams.':
      'Виберіть урок і натисніть «Дивитися». Поверніться до цієї вкладки, щоб продовжити роботу з діаграмами.',
    'Video lesson': 'Відеоурок',
    'Watch ↗': 'Дивитися ↗',
    '(opens in a new tab)': '(відкриється в новій вкладці)',
    'Videos open on YouTube or Lichess. An internet connection is required.':
      'Відео відкриваються на YouTube або Lichess. Потрібне підключення до інтернету.',
    'choose Video Library, then Watch. The lesson opens in another tab; return here to continue your lesson.':
      'Виберіть «Відеоуроки», потім «Дивитися». Матеріал відкриється в іншій вкладці; поверніться сюди, щоб продовжити урок.',
  },
  vi: {
    'Filter by color': 'Lọc theo màu',
    'All videos': 'Tất cả video',
    Green: 'Xanh lá',
    Red: 'Đỏ',
    Blue: 'Xanh dương',
    Black: 'Đen',
    'Checkmate | Chess Terms | ChessKid': 'Chiếu hết | Thuật ngữ cờ vua | ChessKid',
    'Top 3 Best Chess Openings for Beginners | ChessKid':
      '3 khai cuộc hay nhất cho người mới | ChessKid',
    'The Basic Tactics Of Chess For Kids!': 'Các chiến thuật cờ vua cơ bản cho trẻ em!',
    'How to Defend Against Quick Mates & Traps': 'Cách phòng thủ trước chiếu hết nhanh và bẫy',
    'How to Play Chess: Chess Rules for Beginners | ChessKid':
      'Cách chơi cờ vua: luật chơi cho người mới | ChessKid',
    'Lichess Tutorial for Beginners': 'Hướng dẫn Lichess cho người mới',
    'Chess Diagrams — home': 'Chess Diagrams — trang chủ',
    'Chess Diagrams — chess in focus': 'Chess Diagrams — cận cảnh cờ vua',
    'TOOLS FOR CHESS COACHES': 'CÔNG CỤ DÀNH CHO HUẤN LUYỆN VIÊN CỜ VUA',
    'Ready for your next lesson': 'Sẵn sàng cho buổi học tiếp theo',
    'Lesson materials and help': 'Tài liệu bài học và trợ giúp',
    'PDF Library': 'Thư viện PDF',
    'Video Library': 'Thư viện video',
    'Open local file': 'Mở tệp trên thiết bị',
    Help: 'Trợ giúp',
    Settings: 'Cài đặt',
    'CHOOSE MATERIAL FOR YOUR CLASS': 'CHỌN TÀI LIỆU CHO BUỔI HỌC',
    'Choose a worksheet and click Open PDF. Then click a detected board to present it to your students.':
      'Chọn bài tập và nhấn Mở PDF. Sau đó nhấp vào bàn cờ được phát hiện để trình bày cho học viên.',
    'Search the library': 'Tìm trong thư viện',
    'Search books and worksheets': 'Tìm sách và bài tập',
    'Loading…': 'Đang tải…',
    Loading: 'Đang tải',
    Cancel: 'Hủy',
    'Open PDF': 'Mở PDF',
    Open: 'Mở',
    'No matching PDFs. Try another search.': 'Không tìm thấy PDF phù hợp. Hãy thử từ khóa khác.',
    'Library PDFs are downloaded from this website when selected. An internet connection is required.':
      'PDF được tải từ trang web này khi được chọn. Cần kết nối Internet.',
    'BRING A VIDEO INTO YOUR LESSON': 'THÊM VIDEO VÀO BUỔI HỌC',
    'Choose a lesson and click Watch on YouTube. Return to this tab to continue working with diagrams.':
      'Chọn bài học và nhấn Xem trên YouTube. Quay lại thẻ này để tiếp tục làm việc với sơ đồ.',
    'YouTube lesson': 'Bài học trên YouTube',
    'Watch on YouTube ↗': 'Xem trên YouTube ↗',
    Watch: 'Xem',
    'on YouTube (opens in a new tab)': 'trên YouTube (mở trong thẻ mới)',
    'YouTube is an external website. An internet connection is required.':
      'YouTube là trang web bên ngoài. Cần kết nối Internet.',
    'Help for coaches': 'Trợ giúp dành cho huấn luyện viên',
    'Choose a tab above to prepare and present your lesson.':
      'Chọn một thẻ phía trên để chuẩn bị và trình bày bài học.',
    'Choose material:': 'Chọn tài liệu:',
    "PDF Library opens the website's worksheets. Open local file lets you use a PDF or image from your device.":
      'Thư viện PDF mở bài tập của trang web. Mở tệp trên thiết bị cho phép dùng PDF hoặc hình ảnh từ thiết bị của bạn.',
    'Present a position:': 'Trình bày thế cờ:',
    'click a highlighted board to enlarge it. Use Full screen when presenting to the class.':
      'nhấp vào bàn cờ được tô sáng để phóng to. Dùng Toàn màn hình khi trình bày cho cả lớp.',
    'Move through the lesson:': 'Di chuyển trong bài học:',
    'use ← and → for pages in page view, or diagrams in the enlarged view. Press Esc to return to the page.':
      'dùng ← và → để chuyển trang khi xem trang hoặc chuyển sơ đồ khi xem phóng to. Nhấn Esc để quay lại trang.',
    'Play a video:': 'Phát video:',
    'choose Video Library, then Watch on YouTube. The video opens in another tab; return here to continue your lesson.':
      'chọn Thư viện video, rồi Xem trên YouTube. Video mở trong thẻ khác; quay lại đây để tiếp tục bài học.',
    'Dismiss message': 'Đóng thông báo',
    'A QUICK START FOR COACHES': 'HƯỚNG DẪN NHANH CHO HUẤN LUYỆN VIÊN',
    'Your next chess lesson.': 'Buổi học cờ vua tiếp theo của bạn.',
    'Ready to teach.': 'Sẵn sàng giảng dạy.',
    'Choose a worksheet, present a position, or play a video lesson.':
      'Chọn bài tập, trình bày thế cờ hoặc phát video bài học.',
    'Use PDF Library and Video Library, or open your own PDF or image.':
      'Dùng Thư viện PDF và Thư viện video hoặc mở PDF hay hình ảnh của bạn.',
    'Choose your material.': 'Chọn tài liệu của bạn.',
    'Open a worksheet from PDF Library, or use Open local file.':
      'Mở bài tập từ Thư viện PDF hoặc dùng Mở tệp trên thiết bị.',
    'Present a position.': 'Trình bày thế cờ.',
    'Wait for the boards to be found, then click one to enlarge it for your students.':
      'Đợi phát hiện các bàn cờ, rồi nhấp vào một bàn để phóng to cho học viên.',
    'Teach at your pace.': 'Giảng dạy theo nhịp độ của bạn.',
    'Use the arrows for the next diagram, or choose a lesson from Video Library.':
      'Dùng các mũi tên để chuyển sơ đồ hoặc chọn bài học từ Thư viện video.',
    'Use your own teaching material': 'Sử dụng tài liệu giảng dạy của bạn',
    'Drop a PDF or image here, or click to choose one':
      'Kéo PDF hoặc hình ảnh vào đây hoặc nhấp để chọn',
    'up to 100 MB': 'tối đa 100 MB',
    'Choose another local file': 'Chọn tệp khác trên thiết bị',
    'Website library': 'Thư viện trang web',
    'Local document': 'Tài liệu trên thiết bị',
    'Page navigation': 'Điều hướng trang',
    'Previous page': 'Trang trước',
    '← Previous page': '← Trang trước',
    Page: 'Trang',
    'Page number': 'Số trang',
    of: 'trên',
    'Next page': 'Trang tiếp theo',
    'Next page →': 'Trang tiếp theo →',
    'Finding chessboards…': 'Đang tìm bàn cờ…',
    'Change page zoom': 'Thay đổi thu phóng trang',
    'Fit page': 'Vừa trang',
    'Highlight boards': 'Tô sáng bàn cờ',
    'Rotate page 90 degrees': 'Xoay trang 90 độ',
    '↻ Rotate': '↻ Xoay',
    'No boards found on this page. Try another page or file.':
      'Không tìm thấy bàn cờ trên trang này. Hãy thử trang hoặc tệp khác.',
    'Click to enlarge diagram': 'Nhấp để phóng to sơ đồ',
    'Current document page': 'Trang tài liệu hiện tại',
    'Enlarge diagram': 'Phóng to sơ đồ',
    'Preparing page…': 'Đang chuẩn bị trang…',
    'Switch pages': 'Chuyển trang',
    Brightness: 'Độ sáng',
    Contrast: 'Độ tương phản',
    Reset: 'Đặt lại',
    'Opening document…': 'Đang mở tài liệu…',
    'Worksheets, positions and video lessons for chess coaches.':
      'Bài tập, thế cờ và video bài học dành cho huấn luyện viên cờ vua.',
    'Drop the file to open it': 'Thả tệp để mở',
    '← Back to page': '← Quay lại trang',
    'Back to page': 'Quay lại trang',
    Diagram: 'Sơ đồ',
    'Zoom out': 'Thu nhỏ',
    'Fit diagram': 'Vừa sơ đồ',
    'Zoom in': 'Phóng to',
    'Toggle full screen': 'Bật hoặc tắt toàn màn hình',
    '⛶ Full screen': '⛶ Toàn màn hình',
    'Chess diagram': 'Sơ đồ cờ vua',
    'Enlarging diagram…': 'Đang phóng to sơ đồ…',
    '← Previous diagram': '← Sơ đồ trước',
    '· ← → diagrams · Esc to return': '· ← → sơ đồ · Esc để quay lại',
    'Next diagram →': 'Sơ đồ tiếp theo →',
    'PDF password': 'Mật khẩu PDF',
    'Document password': 'Mật khẩu tài liệu',
    'Diagrams on this page:': 'Số sơ đồ trên trang này:',
    'No diagrams found': 'Không tìm thấy sơ đồ',
    'Could not load this library PDF. Check your connection and try again.':
      'Không thể tải PDF từ thư viện. Kiểm tra kết nối và thử lại.',
    'Choose a PDF, PNG, JPEG or WebP file.': 'Chọn tệp PDF, PNG, JPEG hoặc WebP.',
    'Maximum file size is 100 MB.': 'Kích thước tệp tối đa là 100 MB.',
    'Incorrect password. Please try again.': 'Mật khẩu không đúng. Vui lòng thử lại.',
    'This PDF is password protected.': 'PDF này được bảo vệ bằng mật khẩu.',
    'This PDF has more than 500 pages. Open a smaller document.':
      'PDF này có hơn 500 trang. Hãy mở tài liệu nhỏ hơn.',
    'This image exceeds 40 megapixels. Please resize it.':
      'Hình ảnh này vượt quá 40 megapixel. Vui lòng giảm kích thước.',
    'Could not open the file. Check that it is a valid, supported document.':
      'Không thể mở tệp. Kiểm tra xem tài liệu có hợp lệ và được hỗ trợ không.',
    'Opening PDF cancelled.': 'Đã hủy mở PDF.',
    'Could not display this page. Try another page or file.':
      'Không thể hiển thị trang này. Hãy thử trang hoặc tệp khác.',
    'Board detection failed. Try another page or reopen the file.':
      'Phát hiện bàn cờ thất bại. Hãy thử trang khác hoặc mở lại tệp.',
    'Board detection timed out. Please try another file.':
      'Phát hiện bàn cờ đã hết thời gian chờ. Hãy thử tệp khác.',
    'Your browser could not start board detection.':
      'Trình duyệt không thể bắt đầu phát hiện bàn cờ.',
    'Could not complete board detection. Try another page.':
      'Không thể hoàn tất phát hiện bàn cờ. Hãy thử trang khác.',
    'Could not enlarge this diagram. Please try opening it again.':
      'Không thể phóng to sơ đồ này. Hãy thử mở lại.',
    'Full screen is unavailable in this browser.': 'Trình duyệt này không hỗ trợ toàn màn hình.',
    'Interface language': 'Ngôn ngữ giao diện',
    'Choose a language, then select Save. The Settings tab always stays in English.':
      'Chọn ngôn ngữ, rồi nhấn Save. Thẻ Settings luôn giữ tiếng Anh.',
    Save: 'Lưu',
    'Language saved.': 'Đã lưu ngôn ngữ.',
    'Language changed for this visit. Your browser could not save the preference.':
      'Đã đổi ngôn ngữ cho lần truy cập này. Trình duyệt không thể lưu lựa chọn.',
    'Chess Test Ben-Igor Book — Part Three': 'Bài kiểm tra cờ vua Ben-Igor — phần ba',
    'Find the Best Move 1': 'Tìm nước đi tốt nhất 1',
    'Find the Best Move 3': 'Tìm nước đi tốt nhất 3',
    'Find the Best Move 4': 'Tìm nước đi tốt nhất 4',
    'Mate in One — Worksheet 1': 'Chiếu hết trong một nước — bài tập 1',
    'Mate in One — Worksheet 1 Answers': 'Chiếu hết trong một nước — đáp án 1',
    'Mate in One — Worksheet 2': 'Chiếu hết trong một nước — bài tập 2',
    'Mate in One — Worksheet 2 Answers': 'Chiếu hết trong một nước — đáp án 2',
    'Mate in One — Worksheet 3': 'Chiếu hết trong một nước — bài tập 3',
    'Mate in One — Worksheet 3 Answers': 'Chiếu hết trong một nước — đáp án 3',
    'Pawn Moves 1': 'Nước đi của tốt 1',
    Hopkins: 'Hopkins',
    'Learn How to Play Chess for Beginners in Less Than 8 Minutes':
      'Học chơi cờ vua cho người mới trong chưa đầy 8 phút',
    'Checkmate in 3 MOVES! | Chess Strategy | ChessKid': 'Chiếu hết trong 3 nước! — ChessKid',
    'How to win Chess in 2 moves!': 'Cách thắng cờ vua trong 2 nước!',
    'How Do I Castle in Chess? | Castling | ChessKid': 'Cách nhập thành — ChessKid',
    'King & Queen Checkmate | ChessKid': 'Chiếu hết bằng vua và hậu — ChessKid',
    MB: 'MB',
    'How to Checkmate with a King and Rook': 'Chiếu hết bằng vua và xe',
    'How to Checkmate with Two Bishops': 'Chiếu hết bằng hai tượng',
    'Knight and Bishop Checkmate': 'Chiếu hết bằng mã và tượng',
    'Top 10 Fastest Checkmates in History!': '10 thế chiếu hết nhanh nhất lịch sử!',
    'King and Queen Checkmate — Lichess': 'Chiếu hết bằng vua và hậu — Lichess',
    'Pawn Moves — Lichess': 'Nước đi của tốt — Lichess',
    'How to Play Chess — Lichess': 'Cách chơi cờ vua — Lichess',
    'Visualization Lessons — Lichess': 'Bài học hình dung thế cờ — Lichess',
    '7 Most Common Chess Mistakes': '7 lỗi phổ biến nhất trong cờ vua',
    'Choose a lesson and click Watch. Return to this tab to continue working with diagrams.':
      'Chọn bài học và nhấn Xem. Quay lại thẻ này để tiếp tục với sơ đồ.',
    'Video lesson': 'Video bài học',
    'Watch ↗': 'Xem ↗',
    '(opens in a new tab)': '(mở trong thẻ mới)',
    'Videos open on YouTube or Lichess. An internet connection is required.':
      'Video mở trên YouTube hoặc Lichess. Cần kết nối Internet.',
    'choose Video Library, then Watch. The lesson opens in another tab; return here to continue your lesson.':
      'Chọn Thư viện video, rồi Xem. Tài liệu mở trong thẻ khác; quay lại đây để tiếp tục bài học.',
  },
  en: Object.fromEntries(Object.keys(entries).map((key) => [key, key])),
  ru: Object.fromEntries(Object.entries(entries).map(([key, value]) => [key, value[0]])),
  es: Object.fromEntries(Object.entries(entries).map(([key, value]) => [key, value[1]])),
};
