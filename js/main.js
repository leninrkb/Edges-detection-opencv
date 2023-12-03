const app = Vue.createApp({
  data() {
    return {
      imgURL: null
      ,imgElement: null
      ,areaThreshold: 1
      ,kernelSize: 3
      ,Red: 200
      ,Green: 5
      ,Blue: 5
      ,Alpha: 255
      ,color: null
      ,thickness: 1
    };
  },
  methods: {
    loadimg(e) {
      this.imgURL = URL.createObjectURL(e.target.files[0]);
      this.imgElement = document.getElementById("inputImage");
    },
    doSomething() {
      let img = cv.imread(this.imgElement);
      let gray = new cv.Mat();
      cv.cvtColor(img, gray, cv.COLOR_RGBA2GRAY, 0);
      cv.imshow("gray", gray);
      let kernelSize = new cv.Size(this.kernelSize, this.kernelSize);
      let blurred = new cv.Mat();
      cv.GaussianBlur(gray, blurred, kernelSize, 0, 0, cv.BORDER_DEFAULT);
      cv.imshow("smoothing",blurred);
      let edges = new cv.Mat();
      cv.Canny(blurred, edges, 50, 100, 3, false);
      cv.imshow("edges", edges);
      let contours = new cv.MatVector();
      let hierarchy = new cv.Mat();
      cv.findContours(edges, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
      let filteredContours = new cv.MatVector();;
      // let threshold = 100;
      let color = new cv.Scalar(this.Blue, this.Green, this.Red, this.Alpha);
      for (let index = 0; index < contours.size(); index++) {
        let contour = contours.get(index);
        let area = cv.contourArea(contour, false);
        if (area >= this.areaThreshold) {
          filteredContours.push_back(contour);
          let moments = cv.moments(contour, false);
          let cx = moments.m10 / moments.m00;
          let cy = moments.m01 / moments.m00;
          let center = new cv.Point(cx, cy);
          cv.circle(img, center, this.thickness, color, -1);
        }
      }
      color = new cv.Scalar(this.Red, this.Green, this.Blue, this.Alpha);
      cv.drawContours(img, filteredContours, -1, color, this.thickness, cv.LINE_8);
      cv.imshow("contours", img);
      // 
      img.delete();
      gray.delete();
      blurred.delete();
      edges.delete();
      contours.delete();
      hierarchy.delete();
      filteredContours.delete();
      console.log("done....");
    },
  },
  watch: {
    color(newVal) {
      this.Red = parseInt(newVal.slice(1, 3), 16);
      this.Green = parseInt(newVal.slice(3, 5), 16);
      this.Blue = parseInt(newVal.slice(5, 7), 16);
    }
  }
});
const appMounted = app.mount("#app");
