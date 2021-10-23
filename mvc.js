$(()=>{
    const view = {
    showTitle(title){
        document.getElementById("game-title").innerHTML = title
    },
    showQuestion(question){
        document.getElementById("quiz").innerHTML = question
    },
    showVariant(variants){
        document.getElementById("variants").innerHTML = variants
    }
}

    const model = {
        json: "",
        jsonData(){
            let ajax = new XMLHttpRequest()
            ajax.open("GET", "quiz.json")
            ajax.send()
            ajax.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    model.json = JSON.parse(this.responseText)
                    controller.check()
                }
        }},
        x: 0,
        tre: 0,
        fls: 0
    }

    const controller = {
        check(){
            let json = model.json,
                quizHtm = ''
            json.quiz[model.x].a.forEach((el, i) => {
                quizHtm += '<div class="variant"><span>'+ (i+1) + '. ' + el +'</span></div>'
                return quizHtm
            })

            view.showTitle(json.title)
            view.showQuestion((model.x+1) + '.' + json.quiz[model.x].q)
            view.showVariant(quizHtm)

            $(".variant")
            .hover(
                function(){
                    $(this).css({backgroundColor: "#000", cursor: "pointer"})
                },
                function(){
                    $(this).css({backgroundColor: "#333"})
                }
            )
            .click(function(){
                $(".variant").addClass("disabledbutton");
                if($(this).index() == json.quiz[model.x].ans){
                    $(this).off('mouseenter mouseleave')
                    model.tre++
                    $(this).css('backgroundColor', "green")
                }else{
                    $(this).off('mouseenter mouseleave')
                    model.fls++
                    $('.variant').eq(json.quiz[model.x].ans).css('backgroundColor', 'green')
                    $(this).css('backgroundColor', 'red')
                }
                if(model.x + 1 < json.quiz.length){
                    model.x++
                    quizHtm = ""
                    setTimeout(controller.check, 500)
                }else{
                    $("#finish-btn").css("display", "block")
                }
            })
        },
        res(){
            let res = "<div>Правильные ответы: "+ model.tre +" </div><div>Не верные ответы: "+ model.fls +" </div>"
            $("#quiz-sec").css({
                display: "grid",
                "grid-template-columns": "auto auto",
                "justify-content": "space-around"
            })
            document.getElementById('quiz-sec').innerHTML = res
        }
    }

    
        let start = {
            init(){
                this.main();
                this.control();
                this.event();
            },

            main(){

            },

            control(){
            },

            event(){
                model.jsonData()
                document.getElementById('res-btn').onclick = controller.res
            }
        }

        start.init()
    
})
