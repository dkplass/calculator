var app = new Vue({
    el: '#app',
    data: {        
        expression: '', // 顯示計算歷程
        currentNumber: '', // 顯示當前輸入數值或結果
        isOperating: false // 判斷運算元執行是否結束 true會鎖定特定功能                
    },
    methods: {        
        getNumberSet: function (number) {            
            this.currentNumber += number;
            this.expression += number.toString();  
            this.isOperating = false;          
        },
        devide: function () {
            if(!this.isOperating) {                                                     
                this.expression += '/';
                this.currentNumber = '';
                this.isOperating = true;
            }            
        },
        times: function () {
            if(!this.isOperating) {                                                     
                this.expression += '*';
                this.currentNumber = '';
                this.isOperating = true;
            }            
        },
        plus: function () {   
            if(!this.isOperating) {                                                     
                this.expression += '+';
                this.currentNumber = '';
                this.isOperating = true;
            }                       
        },
        minus: function () {
            if(!this.isOperating) {
                if(this.currentNumber == "") {
                    this.expression += '-';
                    this.currentNumber = '-';                                                            
                } else {                         
                    this.expression += '-';
                    this.currentNumber = '';
                } 

                this.isOperating = true; 
            }
                 
        },
        decimal: function () {            
            if(this.currentNumber.indexOf(".") === -1) {
                this.currentNumber += ".";
                this.expression += '.';                
            }
        },
        addZero: function () {            
            this.currentNumber += "00";
            this.expression += '00';            
        },
        clear: function () {
            this.expression = '';
            this.currentNumber = '';
            this.numberArray = [];
            this.operatorArray = [];
            this.isOperating = false;
        },
        shiftToLeft: function () {
            // 當運算啟用時 無法向左刪除
            if(this.isOperating){
                return;
            }

            let temp = this.currentNumber;
            this.currentNumber = temp.substring(0, temp.length - 1);
            this.expression = this.expression.substring(0, this.expression.length - 1);
        },
        equal: function () {            
            this.currentNumber = eval(this.expression).toFixed(4).toString();                        
            this.expression = this.currentNumber.toString();                         
        }       
    },
    computed: {
        formatNumber: function() {
            let display = this.currentNumber;            
            
            if(display.indexOf('0') > -1) {                 
                display = display.replace(/^(0+)/gi,"");
                this.currentNumber = display;                
            }            
            
            if(display.length > 11) {
                this.currentNumber = display.substr(0, 11);
                alert("超出本計算機運算最大值");
                return display.substr(0, 11);
            } else {
                return display;
            }            
        }
    }
});