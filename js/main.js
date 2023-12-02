const app = Vue.createApp({
  data() {
    return {
      title: "Holaaaaa",
      imgURL: null,
      imgElement: null,
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
      let kernelSize = new cv.Size(3, 3);
      let blurred = new cv.Mat();
      cv.GaussianBlur(gray, blurred, kernelSize, 0, 0, cv.BORDER_DEFAULT);
      let edges = new cv.Mat();
      cv.Canny(blurred, edges, 50, 100, 3, false);
      let contours = new cv.MatVector();
      let hierarchy = new cv.Mat();
      cv.findContours(edges, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
      let filteredContours = new cv.MatVector();;
      let threshold = 100;
      for (let index = 0; index < contours.size(); index++) {
        let contour = contours.get(index);
        let area = cv.contourArea(contour, false);
        if (area >= threshold) {
          filteredContours.push_back(contour);
          let moments = cv.moments(contour, false);
          console.log(moments);
        }
      }
      let color = new cv.Scalar(250, 5, 5, 100);
      cv.drawContours(img, filteredContours, -1, color, 1, cv.LINE_8);
      cv.imshow("outputCanvas", img);
      // 
      img.delete();
      gray.delete();
      blurred.delete();
      edges.delete();
      contours.delete();
      hierarchy.delete();
      filteredContours.delete();
      color.delete();
      console.log("done....");
    },
  },
});
const appMounted = app.mount("#app");
