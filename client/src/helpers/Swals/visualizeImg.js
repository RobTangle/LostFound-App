import Swal from "sweetalert2";

export function visualizeImg(e) {
  Swal.fire({
    imageUrl: e.target.src,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Custom image",
    showConfirmButton: false,
    showCloseButton: true,
  });
}
