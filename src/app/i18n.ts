export type Language = 'en' | 'ru' | 'es';
export const LANGUAGE_STORAGE_KEY = 'chess-diagrams.language';
export function readLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved === 'ru' || saved === 'es' ? saved : 'en';
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
export const translations: Record<Language, Record<string, string>> = {
  en: Object.fromEntries(Object.keys(entries).map((key) => [key, key])),
  ru: Object.fromEntries(Object.entries(entries).map(([key, value]) => [key, value[0]])),
  es: Object.fromEntries(Object.entries(entries).map(([key, value]) => [key, value[1]])),
};
