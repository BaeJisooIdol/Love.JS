function Validation(opptions) {
    var getRules = [];
    function Validate(inputElement, rule) {
        var rules = getRules[rule.selections];
        var massage = inputElement.parentElement.querySelector('.massage')
        for (var rule of rules) {
            var errorMassage = rule(inputElement.value);
            if (errorMassage) break;
        }
        if (errorMassage) {
            massage.innerText = errorMassage;
        }
        return errorMassage;
    };
    var formElement = document.querySelector(opptions.form)
    if (formElement) {

        formElement.onsubmit = function (e) {
                e.preventDefault()

                opptions.rules.forEach(function (rule) {
                    var inputElement = formElement.querySelector(rule.selections)

                    Validate(inputElement, rule)
                })

                var isFromValid = true;

                

                if (isFromValid) {
                    if (typeof opptions.onSubmit === 'function') {
                        var enableInputs = formElement.querySelectorAll('input[name]');
                        var formValue = Array.from(enableInputs).reduce(function (values, curr) {
                            values[curr.name] = curr.value;
                            return values;
                        }, {});

                        opptions.onSubmit(formValue)
                    }
                }

        };

        opptions.rules.forEach(function (rule) {
            if (Array.isArray(getRules[rule.selections])) {
                getRules[rule.selections].push(rule.test);
            } else {
                getRules[rule.selections] = [rule.test];
            }
            var inputElement = formElement.querySelector(rule.selections)
            if (inputElement) {
                inputElement.onblur = function () {
                   var isValid = Validate(inputElement, rule)

                   if (isValid) {
                    isFromValid = false;
                  }
                };

                

                inputElement.oninput = function () {
                    var massage = inputElement.parentElement.querySelector('.massage')
                    if (inputElement.value) {
                        massage.innerText = '';
                    }
                }
            }
        });
    };

    return
        {isValid}
  
}

Validation.isRequire = function (selections) {
    return {
        selections: selections,
        test: function (value) {
            return value ? undefined : 'Vui lòng nhập trường này'
        }
    }
}
Validation.isEmail = function (selections) {
    return {
        selections: selections,
        test: function (value) {
            var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(value) ? undefined : 'Trường này phải là email'
        }
    }
}

Validation.isPassword = function (selections, min) {
    return {
        selections: selections,
        test: function (value) {
            return value.length >= min ? undefined : 'Mật khẩu tối thiểu ít nhất 6 kí tự'
        }
    }
}
Validation.isConfirmPassword = function (selections, conFirm) {
    return {
        selections: selections,
        test: function (value) {
            return value == conFirm() ? undefined : 'Mật khẩu nhập lại chưa chính xác'
        }
    }
}


var title = document.querySelector('.title')
 
setInterval (function () {
    title.classList.toggle('blue')
}, 1000)

setInterval (function () {
    title.classList.toggle('red')
}, 2000)

setInterval (function () {
    title.classList.toggle('yellow')
}, 3000)

// Get API

var API = 'http://localhost:3000/getDatas';




function start(Validation) {
    getDatas()
    handelDatas()

    
}

start(Validation)

function getDatas() {
    fetch(API)
        .then(function (responsive) {
            return responsive.json();
        })
        .then(function (callback) {
            return callback
        })
}

function postDatas(getDatas, data) {
    var opption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }
    fetch(API, opption)
        .then(function (responsive) {
            return responsive.json();
        })
        .then(function (callback) {
           
        })

}

function handelDatas() {
    
    var submit = document.querySelector('.submit');
    submit.onclick = function () {
        var data;
        var enableInputs = document.querySelectorAll('input[name]');
        var formValue = Array.from(enableInputs).reduce(function (values, curr) {
            values[curr.name] = curr.value;
            return values;
        }, {});

        data = formValue;

        postDatas(getDatas, data) 
    }


}