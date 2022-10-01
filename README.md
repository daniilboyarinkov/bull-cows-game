# Игра быки и коровы

## **[Играть](https://dccs27.csb.app/)**

**Быки и коровы** — это логическая игра, в которой нужно угадать задуманное компьютером или игроком число за как можно меньшее количество попыток.

![image](https://user-images.githubusercontent.com/89917619/193395347-474b45c0-3a1f-4975-a590-519717fc2d0a.png)

 ## Причём тут животные?
 
**Это подсказки.**

**Количество быков** — количество цифр, которые **есть в задуманном числе И стоят на верных позициях.**

**Количество коров** — количество цифр, которые **есть в задуманном числе.** Но при этом они стоят на неверных позициях.

## Что за режимы?

У игры есть разные вариации. В этом случае с повторением цифр в числе и без.

**Режим с повторениями** означает, что в загаданном числе **цифры могут повторяться.**

**Режим без повторений** означает, что в загаданном числе **цифры НЕ могут повторяться.**

![image](https://user-images.githubusercontent.com/89917619/193395404-4b0e5627-0938-4d97-a8f9-a9af5edd115d.png)

## За сколько ходов можно угадать число?

А это самое интересное!

В режиме **без повторений** количество возможных варинтов высчитывается по формуле:

![Формула](https://wikimedia.org/api/rest_v1/media/math/render/svg/99e9effb201d5c0945b3a152db5a0d53fecce892)

где N - Система счисления, а k - кол-во цифр в числе

Поэтому кол-во возможных вариантов равно 4536 (так как 0 не может стоять на первом месте).

В режиме **с повторениями** количства возможных вариантов ещё боьльше. Высчитаваются они по формуле:

![Формула](https://wikimedia.org/api/rest_v1/media/math/render/svg/feb62e42bc3d3ca9665480e0f171084426734c05)

Поэтому кол-во возможных вариантов равно 9000 (так как 0 не может стоять на первом месте).

## Так много вариантов! А можно как-то быстрее угадывать?

Можно!

Дональд Кнут доказал, что чтобы выигратьв эту игру достаточно всего 5 ходов!

[Алгоритм Кнута для победы в игре Быки и коровы](https://ru.wikipedia.org/wiki/%D0%91%D1%8B%D0%BA%D0%B8_%D0%B8_%D0%BA%D0%BE%D1%80%D0%BE%D0%B2%D1%8B)


