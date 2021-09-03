$(document).ready(function(){
  $("button[name='all']").click(function(){
    $(".internet").show("slow");
    $(".technology").show("slow");
  })
  $("button[name='internet']").click(function(){
    $(".internet").show("slow");
    $(".technology").hide("slow");
  })
  $("button[name='technology']").click(function(){
    $(".technology").show("slow");
    $(".internet").hide("slow");
  })
  $(".kirim_pesan input[type='text'], .kirim_pesan input[type='email'], .kirim_pesan textarea").click(function(){
    $(this).css("background-color", "#fff");
  })
  $(".kirim_pesan input[type='text'], .kirim_pesan input[type='email'], .kirim_pesan textarea").blur(function(){
    $(this).css("background-color", "rgba(255, 255, 255, 0.6)");
  })
  //modal window
  $(".window_content").click(function(){
    var title = $(this).attr("title");
    var content = $(".content_isi[title='"+title+"']").html();
    $("body").css({"margin":"0", "overflow":"hidden"});
    $(".window").css("overflow", "scroll");
    $(".window").show("slow");
    $(".window_isi").append(content);
  })

  $(".window").click(function(e){
    if (e.target !== this) {
        return;
    }
    $(".window_isi").empty();
    $(".window").hide("slow");
    $("body").css({"margin":"0", "overflow-y":"scroll"});
  })
  $("#kirim_pesan").click(function(){
      var nama = $("#kir_nama").val();
      var email = $("#kir_email").val();
      var no_hp = $("#kir_no_hp").val();
      var pesan = $("#kir_pesan").val();
      if (nama !== "" && email !== "" && no_hp !== "" && pesan !== "") {
        $(".send_mes_success").fadeIn("slow").delay(800).fadeOut("slow");
        $("input[type='text'], input[type='email'],input[type='number'], textarea").val("");
    return false;
    }
  })
  $("#kir_no_hp").keypress(function (e) {
      //if the letter is not digit then display error and don't type anything
      if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
         //display error message
          return false;
     }
  });
  $("#btn_menu").click(function(){
    $(".btn_ul_menu").slideToggle("800");
  })


  $(".window_menu button").click(function(){
      $(".window_isi").empty();
      var inp = $("input[name='cari_artikel']").val();
      var length_cont_isi = $(".content_isi").length;
      var content_isi;
      var result, title;
      if (inp == "") {
        $(".searchError").fadeIn("slow").delay(800).fadeOut("slow");
      }
      for (var i = 0; i < length_cont_isi; i++) {
        content_isi = $(".content_isi").eq(i).html();
        title = $(".content_isi").eq(i).attr("title");
        result = content_isi.match(new RegExp(inp, "i"));
        if (result && (inp != "")) {
          var con_isi = content_isi.slice(0,570);
          con_isi += "<a class='baca_artikel_selanjutnya' onclick='readmore(this)' title='"+title+"'>Baca artikel selanjutnya</a>";
          $(".window_isi").append(con_isi);
          $(".baca_artikel_selanjutnya").attr("class","baca_artikel_selanjutnya");
        }
      }
  })

  $(".searchMoreArticle").click(function(){
    $("body").css({"margin":"0", "overflow":"hidden"});
    $(".window").css("overflow", "scroll");
    $(".window").show("slow");
  })

})
// readmore

  function readmore(a){
    $(".window_isi").empty();
    var title = $(a).attr("title");
    var content = $(".content_isi[title='"+title+"']").html();
    $(".window_isi").append(content);
  }
// js typewritter
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };
