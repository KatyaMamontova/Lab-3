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


