"use strict";
class Calculator {
    constructor(params) {
        this.fnum = '';
        this.snum = '';
        this.operation = null;
        this.display = params.display;
        this.operands = params.operands;
        this.clear = params.clear;
        this.equals = params.equals;
        this.operations = params.operations;
    }
    init() {
        this.reset()
            .clearDisplay()
            .listen();
    }
    listen() {
        const keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
        const operations = ['*', '+', '-', '/'];
        document.addEventListener('keypress', (e) => {
            if (e.ctrlKey) {
                return;
            }
            if (e.key.toLowerCase() === 'enter' || e.key === '=') {
                if (!this.fnum && this.fnum <= '' && parseFloat(this.fnum)) {
                    this.reset();
                }
                if (!this.operation &&
                    !this.snum &&
                    this.snum <= '' &&
                    this.operation <= '') {
                    this.write(parseFloat(this.fnum));
                    return;
                }
                else {
                    this.solve();
                }
            }
            else if (operations.indexOf(e.key) !== -1) {
                if (this.display.textContent <= '') {
                    if ((e.key === '-')) {
                        this.writeNum(e.key);
                    }
                    else {
                        return;
                    }
                }
                else if (this.display.textContent === '-') {
                    return;
                }
                else {
                    this.addOperation(e.key);
                }
            }
            else if (keys.indexOf(e.key) !== -1) {
                this.writeNum(e.key);
            }
            else {
                return;
            }
        });
        this.operands.forEach(operand => {
            operand.onclick = (e) => {
                this.writeNum(operand.textContent);
            };
        });
        this.operations.forEach(operation => {
            operation.onclick = (e) => {
                if (this.display.textContent <= '') {
                    if ((operation.textContent === '-')) {
                        this.writeNum(operation.textContent);
                    }
                    else {
                        return;
                    }
                }
                else if (this.display.textContent === '-') {
                    return;
                }
                else {
                    this.addOperation(operation.textContent);
                }
            };
        });
        this.clear.onclick = (e) => {
            this.remove();
        };
        this.clear.ondblclick = (e) => {
            this.reset().clearDisplay();
        };
        this.equals.onclick = (e) => {
            if (!this.fnum && this.fnum <= '' && parseFloat(this.fnum)) {
                this.reset();
            }
            if (!this.operation &&
                !this.snum &&
                this.snum <= '' &&
                this.operation <= '') {
                this.write(parseFloat(this.fnum));
                return;
            }
            else {
                this.solve();
            }
        };
        return this;
    }
    solve() {
        if (!this.checkNums() && this.operation <= '') {
            console.log(this.fnum, this.snum, this.operation);
        }
        this.fnum = parseFloat(this.fnum);
        this.snum = parseFloat(this.snum);
        if (Number.isNaN(this.fnum)) {
            this.reset();
        }
        if (Number.isNaN(this.snum) && Number.isSafeInteger(this.fnum)) {
            this.write(this.fnum);
        }
        switch (this.operation) {
            case '+':
                this.write(this.fnum + this.snum);
                break;
            case '-':
                this.write(this.fnum - this.snum);
                break;
            case '/':
                this.write(this.fnum / this.snum);
                break;
            case '*':
                this.write(this.fnum * this.snum);
                break;
        }
    }
    checkNums() {
        return this.fnum > '' && this.snum > '' && Number.isFinite(parseFloat(this.fnum) && parseFloat(this.snum));
    }
    writeNum(str) {
        if (!this.operation) {
            if (str == '.' && `${this.fnum}`.indexOf('.') !== -1) {
                return;
            }
            this.fnum += str;
            this.display.textContent += str;
        }
        else {
            if (str == '.' && `${this.snum}`.indexOf('.') !== -1) {
                return;
            }
            this.snum += str;
            this.display.textContent += str;
        }
    }
    remove() {
        const removee = this.display.textContent.slice(-1);
        if (this.operation && this.operation > '') {
            if (this.checkChar(removee)) {
                this.snum = `${this.snum}`.slice(0, -1);
            }
            else {
                this.operation = null;
            }
        }
        else {
            this.fnum = `${this.fnum}`.slice(0, -1);
        }
        this.popChar();
    }
    popChar() {
        var _a;
        this.display.textContent = (_a = this.display.textContent) === null || _a === void 0 ? void 0 : _a.slice(0, -1);
        return this;
    }
    checkChar(str) {
        return Number.isSafeInteger(parseFloat(str)) || str === '.';
    }
    addOperation(str) {
        if (!this.operation) {
            this.operation = str;
            this.display.textContent += str;
        }
        else {
            this.solve();
        }
    }
    checkDbSign() {
        var _a;
        const signArray = [
            '--', '-+', '++', '+-'
        ];
        return signArray.indexOf((_a = this.display.textContent) === null || _a === void 0 ? void 0 : _a.slice(-2)) !== -1;
    }
    reset() {
        this.fnum = '';
        this.snum = '';
        this.operation = null;
        return this;
    }
    clearDisplay() {
        this.display.textContent = '';
        return this;
    }
    static formatNum(num) {
        return `${num}`.indexOf('00000') !== -1 ? Number(num.toFixed(5)) : num;
    }
    write(num) {
        if (Number.isNaN(num)) {
            this.reset();
            return;
        }
        this.snum = '';
        this.fnum = Calculator.formatNum(num);
        this.display.textContent = `${Calculator.formatNum(this.fnum)}`;
        this.operation = null;
    }
}
const calculator = document.querySelector('main#calculator');
const equals = calculator.querySelector('span.equals');
const clear = calculator.querySelector('span.C');
const display = calculator.querySelector('#top > span');
const operands = Array.from(calculator.querySelectorAll('span[data-operand]'));
const operations = Array.from(calculator.querySelectorAll('span[data-operation]'));
const params = {
    equals,
    clear,
    display,
    operands,
    operations
};
const calc = new Calculator(params);
calc.init();
