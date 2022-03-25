

document.myForm.addEventListener('submit', function(event){
   event.preventDefault();

   let Color = document.getElementById('Color').value;
   Color = Color.toUpperCase();
   let Type = document.getElementById('Type').value;
   let Code = document.getElementById('Code').value;

   let span = document.getElementsByClassName('span');
   let lengName = document.getElementsByClassName('name');
   let arrName = []; //массив названий

   let regexp0 = /^([a-z]+)$/i; //проверка Color
   let regexp1=/^rgb\((\s?(\d\d?|1\d\d|2[0-4]\d|25[0-5]),){2}(\s?(\d\d?|1\d\d|2[0-4]\d|25[0-5]))\)$/; //проверка rgb
   let regexp2 = /(^rgba\((\s?(\d\d?|1\d\d|2[0-4]\d|25[0-5]),){3})\s?(1|0(\.[1-9])?\)$)/; //проверка rgba
   let regexp3 = /(^#([a-f0-9]{3})([a-f0-9]{3})?$)/; //проверка HEX

   for (i=0; i< lengName.length; i++ ) {
      arrName.push(document.getElementsByClassName('name')[i].innerHTML);   
   }

      if (arrName.includes(Color)) {  
         message(span[0], 'Уже существует')
      } else if (Validate(regexp0, Color)) {
         message(span[0], '')
      } else {
         message(span[0], 'Только лат. буквы')
      }
         
      if (Type == "RGB") {
         if (Validate(regexp1, Code)){
            message(span[1], ''); 
         } else {
            message(span[1], `Формат RGB: "rgb(0-255, 0-255, 0-255)"`);
         }  

      } else if (Type == "RGBA") {
         if (Validate(regexp2, Code)){
             message(span[1], '');
         } else {
             message(span[1], `Формат RGBA: "rgba(0-255, 0-255, 0-255, 0-1)"`);
         }

      } else if(Type == "HEX") {
         if(Validate(regexp3, Code)){
            message(span[1], '');
         } else {
            message(span[1], `Формат HEX: "#0-9a-f" (3 или 6 знаков)`);
         }
      }
   if ((span[0].innerText == "") & (span[1].innerText == "")) {
      createColor(Color, Type, Code);
      document.getElementById('Color').value = "";
      document.getElementById('Code').value = "";
   }
   
});

//функции для проверки цветов

function Validate(regexp, inp) {
   return regexp.test(inp);
}

function message( el, mess) {
   el.innerHTML = mess;
}

//функция создания блока
function createColor (Color, Type, Code){

   let container = document.getElementById('grid');
   let result = document.createElement("div");
   result.className = "result";
   
   let opacity = document.createElement("div");
   opacity.className = "opacity";
   
   let name1 = document.createElement("h4");
   name1.className = "name";
   let type = document.createElement("p");
   type.className = "type";
   let code = document.createElement("p");
   code.className = "code";
   result.appendChild(opacity);
   opacity.appendChild(name1);
   opacity.appendChild(type);
   opacity.appendChild(code);
   container.appendChild(result);

   result.style.backgroundColor = Code; 
   name1.innerHTML = Color;
   type.innerHTML = Type;
   code.innerHTML = Code;
}


//Вопросы:

//cookies
//Не разобралась какие элементы указывать в куках. Предполагаю, что их нужно расположить в последнем условии, после функции createColor()(стр 54). Пробовала - не получилось.
// Пожалуйста, покажите, как это делается на примере этого задания.

//Поиск нерегистрозависимого значения
//Сделала через массив и UperCase. Как это можно сделать с помощью регулярного выражения?(стр 20-24)