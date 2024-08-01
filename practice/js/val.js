$(document).ready(function(){
    $('#signup').validate({
        rules:{
            fname:{
                required:true,
                minlength:4,
                maxlength:10
            },
            sname:{
                required:true,
                minlength:4,
                maxlength:7
            },
            emailAdd:{
                required:true,
                //typeof:"email",
                email:true
            },
            pass:{
                minlength:6,
                required:true
            },
            // conPass:{
            //     required:true,
            //     minlength:6,
            //     equalTo:'["name=pass"]'
            },
            dob:{
                required:true
            },
            gender:{
                required:true
            }
        },

        // messages:{  //for custom messages
        //     fname:{
        //         required:'Enter first name',
        //         minlength:'Enter atleast 4 characters',
        //     }
        // }
    })
})