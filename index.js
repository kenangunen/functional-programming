//#region //! #1 Pure Function

/**
 ** Saf(pure) fonksiyonlar, fonksiyonel programlamada önemli bir yer teşkil eder, Concurrency (eş-zamanlılık), Test dilebilir kod, tahmin edilebilir kod, deterministik bir kod geliştirmek için pure fonksiyonlar oluşturmanız gerekir.

  - Aynı girdiler için her zaman aynı sonucu verecek
  - Herhangi bir side effect (yan etkisi) olmayan 
  fonksiyona Pure(Saf) fonksiyon denir ve Mapping işlemleri Pure fonksiyon şeklinde yazılabilir.
 */

/**
 ** Referential Transparancy
    - Programın sonucunu değiştirmeden yerine eşdeğer değerini koyma işlemi.
 */

//Max
const max = Math.max;
console.log(max(3, 2, 8, 12));

//Double
const double = (x) => x * 2;
console.log(double(3));
console.log(6);

/**
 ** Mapping fonksiyonlarının Pure fonksiyon olmasındaki zorluklar:
    - Ortak Durum Paylaşımı (Shared State)
    - Random ve Date gibi aynı değeri oluşturmayan fonksiyonların kullanımı
    - Mutability: Geliştirdiğiniz fonksiyon parametre olarak verdiğiniz değeri değiştiriyorsa bunun çoksakıncası vardır. Dışarıda bir state olarak tanımladığınız user nesnesinin nerede hangi fonksiyonun içerisinde nerede değiştirildiğini bilemezsiniz.
 */

//***************** Mutability *****************
const addElement = (arr, el) => {
  arr.push(el);
  return arr;
};
const arr = [1, 2, 3];
console.log(addElement(arr, 5));
//***************** *****************
//#endregion

//#region //! #2 High-Order Functions

/**
 ** High Order Functions fonksiyonların davranışlarındaki ortak örüntüleri bir üst fonksiyona taşımanıza yardımcı olan bir yöntemdir.
 ** Argümanlarında 1 yada 1 den fazla function referansını parametre olarak alan veya return değerini geriye fonksiyon  olarak dönen fonksiyonlara denir. Örneğin:     
    [].forEach (e=> ...) //iterate every elements 
    [].find(e=>...) //return an element according to condition 
    [].findIndex(e=>...) //return an element index according condition 
    [].filter(e=>...) return items according to condition 
    [].sort(e=>...) sorts according to given condition 
    [].map(e=>...) transform existing array to other array 
    [].reduce(e=>...) combines elements and return an element 
    [].some(e=>...) check some elements 
    [].every(e=>...)
 */

//***************** ForEach *****************
//Procedural Programing
const tempArr = ["red", "green", "blue"];

//Functional Programing
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

//* Fonksiyonel Programlama yaklaşımında For döngüsünü myEach fonksiyonu içerisine encapsulate ediyoruz. Bu sayede sürekli tüm elemanlarını dönecek kodları her yerde yazmamıza gerek kalmaz.
Array.prototype.myEach = function (fn) {
  for (let i = 0; i < this.length; i++) {
    fn(this[i]);
  }
};

tempArr.myEach((el) => console.log(el));
//***************** *****************

//***************** Sabit iş yapan Template Fonksiyon *****************
//* Örneğin verilen sayıyı 5 ve 10 ile toplayan 2 tane fonksiyon yapmak isteyelim.

// Procedural Programing: Her bir Adder fonksiyonu için toplama işlemi dağıttığımızı görebilirsiniz.
function fiveAdder(x) {
  return x + 5;
}
function tenAdder(x) {
  return x + 10;
}
console.log(fiveAdder(7)); //12
console.log(fiveAdder(12)); //22

// Functional Programing: Bu tip fonksiyon toplama işlemini template’e dönüştürmek için High Order Functions kullanabilirsiniz. Toplama işlemi içinde makeAdder şeklinde bir fonksiyon yazmamız yeterli.
makeAdder = (x) => (y) => x + y;

const fiveAdder = makeAdder(5);
const tenAdder = makeAdder(10);

console.log(fiveAdder(7)); //12
console.log(tenAdder(12)); //22
//***************** *****************
//#endregion

//#region //! #3 Currying Functions

/**
 ** Curried fonksiyonlar birden fazla parametre alan fonksiyonlar yerine her seferinde bir parametre alacak şekilde fonksiyonun yapılandırılmasıdır. Bunu da 1 parametre alıp geriye diğer parametreyi alacak fonksiyonu dönerek gerçekleştirir.
 */

// Örnek
function sum(a, b) {
  return a + b;
}
const sumES6 = (a, b) => a + b;
console.log(sum(3, 2));

