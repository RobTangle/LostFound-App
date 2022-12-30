import Swal from "sweetalert2";

export function visualizeImgAndEditOptionWithSwal(
  userImgURL,
  dispatch,
  editUserProfileImgWithSwalCallback,
  accessToken
) {
  Swal.fire({
    imageUrl: userImgURL,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Custom image",
    showConfirmButton: true,
    showCloseButton: true,
    confirmButtonText: "Change your profile image",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        dispatch(editUserProfileImgWithSwalCallback(accessToken));
      } catch (error) {
        return Swal.fire({
          title: "Oops!",
          icon: "error",
          text: `${error.message}`,
          showCloseButton: true,
          showConfirmButton: true,
        });
      }
      // handleEditProfileImgCallback();
    } else {
      return;
    }
  });
}
