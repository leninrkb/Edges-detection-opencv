const app = Vue.createApp({
	data(){
		return{
			title: "Holaaaaa"
			,img: null
			,imgOutput: null
			,data: null
		}
	},
	methods:{
		loadimg(e) {
			this.img = URL.createObjectURL(e.target.files[0]);
	        let reader = new FileReader();
	        reader.onload = (event) => {
	            let img = new Image();
	            img.onload = () => {
	                let canvas = document.createElement('canvas');
	                let context = canvas.getContext('2d');
	                canvas.width = img.width;
	                canvas.height = img.height;
	                context.drawImage(img, 0, 0, img.width, img.height);
	                this.data = canvas;
	            };
	            img.src = event.target.result;
	        };
	        reader.readAsDataURL(e.target.files[0]);
    	},
		doSomething() {
		    let src = cv.imread(this.data);
		    src = cv.cvtColor(src, src, cv.COLOR_GRAY2BGR); // Convierte a imagen en color si es necesario
		    let gray = new cv.Mat();
		    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
		    let edges = new cv.Mat();
		    cv.Canny(gray, edges, 50, 150, 3);
		    let contours = new cv.MatVector();
		    let hierarchy = new cv.Mat();
		    cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
		    let area_minima = 100; 
		    let filteredContours = [];
		    for (let i = 0; i < contours.size(); ++i) {
		        if (cv.contourArea(contours.get(i)) > area_minima) {
		            filteredContours.push(contours.get(i));
		        }
		    }
		    cv.drawContours(src, filteredContours, -1, new cv.Scalar(0, 255, 0, 255), 2);
		    // for (let i = 0; i < filteredContours.length; ++i) {
		    //     let M = cv.moments(filteredContours[i], false);
		    //     let cx = M.m10 / M.m00;
		    //     let cy = M.m01 / M.m00;
		    //     cv.circle(src, new cv.Point(cx, cy), 5, [255, 0, 0, 255], -1);
		    // }
		    // cv.imshow('outputCanvas', src);
		    // // this.imgOutput = src;
		    // gray.delete();
		    // edges.delete();
		    // contours.delete();
		    // hierarchy.delete();
		    // src.delete();
		    console.log("done....")
		}
	}
});
const appMounted = app.mount("#app");