function sumCurried(a) {
  return function (b) {
    return a + b;
  };
}
const sumCurriedES6 = (a) => (b) => a + b;
console.log(sumCurriedES6(2)(4));

//***************** Birbirlerini Kapsayan Fonksiyonların Çağrılması *****************
/**
 * 2 tane fonksiyonumuz olsun. İlkinin çıktısını, diğerine verdiğimiz fonksiyon türlerini deneyelim ve her fonksiyon çalıştığında bunu console log olarak basalım. 
    Örneğin f(g(x))
    - Birincisi gelen girdi değerini 1 ile toplayan
    - İkincisi gelen değeri 2 ile çarpan
 */

// Procedural Programing
function addOne(x) {
  return x + 1;
}
function multiplyTwo(x) {
  return x * 2;
}
function doStuff(x) {
  let result = addOne(x);
  console.log(`after addOne ${result}`);
  result = multiplyTwo(result);
  console.log(`after multiplyTwo ${result}`);
}

doStuff(20);
//after addOne 21
//after multiplyTwo 42

// Functional Programing
const g = (n) => n + 1;
const f = (n) => n * 2;

const trace = (label) => (value) => {
  console.log(`${label}: ${value}`);
  return value;
};

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((y, f) => f(y), x);

const doStuffFunctional = pipe(g, trace("after g"), f, trace("after f"));
doStuffFunctional(20);
//***************** *****************
//#endregion

//#region //! #4 Function Accepting Functions

/**
 ** Currying fonksiyonların nasıl kullanıldığını bir önceki bölümde anlatmıştık. Aşağıdaki fonksiyonların her biri birbirinin aynısı ve soldan → sağa doğru işletilerek ilerletilebilir.
    sum(a,b) yerine const sum=a=>b=>a+b; 
    multiply(a,b) const multiply=a=>b=>a*b; 
    //ve diğer subraction ve divide vb fonksiyonları  
    //currying fonksiyon olarak yazabiliriz.
 */

// Yukarıdaki sistemi biraz daha ileriye götürüp toplama, çıkarma ve çarpma ve bölme işlemlerini de calc fonksiyonu ile soyutlayabiliriz. İşlem yapmasını istediğimiz fonksiyonu parametre olarak geçirip bunu da dinamik hale getirebiliriz.

const add = (a) => (b) => a + b;
const sub = (a) => (b) => b - a;
const multi = (a) => (b) => a * b;
const div = (a) => (b) => b / a;
const calc = (fn) => (a) => (b) => fn(a)(b);

var addTwo = calc(add)(2); //Function Accepting Functions
var multiTwo = calc(multi)(2); //Function Accepting Functions
var divTwo = calc(div)(2); //Function Accepting Functions
var subTwo = calc(sub)(2); //Function Accepting Functions

console.log(addTwo(10)); // * addTwo(10) = calc(add)(2)(10)
console.log(multiTwo(10));
console.log(divTwo(10));
console.log(subTwo(10));

//? Not: Buradaki bir problem fonksiyon parametre sayısını calc fonksiyonu biliyor yani tüm fonksiyonlarımız en sonunda 2 parametre alıyor. Peki argüman sayısı değişken fonksiyonları desteklemek için ne yapmalıyız ? Örneğin add(a,b,c,d,e ...) için ne yapmalıyız ? Bir sonraki konuda '#5 Partial Applications' konusunda bunun üzerinde duracağım.
//#endregion

//#region //! #5 Partial Function Applications

/**
 * Bir önceki bölümde Function Accepting Functions yazısında nasıl aynı parametredeki işlemleri fonksiyonları da parametre olarak geçirip işletebileceğimizi anlatmıştık. Ama fonksiyonumuz 2 parametre almak yerine 3 parametre, 4 parametre alan fonksiyon olduğunda sistemimizi nasıl genişleteceğiz. addTwo fonksiyonunu aşağıdaki sum2, sum3, sum4 destekleyecek hale nasıl getiririz.
  
  sum2=(a,b)=>a+b; 
  sum3=(a,b,c)=>a+b+c; 
  sum4=(a,b,c,d)=>a+b+c+d
 */

// Bunu ES6 ile array argümanı alacak şekilde geliştirebiliriz.
const sumReducer = (acc, val) => acc + val;
const sum = (args) => args.reduce(sumReducer);
console.log(sum([1, 2])); //3
console.log(sum([1, 2, 3])); //6
console.log(sum([1, 2, 3, 4])); //10

// Aşağıdaki fonksiyonda 1 ile toplama işlemi sabit kısımdır. Bir ile toplamayı kalıp haline getirip içerisinde geçen parametreleri topladıktan sonra 1 rakamına bunu ekliyoruz.
const sumReducer_ = (acc, value) => acc + value;
const sum = (...args) => args.reduce(sumReducer_);

