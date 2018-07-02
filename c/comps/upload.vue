<template>
  <input type="file" class="input_img" @change="imgUpload" title=" ">
</template>

<script>
  import handler from 'modules/img-upload'
  export default {
    props:['options'],
    methods:{
      imgUpload($event){
        var that=this
        var options=this.options||{}
        var file=$event.target.files[0]
        handler.handlerFile(file,Object.assign({
          success(err,img){
            var isStrictSize=options.isStrictSize
            var whRate=options.whRate       //宽高比
            var hwRate=options.hwRate       //高宽比
            var txt
            if(isStrictSize){
              if(options.width!=img.width){
                txt='宽度不符合要求'
              }else if(options.height!=img.height){
                txt='高度不符合要求'
              }
              if(txt){
                bus.$emit('toast',{title:`${options.title || ''}${txt}`})
                return
              }
            }
            if(whRate&&(img.width/img.height)<whRate){
              txt=`宽高比不能小于${whRate}`
            }else if(hwRate&&(img.height/img.width)<whRate){
              txt=`高宽比不能小于${whRate}`
            }
            if(txt){
              bus.$emit('toast',{title:txt})
              return
            }
            that.$emit('input',img.url)
          },
          showTip(data){       //上传失败的tips
            bus.$emit('toast',{title:data.msg})
          },
          progress(){     //进度条

          },
          fail(data){
            bus.$emit('toast',{title:data.msg})
          }
        },options))
        $event.target.value=''
      }
    }
  }
</script>