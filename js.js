function getBloggerId() {
    event.preventDefault();
    const blogUrl = document.getElementById("blog_url").value;
    const callbackName = "mrbracking";

    window[callbackName] = function (data) {
        const fullBlogId = data.feed.id.$t;
        const blogTitle = data.feed.title.$t;
var regex = /blog-(\d+)/;
var blogId = fullBlogId.match(regex)[1];
const url = new URL(blogUrl);
var output = `<a target="_blank" title="${blogTitle}" href="https://makeblog.mrlaboratory.workers.dev/${blogId}" class=" col p-1 text-decoration-none"> <div class=" border rounded p-3 c-bg-color position-relative"> <img loading="lazy" class="fluid w-100 h-auto rounded" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEidocSz4hKh1byIgWFghJIZuTYSaDYeYBHsHbtVIlbytGvT8fR4lzfMQS4zT0MjDrRt6U-vi_kF8wT_D_0KGa9ki72bp4WpNYKNcP77ynnoVEcuihsZTCuqe2junepo21tZBCVzzQqs9QSckn6b56AsS6gfrMoFgXMUJsnPT7mr3FqRRFDu_ZLewJzP/s320/example.png"> <h2 class="fs-6 ellipsis-2-lines pt-2 c-color fw-bold">${blogTitle}</h2> <p class="domain fs-5 fw-bold w-100">${url.hostname}</p>  <img class="dicon" src="https://${url.hostname}/favicon.ico">  </div> </a> `

document.getElementById("output").innerHTML = `<h2 class="fs-5">Your Blog Generated</h2> <div id="output" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2 mt-3">${output}</div>`;
storeOnFirebase(output)

    }
    const script = document.createElement("script");
    script.src = `${blogUrl}/feeds/posts/default?redirect=false&start-index=1&max-results=10&alt=json-in-script&callback=${callbackName}`;
    document.body.appendChild(script);
}



// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyBg3xd8Qs11C6frOTikZOI9EqWzibxbZyg",
authDomain: "email-list-6d07d.firebaseapp.com",
databaseURL: "https://email-list-6d07d-default-rtdb.firebaseio.com",
projectId: "email-list-6d07d",
storageBucket: "email-list-6d07d.appspot.com",
messagingSenderId: "21874078873",
appId: "1:21874078873:web:d4a709689763db8731f408"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const ref = database.ref("outputs");
function storeOnFirebase(output) {


ref.orderByValue().equalTo(output).once("value", function(snapshot) {
// If the value does not exist, store it
if (!snapshot.exists()) {
ref.push().set(output);
}
});
}
let html = "";

ref.on("value", function(snapshot) {
const data = snapshot.val();
const values = Object.values(data);
const limitedValues = values.slice(-12);

limitedValues.forEach(value => {
html += `${value}`;
});
document.getElementById("content-container").innerHTML = html;
});
