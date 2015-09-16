$(function(){

    //头部导航栏
    $(window).scroll(function(){

        //获取滚动条并一直在最上方
        var vtop = $(document).scrollTop();
        if(vtop > 0){
            $("#header").css({ "position": "fixed", "width": "100%" });
        }else{
            $("#header").css({"position":"","width:":"100%"});
        }

    });

    //隐藏菜单栏
    var menu_flag = true,menu_lock = true;
    $("#menu_btn").bind('click',function(){
        if(menu_lock){
            menu_lock = false;

            if(menu_flag === true){

                $(".menu").animate({'width':'0%','min-width':'0px'}, "slow",function(){
                    $("#menu_nav").css({"display":"none"});
                });
                $("#menu_btn").css({"background":"../images/menu_banner_active.png"});
                $(".article").animate({'width':'98%'}, "slow");
                menu_flag = false;
            }else{

                $(".menu").animate({'width':'15%','min-width':'200px'}, "slow");
                $("#menu_btn").css({"background":"../images/menu_banner.png"});
                $(".article").animate({'width':'83%'}, "slow");
                $("#menu_nav").css({"display":"block"});
                menu_flag = true;
            }
            menu_lock = true;
        }
    });

    //获取文件夹名称
    $.post(path+'/pathfs',function(data){
        for(var i in data){
            $(".header_item").append("<li>"+data[i]+"</li>");
        }

        $.post(path+'/search_fs',{'itemName':data[0]},function(data){
            if(data.length>1){
                $("#menu_nav").html('');
                $("#article").html('');
                for(var i in data){
                    var temp = "";
                    for(var j in data[i].items){
                        temp += "<li><a href=#item_"+i+"_"+j+">"+data[i].items[j].itemName+"</a></li>";
                    }
                    $("#menu_nav").append('<li>'+data[i].itemName+'<ul>'+temp+'</ul></li>');
                    var article_temp = "";
                    for(var e in data[i].items){
                        article_temp += "<div id='item_"+i+"_"+e+"' class='item'>"+data[i].items[e].content+"</div>";
                    }
                    $("#article").append(article_temp);
                }

                //锚点滑动效果
                $("#menu_nav li ul li a").click(function(){
                    var cl = $(this).attr('href');
                    $('html,body').animate({scrollTop: $(cl).offset().top}, 1500);
                });

            }
        });


        //选择导航显示对应的文件
        $("#menu_btn").siblings().bind('click',function(){
            //发送点击事件获取子文件信息
            $.post(path+'/search_fs',{'itemName':$(this).text()},function(data){
                if(data.length>0){
                    $("#menu_nav").html('');
                    $("#article").html('');
                    for(var i in data){
                        //console.dir(data[i]);
                        var temp = "";
                        for(var j in data[i].items){
                            temp += "<li><a href=#item_"+i+"_"+j+">"+data[i].items[j].itemName+"</a></li>";
                        }
                        $("#menu_nav").append('<li>'+data[i].itemName+'<ul>'+temp+'</ul></li>');
                        var article_temp = "";
                        for(var e in data[i].items){
                            article_temp += "<div id='item_"+i+"_"+e+"' class='item'>"+data[i].items[e].content+"</div>";
                        }
                        $("#article").append(article_temp);
                    }

                    //锚点滑动效果
                    $("#menu_nav  li ul li a").click(function(){
                         var cl = $(this).attr('href');
                         $('html,body').animate({scrollTop: $(cl).offset().top}, 1500);
                    });

                }
            });
        });
    });



});