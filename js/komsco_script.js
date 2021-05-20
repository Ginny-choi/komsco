//한국 조폐공사 스크립트 웹개발
//IIFE 즉시 실행 함수 표현식 
;(function($,window,document,undefined){

    var komsco = {
        init: function(){
            this.headerFn();
            this.section1Fn();
            this.section2Fn();
            this.section3Fn();
            this.section4Fn();
            this.section5Fn();
            this.section6Fn();
            this.footerFn();
        },
        headerFn: function(){
           
        },
        section1Fn:function(){
            //메인 슬라이드 4개 페이드인/아웃
            var cnt = 0;
            var $slide = $('.slide');
            var n = $('.slide').length-1;
            var $pageBtn = $('.page-btn');
            var $stopPlayBtn = $('.stop-play-btn');
            var setId = null;
            var setId2 = null;
            var z = null; //초기값 아무 값도 없다.
            var second = 0;
            var t = 0;

            //1. 메인 슬라이드 함수 
            // 현재 슬라이드(cnt-1)는 그대로 있고 다음 슬라이드(cnt)가 나타난다. 
            function mainNextSlideFn(){
                if( z==null){ //페이지 버튼을 클릭한적이 없는 경우
                    z = cnt==0?n:cnt-1; //z는 null이 아니다
                }
                console.log('z',z);
                console.log('cnt',cnt);
                $slide.        css({zIndex:1,}).stop().animate({opacity:1},0); //전체 슬라이드 초기화
                $slide.eq(z).  css({zIndex:2});//현재 슬라이드를 다음 슬라이드가 덮는다.  
                $slide.eq(cnt).css({zIndex:3}).stop().animate({opacity:0},0).animate({opacity:1},1000); //부드럽게 나타난다.
                pageButtonEventFn();   
                z = null; //초기화 //안해주면 null이 아닌 상태라서 cnt-1의 값을 가져올 수 없다.                        
            }
            
            //1-2. 이전 슬라이드 함수 
           
            function mainPrevSlideFn(){
                if( z==null){ //페이지 버튼을 클릭한적이 없는 경우
                    z = cnt==n?0:cnt+1;
                }
                $slide.        css({zIndex:1,}).stop().animate({opacity:1},0); //전체 슬라이드 초기화
                $slide.eq(cnt).css({zIndex:2})                           //이전 슬라이드 위에서 현재 슬라이드가 사라진다.그러면 이전이 보인다.
                $slide.eq(z).  css({zIndex:3}).stop().animate({opacity:1},0).animate({opacity:0},1000); //부드럽게 사라진다.;
                pageButtonEventFn();
                z = null; //초기화   
            }

            //2. 다음 슬라이드 카운트 함수
            function nextSlideCountFn(){
                cnt++; // 1 2 3 0 1 2 3
                if(cnt>n){
                    cnt=0;
                }
                mainNextSlideFn();
            }
            //2-2. 이전 슬라이드 카운트 함수
            function prevSlideCountFn(){
                cnt--; // 1 2 3 0 1 2 3
                if(cnt<0){
                    cnt=n;
                }
                mainPrevSlideFn();
            }

           // 3. 자동 타이머와 중지
            // $stopPlayBtn.on({
            //     click:function(e){
            //         e.preventDefault();

            //         if ($stopPlayBtn.hasClass('addStop')==false){
            //             autoTimerFn();
            //             $(this).addClass('addStop');
            //         }
            //         else if($stopPlayBtn.hasClass('addStop')==true){
            //             stopFn();
            //             $(this).removeClass('addStop');
            //         }                                
            //     }
            // });
            function autoTimerFn() {
                setId = setInterval(nextSlideCountFn,4000);
                //setInterval(prevSlideCountFn,5000);
            }
            autoTimerFn();

            // function stopFn(){
            //    clearInterval(setId);
            // }

            //4.page btn 이벤트 함수 
            function pageButtonEventFn(){
               $pageBtn.removeClass('addPage');
               $pageBtn.eq(cnt).addClass('addPage');
            }           

            //5.페이지 버튼 클릭 이벤트 
            //호출 대상 메인함수
            //페이지 첫번째 버튼 
           /* $pageBtn.eq(0).on({
                click:function(){
                    cnt = 0;
                    mainPrevSlideFn();
                }
            });

            //두번째 버튼 
            $pageBtn.eq(1).on({
                click:function(){   //if문으로 연결. else if로 쓰면 자기자신도 연결됨.
                    if(cnt > 1){ // cnt가 현재 클릭 인덱스보다 크면 (2,3)
                        cnt =1;
                        mainPrevSlideFn();
                    }
                    if( cnt < 1){ // cnt가 현재 클릭 인덱스보다 작으면 (0)
                        cnt=1;                        
                        mainNextSlideFn();
                    }
                }
            });
            //세번째 버튼 
            $pageBtn.eq(2).on({
                click:function(){                    
                    if(cnt > 2){ // cnt가 현재 클릭 인덱스보다 크면 (4)
                        cnt = 2;
                        mainPrevSlideFn();
                    }
                    if( cnt < 2){ // cnt가 현재 클릭 인덱스보다 작으면 (0,1)
                        cnt = 2;                        
                        mainNextSlideFn();
                    }
                }
            });
            //페이지 마지막 버튼
            $pageBtn.eq(3).on({
                click:function(){
                    cnt = 3;
                    mainNextSlideFn();
                }
            });
*/
            //each()
            $pageBtn.each(function(idx){
                $(this).on({
                    click:function(e){
                        e.preventDefault();
                        
                        z = cnt; //현재 실행중인 슬라이드를 보관하는 변수 (현재의 cnt값 z에 보관하여 전달)
                      
                        if(cnt>idx){ 
                            cnt=idx; //클릭된 인덱스 번호 
                            mainPrevSlideFn();
                        }
                        if(cnt<idx){
                            cnt=idx;
                            mainNextSlideFn();
                        }
                        stopAndAutoPlay();
                    }
                });
            });  
            //6.타이머 중지(버튼을 클릭한 경우)그리고 자동 플레이
            
            function stopAndAutoPlay(){
                second=0;
                clearInterval(setId);
                clearInterval(setId2);
                $stopPlayBtn.addClass('addStop'); //플레이버튼 ▶

                setId2 = setInterval(function(){
                    second++;
                    if(sectond >= 5){
                        second=0;
                        clearInterval(setId);
                        clearInterval(setId2);
                        nextSlideCountFn();//즉시 다음 슬라이드 호출
                        autoTimerFn(); //4초후 실행
                        $stopPlayBtn.removeClass('addStop');
                    }
                    console.log(second + '초');
                },1000);
            }

            //7. 정지 버튼 클릭 이벤트  (완전 중지)
            $stopPlayBtn.on({
                click:function(e){
                    e.preventDefault();
                    if(t==0){
                        t=1;
                        clearInterval(setId);
                        $stopPlayBtn.addClass('addStop');
                    }
                    else{
                        t=0;
                        clearInterval(setId); //버블링 발생 차단
                        nextSlideCountFn();//즉시 다음 슬라이드 호출
                        autoTimerFn();
                        $stopPlayBtn.removeClass('addStop');
                    }                                       
                }
            })

        },
        section2Fn:function(){
            
        },
        section3Fn:function(){
            
        },
        section4Fn:function(){
            
        },
        section5Fn:function(){
            
        },
        section6Fn:function(){
            
        },
        footerFn:function(){
           
        }

        
    }
    komsco.init();

})(jQuery,window,document);