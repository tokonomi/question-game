let ajax = new XMLHttpRequest(),
gameTitle = document.getElementById("game-title"),
question = document.getElementById("quiz"),
variants = document.getElementById('variants'),
quizSec = document.getElementById("quiz-sec"),
x = 0,
quizHtm = '',
json,
tre = 0,
fls = 0;

function res(){
    let res = "<div>Правильные ответы: "+ tre +" </div><div>Не верные ответы: "+ fls +" </div>"
    $("#quiz-sec").css({
        display: "grid",
        "grid-template-columns": "auto auto",
        "justify-content": "space-around"
    })
    quizSec.innerHTML = res
}

$(()=>{
    game()

    function game(){
        ajax.open("GET", "quiz.json")
        ajax.send()
        ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            json = JSON.parse(this.responseText)
            check()
        }
    }
    }
    function check(){
        console.log(json)
        gameTitle.innerHTML = json.title
        question.innerHTML = (x+1) + '.' + json.quiz[x].q
        json.quiz[x].a.forEach((el, i) => {
            quizHtm += '<div class="variant"><span>'+ (i+1) + '. ' + el +'</span></div>'
        });
        variants.innerHTML = quizHtm
        
        $(".variant").hover(
            function(){
                $(this).css({backgroundColor: "#000", cursor: "pointer"})
            },
            function(){
                $(this).css({backgroundColor: "#333"})
            }
        )

        $(".variant").click(function(){
            $(".variant").addClass("disabledbutton");
            if($(this).index() == json.quiz[x].ans){
                $(this).off('mouseenter mouseleave')
                tre++
                $(this).css('backgroundColor', 'green')
            }else {
                $(this).off('mouseenter mouseleave')
                fls++
                $('.variant').eq(json.quiz[x].ans).css('backgroundColor', 'green')
                $(this).css('backgroundColor', 'red')
            }
            if(x + 1 < json.quiz.length){
                x++
                quizHtm = ""
                setTimeout(check, 500)
            }else{
                $('#finish-btn').css("display", "block")
                console.log('end')
                console.log(tre)
                console.log(fls)
            }
        })
    }
})