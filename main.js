//N=28
//13 вариант

//node main.js

const eps = 0.0001;
const a = 0;
const b = 1;
const func = x => Math.log(1 + Math.exp(1 / (1 + x ** 2)));

const xi = b; //так как формула правых прямоугольников


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

console.log(`\x1b[1mЗначение определенного интеграла
функции \x1b[3mln(1 + e^(1 / (1 + x^2)))\x1b[0m\x1b[1m на интервале \x1b[3m[${a}, ${b}]\x1b[0m\x1b[1m`)
console.log(`1) с точностью ${eps} по составной формуле правых прямоугольников:
\x1b[34m${calcIntegralByComplexRectFormula(func, a, b)}`);


//Гаусс
//https://en.m.wikipedia.org/wiki/Gaussian_quadrature
const GAUSS_CONSTANTS = {
    2: {
        weights: [1, 1],
        abscissas: [-0.5773502691896257, 0.5773502691896257]
    },
    3: {
        weights: [
            0.8888888888888889,
            0.5555555555555556, 0.5555555555555556
        ],
        abscissas: [
            0,
            -0.774596669241483, 0.774596669241483
        ]
    },
    4: {
        weights: [
            0.6521451548625461, 0.6521451548625461,
            0.3478548451374538, 0.3478548451374538
        ],
        abscissas: [
            -0.3399810435848563, 0.3399810435848563,
            -0.8611363115940526, 0.8611363115940526
        ]
    }
}

function gaussQuadrature(f, interval, order = 3) {
    if (interval[0] === interval[1]) {
        return 0;
    }
    const { weights, abscissas } = GAUSS_CONSTANTS[order];
    const [a, b] = interval;
    let result = 0;
    const m1 = (b - a) / 2;
    const m2 = (b + a) / 2;
    for (let i = 0; i <= order - 1; i++) {
        result += weights[i] * f(m1 * abscissas[i] + m2);
    }
    return m1 * result;
}

console.log(`\x1b[37m2) с точностью ${eps} по составной формуле правых прямоугольников:
\x1b[34m${gaussQuadrature(func, [a, b])} \x1b[0m`);
