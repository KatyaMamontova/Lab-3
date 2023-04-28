//N=28
//13 вариант

//node main.js

const eps = 0.0001;
const a = 0;
const b = 1;
const func = x => Math.log(1 + Math.exp(1 / (1 + x ** 2)));

const xi = b; //так как формула правых прямоугольников

const n = 3; //3 узла для формулы Гаусса

function simpleRectFormula(f, a, b, xi) {
    return (b - a) * f(xi);
}

function complexRectFormula(f, a, b, m) {
    const h = (b - a) / m;
    let I = 0;
    for (let i = 0; i < m; i++) {
        x = a + i * h;
        I += h * f(x);
    }
    return I;
}

function calcIntegralByComplexRectFormula(f, a, b) {
    let m = 1;
    let I1 = 0;
    let I2 = complexRectFormula(f, a, b, m);
    m *= 2;
    while (Math.abs(I1 - I2) > eps) {
        I1 = complexRectFormula(f, a, b, m);
        m *= 2;
        I2 = complexRectFormula(f, a, b, m);
    }
    return I2;
}

console.log(`\x1b[1mЗначение заданного интеграла ln(1 + e^(1 / (1 + x^2))) 
с точностью ${eps} (по составной формуле правых прямоугольников):
\x1b[34m${calcIntegralByComplexRectFormula(func, a, b)} \x1b[0m`);


//Гаусс

function gaussMethod(n, x) {
    //n - количество узлов
    let polynoms = [];
    //let X = new Array(n).fill(0);
    let X = [];
    let poly = 1;
    // n - 1 ?...
    //пффф Х - неизвестен же
    for (let l = 0; l < n - 1; i++) {
        for (let i = 0; i < n; i++) {
            poly *= (x - X[i]);
        }
        polynoms[l] = poly * X[l];
        poly = 1;
    }
    //теперь как-то считать сами x на основе полученных полиномов
    //это у меня подынтегральные функции в polynoms
    //для интегралов, которые должны составить систему уравнений

    //теперь коэфициенты квадратуры
    let numerator = 1;
    let denominator = 1;
    let A = [];
    //емае тут тоже х - неизвестен
    for (let i = 0; i < n; i++) {
        for (k = 0; k < m; k++) {
            if (i != k) {
                numerator *= x - X[i]
                denominator *= X[k] - X[i]
            }
            A[k] = numerator / denominator;
        }
    }
    A.forEach(Ak => calcIntegralByComplexRectFormula(Ak, a, b))
}


// https://translated.turbopages.org/proxy_u/en-ru.ru.b788291c-644bbe59-80d2e2d6-74722d776562/https/en.wikipedia.org/wiki/Gaussian_quadrature
//про изменение пределов интегрирования (Пример двухточечного квадратурного правила Гаусса)

