import { toast } from "./src/wc-toast/index.js";

document.querySelector(".cheers").addEventListener("click", () => {
  console.log("Cheers");
  toast("Cheers!");
});
