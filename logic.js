$(()=>{
    let ajax = new XMLHttpRequest(),
    gameTitle = document.getElementById("game-title"),
    question = document.getElementById("quiz"),
    variants = document.getElementById('variants'),
    x = 0,
    quizHtm = '',
    json;

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
            quizHtm += '<div class="variant"><span>'+ (i+1) + '.' + el +'</span></div>'
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

        $(".variant").click(()=>{
            if(x + 1 < json.quiz.length){
                x++
                quizHtm = ""
                check()
                console.log(x + 1)
            }else{
                $('#finish-btn').css("display", "block")
                console.log('end')
            }
        })
    }
})