<template>
  <div class="container">
    <div id="canvasBox">
      <span>{{msg}}</span>
      <canvas id = 'mycanvas'></canvas>
      <div class="button-center">
        <el-button type="primary" @click="savePNG">确定</el-button>
        <el-button type="info" @click="clear">清屏</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Draw from '../../utils/draw'

  export default {
    name: 'sign',
    data() {
      return {
        msg: '请在下方空白处签名',
        signImage: null
      };
    },
    components: {
      Draw,
    },
    beforeCreate() {
      document.title = '手写签名';
    },
    mounted() {
      this.canvasBox = document.getElementById('canvasBox');
      this.initCanvas();
    },
    computed: {

    },
    methods: {
      initCanvas() {
        const canvas = document.querySelector('canvas');
        this.draw = new Draw(canvas);
      },
      clear() {
        const mycanvas = document.getElementById('mycanvas')
        this.draw.clear(mycanvas.width, mycanvas.height);
      },
      download() {
        this.draw.downloadPNGImage(this.draw.getPNGImage());
      },
      savePNG() {
        this.signImage = this.draw.getPNGImage();
        this.$emit('savePNG', this.signImage)
      }
    },
  };
</script>

<style>
  .container {
  }
  #canvasBox {
    margin: 30px 30px;
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }
  canvas {
    flex: 1;
    cursor: crosshair;
    border:2px dashed lightgray;
  }
  .button-center{
    margin-top: 10px;
  }
</style>
