const headElem = document.getElementById('head');
const buttonsElem = document.getElementById('buttons');
const pagesElem = document.getElementById('pages');

// Class representing the test
class Quiz {
	constructor(type, questions, results) {
		// Test types: 1 - classic, with right answers; 2 - without right answers
		this.type = type;

		// Questions array
		this.questions = questions;

		// Possible results array
		this.results = results;

		// Score
		this.score = 0;

		// Result number from array
		this.result = 0;

		// Current question number
		this.current = 0;
	}
	Click(index) {
		// Adding score
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		// If atleast 1 score was added - answer is correct
		if (value >= 1) {
			correct = index;
		} else {
			// Otherwise looking for the right one
			for (i = 0; i < this.questions[this.current].answers.length; i++) {
				if (this.questions[this.current].answers[i].value >= 1) {
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	// To the next question
	Next() {
		this.current++;

		if (this.current >= this.questions.length) {
			this.End();
		}
	}

	// If we're out of questions this method check user's result
	End() {
		for (i = 0; i < this.results.length; i++) {
			if (this.results[i].Check(this.score)) {
				this.result = i;
			}
		}
	}
}

// Class representing the question
class Question {
	constructor(text, answers) {
		this.text = text;
		this.answers = answers;
	}

	Click(index) {
		return this.answers[index].value;
	}
}

// Class representing the answer
class Answer {
	constructor(text, value) {
		this.text = text;
		this.value = value;
	}
}

// Class representing the result
class Result {
	constructor(text, value) {
		this.text = text;
		this.value = value;
	}

	// This method check if user's score is enough
	Check(value) {
		if (this.value <= value) {
			return true;
		} else {
			return false;
		}
	}
}

const results = [
	new Result('Ебать ты ботяра', 0),
	new Result('Ну как-то печально даже', 25),
	new Result('Ну на троечку чисто', 50),
	new Result('Вот это неплохо, харош', 75),
	new Result('Да ты программист', 100),
	new Result('Ты либо Султан, либо ты загуглил, бля буду', 120),
];

// Questions array
const questions = [
	new Question(
		'Укажите правильный вариант определения изображения в качестве гиперссылки',
		[
			new Answer(`•	&ltа HREF="imаgе.gif"&gt SRC="imаgе.gif"&gt `, 1),
			new Answer(`•	&ltа HREF="адрес файла"&gt IМG`, 0),
			new Answer(`•	&ltа CRS="адрес файла"&gt &ltIМG="imаgе.gif"&gt`, 0),
			new Answer(`•	&ltа HRF="адрес файла"&gt &ltIМG="imаgе.gif"&gt`, 0),
		]
	),
	new Question('Найдите ошибочное определение гиперссылки', [
		new Answer(`•	&ltа HREF="аlехfinе.htm" ТАRGЕТ="lеft"&gt аlехfinе`, 0),
		new Answer(
			`•	&ltа HREF="аlехfinе.htm"&gt аlехfinе  HREF="nеw"&gt аlехfinе`,
			1
		),
		new Answer(`•	&ltа ТАRGЕТ="аlехfinе.htm"`, 0),
		new Answer(`•	&ltа ТАRG="аlехfinе.htm" HREF="nеw"&gt аlехfinе`, 0),
	]),
	new Question(
		'В какой таблице ширина промежутков между ячейками составит 20 пикселей? (Эта параша не хочет отображать варианты, я ебал его в рот. Upd: Я починил, но в рот его все равно ебал)',
		[
			new Answer(`•	&lttаblе gridsрасing="20"&gt`, 0),
			new Answer(`•	&lttаblе сеllраdding="20"&gt`, 0),
			new Answer(`•	&lttаblе сеllsрасing="20"&gt`, 1),
			new Answer(`•	&lttаblе сеllраdding="20p"&gt`, 0),
		]
	),
	new Question('Какой знак препинания ставится в конце каждого запроса?', [
		new Answer('\\', 0),
		new Answer('/', 0),
		new Answer('.', 0),
		new Answer(';', 1),
	]),
	new Question(
		'Какое значение следует задать атрибуту type, чтобы оно превращало входной тэг в форму отправки?',
		[
			new Answer(`•	Radiobutton`, 0),
			new Answer(`•	Checkbox`, 0),
			new Answer(`•	Submit`, 1),
			new Answer(`•	StringGrid`, 0),
		]
	),
	new Question(
		'Для задания размеров тэгу <frameset> требуются следующие атрибуты:',
		[
			new Answer(`•	Строки и столбцы `, 1),
			new Answer(`•	Площадь и толщина границ`, 0),
			new Answer(`•	Высота и ширина`, 0),
			new Answer(`•	Активированные поля`, 0),
		]
	),
	new Question('Выберите верное утверждение', [
		new Answer(
			`•	В HTML цвета задаются комбинацией значений двоичной системы исчисления: 0 или 1`,
			0
		),
		new Answer(
			`•	В HTML цвета задаются комбинацией значений шестнадцатеричной системы исчисления: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F `,
			1
		),
		new Answer(
			`•	В HTML цвета задаются комбинацией значений восьмеричной системы исчисления: 0, 1, 2, 3, 4, 5, 6, 7`,
			0
		),
		new Answer(
			`•	В HTML цвета задаются комбинацией значений десятичной системы исчисления: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9`,
			0
		),
	]),
	new Question('Какие тэги делают шрифт текста жирным?', [
		new Answer(`• &ltbr&gt и &lttr&gt`, 0),
		new Answer(`• &ltb&gt и &ltstrong&gt `, 1),
		new Answer(`•	&ltli&gt и &ltul&gt`, 0),
		new Answer(`•	&ltins&gt и &ltdel&gt`, 0),
	]),
	new Question(
		'Неотображаемые комментарии в HTML задаются следующим образом:',
		[
			new Answer(`•	&lt! - Your comment -!&gt`, 0),
			new Answer(`•	&lt!p&gt Your comment &lt/!p&gt`, 0),
			new Answer(`•	&lt! -- Your comment -- &gt`, 1),
			new Answer(`•	// Your comment `, 0),
		]
	),
	new Question(
		`&lta href="https://www.youtube.com" target="_blank"&gt Youtube &lt/a&gt Что означает код на картинке?`,
		[
			new Answer(`•	Переход по ссылке произойдет на текущей странице`, 0),
			new Answer(`•	На текущей странице появится текст «YouTube»`, 0),
			new Answer(`•	Организуется ссылка _blank`, 0),
			new Answer(`•	Переход по ссылке произойдет на новой странице `, 1),
		]
	),
	new Question(
		'Укажите, какой элемент HTML 5 отвечает за воспроизведение видео:',
		[
			new Answer(`•	&ltmovie&gt`, 0),
			new Answer(`•	&ltmedia&gt`, 0),
			new Answer(`•	&ltvideo&gt`, 1),
			new Answer(`•	&ltmov video&gt`, 0),
		]
	),
	new Question('Элемент &ltcanvas&gt используется для:', [
		new Answer(`•	Прорисовки графики`, 1),
		new Answer(`•	Управления данными в базе данных`, 0),
		new Answer(`•	Прикрепления таблиц Excel`, 0),
		new Answer(`•	Добавления новых данных в таблицу`, 0),
	]),
	new Question('Какой тэг содержит навигацию?', [
		new Answer(`•	&ltmetanav&gt`, 0),
		new Answer(`•	&ltnav&gt`, 1),
		new Answer(`•	&ltnanigation&gt`, 0),
		new Answer(`•	Все вышеперечисленные`, 0),
	]),
	new Question(
		`Заполните пропуски таким образом, чтобы получился валидный HTML документ. «First paragraph» - комментарий. 
	&lt___&gt
	&ltbody&gt
	&lt! - - First paragraph ___&gt
	&lt___&gt This is the first paragraph! &lt/p&gt
	&lt___&gt
	&lt/html&gt`,
		[
			new Answer(`•	html/; - - ?; p; /body`, 0),
			new Answer(`•	html; - - !; p; /body `, 1),
			new Answer(`•	html; /body; p`, 0),
			new Answer(`•	html v.5; - - !; /p; /body`, 0),
		]
	),
	new Question('О чем говорит тэг &ltp align="right"&gt … &lt/p&gt?	', [
		new Answer(
			`•	Текст, заключенный в тэг, будет расположен по левому краю страницы`,
			0
		),
		new Answer(
			`•	Текст, заключенный в тэг, будет расположен по центру страницы`,
			0
		),
		new Answer(
			`•	Текст, заключенный в тэг, будет расположен по правому краю страницы `,
			1
		),
		new Answer(
			`•	Текст, заключенный в тэг, будет расположен вверху страницы`,
			0
		),
	]),
	new Question(
		'Какие единицы измерения могут использоваться для атрибута ширины?',
		[
			new Answer(`•	Пиксели и миллиметры`, 0),
			new Answer(`•	Миллиметры и сантиметры`, 0),
			new Answer(`•	Пиксели и %`, 1),
			new Answer(`•	% и дециметры`, 0),
		]
	),
	new Question(
		'Использование тэга … позволяет добавлять одну строку текста без начала нового абзаца.',
		[
			new Answer(`•	&lttd/&gt`, 0),
			new Answer(`•	&ltline/&gt`, 0),
			new Answer(`• &ltbr/&gt`, 1),
			new Answer(`•	&lttr/&gt`, 0),
		]
	),
	new Question(
		`Объясните смысл кода, представленного ниже:\n
	&lttable&lt
		&lttr&lt
			&lttd&gt&lt/td&lt
			&lttd&gt&lt/td&lt
			&lttd&gt&lt/td&lt
		&lt/tr&lt
	&lt/table&lt
	`,
		[
			new Answer(`•	Будет создана таблица, состоящая из 1 ряда и 3 колонок `, 1),
			new Answer(`•	Будет создана таблица, состоящая из 3 рядов и 1 колонки`, 0),
			new Answer(`•	Будет создана таблица, состоящая из 2 рядов и 3 колонок`, 0),
			new Answer(`•	Будет создана таблица, состоящая из 1 ряда и 1 колонки`, 0),
		]
	),
	new Question(
		`Напишите код HTML, который бы создавал кнопку отправки заполненной формы. Имя кнопки – ОК.

	`,
		[
			new Answer(`•	&ltinput type="ОК" value="Submit"/&gt`, 0),
			new Answer(`•	&ltinput type="submit" value="ОК"/&gt`, 1),
			new Answer(`•	&ltp&gt input type="submit" value="OK" &lt/p&gt`, 0),
			new Answer(`•	&ltinput type="ОК" value="POST"/&gt`, 0),
		]
	),
	new Question(
		`Какой тэг при создании страницы добавляет имя страницы, которое будет отображаться в строке заголовка в браузере пользователя?`,
		[
			new Answer(`•	&ltinput&gt… &lt/input&gt`, 0),
			new Answer(`•	&lttitle&gt … &lt/title&gt`, 1),
			new Answer(`•	&ltheader&gt … &lt/header&gt`, 0),
			new Answer(`•	&ltbrauser&gt… &lt/brauser&gt`, 0),
		]
	),
	new Question(
		`Заполните поля, чтобы отобразить картинку “flower.jpg” с высотой 300 пикселей и шириной 750 пикселей:`,
		[
			new Answer(
				`•	&ltsrc img=”flower.jpg”
			height=”300%”
			width=”750%”/&gt
			`,
				0
			),
			new Answer(
				`•	&ltimg ref=”flower” format=.jpg
			high=300 px
			width=750 px /&gt
			`,
				0
			),
			new Answer(
				`•	&ltimg src=”flower.jpg”
		height=”300 px” alt=”” +
		width=”750 px”/&gt
		`,
				1
			),
			new Answer(`•	&ltimg =”flower” = src.Jpg&gt`, 0),
		]
	),
	new Question(`Что содержит в себе атрибут href?`, [
		new Answer(`•	Имя страницы, на которую произойдет перенаправление`, 0),
		new Answer(
			`• Указание на то, где будет открываться новая страница: в том же или новом окне`,
			0
		),
		new Answer(`•	Гиперссылку на имя новой страницы`, 0),
		new Answer(`•	URL страницы, на которую произойдет перенаправление`, 1),
	]),
	new Question(`Какие из перечисленных тэгов относятся к созданию таблицы?`, [
		new Answer(`•	&ltheader&gt &ltbody&gt &ltfooter&gt`, 0),
		new Answer(`•	&ltul&gt &ltli&gt &lttr&gt &lttd&gt`, 0),
		new Answer(`•	&lttable&gt &lttr&gt &lttd&gt `, 1),
		new Answer(`•	&lttable&gt &ltimg&gt &ltinput&gt`, 0),
	]),
	new Question(
		`О чем говорит следующая запись: &ltform action="url" method="POST"&gt?`,
		[
			new Answer(
				`•	Создается форма, при заполнении которой вводимые данные не будут отображаться`,
				1
			),
			new Answer(
				`•	Создается форма, при заполнении которой вводимые данные будут отображаться`,
				0
			),
			new Answer(
				`•	Создается форма, которая будет служить для внесения информации, представленной в виде ссылки (URL)`,
				0
			),
			new Answer(
				`•	Активируется форма, предназначенная для получения данных`,
				0
			),
		]
	),
	new Question(`Инструкция браузеру, указывающая способ отображения текста:`, [
		new Answer(`•	Функция`, 0),
		new Answer(`•	Тэг`, 1),
		new Answer(`•	Файл`, 0),
		new Answer(`•	Гиперссылка`, 0),
	]),
	new Question(`Программа для просмотра гипертекстовых страниц называется:`, [
		new Answer(`•	Протокол`, 0),
		new Answer(`•	Браузер`, 1),
		new Answer(`•	Сервер`, 0),
		new Answer(`•	HTML`, 0),
	]),
	new Question(`Какие тэги задают размер заголовка?`, [
		new Answer(`•	&ltp&gt&lt/p&gt`, 0),
		new Answer(`•	&ltbody&gt&lt/body&gt`, 0),
		new Answer(`•	&lth1&gt&lt/h1&gt`, 1),
		new Answer(`•	&ltimg src=”name”&gt`, 0),
	]),
	new Question(`Назовите атрибут обязательный для тега &ltimg&gt:`, [
		new Answer(`•	Title`, 0),
		new Answer(`•	With`, 0),
		new Answer(`•	Href`, 0),
		new Answer(`• Src`, 1),
	]),
	new Question(`Выберите параметр выравнивания: (Варианты имба)`, [
		new Answer(`•	cunter`, 0),
		new Answer(`•	rigрht`, 0),
		new Answer(`•	justify`, 1),
		new Answer(`•	leift`, 0),
	]),
	new Question(`Как указать выравнивание текста в ячейке таблицы?`, [
		new Answer(`•	с помощью атрибутов VАLIGN,АLIGN `, 1),
		new Answer(`•	с помощью атрибута CELLPАDDING`, 0),
		new Answer(`•	с помощью атрибута gridsрасing`, 0),
		new Answer(`•	с помощью атрибута сеllsрасing`, 0),
	]),
	new Question(
		`Для просмотра Web-страниц в Интернете используются программы:

	`,
		[
			new Answer(`•	Word Pad`, 0),
			new Answer(`•	Google Chrome`, 1),
			new Answer(`•	MicroSoft Access`, 0),
			new Answer(`•	Блокнот`, 0),
		]
	),
	new Question(`Параметр формы &ltmethod&gt определяет:`, [
		new Answer(
			`•	имя окна или фрейма, куда обработчик будет загружать результат`,
			0
		),
		new Answer(`•	протокол HTTP`, 1),
		new Answer(`•	имя формы`, 0),
		new Answer(
			`•	адрес программы или документа, который обрабатывает данные формы`,
			0
		),
	]),
	new Question(`Раздел заголовка содержит`, [
		new Answer(`•	Комментарии`, 0),
		new Answer(`•	Информация содержимого документа`, 0),
		new Answer(`•	Служебную информацию не считающимся содержанием документа`, 1),
		new Answer(`•	Информация, которая содержится в окне браузера`, 0),
	]),
	new Question(
		`Компьютер в сети, принимающий информацию, и не являющийся источником информации, носит название:`,
		[
			new Answer(`•	Роутер`, 0),
			new Answer(`•	Сервер`, 0),
			new Answer(`•	Адаптер`, 0),
			new Answer(`•	Клиент`, 1),
		]
	),
	new Question(
		`Среда World Wide Web основана на протоколе передачи гипертекста:`,
		[
			new Answer(`•	SSI`, 0),
			new Answer(`•	HTML`, 0),
			new Answer(`•	HTTP`, 1),
			new Answer(`•	HTPP`, 0),
		]
	),
	new Question(
		`C сервера пришел ответ с кодом 404. Что это обозначает:

	`,
		[
			new Answer(`•	ресурс не существует`, 1),
			new Answer(`•	ошибка идентификации`, 0),
			new Answer(`•	ошибка сервера`, 0),
			new Answer(`•	oшибка синтаксиса данных`, 0),
		]
	),
	new Question(
		`Какой из методов запрашивает информацию о параметрах соединения и сервера:`,
		[
			new Answer(`•	CONNECT`, 0),
			new Answer(`•	OPTIONS`, 1),
			new Answer(`•	SELECT`, 0),
			new Answer(`•	CONNECTION`, 0),
		]
	),
	new Question(`Транзакция — это:`, [
		new Answer(`•	Метод передачи данных`, 0),
		new Answer(`•	обмен данными между клиентом и сервером `, 1),
		new Answer(`•	вывод потока данных в форму`, 0),
		new Answer(`•	метод шифрования данных`, 0),
	]),
	new Question(`Гиперссылки на web – странице могут обеспечить переход:`, [
		new Answer('сплайн', 0),
		new Answer('отрезок', 0),
		new Answer('кривая Безье', 1),
		new Answer('нет правильного ответа', 0),
	]),
	new Question('Под термином «Кривая Безье» подразумевается:', [
		new Answer(`•	только на форму передачи данных`, 0),
		new Answer(`•	только в пределах данной web – страницы `, 0),
		new Answer(`•	на любую web – страницу данного региона`, 0),
		new Answer(`•	на любую web – страницу любого сервера Интернет `, 1),
	]),
	new Question(`Браузеры являются:`, [
		new Answer(`•	трансляторами языка программирования`, 0),
		new Answer(`•	антивирусными программами`, 0),
		new Answer(`•	средством просмотра web-страниц `, 1),
		new Answer(`•	Интерпретаторами языка программирования`, 0),
	]),
	new Question(
		`В чем измеряется пропускная способность каналов передачи информации?`,
		[
			new Answer(`•	Мбит/с`, 1),
			new Answer(`•	метр/с`, 0),
			new Answer(`•	байт/с`, 0),
			new Answer(`•	бит/с `, 0),
		]
	),
	new Question(
		`
	Что будет выведено на экран в результате выполнения следующего кода?
	&lthtml&gt
	&lthead&gt
		&lttitle>&lt/title&gt
	&lt/head&gt
	&ltbody&gt
		&ltscript language='php'&gt
			echo 'Some text';
		&lt/script&gt
	&lt/body&gt
&lt/html&gt`,
		[
			new Answer(`•	Возникнет ошибка`, 0),
			new Answer(`•	Какой-то текст`, 1),
			new Answer(`•	echo 'Какой-то текст'`, 0),
			new Answer(`•	Ничего не выведется `, 0),
		]
	),
	new Question(`Укажите корректную запись для создания чек-бокса:`, [
		new Answer(`•	<input checkbox>`, 0),
		new Answer(`•	<input type=”checkbox”>`, 1),
		new Answer(`•	<type input=”checkbox”>`, 0),
		new Answer(`•	<type checkbox =” input ”>`, 0),
	]),
	new Question(`Укажите корректную запись для создания выпадающего списка:`, [
		new Answer(`•	<dropdown list>`, 0),
		new Answer(`•	<input dropdown list>`, 0),
		new Answer(`• <input type=”dropdown”>`, 1),
		new Answer(`•	<input dropdown =” type ”>`, 0),
	]),
	new Question(
		`Какой атрибут элемента FОRМ определяет список кодировок для водимых данных?`,
		[
			new Answer(`•	асt-сhаrsеt`, 0),
			new Answer(`•	еnсt-сhаrsеt`, 0),
			new Answer(`•	еnсtyре-сhаrsеt`, 0),
			new Answer(`• ассерt-сhаrsеt`, 1),
		]
	),
	new Question(
		`Что пользователь увидит на экране после выполнения следующей команды? <input type="radio">`,
		[
			new Answer(`•	Поле для ввода одной строки текста`, 0),
			new Answer(`•	Текстовое поле для ввода пароля `, 0),
			new Answer(`• Элемент-переключатель`, 1),
			new Answer(
				`•	Поле для установки флажка, который можно установить или сбросить`,
				0
			),
		]
	),
	new Question(
		`Что пользователь увидит на экране после выполнения следующей команды? <input type="reset">`,
		[
			new Answer(`•	Кнопку, при нажатии которой вся форма очищается`, 1),
			new Answer(`•	Обычную командную кнопку`, 0),
			new Answer(
				`• Кнопку, при нажатии которой происходит отправка данных, введенных в форму`,
				0
			),
			new Answer(
				`•	Поле для установки флажка, который можно установить или сбросить`,
				0
			),
		]
	),
	new Question(
		`Какой элемент создает на веб-странице раскрывающийся список (также называемый раскрывающимся или выпадающим меню), позволяющий выбрать одно значение из множества возможных?`,
		[
			new Answer(`•	Radio`, 0),
			new Answer(`•	Select`, 1),
			new Answer(`•	Checkbox`, 0),
			new Answer(`•	Text`, 0),
		]
	),
	new Question(
		`Продолжите предложение.  Элементы формы, связанные по смыслу, можно сгруппировать между тегами`,
		[
			new Answer(`•	Label`, 0),
			new Answer(`•	Optgroup`, 1),
			new Answer(`•	Buttоn`, 0),
			new Answer(`•	Datalist`, 0),
		]
	),
	new Question(`Web-страница (документ HTML) представляет собой:`, [
		new Answer(
			`•	документ браузера, работающий только для определенного клиента`,
			0
		),
		new Answer(`•	двоичный файл с расширением com или exe`, 0),
		new Answer(`•	текстовый файл с расширением htm или html`, 1),
		new Answer(`•	текстовый файл с расширением txt или doc`, 0),
	]),
	new Question(`Гипертекст – это: `, [
		new Answer(`•	текст, в котором используется шрифт большого размера `, 0),
		new Answer(`•	текст очень большого размера`, 0),
		new Answer(`•	Текст, отображаемый только для конкретного пользователя`, 0),
		new Answer(
			`• структурированный текст, где возможны переходы по выделенным меткам`,
			1
		),
	]),
	new Question(`Для выравнивания текста в документе используется атрибут:`, [
		new Answer(`•	valign`, 0),
		new Answer(`•	Src`, 0),
		new Answer(`• align `, 1),
		new Answer(`•	Alt`, 0),
	]),
	new Question(`Тэг может быть:`, [
		new Answer(`•	парным`, 1),
		new Answer(`•	гипотетическим`, 0),
		new Answer(`•	универсальным`, 0),
		new Answer(`•	функциональным`, 0),
	]),
	new Question(`Тэг может быть:`, [
		new Answer(`•	одиночным`, 1),
		new Answer(`•	универсальным`, 0),
		new Answer(`•	вспомогательным`, 0),
		new Answer(`•	функциональным`, 0),
	]),
	new Question(`Сайт можно создать, воспользовавшись: `, [
		new Answer(`•	электронными запросами`, 0),
		new Answer(`• языком разметки гипертекста HTML `, 1),
		new Answer(`•	языком программирования Си`, 0),
		new Answer(`•	электронными таблицами`, 0),
	]),
	new Question(`Кто занимается проектированием структуры wеb-сайта:`, [
		new Answer(`•	wеb-программист`, 0),
		new Answer(`•	системный администратор`, 0),
		new Answer(`• wеb-дизайнер `, 1),
		new Answer(`•	системный аналитик`, 0),
	]),
	new Question(
		`При наполнении страниц сайта информационными материалами не следует:`,
		[
			new Answer(`•	применять краткие названия пунктов`, 0),
			new Answer(`•	избегать слишком длинных текстов`, 0),
			new Answer(`•	Применять иерархию текста`, 0),
			new Answer(`• использовать пестрый фон`, 1),
		]
	),
	new Question(
		`Какой метод позволяет изменять порядок элементов массива на противоположный:`,
		[
			new Answer(`•	sort()`, 0),
			new Answer(`•	join()`, 0),
			new Answer(`•	reverse() `, 1),
			new Answer(`•	Int()`, 0),
		]
	),
	new Question(
		`Объекты, отвечающие за то, что содержится на Web-странице в окне браузера, называются:`,
		[
			new Answer(`•	 клиентскими `, 1),
			new Answer(`•	пользовательскими`, 0),
			new Answer(`•	встроенными`, 0),
			new Answer(`•	серверными`, 0),
		]
	),
	new Question(`Что такое ECMAScript: `, [
		new Answer(`•	переработанная реализация Javascript`, 0),
		new Answer(`•	спецификация языка Javascript `, 1),
		new Answer(`•	новый язык программирования`, 0),
		new Answer(`•	Разногласие чтения параметров языка Javascript`, 0),
	]),
	new Question(`Сколько параметров можно передать функции:`, [
		new Answer(`•	параметры нельзя передавать функции`, 0),
		new Answer(`• любое количество`, 1),
		new Answer(`•	ровно столько, сколько указано в определении функции`, 0),
		new Answer(`•	сколько указано в определении функции или меньше`, 0),
	]),
	new Question(`Какие конструкции для циклов есть в javascript:`, [
		new Answer(`•	только одна: for`, 0),
		new Answer(`•	только две: for и while`, 0),
		new Answer('нет правильного ответа', 0),
		new Answer(`•	три: for, while и do…while `, 1),
	]),
	new Question(`HTML – это:`, [
		new Answer(`•	браузер`, 0),
		new Answer(`•	документ клиента`, 0),
		new Answer(`•	страница Internet Explorer`, 0),
		new Answer(`•	язык разметки гипертекста `, 1),
	]),
	new Question(`Что такое тэг:`, [
		new Answer(`• команда, заключенная в угловые скобки `, 1),
		new Answer(`•	гиперссылка`, 0),
		new Answer(`•	указатель ссылки`, 0),
		new Answer(`•	документ клиента`, 0),
	]),
	new Question(`Контейнер предназначен для:`, [
		new Answer(`•	установлении иерархии рисунков`, 0),
		new Answer(`•	разделения текста на абзацы`, 1),
		new Answer(`•	форматирования шрифта любого фрагмента текста`, 0),
		new Answer(`•	разделения текста на заголовки`, 0),
	]),
	new Question(
		`Набор веб-страниц, связанных между собой перекрестными ссылками, расположенный под одним общим корневым именем, называется:`,
		[
			new Answer(`•	Контейнером`, 0),
			new Answer(`•	Сайтом`, 1),
			new Answer(`•	Электронным учебником`, 0),
			new Answer(`•	Документом клиента`, 0),
		]
	),
	new Question(`JavaScript это`, [
		new Answer(`•	Скриптовой язык программирования`, 0),
		new Answer(
			`•	Прототипно-ориентированный скриптовый язык программирования.`,
			0
		),
		new Answer(`•	Объектно-ориентированный скриптовый язык программирования`, 1),
		new Answer(`•	Базовый язык программирования`, 0),
	]),
	new Question(
		`Где в документе может располагаться тэг script по стандарту HTML?`,
		[
			new Answer(`•	Только в HEAD`, 0),
			new Answer(`•	Только в BODY`, 0),
			new Answer(`•	Не имеет значения`, 0),
			new Answer(`•	В HEAD или в BODY`, 1),
		]
	),
	new Question(`Какой из этих тэгов соответствуют стандарту HTML?`, [
		new Answer(`•	&ltscript language="javascript"&gt`, 0),
		new Answer(`•	&ltscript type="text/javascript"&gt`, 0),
		new Answer(`•	&ltscript&gt`, 1),
		new Answer(`•	Все перечисленное`, 0),
	]),
	new Question(
		`
		var a = 1;
		var b = a++;
		alert(b);
		Результат работы кода - сообщение с текстом…
		`,
		[
			new Answer(`2`, 1),
			new Answer(`1`, 0),
			new Answer(`0`, 0),
			new Answer(`4`, 0),
		]
	),
	new Question(
		`
	var a = 1;
	{
	var a = 5;
	}
	alert(a);
	Результат работы кода - сообщение с текстом…
	`,
		[
			new Answer(`4`, 0),
			new Answer(`5`, 1),
			new Answer(`2`, 0),
			new Answer(`1`, 0),
		]
	),
	new Question(
		`Функция, которая выводит текст на экран в виде диалогового окошка`,
		[
			new Answer(`•	promt()`, 0),
			new Answer(`•	alert() `, 1),
			new Answer(`•	document()`, 0),
			new Answer(`•	Write ()`, 0),
		]
	),
	new Question(`Объявление переменной с именем a`, [
		new Answer(`•	да будет а`, 0),
		new Answer(`•	variable a`, 0),
		new Answer(`•	let a `, 1),
		new Answer(`•	a let`, 0),
	]),
	new Question(
		`
	Какой результат выдаст программа в конечном alert?
		let a;
		a = 1;
		alert(a); 
		a = 2;
		alert(a); 
	`,
		[
			new Answer(`4`, 0),
			new Answer(`3`, 0),
			new Answer(`1`, 0),
			new Answer(`2`, 1),
		]
	),
	new Question(
		`
	Какой результат выдаст программа в конечном alert?
		let a = 1 + 2;
		alert(a);
		let b = 3 - 2;
		alert(b);
		let c = 3 * 2;
		alert(c);
		let d = 4 / 2;
		alert(d); 
	`,
		[
			new Answer(`0`, 0),
			new Answer(`1`, 0),
			new Answer(`2`, 1),
			new Answer(`5`, 0),
		]
	),
	new Question(`a++ соответствует`, [
		new Answer(`•	a = a + 1`, 1),
		new Answer(`•	a = a + а`, 0),
		new Answer(`•	a = a - 1`, 0),
		new Answer('нет верного ответа', 0),
	]),
	new Question(`a -= 3 соответствует`, [
		new Answer(`•	a = a – 3 `, 1),
		new Answer(`•	a = a - а-а`, 0),
		new Answer(`•	3 = a - а-а`, 0),
		new Answer(`•	a = a - 3-а`, 0),
	]),
	new Question(
		`
	Результат работы программы
		let str1 = 'abc';
		let str2 = 'def';
		alert(str1 + '!!!' + str2)
	`,
		[
			new Answer(`•	!!!def`, 0),
			new Answer(`•	abc!!!def `, 1),
			new Answer(`•	abc!!!`, 0),
			new Answer(`•	Abcdef`, 0),
		]
	),
	new Question(
		`
	Результат работы программы
		alert('abcde'.length)
	`,
		[
			new Answer(`•	Abcde`, 0),
			new Answer(`4`, 0),
			new Answer(`5`, 1),
			new Answer(`•	'abcde'.length`, 0),
		]
	),
	new Question(
		`
	Результат работы программы
		let num1 = 1;
		let num2 = 2;
		alert(String(num1) + String(num2));
	`,
		[
			new Answer(`4`, 0),
			new Answer(`0`, 0),
			new Answer(`3`, 0),
			new Answer(`12`, 1),
		]
	),
	new Question(
		`
		Результат работы программы
			let str = 'abcde';
			let num = 3;
			alert(str[num]);
		`,
		[
			new Answer(`A`, 0),
			new Answer(`C`, 0),
			new Answer(`D`, 1),
			new Answer(`E`, 0),
		]
	),
	new Question(
		`
	Результат работы программы
		let str = 'abcde';
		alert(str[str.length - 1])
	`,
		[
			new Answer(`E`, 1),
			new Answer(`D`, 0),
			new Answer(`A`, 0),
			new Answer(`C`, 0),
		]
	),
	new Question(
		`
	Результат работы программы
		let test = '12345';
		alert(test[0] + test[1])
	`,
		[
			new Answer(`12`, 1),
			new Answer(`1`, 0),
			new Answer(`12345`, 0),
			new Answer(`10`, 0),
		]
	),
	new Question(
		`
	Результат работы программы
		let num = 0;
		num += 1;
		alert(num);
	`,
		[
			new Answer(`1`, 1),
			new Answer(`0`, 0),
			new Answer(`-1`, 0),
			new Answer(`2`, 0),
		]
	),
	new Question(
		`
	Результат работы программы
		let arr = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
		console.log(arr[1]);
	`,
		[
			new Answer(`•	Вт`, 1),
			new Answer(`•	Пн`, 0),
			new Answer(`•	Ср`, 0),
			new Answer(`•	Пт`, 0),
		]
	),
	new Question(
		`
	Результат работы программы
		let arr = [1, 2, 3];
		console.log(arr[arr.length - 1])
	`,
		[
			new Answer(`3`, 1),
			new Answer(`0`, 0),
			new Answer(`1`, 0),
			new Answer(`2`, 0),
		]
	),
	new Question(
		`Что определяет атрибут CELLSPАCING у элемента разметки ТАBLE?`,
		[
			new Answer(`•	расстояние между ячейками `, 1),
			new Answer(`•	ширину ячейки`, 0),
			new Answer(`•	расстояние от содержания до границы ячейки`, 0),
			new Answer(`•	расстояние между столбцами`, 0),
		]
	),
	new Question(`Какой атрибут тэга BОDY позволяет задать цвет фона страницы?`, [
		new Answer(`•	bgсolor `, 1),
		new Answer(`•	Сolor`, 0),
		new Answer(`•	Bасkground`, 0),
		new Answer(`•	Sеt`, 0),
	]),
	new Question(
		`Какой атрибут тега &ltimg&gt задает горизонтальное расстояние между вертикальной границей страницы и изображением?`,
		[
			new Answer(`•	MSPАCE`, 0),
			new Answer(`•	VSPАCE`, 0),
			new Answer(`•	HSPАCE`, 1),
			new Answer(`•	GSPАCE`, 0),
		]
	),
	new Question(
		`Какой из приведенных тегов позволяет создавать нумерованные списки?`,
		[
			new Answer(`•	ОL`, 1),
			new Answer(`•	DL`, 0),
			new Answer(`•	UL`, 0),
			new Answer(`•	NТ`, 0),
		]
	),
	new Question(
		`
		Какой полный URL будет сформирован для ссылки в приведенном фрагменте? 
		&ltbАse href="/"&ltа"&gthttр://аlехfinе.ru"&gt &ltВОDY&gt &ltА HRЕF="dос1.html"&gtДокумент 1 
		(я сам не ебу что это)`,
		[
			new Answer(`•	httр://аlехfinе.ru/dос1.html  `, 0),
			new Answer(`•	правильный URL не может быть сформирован`, 0),
			new Answer(`•	httр://аlехfinе.ru/users/alexfine/dосs/doс1.html`, 0),
			new Answer(`•	httр://аlехfinе.ru/users/dосs/doс1.html`, 1),
		]
	),
	new Question(
		`В каких случаях атрибут выравнивания аlign имеет более высокий приоритет?`,
		[
			new Answer(`•	<ТАВIЕ аlign="lеft">`, 0),
			new Answer(`•	<ТН аlign="lеft">`, 1),
			new Answer(`•	<ОL аlign="lеft">`, 0),
			new Answer(`•	<UL аlign="lеft">`, 0),
		]
	),
	new Question(`Какой атрибут принадлежит тегу <АREА>?`, [
		new Answer(`•	CIRCLE`, 0),
		new Answer(`•	SHАPE`, 1),
		new Answer(`•	SRC`, 0),
		new Answer(`•	TABLE`, 0),
	]),
	new Question(`Какoй тэг определяет заголовок документа HТМL?`, [
		new Answer(`•	TITLE `, 1),
		new Answer(`•	HEАD`, 0),
		new Answer(`•	ВОDY`, 0),
		new Answer(`•	ISINDEX`, 0),
	]),
	new Question(
		`Какой из приведенных примеров задает гипертекстовую ссылку из документа 1.html на другой документ?`,
		[
			new Answer(`•	<А HREF="#m1">ссылка`, 0),
			new Answer(`•	<А HREF=m1>ссылка`, 0),
			new Answer(`•	<А HREF="2.html&&m1">ссылка`, 0),
			new Answer(`•	<А HREF="2.html#m1">ссылка  `, 1),
		]
	),
	new Question(`Какой из приведенных фрагментов кода создает переключатель?`, [
		new Answer(
			`•	&ltinрut Тype="сhесkbох" nАМЕ="а1" vАlue="1"&gt&ltinрut ТУРЕ="сhесkboх" nАМЕ="а1" vАlue="2"&gt`,
			0
		),
		new Answer(
			`•	&ltinрut ТУРЕ="rаdio" nАМЕ="а1" vАlue="1"&gt&ltinрut ТУРЕ="rаdio" nАМЕ="а1" vАlue="2"&gt`,
			1
		),
		new Answer(`•	&ltinрut ТУpe="tехt" nАМЕ="а1" vАlue="2"&gt`, 0),
		new Answer(
			`•	&ltinрut ТУРЕ="rаdiobutton" nАМЕ="а1" vАlue="1"&gt&ltinрut ТУРЕ="rаdiobutton" nАМЕ="а1" vАlue="2"&gt`,
			0
		),
	]),
	new Question(`В какой таблице текст выровнен по центру ячеек?`, [
		new Answer(`•	&lttаblе аlign=""lеft""&gt`, 0),
		new Answer(`•	&lttаblе аlign=""сеntеr"" width=""300""&gt`, 1),
		new Answer(`•	&lttаblе аlign=""lеft""&gt`, 0),
		new Answer(`•	нет верного ответа  `, 0),
	]),
	new Question(`Какой тэг определяет тело документа HТМL?`, [
		new Answer(`•	BОDY`, 1),
		new Answer(`•	HEАD`, 0),
		new Answer(`•	МЕТА`, 0),
		new Answer(`•	HТМL`, 0),
	]),
	new Question(`В каком примере корректно описан элемент ТR?`, [
		new Answer(`•	<ТD> <ТD>ячейка1  `, 0),
		new Answer(`•	<ТD> <ТR>ячейка1ячейка2<ТD>`, 0),
		new Answer(`•	<ТR> <ТD>ячейка1<TR>`, 0),
		new Answer(`•	<ТR> <ТD>ячейка1  `, 1),
	]),
	new Question(
		`Какой атрибут тега <img> указывает файл изображения и путь к нему? `,
		[
			new Answer(`•	АLIGN`, 0),
			new Answer(`•	SRC`, 1),
			new Answer(`•	АLТ`, 0),
			new Answer(`•	PATH`, 0),
		]
	),
	new Question(
		`Какой атрибут тега ВОDY позволяет изменять цвет "активных" гиперссылок? `,
		[
			new Answer(`•	CОLОR`, 0),
			new Answer(`•	АLINK`, 1),
			new Answer(`•	ТEXТ`, 0),
			new Answer(`•	VLINK`, 0),
		]
	),
	new Question(`Каким тегом объявляется web-страница?`, [
		new Answer(`•	&lthtml&gt &lt/html&gt`, 1),
		new Answer(`•	&lthead&gt &lt/head&gt`, 0),
		new Answer(`•	&ltbody&gt &lt/body&gt`, 0),
		new Answer(`•	&lttitle&gt &lt/title&gt`, 0),
	]),
	new Question(`Каким тегом объявляется заголовок web-страницы?`, [
		new Answer(`•	&lthtml&gt &lt/html&gt`, 0),
		new Answer(`•	&lthead&gt &lt/head&gt`, 1),
		new Answer(`•	&ltbody&gt &lt/body&gt`, 0),
		new Answer(`•	&lttitle&gt &lt/title&gt`, 0),
	]),
	new Question(`В какой тег заключается основное содержание web-страницы?`, [
		new Answer(`•	&lthtml&gt &lt/html&gt`, 0),
		new Answer(`•	&lthead&gt &lt/head&gt`, 0),
		new Answer(`•	&ltbody&gt &lt/body&gt`, 1),
		new Answer(`•	&lttitle&gt &lt/title&gt`, 0),
	]),
	new Question(`В какой тег заключается название web-страницы?`, [
		new Answer(`•	&lthtml&gt &lt/html&gt`, 0),
		new Answer(`•	&lthead&gt &lt/head&gt`, 0),
		new Answer(`•	&ltbody&gt &lt/body&gt`, 0),
		new Answer(`•	&lttitle&gt &lt/title&gt`, 1),
	]),
	new Question(`Какой код для пустой web-страницы правильный?`, [
		new Answer(
			`•	&lthtml&gt &lthead&gt &lttitle&gt &lt/title&gt &lt/head&gt &ltbody&gt &lt/body&gt &lt/html&gt`,
			1
		),
		new Answer(
			`•	&lthtml&gt &lthead&gt &lttitle&gt &lt/head&gt &ltbody&gt &lt/body&gt &lt/html&gt`,
			0
		),
		new Answer(
			`•	&lthtml&gt &lthead&gt &lttitle&gt &ltbody&gt &lt/body&gt &lt/html&gt`,
			0
		),
		new Answer(
			`• &lthtml&gt &lthead&gt &lttitle&gt &lt/title&gt &lt/head&gt &ltbody&gt &lt/body&gt`,
			0
		),
	]),
	new Question(`В каком коде абзац "Системы счисления" выровнен по центру`, [
		new Answer(
			`•	&ltbody&gt &ltfont align = "right"&gt Системы счисления &lt/font&gt &lt/body&gt`,
			0
		),
		new Answer(
			`•	&ltbody&gt &lth3 align = "center"&gt Системы счисления &lt/h3&gt &lt/body&gt `,
			0
		),
		new Answer(
			`•	&ltbody&gt &ltfont align = "center"&gt Системы счисления &lt/font&gt &lt/body&gt: `,
			0
		),
		new Answer(
			`•	&ltbody&gt &ltр align = "center"&gt Системы счисления &lt/р&gt &lt/body&gt  `,
			1
		),
	]),
	new Question(`Какой html -код задает вывод текста в две строки`, [
		new Answer(
			`•	&ltp&gt Информационные &ltbr&gt технологии &lt/br&gt&lt/p&gt`,
			0
		),
		new Answer(`•	&ltp&gtИнформационные &ltbr&gt технологии &lt/p&gt  `, 1),
		new Answer(
			`•	&ltp&gt Информационные &ltbr&gt технологии &ltbr&gt&lt/br&gt&lt/p&gt`,
			0
		),
		new Answer(
			`•	&ltp&gt &ltbr&gt&ltbr&gt Информационные технологии &lt/br&gt&lt/p&gt`,
			0
		),
	]),
	new Question(`Каким тегом задается вставка изображения на web-страницу?`, [
		new Answer(`•	&lta href="..."&gt &lt/a&gt`, 0),
		new Answer(`•	&ltimg src="..."&gt`, 1),
		new Answer(`•	&ltfont color="..."&gt &lt/font&gt`, 0),
		new Answer(`•	&lta name="..."&gt&lt/a&gt`, 0),
	]),
	new Question(`Каким тегом задается вставка гиперссылки на web-страницу?`, [
		new Answer(`•	&lta href="..."&gt &lt/a&gt`, 1),
		new Answer(`•	&ltimg src="..."&gt`, 0),
		new Answer(`•	&ltfont color="..."&gt &lt/font&gt`, 0),
		new Answer(`•	&lta name="..."&gt&lt/a&gt`, 0),
	]),
	new Question(`Каким тегом задается цвет текста на web-странице?`, [
		new Answer(`•	&lta href="..."&gt &lt/a&gt`, 0),
		new Answer(`•	&ltimg src="..."&gt`, 0),
		new Answer(`•	&ltfont color="..."&gt &lt/font&gt`, 1),
		new Answer(`•	&lta name="..."&gt&lt/a&gt`, 0),
	]),
	new Question(`Каким тегом задается метка на web-странице?`, [
		new Answer(`•	&lta href="..."&gt &lt/a&gt`, 0),
		new Answer(`•	&ltimg src="..."&gt`, 0),
		new Answer(`•	&ltfont color="..."&gt &lt/font&gt`, 0),
		new Answer(`•	&lta name="..."&gt&lt/a&gt`, 1),
	]),
	new Question(`HTML (HYPER TEXT MARKUP LANGUAGE) является:`, [
		new Answer(`•	Графическим редактором`, 0),
		new Answer(`•	Одним из средств при создании Web-страниц  `, 1),
		new Answer(`•	Системой управления базами данных`, 0),
		new Answer(`•	Системой программирования`, 0),
	]),
	new Question(`Способ организации информации на Web-сервере называется:`, [
		new Answer(`•	Web-сайтом  `, 1),
		new Answer(`•	Файлом`, 0),
		new Answer(`•	Мультимедиа`, 0),
		new Answer(`•	Мегассылкой`, 0),
	]),
	new Question(`Какие тэги создают гиперссылку на другие документы?`, [
		new Answer(`•	&ltp&gt&lt/p&gt`, 0),
		new Answer(`•	&ltimg src=”name”&gt`, 0),
		new Answer(`•	&ltbody&gt&lt/body&gt`, 0),
		new Answer(`•	&lta href=”URL”&gt&lt/a&gt`, 1),
	]),
	new Question(`Какие тэги создают абзац в документе?`, [
		new Answer(`•	&ltp&gt&lt/p&gt`, 1),
		new Answer(`•	&ltimg src=”name”&gt`, 0),
		new Answer(`•	&ltbody&gt&lt/body&gt`, 0),
		new Answer(`•	&lta href=”URL”&gt&lt/a&gt`, 0),
	]),
	new Question(`Какой тэг добавляет изображение в HTML документ?`, [
		new Answer(`•	&ltp&gt&lt/p&gt`, 0),
		new Answer(`•	&ltimg src=”name”&gt`, 1),
		new Answer(`•	&ltbody&gt&lt/body&gt`, 0),
		new Answer(`•	&lta href=”URL”&gt&lt/a&gt`, 0),
	]),
	new Question(`Какой из вариантов содержит ошибку:`, [
		new Answer(`•	&lta href=”page.html”#top&gtСсылка`, 1),
		new Answer(`•	&lta href=”page.html”&gtСсылка`, 0),
		new Answer(`•	&lta href=”page.html#17?&gtСсылка`, 0),
		new Answer(`•	&lta href=”page.html#top”&gtСсылка`, 0),
	]),
	new Question(
		`Размер окна браузера 1000 пикселей. На страницу добавили блок с шириной 40%.Затем в этот блок добавили таблицу с шириной 50%. Какова будет ширина таблица в пикселях?`,
		[
			new Answer(`•	500 пикселей`, 0),
			new Answer(`•	250 пикселей`, 0),
			new Answer(`•	215 пикселей`, 0),
			new Answer(`•	200 пикселей  `, 1),
		]
	),
	new Question(
		`Какой из представленных вариантов является валидным по XHTML 1.1: `,
		[
			new Answer(`•	&ltimg src=”foto.jpg” title=”Изображение”&gt`, 0),
			new Answer(`•	&ltimg src=”foto.jpg” alt=”Изображение”&gt  `, 1),
			new Answer(`•	&ltimg src=”foto.jpg” alt=”Изображение” /&gt`, 0),
			new Answer(`•	&ltimg src=”foto.jpg” title=”Изображение”/&gt`, 0),
		]
	),
	new Question(
		`Какой из представленных ниже HTML-кодов НЕ является валидным XHTML 1.1:`,
		[
			new Answer(`•	&ltp&gtТекст&lt/p&gt`, 0),
			new Answer(`•	&ltu&gtПодчёркнутый текст&lt/u&gt`, 1),
			new Answer(`•	&lti&gtКурсив&lt/i&gt`, 0),
			new Answer(`•	&ltp style=”font-size: 1000%;”&gtТекст&lt/p&gt`, 0),
		]
	),
	new Question(
		`Какой тег нужно добавить для переноса строки, сохранив при этом валидность XHTML 1.1?`,
		[
			new Answer(`•	&ltbr /&gt `, 1),
			new Answer(`•	&lthr /&gt`, 0),
			new Answer(`•	&ltbr&gt`, 0),
			new Answer(`•	&lthr&gt`, 0),
		]
	),
	new Question(
		`Необходимо сделать ширину таблицы на всю страницу (либо родительского контейнера). Как ему нужно написать тег &lttable&gt?`,
		[
			new Answer(`•	table width=”auto”&gt`, 0),
			new Answer(`•	&lttable width=”100?&gt`, 0),
			new Answer(`•	&lttable&gt`, 0),
			new Answer(`•	&lttable width=”100%”&gt  `, 1),
		]
	),
	new Question(
		`На сайте внутри папки pages находится файл page.html. А внутри папки images находится файл foto.jpg. Причём папки images и pages лежат в корне сайта.Как правильно написать путь к foto.jpg из файла page.html:`,
		[
			new Answer(`•	../images/pages/foto.jpg`, 0),
			new Answer(`•	../images/foto.jpg  `, 1),
			new Answer(`•	pages/images/foto.jpg`, 0),
			new Answer(`•	images/foto.jpg`, 0),
		]
	),
	new Question(
		`Какую конструкцию необходимо использовать, чтобы появлялась всплывающая подсказка с текстом “Подсказка”? Какой валидный код XHTML 1.1 для этого используется?`,
		[
			new Answer(`•	&ltimg src=”foto.jpg” alt=”Подсказка” /&gt`, 0),
			new Answer(
				`•	&ltimg src=”foto.jpg” alt=”Изображение” title=”Подсказка” /&gt  `,
				1
			),
			new Answer(
				`• &ltimg src=”foto.jpg” alt=”Подсказка” title=”Изображение” /&gt`,
				0
			),
			new Answer(`•	&ltimg src=”foto.jpg” title=”Подсказка” /&gt`, 0),
		]
	),
	new Question(`Как правильно задать ссылку на адрес электронной почты:`, [
		new Answer(`•	&lta href=”mailto:example@gmail.com”&gtНаписать  `, 1),
		new Answer(`•	&lta href=”mail:example@gmail.com”&gtНаписать`, 0),
		new Answer(`•	&lta href=”example@gmail.com”&gtНаписать`, 0),
		new Answer(`•	&lta href=”email:example@gmail.com”&gtНаписать`, 0),
	]),
	new Question(`Для создания подчеркнутого текста служит тег`, [
		new Answer(`• &ltB&gt`, 0),
		new Answer(`• &ltI&gt`, 0),
		new Answer(`• &ltA&gt`, 0),
		new Answer(`• &ltU&gt`, 1),
	]),
	new Question(`Тег, который определяет заголовок для столбца в таблице`, [
		new Answer(`• &lttr&gt`, 0),
		new Answer(`• &ltth&gt`, 1),
		new Answer(`• &lttd&gt`, 0),
		new Answer(`• &lttable&gt`, 0),
	]),
	new Question(`Для обозначения элемента (строки) списка служит тег`, [
		new Answer(`• &ltUL&gt`, 0),
		new Answer(`• &ltLI&gt`, 1),
		new Answer(`• &ltOL&gt`, 0),
		new Answer(`• &ltEM&gt`, 0),
	]),
	new Question(
		`Какое свойство CSS задаёт расстояние от содержимого элемента до рамки?`,
		[
			new Answer(`•	padding`, 1),
			new Answer(`• margin`, 0),
			new Answer(`• outline`, 0),
			new Answer(`• line`, 0),
		]
	),
	new Question(
		`При наведении курсора мыши на пункт меню в CSS его внешний вид может изменяться, привлекая к себе внимание пользователя. Создать такой эффект можно с помощью`,
		[
			new Answer(`•	псевдо-элемент :first`, 0),
			new Answer(`•	ссылки <a>`, 0),
			new Answer(`•	атрибута effect`, 0),
			new Answer(`•	псевдо-класса :hover`, 1),
		]
	),
	new Question(
		`Для создания горизонтального меню на CSS необходимо применить`,
		[
			new Answer(`• list-style-type: none`, 0),
			new Answer(`• display: inline`, 1),
			new Answer(`• position: absolute`, 0),
			new Answer(`• text-decoration: none;`, 0),
		]
	),
	new Question(
		`При помощи какого свойства было создано данное меню на CSS? (Какое данное меню? а хуй знает, я фотку сюда загрузить не могу. Вспоминай как оно выглядело)`,
		[
			new Answer(`• display: block`, 1),
			new Answer(`• display: inline`, 0),
			new Answer(`• display: inline-block`, 0),
			new Answer(`• position: absolute`, 0),
		]
	),
	new Question(`Какое свойство CSS позволяет сделать элемент "плавающим"?`, [
		new Answer(`• border`, 0),
		new Answer(`• padding`, 0),
		new Answer(`• margin`, 0),
		new Answer(`• float`, 1),
	]),
	new Question(
		`Найдите верный код применения свойства CSS float к любой картинке`,
		[
			new Answer(`• hover img float`, 0),
			new Answer(`• img { float: left } `, 1),
			new Answer(`• img float`, 0),
			new Answer(`• pic { float: left }`, 0),
		]
	),
	new Question(
		`Отметьте верный код подключения стилей CSS с помощью тега <link>`,
		[
			new Answer(
				`•&ltlink rel="stylesheet" href="style.css" type="text/css"&gt `,
				0
			),
			new Answer(
				`• &ltlink rel="stylesheet" type="text/css" href="style.css"&gt`,
				1
			),
			new Answer(
				`• &ltlink rel="stylesheet" type="text/javascript" href="style.css"&gt`,
				0
			),
			new Answer(
				`• &ltlink type="text/css" rel="stylesheet" href="style.css"&gt`,
				0
			),
		]
	),
	new Question(
		`Какой тип шрифта чаще всего используется для заголовков и акцентных элементов в дизайне?`,
		[
			new Answer(`• Serif`, 0),
			new Answer(`• Sans-serif`, 1),
			new Answer(`• Script`, 0),
			new Answer(`• Monospace`, 0),
		]
	),
	new Question(`Что такое "белое пространство" в дизайне?`, [
		new Answer(`• display: block`, 1),
		new Answer(`• display: inline`, 0),
		new Answer(`• display: inline-block`, 0),
		new Answer(`• position: absolute`, 0),
	]),
	new Question(`Какое свойство CSS позволяет сделать элемент "плавающим"?`, [
		new Answer(`• Размер области, которую занимает элемент дизайна`, 0),
		new Answer(`• Неприменение цвета в дизайне`, 0),
		new Answer(`• Пространство между элементами на странице `, 0),
		new Answer(
			`• Пространство на странице, оставленное пустым для улучшения читабельности и визуальной привлекательности `,
			1
		),
	]),
	new Question(`Что такое "типографика" в дизайне?`, [
		new Answer(`• Техника создания композиции из разных элементов дизайна`, 0),
		new Answer(`• Размер и расположение текста на странице `, 1),
		new Answer(`• Использование изображений в дизайне`, 0),
		new Answer(`• Процесс создания макета`, 0),
	]),
	new Question(
		`Какой из этих форматов изображения подходит лучше всего для изображений с прозрачным фоном?`,
		[
			new Answer(`• JPEG`, 0),
			new Answer(`• PNG`, 1),
			new Answer(`• GIF`, 0),
			new Answer(`• TIFF`, 0),
		]
	),
	new Question(`Какой из этих шрифтов является примером с засечками (serif)?`, [
		new Answer(`• Helvetica`, 0),
		new Answer(`• Times New Roman `, 1),
		new Answer(`• Verdana`, 0),
		new Answer(`• Arial`, 0),
	]),
	new Question(
		`Какой из этих элементов дизайна является примером использования пропорций?`,
		[
			new Answer(`• Расположение элементов на странице `, 1),
			new Answer(`• Цветовая гамма`, 0),
			new Answer(`• Шрифт`, 0),
			new Answer(`• Использование разных типов шрифтов в дизайне`, 0),
		]
	),
	new Question(`Какое свойство в CSS задает шрифт элемента?`, [
		new Answer(`• font-style`, 0),
		new Answer(`• text-style`, 0),
		new Answer(`• font-size`, 0),
		new Answer(`• font-family  `, 1),
	]),
	new Question(
		`Какое свойство в CSS используется для задания прозрачности элемента?`,
		[
			new Answer(`• transparency`, 0),
			new Answer(`• opacity `, 1),
			new Answer(`• visibility`, 0),
			new Answer(`• alpha`, 0),
		]
	),
];

// The test itself
const quiz = new Quiz(1, questions, results);

Update();

// Test update
function Update() {
	// Checking if there are questions left
	if (quiz.current < quiz.questions.length) {
		// If there are - change the heading
		headElem.innerHTML = quiz.questions[quiz.current].text;

		// Delete old answer's options
		buttonsElem.innerHTML = '';

		// Make buttons for new answer's options
		for (i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
			let btn = document.createElement('button');
			btn.className = 'button';

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute('index', i);

			buttonsElem.appendChild(btn);
		}

		// Display number of current question
		pagesElem.innerHTML = quiz.current + 1 + ' / ' + quiz.questions.length;

		// Call function that will attach events to new buttons
		Init();
	} else {
		// If that's the end - displaying the result
		buttonsElem.innerHTML = '';
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = 'Score: ' + quiz.score;
	}
}

function Init() {
	// Finding all the buttons
	let btns = document.getElementsByClassName('button');

	for (i = 0; i < btns.length; i++) {
		// Attaching the event for every single button
		// On click Click() functiong will work
		btns[i].addEventListener('click', function (e) {
			Click(e.target.getAttribute('index'));
		});
	}
}

function Click(index) {
	// Getting the right answer's number
	let correct = quiz.Click(index);

	// Finding all the buttons
	let btns = document.getElementsByClassName('button');

	// Making buttons gray
	for (i = 0; i < btns.length; i++) {
		btns[i].className = 'button button_passive';
	}

	// If that's a type 1 test, then the right answers will be green and wrong one red
	if (quiz.type == 1) {
		if (correct >= 0) {
			btns[correct].className = 'button button_correct';
		}

		if (index != correct) {
			btns[index].className = 'button button_wrong';
		}
	} else {
		// Otherwise user's choice will be green
		btns[index].className = 'button button_correct';
	}

	// Waiting a second and refreshing the test
	setTimeout(Update, 1000);
}