const partial =
  (fn, ...args) =>
  (...arg2) =>
    fn(...args, ...arg2);
const addOne = partial(sum, 1);

console.log(addOne(4)); //5
console.log(addOne(10, 2, 3)); //16

// ? Partial placeholder ( __ ) tanımlayıp uygulamanın istediğiniz kısmını sabit, istediğiniz kısmını dinamik hale getirebilirsiniz. Aşağıdaki örnekte kırmızı, yeşil ve mavi renk tonlarını oluşturabilirsiniz.
const hex = (r, g, b) => "#" + r + g + b;
console.log(hex("11", "22", "33")); // "#112233"
const partialAny = (function () {
  function partialAny(fn, ...orig) {
    return (...partial) => {
      const args = [];
      for (let i = 0; i < orig.length; i++) {
        args[i] = orig[i] === partialAny._ ? partial.shift() : orig[i];
      }
      returnfn.apply(this, args.concat(partial));
    };
  }
  partialAny._ = {};
  return partialAny;
})();

const __ = partialAny._;
const maxRed = partialAny(hex, "ff", __, __); //ffaabb
console.log(maxRed("aa", "bb"));
const greenMax = partialAny(hex, __, "ff", __); //aaffbb
console.log(greenMax("aa", "bb"));
const blueMax = partialAny(hex, __, __, "ff"); //aabbff
console.log(greenMax("aa", "bb"));

//#endregion

//#region //! #6 Point-Free Style

/**
 ** Fonksiyon tanımlamasında hiç bir zaman üzerinde işlenecek data bahsini kullanmamak. Bu şekilde fonksiyon yazarak kod geliştirmeye Point Free Style denir.
 
 Peki fonksiyonu nasıl tanımlıyoruz? Fonksiyon girdi parametreleri alıp, bu parametreleri işletip geri sonuç olarak dönen fonksiyonlardır.

 Bu durumda fonksiyonu girdi parametreleri olmadan nasıl tanımlayabiliriz ? Aslında bu fonksiyonların parametre almayacağı anlamına gelmiyor sadece bu fonksiyon alan fonksiyonların başka bir fonksiyonla kapsanarak bunun parametre almayan stil ile yazılmasıdır. 
 */

//Örneğin; Toplama işlemi normal bir şekilde yazıldığında fonksiyon a, b değerlerini alan bir fonksiyon olarak yazılır.
const add_ = (a) => (b) => a + b;
console.log(add_(2)(3));

//Bunu Point Free Style yazmak istediğimizde dışarıdan değişken almayan fonksiyonlar oluşturuyoruz. fiveAdder ve tenAdder dışarıdan bir değişken almadığını görebilirsiniz.
const fiveAdder = add(5);
const tenAdder = add(10);
console.log(tenAdder(4)); //14

//***************** compose function *****************
//Aşağıdaki örnekte name dışardan parametre olarak aldığı için burada bu yazım stili Point Free Style olmuyor.
const initials = (name) =>
  name.split(" ").map(compose(toUpperCase, head)).join(". ");

//Bu fonksiyonu aşağıdaki şekilde yazdığımızda fonksiyonları parametrelerini kaybedip compose, join, toUpperCase, split head fonksiyonlarını işleten bir dış kapsayıcıya dönüştürerek yazdığınızda buna Point Free Style deniyor.
const initials_ = compose(
  join(". "),
  map(compose(toUpperCase, head)),
  split(" ")
);
initials("hunter stockton thompson"); // 'H. S. T'

//Örnek bir compose fonksiyonu
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((y, f) => f(y), x);
//* f(y) ilk olarak func2'i çalıştırıyor parametre olarak 5'i veriyor. Daha sonra func1'yi çalıştırarak parametre olarak func1 sonucu olan 15'i veriyor. reduceRight dediğimizi çin sağdan sola çalıştı.

const func1 = (x) => {
  // x = 5
  return x + 10;
};
const func2 = (x) => {
  // x = 15
  return x * 3;
};
const final = compose(func1, func2)(5);
console.log(final);
//***************** *****************

//***************** pipe function *****************
// compose fonksiyonun tersini yazmak istersek, yani parametre olarak verilen fonksiyonların sağdan sola değilde, soldan sağa çalışmasını istersek pipe fonksiyon kullanıyoruz. pipe fonksiyonlar reduceRight yerine reduce kullanır.
const pipe_ =
  (...fns) =>
  (x) =>
    fns.reduce((y, f) => f(y), x);
//***************** *****************

/**
 * !Bazı kütüphanelerde compose ve pipe fonksiyonları
 ** Ramda: compose and pipe
 ** !Lodash: flowRight (compose) and flow (pipe)
 */
//#endregion
