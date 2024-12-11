# Course_work
# 1. c++(Visual Studio):
- відкриваєм dynamic link library project у папці с++ і відкриваєм файл funcdll.sln та запускаєм його, щоб створився потрібний нам .dll файл. Оскільки він використовує ООП для певних обрахунків у flask проекті на моєму веб-сайті.
- запуск обов'язковий у режимі Release (x64). У корньовій директорії має створитись така ієрархія: x64 --> Release --> файл funcdll.dll
- саме даний файл з'єднює python flask project та с++ Source.cpp код з обрахунками з викоританням ООП і Header.h (прописана функція, яка використовується у python)
# 2. python(PyCharm):
- install environment for python project
- pip install flask
- pip install flask-cors
- у файлі app.py потрібно вказати шлях до .dll файлу , який ми раніше створили
- flask run
- у разі успішного запуску має видати дане повідомлення з посиланням нашого бекенду:
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000

# 3. js,html/css (WebStorm)
- запускаєм основний файл index.html. 
- після запуску у разі правильного налаштування бекенду, як було описано вище, має показати курси криптовалют та можливість обміну даних валют. У разі відключення бекенду, курси валют пропадуть оскільки усі обрахунки ведуться через бекенд.
- p.s:авторизація працює як заглушка, лише інтерфейс без логіки. Логіка в обрахунках валют.
